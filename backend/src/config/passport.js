// src/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async function (username, password, done) {
        try {
            console.log('🔍 Login attempt for:', username);

            const user = await User.findOne({
                $or: [
                    { username: username.toLowerCase() },
                    { email: username.toLowerCase() }
                ]
            }).select('+password');

            if (!user) {
                console.log('❌ User not found:', username);
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }

            console.log('✅ User found:', {
                email: user.email,
                username: user.username,
                hasPassword: !!user.password,
                provider: user.provider
            });

            if (!user.password) {
                console.log('❌ User has no local password (OAuth user):', user.email);
                return done(null, false, { message: 'Esta cuenta usa login con Google' });
            }

            const isMatch = await user.comparePassword(password);
            console.log('🔐 Password match:', isMatch);

            if (!isMatch) {
                console.log('❌ Password mismatch for:', username);
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }

            console.log('✅ Authentication successful for:', user.email);
            return done(null, user);
        } catch (err) {
            console.error('❌ Passport strategy error:', err);
            return done(err);
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check existing Google user
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // Check existing email
        const email = profile.emails[0].value;
        user = await User.findOne({ email });

        if (user) {
            // Link existing account
            user.googleId = profile.id;
            user.image = profile.photos[0].value;
            user.provider = user.provider || 'google';
            await user.save();
            return done(null, user);
        }

        // Create new user
        const username = await generateUniqueUsername(email);
        user = new User({
            googleId: profile.id,
            email,
            name: profile.displayName,
            username,
            image: profile.photos[0].value,
            provider: 'google'
        });

        await user.save();
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Serializar usuario para guardarlo en la sesión
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            role: user.role,
            provider: user.provider,
        });
    });
});

passport.deserializeUser(function (sessionUser, done) {
    process.nextTick(function () {
        return done(null, sessionUser);
    });
});
async function generateUniqueUsername(email) {
    const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');
    let username = baseUsername;
    let counter = 1;

    // Ensure username uniqueness
    while (await User.findOne({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
        if (counter > 999) {
            username = `${baseUsername}_${Date.now()}`;
            break;
        }
    }

    return username;
}
module.exports = passport;
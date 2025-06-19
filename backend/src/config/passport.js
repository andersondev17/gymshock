// src/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Configurar estrategia local (username + password)
passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            // Buscar usuario por username
            const user = await User.findOne({ username });

            // Si no existe el usuario
            if (!user) {
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }

            // Verificar contraseña
            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return done(null, false, { message: 'Usuario o contraseña incorrectos' });
            }

            // Autenticación exitosa
            return done(null, user);
        } catch (err) {
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
            await user.save();
            return done(null, user);
        }
        
        // Create new user
        user = new User({
            googleId: profile.id,
            email,
            name: profile.displayName,
            username: email.split('@')[0],
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
            role: user.role
        });
    });
});

// Deserializar usuario de la sesión
passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

module.exports = passport;
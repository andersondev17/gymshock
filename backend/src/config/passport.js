// src/config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
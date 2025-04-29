// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
    login,
    register,
    logout,
    getMe
} = require('../controllers/authController');

// Middleware para verificar si el usuario está autenticado
const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({
        success: false,
        message: 'No autenticado'
    });
};

// Middleware para verificar roles
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        }

        res.status(403).json({
            success: false,
            message: 'No autorizado'
        });
    };
};

// Rutas de autenticación
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/me', isAuth, getMe);

// Exportar middlewares y router
module.exports = {
    router,
    isAuth,
    checkRole
};
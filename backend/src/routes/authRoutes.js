const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ success: false, message: 'No autenticado' });
};

// Middleware para verificar roles
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) return next();
        res.status(403).json({ success: false, message: 'No autorizado' });
    };
};

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account' // Force account selection
    })
);


router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed`
    }),
    (req, res) => {
        console.log('✅ Google OAuth callback successful:', req.user?.email);
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
    }
);

// ==================== PROTECTED ROUTES ====================
router.get('/profile', isAuth, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

router.get('/admin/users',  isAuth, 
    authController.requireRole('admin'), 
    (req, res) => {
        res.json({
            success: true,
            message: 'Admin access granted',
            users: [] // Placeholder
        });
    }
);

module.exports = { router, isAuth, checkRole };
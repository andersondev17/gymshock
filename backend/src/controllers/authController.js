const User = require('../models/User');
const passport = require('passport');

const RBAC_CONFIG = {
    hierarchy: {
        admin: ['admin', 'trainer', 'user'],
        trainer: ['trainer', 'user'],
        user: ['user']
        //  escalabilidad para anadir más roles sin modificar el código
    },
    defaults: {
        register: 'user'
    }
};

exports.login = (req, res) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                console.warn(`⚠️ Auth failure: ${info?.message || 'Unknown error'}`);
                return res.status(401).json({
                    success: false,
                    message: 'Credenciales inválidas'
                });
            }

            req.login(user, async (loginErr) => {
                if (loginErr) throw loginErr;

                // ✅ Actualización segura sin exponer métodos internos
                await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

                // ✅ Log seguro (sin PII)
                console.log(`✅ Login success | UserID: ${user._id} | Role: ${user.role}`);

                const debugToken = `session-${req.sessionID}-${Date.now()}`;

                // ✅ Respuesta estandarizada
                res.json({
                    success: true,
                    debugToken,
                    sessionID: req.sessionID,
                    user: sanitizeUser(user)
                });
            });
        } catch (error) {
            console.error('❌ Auth error:', error);
            res.status(500).json({
                success: false,
                message: 'Error en autenticación'
            });
        }
    })(req, res);
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, name, role = RBAC_CONFIG.defaults.register } = req.body;

        // ✅ Validación contra configuración central
        if (!Object.keys(RBAC_CONFIG.hierarchy).includes(role)) {
            return res.status(400).json({
                success: false,
                message: `Rol inválido. Roles permitidos: ${Object.keys(RBAC_CONFIG.hierarchy).join(', ')}`
            });
        }

        // ✅ Optimización: Consulta única con proyección
        const exists = await User.exists({ $or: [{ email }, { username }] });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'Usuario ya registrado'
            });
        }

        const user = await User.create({
            username,
            email,
            password,
            name,
            role,
            provider: 'local'
        });

        // ✅ Auto-login simplificado
        req.login(user, (err) => {
            res.status(err ? 500 : 201).json({
                success: !err,
                message: err ? 'Error en registro' : 'Usuario creado',
                user: err ? null : sanitizeUser(user)
            });
        });
    } catch (error) {
        handleServerError(res, error, 'register');
    }
};
exports.logout = (req, res) => {
    const userEmail = req.user?.email;
    const userRole = req.user?.role;
    const sessionID = req.sessionID;

    console.log('🚪 Logout attempt:', { userEmail, userRole, sessionID });

    req.logout((err) => {
        if (err) {
            console.error('❌ Logout error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error al cerrar sesión'
            });
        }

        // ✅ DESTROY SESSION COMPLETELY
        req.session.destroy((err) => {
            if (err) {
                console.error('❌ Session destroy error:', err);
            }

            res.clearCookie('connect.sid');
            console.log('✅ Logout successful:', { userEmail, userRole, sessionID });

            res.json({
                success: true,
                message: 'Sesión cerrada correctamente'
            });
        });
    });
};
exports.getMe = (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
        return res.json({
            success: false,
            authenticated: false,
            user: null
        });
    }

    res.json({
        success: true,
        authenticated: true,
        user: sanitizeUser(req.user)
    });
};
// ✅ Middleware reusable para validación de roles
exports.requireRole = (requiredRole) => (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'No autenticado'
        });
    }

    const userRole = req.user.role;
    const hasAccess = RBAC_CONFIG.hierarchy[userRole]?.includes(requiredRole);

    if (!hasAccess) {
        return res.status(403).json({
            success: false,
            message: `Acceso denegado. Rol requerido: ${requiredRole}`
        });
    }

    next();
};

// ✅ Helper: Sanitizar objeto usuario
const sanitizeUser = (user) => ({
    id: user._id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    image: user.image,
    provider: user.provider
});

// ✅ Handler de errores centralizado
const handleServerError = (res, error, context) => {
    console.error(`❌ ${context} error:`, error);
    res.status(500).json({
        success: false,
        message: `Error en ${context}`
    });
};

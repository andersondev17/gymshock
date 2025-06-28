const { verifySession } = require('../utils/auth');

module.exports = async (req, res, next) => {
    if (req.path.startsWith('/api/auth')) return next();

    const sessionId = req.cookies['connect.sid'];
    if (!sessionId) return res.status(401).json({ error: 'Unauthenticated' });

    try {
        req.user = await verifySession(sessionId); // Validación en base de datos
        next();
    } catch (error) {
        res.clearCookie('connect.sid');
        res.status(401).json({ error: 'Session expired' });
    }
};
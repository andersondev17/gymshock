// middlewares/arcjet.middleware.js
const { getArcjetInstance } = require('../config/arcjet');

let requestCounter = 0;

const arcjetMiddleware = async (req, res, next) => {
    requestCounter++;

    try {
        const aj = await getArcjetInstance();
        let decision;

        try {
            //  1 token por solicitud
            decision = await aj.protect(req, { requested: 1 });
        } catch (e) {
            console.error(`❌ Error en protect:`, e.message);
            try {
                decision = await aj.project(req);
            } catch (innerError) {
                console.error('❌ Error en project:', innerError.message);
                return next(); // ✅ Fail open
            }
        }

        if (decision && typeof decision.isDenied === 'function' && decision.isDenied()) {
            console.log(`⛔ Solicitud bloqueada por Arcjet - IP: ${req.ip}`);

            if (decision.reason && typeof decision.reason.isRateLimit === 'function' && decision.reason.isRateLimit()) {
                console.log(`⏱️ Razón: Rate Limit Exceeded`);
                return res.status(429).json({
                    success: false,
                    error: 'RATE_LIMIT_EXCEEDED',
                    message: 'Too many requests. Please wait 30 seconds.',
                    retryAfter: 30
                });
            }

            if (decision.reason && typeof decision.reason.isBot === 'function' && decision.reason.isBot()) {
                console.log(`🤖 Razón: Bot detected`);
                return res.status(403).json({
                    success: false,
                    error: 'BOT_DETECTED',
                    message: 'Automated traffic detected.'
                });
            }
            //SHIELD (DDoS) DETECTION 
            console.log(`🚫 Razón: Access denied (Shield)`);
            return res.status(403).json({
                success: false,
                error: 'ACCESS_DENIED',
                message: 'Access denied by security policy.'
            });
        }

        next();

    } catch (error) {
        console.error(`❌ Arcjet Middleware Error: ${error.message}`);
        next();
    }
};

module.exports = arcjetMiddleware;
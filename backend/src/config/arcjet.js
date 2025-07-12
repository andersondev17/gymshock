let arcjetInstance = null;

const getArcjetInstance = async () => {
    if (arcjetInstance) return arcjetInstance;

    try {
        const arcjetModule = await import('@arcjet/node');
        const arcjet = arcjetModule.default || arcjetModule.arcjet;

        if (!arcjet) {
            throw new Error('No se pudo encontrar la función arcjet en el módulo');
        }

        arcjetInstance = arcjet({
            key: process.env.ARCJET_KEY || 'aj_test123456789',
            characteristics: ["ip.src"],
            rules: [
                arcjetModule.shield({ mode: "LIVE", paths: [{ method: "*", path: "!^/api/(auth|exercises|health)" }] }), // 🛡️ 1. DDoS Protection
                arcjetModule.detectBot({// 🤖 2. Bot Detection
                    mode: "LIVE",
                    allow: ["CATEGORY:SEARCH_ENGINE"],
                    paths: [{ method: "*", path: "!^/api/(auth|exercises|health)" }],
                }),
                arcjetModule.tokenBucket({// ⏱️ 3. Rate Limiting
                    mode: "LIVE",
                    refillRate: 5,      // 5 tokens por intervalo
                    interval: 15,       // cada 15 segundos
                    capacity: 20,       // 20 solicitudes máximas
                    paths: [{ method: "*", path: "!^/api/(auth|exercises|health)" }]

                }),
            ],
        });

        console.log('✅ Arcjet inicializado correctamente');
        return arcjetInstance;

    } catch (error) {
        console.error('❌ Error al inicializar Arcjet:', error.message);

        const requestCounts = {};

        return {
            protect: async (req) => {
                const res = req.res;
                const ip = req.ip || '127.0.0.1';
                const origin = req.headers.origin;

                requestCounts[ip] = (requestCounts[ip] || 0) + 1;

                // cuando hay muchas IPs
                if (Object.keys(requestCounts).length > 1000) {
                    const oldestIps = Object.keys(requestCounts).slice(0, 500);
                    oldestIps.forEach(ip => delete requestCounts[ip]);
                    console.log('🧹 Cleanup: Removed 500 old IPs');
                }

                const isBlocked = requestCounts[ip] > 3;
                if (isBlocked && res) {
                    const allowedOrigins = [
                        process.env.FRONTEND_URL,
                        process.env.FRONTEND_URL_SECONDARY
                    ].filter(Boolean);

                    if (origin && allowedOrigins.includes(origin)) {
                        res.setHeader('Access-Control-Allow-Origin', origin);
                        res.setHeader('Access-Control-Allow-Credentials', 'true');
                    }
                }
                return {
                    isDenied: () => isBlocked,
                    reason: {
                        isRateLimit: () => isBlocked,
                        isBot: () => false
                    }
                };
            },

            project: async (req) => {
                return this.protect(req);
            }
        };
    }
};

module.exports = { getArcjetInstance };
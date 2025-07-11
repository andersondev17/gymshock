require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./database/dbConnect');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('./config/passport');
const arcjetMiddleware = require('./middleware/arcjet.middleware');

const app = express();

app.set('trust proxy', 1);

dbConnect().catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://gymshock-kap4.vercel.app'
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('❌ Origin blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 'Authorization', 'Set-Cookie',
        'Cookie', 'X-Requested-With', 'Accept', 'Origin'
    ],
    exposedHeaders: ['Authorization', 'Set-Cookie'],
    optionsSuccessStatus: 204
};

// Middlewares
app.use(cors(corsOptions)); //  Aplica CORS primero
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODB_URI,
        collection: 'sessions',
    }),
    name: 'gymshock.sid',
    proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// 3. Middleware Arcjet solo para métodos no-OPTIONS
app.use('/api', (req, res, next) => {
    if (req.method === 'OPTIONS' || req.path === '/api/health') return next();
    arcjetMiddleware(req, res, next);
});

// Rutas
const { router: authRouter } = require('./routes/authRoutes');
app.use('/api/auth', authRouter);
app.use('/api/exercises', require('./routes/exerciseRoutes'));

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'GymShock API running',
        timestamp: new Date().toISOString()
    });
});

// 4. Manejo de errores con headers CORS
app.use((err, req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
        process.env.FRONTEND_URL,
        'https://gymshock-kap4.vercel.app'
    ].filter(Boolean);

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error(' API Error:', {
            message: err.message,
            stack: err.stack,
            url: req.originalUrl,
            method: req.method
        });
    }

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            error: 'CORS_FORBIDDEN',
            message: 'Origin not allowed'
        });
    }

    const status = err.statusCode || err.status || 500;
    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
});
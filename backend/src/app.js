require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./database/dbconnect');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('./config/passport');
const arcjetMiddleware = require('./middleware/arcjet.middleware');
const cookieParser = require('cookie-parser');

const app = express();

app.set('trust proxy', 1);

dbConnect().catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_SECONDARY
].filter(Boolean);

// Middlewares
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODB_URI,
        collection: 'sessions',
    }),
    name: 'connect.sid',
    proxy: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// 3. Middleware Arcjet solo para métodos no-OPTIONS
app.use('/api', (req, res, next) => {
    if (req.method === 'OPTIONS' || 
        req.path === '/api/health' || 
        req.path.startsWith('/api/exercises') || 
        req.path.startsWith('/api/programs')) return next();
    arcjetMiddleware(req, res, next);
});
// Rutas
const { router: authRouter } = require('./routes/authRoutes');
app.use('/api/auth', authRouter);
app.use('/api/exercises', require('./routes/exerciseRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'GymShock API running',
        timestamp: new Date().toISOString(),
        clientIP: req.ip,
        headers: {
            origin: req.headers.origin,
            userAgent: req.headers['user-agent']?.substring(0, 50)
        }
    });
});

// 4. Manejo de errores con headers CORS
app.use((err, req, res, next) => {
    console.error(`❌ API Error: ${err.message}`);

    const status = err.statusCode || err.status || 500;
    res.status(status).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});
app.use((req, res, next) => {
    console.log('🔍 Session State:');
    console.log('- Session ID:', req.sessionID);
    console.log('- Passport User:', req.session?.passport?.user);
    console.log('- Authenticated:', req.isAuthenticated());
    console.log('- req.user:', req.user);
    next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
});

module.exports = app;
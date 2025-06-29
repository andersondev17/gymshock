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
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //  Incluir OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'], //  Cookies
    exposedHeaders: ['Authorization', 'Set-Cookie'], //  Headers expuestos
    optionsSuccessStatus: 204 // Respuesta vacía para OPTIONS
};

// Middlewares
app.use(cors(corsOptions)); //  Aplica CORS primero
app.use(express.json());
app.use(morgan('dev'));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODB_URI,
        collection: 'sessions'
    }),
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
    if (req.method === 'OPTIONS') return next(); 
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
        timestamp: new Date().toISOString(),
        allowedOrigins: allowedOrigins 
    });
});

// 4. Manejo de errores con headers CORS
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Añade headers CORS incluso en errores
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    res.status(500).json({
        success: false,
        message: err.message || 'Error del servidor'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
    console.log(`🌐 Orígenes permitidos: ${allowedOrigins.join(', ')}`);
});
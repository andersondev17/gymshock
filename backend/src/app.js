require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./database/dbConnect');
// Importar session antes de usarlo
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('./config/passport');

const app = express();

dbConnect().catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});

// Configurar almacén de sesiones
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gymshock',
    collection: 'sessions'
});

store.on('error', function(error) {
    console.error('Error en la sesión de MongoDB:', error);
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
const { router: authRouter } = require('./routes/authRoutes');
app.use('/api/auth', authRouter);
app.use('/api/exercises', require('./routes/exerciseRoutes'));

// Ruta de salud
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'GymShock API running'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Error del servidor'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`🔗 Conectado al frontend en ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = app;
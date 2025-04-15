require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./database/dbConnect');

const app = express();

dbConnect().catch(err => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Rutas
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
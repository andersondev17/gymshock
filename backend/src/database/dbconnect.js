const mongoose = require('mongoose');

let instance = null;

/**
 * conexión con MongoDB usando patrón Singleton
 * @returns {Promise} Conexión a MongoDB
 */
const dbConnect = async () => {
    if (instance) {
        return instance;
    }

    try {
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/gymshock';
        instance = await mongoose.connect(connectionString);

        console.log('📊 MongoDB connected');
        return instance;
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = dbConnect;
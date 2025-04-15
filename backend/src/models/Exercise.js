// models/Exercise.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    bodyPart: {
        type: String,
        required: true,
        index: true
    },
    equipment: {
        type: String,
        required: true,
        index: true
    },
    gifUrl: {
        type: String,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true,
        index: true
    },
    secondaryMuscles: [String],
    instructions: [String]
}, { timestamps: true });

// Índice compuesto para búsquedas frecuentes
ExerciseSchema.index({ bodyPart: 1, target: 1 });

module.exports = mongoose.model('Exercise', ExerciseSchema);
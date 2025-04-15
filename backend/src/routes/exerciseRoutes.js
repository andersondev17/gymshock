// routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const {
    getExercises,
    getExerciseById,
    getBodyPartList,
    getExercisesByBodyPart,
    getSimilarExercises
} = require('../controllers/exerciseController');

// Rutas para listar y filtrar ejercicios
router.get('/bodyPartList', getBodyPartList);
router.get('/bodyPart/:bodyPart', getExercisesByBodyPart);
router.get('/:id/similar', getSimilarExercises);
router.get('/:id', getExerciseById);
router.get('/', getExercises);

module.exports = router;
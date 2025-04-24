// src/routes/exerciseRoutes.js (ejemplo para proteger rutas de administrador)
const express = require('express');
const router = express.Router();
const { isAuth, checkRole } = require('./authRoutes');
const {
    getExercises,
    getExerciseById,
    getBodyPartList,
    getExercisesByBodyPart,
    getSimilarExercises,
    // Añadir nuevos controladores para administradores
    createExercise,
    updateExercise,
    deleteExercise
} = require('../controllers/exerciseController');

// Rutas públicas para listar y filtrar ejercicios
router.get('/bodyPartList', getBodyPartList);
router.get('/bodyPart/:bodyPart', getExercisesByBodyPart);
router.get('/:id/similar', getSimilarExercises);
router.get('/:id', getExerciseById);
router.get('/', getExercises);

// Rutas protegidas para administradores
router.post('/', isAuth, checkRole('admin'), createExercise);
router.put('/:id', isAuth, checkRole('admin'), updateExercise);
router.delete('/:id', isAuth, checkRole('admin'), deleteExercise);

module.exports = router;
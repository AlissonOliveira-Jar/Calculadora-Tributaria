const express = require('express');
const router = express.Router();
const calculoController = require('../controllers/calculoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas as rotas de cálculo exigem autenticação
router.use(authMiddleware);

// Novo Calculo /api/calculos
router.post('/', calculoController.create);

// Histórico /api/calculos/historico
router.get('/historico', calculoController.history);

module.exports = router;

const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// -- Rotas públicas --
// Cadastro /auth/register
router.post('/register', authController.register);
// Login /auth/login
router.post('/login', authController.login);

// -- Rota protegida --
router.get('/me', authMiddleware, async (req, res) => {
  const prisma = require('../config/prisma');
  
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true }
  });

  res.json({ message: "Você está autenticado!", user });
});

module.exports = router;

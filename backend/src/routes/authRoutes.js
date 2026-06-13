const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Cadastro /auth/register
router.post('/register', authController.register);

// Login /auth/login
router.post('/login', authController.login);

module.exports = router;

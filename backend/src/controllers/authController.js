const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos (name, email, password) são obrigatórios." });
      }

      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({ error: "Este e-mail já está cadastrado." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: newUser
      });

    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao criar usuário." });
    }
  },

login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
      }

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ error: "Erro interno do servidor ao realizar login." });
    }
  }
};

module.exports = authController;

const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

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
  }
};

module.exports = authController;

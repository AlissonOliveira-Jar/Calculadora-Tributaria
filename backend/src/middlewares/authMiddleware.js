const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token de acesso não fornecido." });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: "Token malformatado." });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    req.userId = decoded.id;

    return next();

  } catch (error) {
    console.error("Erro na validação do JWT:", error.message);
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.BACKEND_PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ 
    status: "Sucesso",
    message: "Backend da Calculadora NAF rodando com Express no Docker!" 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
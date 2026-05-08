import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;
const SECRET_KEY = 'edead35592554922e00a96a11d756b962ea69d4c053ca12a26994ab5372781cf';

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173', 
        credentials: true
    })
);

// Configuração do pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.senha_db,
    database: "usuario_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Inicia o BD
async function inicializarBD() {
    let conexao;
    try {
        conexao = await pool.getConnection();
        console.log("Conectado ao MySQL!");

        const [dbInfo] = await conexao.execute("SELECT DATABASE() as current_db");
        console.log(`Database atual: ${dbInfo[0].current_db}`);

        await conexao.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                senha VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Tabela 'usuarios' verificada/criada.");

        console.log("Banco de dados inicializado com sucesso!");

    } catch (error) {
        console.error("ERRO ao inicializar banco de dados:");
        console.error("Mensagem:", error.message);
        console.error("Código:", error.code);
        if (error.sql) console.error("SQL:", error.sql);
        if (error.sqlMessage) console.error("SQL Message:", error.sqlMessage);
        process.exit(1);
    } finally {
        if (conexao) conexao.release();
    }
}

// Inicia o servidor
inicializarBD().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error("Falha ao inicializar o banco de dados. Servidor não iniciado.");
    process.exit(1);
});

// Configuração do email com .env 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.senha
    }
});

// Envio de email
app.post('/send-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const mailOptions = {
        from: process.env.email, 
        to: "mauricio.moreira@unichristus.edu.br", 
        subject: `[AJUDA NAF] Dúvida de: ${nome}`,
        text: `
            Nome do Usuário: ${nome}
            Email de Contato: ${email}
            -------------------------------------
            Mensagem:
            ${mensagem}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email enviado para ${mailOptions.to}`);
        return res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('ERRO AO ENVIAR EMAIL:', error);
        return res.status(500).json({ message: 'Erro interno ao tentar enviar o email.' });
    }
});

app.post('/register', async (req, res) => {
    let conexao;
    try {
        const { nome, email, senha } = req.body;

        console.log("Tentando registrar usuário:", { nome, email });

        // Validação básica
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Conecta ao banco
        conexao = await pool.getConnection();

        // Verifica se o email já existe
        const [existingUsers] = await conexao.execute(
            "SELECT id FROM usuarios WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: "Email já registrado." });
        }

        console.log("AVISO: Senha sendo armazenada em texto puro!");

        const [result] = await conexao.execute(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha] 
        );

        console.log(`Usuário inserido com ID: ${result.insertId}`);

        // Retornar sucesso
        return res.status(201).json({ 
            message: "Usuário registrado com sucesso!", 
            userId: result.insertId 
        });

    } catch (error) {
        console.error("ERRO no registro:", error.message);
        
        return res.status(500).json({ 
            message: "Erro interno no servidor",
            error: error.message 
        });
    } finally {
        if (conexao) conexao.release();
    }
});

app.post('/login', async (req, res) => {
    let conexao;
    try {
        const { email, senha } = req.body;

        console.log("Tentando login para:", email);

        // Validação
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Conecta ao banco
        conexao = await pool.getConnection();

        // Busca usuário pelo email
        const [usuarios] = await conexao.execute(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (usuarios.length === 0) {
            console.log("Usuário não encontrado:", email);
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const usuario = usuarios[0];
        console.log(`Usuário encontrado: ${usuario.nome} (ID: ${usuario.id})`);
        
        if (senha !== usuario.senha) {
            console.log("Senha incorreta para:", email);
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { 
                id: usuario.id, 
                nome: usuario.nome, 
                email: usuario.email 
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log("Login bem-sucedido para:", usuario.email);

        return res.status(200).json({ 
            message: "Login bem-sucedido.",
            token: token,
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('ERRO no login:', error.message);
        
        return res.status(500).json({ message: "Erro interno do servidor." });
    } finally {
        if (conexao) conexao.release();
    }
});

// middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }
        req.user = user;
        next();
    });
};

app.get('/debug/usuarios', authenticateToken, async (req, res) => {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const [usuarios] = await conexao.execute("SELECT id, nome, email, created_at FROM usuarios");
        
        return res.status(200).json({
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error("Erro no debug:", error);
        return res.status(500).json({ error: error.message });
    } finally {
        if (conexao) conexao.release();
    }
});

app.get('/debug/todos-usuarios', async (req, res) => {
    let conexao;
    try {
        conexao = await pool.getConnection();
        const [usuarios] = await conexao.execute("SELECT id, nome, email, senha, created_at FROM usuarios");
        
        console.log("Usuários no banco:", usuarios);
        
        return res.status(200).json({
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error("Erro no debug:", error);
        return res.status(500).json({ error: error.message });
    } finally {
        if (conexao) conexao.release();
    }
});

app.get("/protegido", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Acesso concedido à rota protegida.", user: req.user });
})
require('dotenv').config();
const fs = require('fs');
let livros = [];
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

const app = express();

// ===========
// MIDDLEWARES
// ===========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ========================================
// RATE LIMITING (limitação de requisições)
// ========================================
const rateLimit = require('express-rate-limit');

const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 10, // máximo de 10 requisições por IP por janela
    message: { erro: 'Muitos uploads. Tente novamente mais tarde.' },
    standardHeaders: true, // envia headers RateLimit-*
    legacyHeaders: false,
});
// ===============================
// SEGURANÇA2: arquivos acessiveiS
// ===============================
const arquivosSensiveis = [
    '/.env',
    '/livros.json',
    '/package.json',
    '/package-lock.json',
    '/server.js',
    '/.gitignore',
    '/.git/'
];

app.use((req, res, next) => {
    const caminho = req.path;
    const bloqueado = arquivosSensiveis.some(arquivo => caminho.startsWith(arquivo));
    
    if (bloqueado) {
        return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
});

// ================
// SEGURANÇA: 1 XSS
// ================
function limparTexto(texto) {
    if (!texto) return '';
    return texto
        .replace(/<[^>]*>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim();
}

// ==========================
// CONFIGURAÇÃO DO CLOUDINARY
// ==========================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Carregar livros do arquivo JSON
function carregarLivros() {
    try {
        const dados = fs.readFileSync('./livros.json');
        livros = JSON.parse(dados);
        console.log(`✅ ${livros.length} livros carregados do livros.json`);
    } catch (erro) {
        console.error('Erro ao carregar livros.json:', erro);
        livros = [];
    }
}
carregarLivros();
// ====================================
// CONFIGURAÇÃO DO MULTER COM VALIDAÇÃO (PDF + TAMANHO)
// ====================================

// 1. Filtro para aceitar apenas PDF
const fileFilter = (req, file, cb) => {
    const extensao = file.originalname.split('.').pop().toLowerCase();
    const mimeType = file.mimetype;

    if (extensao === 'pdf' && mimeType === 'application/pdf') {
        cb(null, true); // aceita
    } else {
        cb(new Error('Formato inválido. Apenas arquivos PDF são permitidos!'), false);
    }
};

// 2. Limite de tamanho (50 MB)
const limits = {
    fileSize: 50 * 1024 * 1024,
};

// 3. Armazenamento no Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'biblioteca_mwae',
        format: async (req, file) => 'pdf',
        public_id: (req, file) => Date.now() + '-' + file.originalname.replace('.pdf', ''),
    },
});

// 4. Multer com validação
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});
// Rota para obter a lista de livros
app.get('/api/livros', (req, res) => {
    res.json(livros);
});
// ============================
// ROTA DE UPLOAD (COM RATE LIMITING)
// ============================
app.post('/upload', uploadLimiter, upload.single('ficheiro-livro'), (req, res) => {
    console.log('=== DADOS RECEBIDOS ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file ? req.file.path : 'NENHUM ARQUIVO');
    
    const tituloRaw = req.body.titulo || '';
    const autorRaw = req.body.autor || '';
    const classeRaw = req.body.classe || '';
    
    console.log('Campos brutos:', { tituloRaw, autorRaw, classeRaw });
    
    const titulo = limparTexto(tituloRaw);
    const autor = limparTexto(autorRaw);
    const classe = limparTexto(classeRaw);
    
    console.log('Campos limpos:', { titulo, autor, classe });
    
    if (!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }
    // Gerar URL da capa usando a própria API do Cloudinary
const publicId = req.file.filename; // obtém o ID público do ficheiro
const novaCapa = cloudinary.url(publicId, {
    transformation: [
        { width: 200, height: 300, crop: 'fill' },
        { page: 1 }                  // extrai a primeira página
    ],
    format: 'jpg'
});
console.log('📸 URL da capa gerada:', novaCapa);
    const novoLivro = {
        id: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        classe: classe,
        img: novaCapa,
        link: req.file.path,
        missao: "Contribuidor"
    };
    
    // Adicionar ao array em memória
    livros.push(novoLivro);
    
    // Salvar no arquivo livros.json
    try {
        fs.writeFileSync('./livros.json', JSON.stringify(livros, null, 2));
        console.log(`✅ Livro "${titulo}" salvo no livros.json`);
    } catch (erro) {
        console.error('Erro ao salvar livros.json:', erro);
        // Mesmo com erro no arquivo, ainda retornamos sucesso do upload
    }
    
    res.json({ 
        url: req.file.path,
        titulo: titulo,
        autor: autor,
        classe: classe
    });
});
// ==================================
// SERVIDOR DE ARQUIVOS ESTÁTICOS
// ===================================
app.use(express.static('public'));

// =============
// INICIALIZAÇÃO
// =============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
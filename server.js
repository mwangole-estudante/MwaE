require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

const app = express();

// ============================
// MIDDLEWARES
// ============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// SEGURANÇA: Limpar texto contra XSS
// =============================================
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

// =============================================
// CONFIGURAÇÃO DO CLOUDINARY
// =============================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// =============================================
// CONFIGURAÇÃO DO MULTER (UPLOAD)
// =============================================
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'biblioteca_mwae',
        format: async (req, file) => 'pdf',
        public_id: (req, file) => Date.now() + '-' + file.originalname.replace('.pdf', ''),
    },
});

const upload = multer({ storage: storage });

// =============================================
// ROTA DE UPLOAD (CORRIGIDA)
// =============================================
app.post('/upload', upload.single('ficheiro-livro'), (req, res) => {
    // Log para depuração
    console.log('=== DADOS RECEBIDOS ===');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file ? req.file.path : 'NENHUM ARQUIVO');
    
    // Pegar os campos (podem vir como undefined)
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
    
    res.json({ 
        url: req.file.path,
        titulo: titulo,
        autor: autor,
        classe: classe
    });
});

// =============================================
// SERVIDOR DE ARQUIVOS ESTÁTICOS
// =============================================
app.use(express.static('public'));

// =============================================
// INICIALIZAÇÃO
// =============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));
require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const cors = require('cors');
app.use(cors());
// Configuração do armazenamento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'biblioteca_mwae',
    format: async (req, file) => 'pdf', 
    public_id: (req, file) => file.originalname.replace('.pdf', ''),
  },
});

const upload = multer({ storage: storage });

// Rota para receber o upload
app.post('/upload', upload.single('ficheiro-livro'), (req, res) => {
  res.json({ url: req.file.path });
});

// Servir os ficheiros do site (HTML, CSS, JS)
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a correr em http://localhost:${PORT}`));

const express = require('express');
const path = require('path');
const app = express();

// Porta 3000 para o teu telemóvel, ou a porta que a nuvem der
const PORT = process.env.PORT || 3000;

// 1. Dizemos ao Node para "servir" os teus ficheiros estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Rota Principal: Quando alguém entra no site, ele entrega o teu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Liga o motor
app.listen(PORT, () => {
    console.log(`✅ Mwangolé Ativo!`);
    console.log(`🌍 Aceda em: http://localhost:${PORT}`);
});
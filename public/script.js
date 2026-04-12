let pontos = 0;

function adicionarPonto() {
    pontos++;
    document.getElementById('pontos').innerText = pontos;
}

//Biblioteca
function mostrarSecao(id) {
    // Esconde todas as secções
    const secoes = document.querySelectorAll('section');
    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    // Mostra apenas a secção que foi clicada
    const secaoAtiva = document.getElementById(id);
    if (secaoAtiva) {
        secaoAtiva.style.display = 'block';
        // Faz a página rolar para o topo para o usuário ver o conteúdo
        window.scrollTo(0, 0);
    }
}
async function carregarLivrosDoServidor() {
    try {
        const resposta = await fetch('/api/livros');
        const livrosServidor = await resposta.json();
        // Inverter a ordem: os mais recentes (maior id) primeiro
        biblioteca = livrosServidor.reverse();
        carregarBiblioteca();   // recarrega a tela
        renderizarFeed();       // atualiza o feed de livros recentes
        document.getElementById('total-livros').innerText = biblioteca.length;
    } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
    }
}

let biblioteca = [];

function atualizarBotaoParaVerde(idLivro) {
    const card = document.querySelector(`[data-id="${idLivro}"]`);
    if (card) {
        const botao = card.querySelector('.btn-baixar');
        botao.innerHTML = "✅ Confirmar Download";
        botao.style.backgroundColor = "#28a745";
        botao.style.color = "white";
    }
}
// ========================================
// 2. MOTOR DE RENDERIZAÇÃO (Lógica)
// ========================================
function carregarBiblioteca() {
    const contentor = document.getElementById('lista-de-livros');
    
    if (!contentor) return;

    contentor.innerHTML = biblioteca.map(livro => `
    <div class="livro-card" 
         data-id="${livro.id}" 
         data-titulo="${livro.titulo}" 
         data-autor="${livro.autor}" 
         data-classe="${livro.classe}">
        
        <img src="${livro.img}" class="capa-livro" alt="${livro.titulo}">
        
        <div class="info-livro">
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <small>${livro.classe}</small>
        </div>

        <button onclick="baixarEReencaminhar('${livro.link}', '${livro.id}')" class="btn-baixar">
            Baixar PDF
        </button>
        
    </div>
`).join('')
biblioteca.forEach(livro => {
        const registro = localStorage.getItem('clique_' + livro.id);
        const tempoExpira = 30 * 60 * 1000;
        
        // Só pinta de verde se o clique ainda estiver dentro do prazo de 30min
        if (registro && (Date.now() - registro < tempoExpira)) {
            atualizarBotaoParaVerde(livro.id);
        } else {
            localStorage.removeItem('clique_' + livro.id); // Limpa o que já expirou
        }
    });

// Seleciona a barra de pesquisa
const barraPesquisa = document.getElementById('inputPesquisa');

if (barraPesquisa) {

    barraPesquisa.addEventListener('input', function() {

        const termoBusca = this.value.toLowerCase().trim();
        const livros = document.querySelectorAll('.livro-card');

        livros.forEach(livro => {

            const titulo = livro.dataset.titulo.toLowerCase();
            const classe = livro.dataset.classe.toLowerCase();
            const autor = livro.dataset.autor.toLowerCase();

            const texto = titulo + " " + classe + " " + autor;

            if (texto.includes(termoBusca)) {
                livro.style.display = "";
            } else {
                livro.style.display = "none";
            }

        });

    });

}
document.getElementById('total-livros').innerText = biblioteca.length;
}

// Botão para Baixar
function baixarEReencaminhar(urlLivro, idLivro) {
    const tempoExpira = 30 * 60 * 1000; // 30 minutos em milisegundos
    const registroClique = localStorage.getItem('clique_' + idLivro);
    const agora = Date.now();

    // Verifica se nunca clicou OU se o clique já tem mais de 30 minutos
    if (!registroClique || (agora - registroClique > tempoExpira)) {
        
        // --- PRIMEIRO CLIQUE (Publicidade) ---
        const publicidade = "https://rzekl.com/c/1e8d1144946b7f02e05e16525dc3e8/?ulp=https%3A%2F%2Fa.aliexpress.com%2F_EHQU8ay";
        window.open(publicidade, '_blank');
        
        // Guarda o momento exato do clique
        localStorage.setItem('clique_' + idLivro, agora);
        atualizarBotaoParaVerde(idLivro);

    } else {
        // --- SEGUNDO CLIQUE (Download) ---
        
        // Forçar o download criando um link temporário com atributo download
        const linkDownload = document.createElement('a');
        linkDownload.href = urlLivro;
        
        // Tenta forçar o download (Funciona melhor em PC, no Mobile pode abrir o PDF)
        linkDownload.setAttribute('download', idLivro + '.pdf'); 
        linkDownload.target = '_blank';
        
        document.body.appendChild(linkDownload);
        linkDownload.click();
        document.body.removeChild(linkDownload);

        // OPCIONAL: Se queres que o botão volte a ser azul LOGO APÓS o download:
        // localStorage.removeItem('clique_' + idLivro);
    }
}

// 1. Função para abrir o formulário quando clicas no botão azul
function abrirModal(tipo) {
    if (tipo === 'upload') {
        // Procura a janela de upload pelo ID e muda o estilo para "flex" (visível)
        document.getElementById('modal-upload').style.display = 'flex';
    }
}

// 2. Função para fechar o formulário quando clicas no "X"
function fecharModal() {
    // Procura a janela e muda o estilo para "none" (escondido)
    document.getElementById('modal-upload').style.display = 'none';
}

// 3. (Extra) Fechar se o aluno clicar fora da caixa branca (no fundo escuro)
window.onclick = function(event) {
    let modal = document.getElementById('modal-upload');
    if (event.target == modal) {
        fecharModal();
    }
}

// 1. Configuração do formulário para enviar via Servidor/Cloudinary
const formUpload = document.getElementById('form-upload');

if (formUpload) {
    formUpload.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Criar o "pacote" com o ficheiro e os dados (Título, Autor, Ficheiro)
        const formData = new FormData();
formData.append('titulo', document.getElementById('titulo').value);
formData.append('autor', document.getElementById('autor').value);
const selectClasse = document.getElementById('classe');
const textoClasse = selectClasse.options[selectClasse.selectedIndex].text;
formData.append('classe', textoClasse);;
formData.append('ficheiro-livro', document.getElementById('ficheiro-livro').files[0]);
        
        const btn = e.target.querySelector('.btn-enviar');
        btn.innerText = "A carregar livro... ⏳";
        btn.disabled = true;

        try {
            // Envia para o teu server.js que está rodando no Termux
            // E altera para o endereço completo:
        const resposta = await fetch('/upload', {
    method: 'POST',
    body: formData
});

            // Se o servidor responder com erro, o JSON não será válido, disparando o catch
            const resultado = await resposta.json();
            console.log('Resposta do servidor:', resultado);

            if (resultado.url) {
                alert("Sucesso! O livro foi recebido.");
                console.log("Link gerado pelo Cloudinary:", resultado.url);
                
                // Opcional: Avisar no WhatsApp que o upload terminou
                const titulo = document.getElementById('titulo').value;
                window.open(`https://wa.me/244938063174?text=Olá! Fiz o upload do livro: ${titulo}. O link é: ${resultado.url}`, '_blank');
                
                fecharModal();
                formUpload.reset();
                carregarLivrosDoServidor();
            }
        } catch (erro) {
        console.error("Erro no envio:", erro);
        let msg = "Erro detectado. Verifique o servidor.";
        if (erro.message) msg = erro.message;
        alert(msg);
} finally {
            btn.innerText = "Enviar para Biblioteca";
            btn.disabled = false;
        }
    });
}
// Forçar recarregamento da biblioteca quando a seção for mostrada
const mostrarSecaoOriginal = mostrarSecao;
window.mostrarSecao = function(id) {
    mostrarSecaoOriginal(id);
    if (id === 'biblioteca') {
        // Pequeno delay para garantir que o DOM está pronto
        setTimeout(() => {
            if (typeof carregarBiblioteca === 'function') {
                carregarLivrosDoServidor();
            }
        }, 50);
    }
};
// 2. INICIALIZAÇÃO ÚNICA (Executa quando a página abre)
window.onload = function() {
    carregarLivrosDoServidor(); 
    console.log("✅ Sistema Mwangolé carregado com sucesso!");
};
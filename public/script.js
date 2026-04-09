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
// ==========================================
// 1. BASE DE DADOS DA BIBLIOTECA (Dados)
// ==========================================
const biblioteca = [
    { 
        id: "lp-01", //deve ser formado em pela combinacao da abreviacao do disciplina+assunto+autor e classe; as classe universitaria sao colocadas sem o zero para diferenciar do ensino primário
        classe: "1ª Classe", 
        titulo: "Língua Portuguesa", 
        img: "img/lp1classe.jpg", 
        link: "pdf/1.pdf",
        missao: "Explorador de Letras",//este espaço foi criado pensando nas estatisticas que teremos futuramente
        autor: "Moderna editora",
    },
    { 
        id: "mat-01", 
        classe: "1ª Classe", 
        titulo: "Matemática", 
        img: "img/mat1classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1F7H1yQoY5g8o-Snkb9tMVXoqz7qBYspK",
        missao: "Explorador de Letras",
        autor: "Moderna editora",
    },
    { 
        id: "edmusical-01", 
        classe: "1ª Classe", 
        titulo: "Educação Musical", 
        img: "img/edmusical1classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1eLWl9_oJV9Fiy8j-qSK3ArPxaIBGnKqb",
        missao: "Explorador de Letras",
        autor: "Moderna editora",
    },
    { 
        id: "edmeio-01", 
        classe: "1ª Classe", 
        titulo: "Estudo do Meio", 
        img: "img/edmeio1classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1-B3XFabzjMVD2zMexZTGyNBteGdGRq_6",
        missao: "Explorador de Letras",
        autor: "Moderna editora",
    },
    { 
        id: "mat-04", 
        classe: "4ª Classe", 
        titulo: "Matemática", 
        img: "img/mat4classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1uC0p2EZS5_cApwQ1bxXuwSCGoBhwNU5-",
        missao: "Mestre dos Números",
        autor: "Porto ditora",
    },
    { 
        id: "dt1lchr-1", 
        classe: "1º ano faculdade UAN DMG", 
        titulo: "Desenho Técnico 1", 
        img: "img/dt1lchr.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1WvDFuijjC5DxwPXASH1gGJWU_95xhuOW",
        missao: "Explorador de Desenhos",
        autor: "Leonardo Ch. Ribeiro",
    },
    { 
        id: "dt2lchr-1", 
        classe: "1º ano faculdade uan DMG", 
        titulo: "Desenho Técnico 2", 
        img: "img/dt2lchr.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1cnCegN_QQb9Pu5QR3xX1WcE1cgVsfG5S",
        missao: "Explorador de Desenhos",
        autor: "Leonardo Ch Ribeiro",
    },
    { 
        id: "adtmfc", 
        classe: "faculdade", 
        titulo: "Apostila de Desenho Tecnico", 
        img: "img/adtmfc.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1igTNue4cxlNdwQQGfjcS_JcUHUBHtqX0",
        missao: "Explorador de Desenho",
        autor: "Márcio Fernando Catapan",
    },
    { 
        id: "icpsnjb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Sistema de Numeração", 
        img: "img/icpsnjb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=19OCn7ZMZlyCS5lvTJaPae66oEkgbFdIK",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },
        { 
        id: "icpicpjb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Introdução a computação e a programação", 
        img: "img/icpicpjb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1RjKTMRE-YYbuf7eh3tmefhknLh-pb5bY",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },
        { 
        id: "icpeumijb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Exercício: Unidade de medida de informação", 
        img: "img/icpeumijb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1nHPKrjCHVuPwhJpmOMwvHUvTlqnfvHqP",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },
            { 
        id: "icpeabjb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Exercício: Aritmética Binária", 
        img: "img/icpeabjb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1_vOP7heyIuhLl10SY4Uu2DpGRJw_h3fL",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },
            { 
        id: "icpesnjb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Exercício: Sistema de Numeração", 
        img: "img/icpesnjb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=11zm2SjPFuwOP7rsz4vpPBW-ilA1_HyUd",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },
            { 
        id: "icplcld-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Linguagem C", 
        img: "img/icplcld.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1TENzZTqHHc9bpUm-fs-nWuzo_ShZ0cJP",
        missao: "Explorador de Informática",
        autor: "Luís Damas",
    },
            { 
        id: "icpumijb-1", 
        classe: "1 ano Faculdade UAN ICP", 
        titulo: "Unidade de medida de informação", 
        img: "img/icpumijb.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1ezuuEzwtOVl5qjR-B_QWgmAkITOdO1H9",
        missao: "Explorador de Informática",
        autor: "Eng. Jobelson Bandeira",
    },

  //  { 
 //       id: "", 
//        classe: "", 
//        titulo: "", 
//        img: "img/.jpg", 
//      link: "https://drive.google.com/uc?export=download&id=",
//        missao: "",
//        autor: "",
//   },
    // Podes adicionar mais 100 livros aqui apenas copiando este bloco { ... },
];
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
    const contentor = document.getElementById('lista-livros');
    
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
        const formData = new FormData(formUpload);
        
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

            if (resultado.url) {
                alert("Sucesso! O livro foi recebido.");
                console.log("Link gerado pelo Cloudinary:", resultado.url);
                
                // Opcional: Avisar no WhatsApp que o upload terminou
                const titulo = document.getElementById('titulo').value;
                window.open(`https://wa.me/244938063174?text=Olá! Fiz o upload do livro: ${titulo}. O link é: ${resultado.url}`, '_blank');
                
                fecharModal();
                formUpload.reset();
            }
        } catch (erro) {
            console.error("Erro no envio:", erro);
            alert("Erro detectado: Verifique se o servidor no Termux está ligado.");
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
                carregarBiblioteca();
            }
        }, 50);
    }
};
// 2. INICIALIZAÇÃO ÚNICA (Executa quando a página abre)
window.onload = function() {
    carregarBiblioteca(); 
    console.log("✅ Sistema Mwangolé carregado com sucesso!");
};
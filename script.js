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
        titulo: "Língua Portuguesa", 
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
    { 
        id: "", 
        classe: "", 
        titulo: "", 
        img: "img/.jpg", 
        link: "https://drive.google.com/uc?export=download&id=",
        missao: "",
        autor: "",
    },
    { 
        id: "", 
        classe: "", 
        titulo: "", 
        img: "img/.jpg", 
        link: "https://drive.google.com/uc?export=download&id=",
        missao: "",
        autor: "",
    },
    // Podes adicionar mais 100 livros aqui apenas copiando este bloco { ... },
];
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
    if (localStorage.getItem('clique_' + livro.id)) {
        atualizarBotaoParaVerde(livro.id);
    }
});;

// Seleciona a barra de pesquisa
const barraPesquisa = document.getElementById('inputPesquisa');

barraPesquisa.addEventListener('input', function() {
    const termoBusca = barraPesquisa.value.toLowerCase().trim();
    const livros = document.querySelectorAll('.livro-card');

    livros.forEach(livro => {
        // Puxamos todas as informações das etiquetas que criaste
        const titulo = livro.getAttribute('data-titulo').toLowerCase();
        const classe = livro.getAttribute('data-classe').toLowerCase();
        const autor  = livro.getAttribute('data-autor').toLowerCase();
        
        // Juntamos tudo para o filtro procurar em qualquer uma delas
        const informacaoCompleta = `${titulo} ${classe} ${autor}`;

        if (informacaoCompleta.includes(termoBusca)) {
            livro.style.display = "flex"; // Mostra o livro
        } else {
            livro.style.display = "none";  // Esconde o livro
        }
    });
});
document.getElementById('total-livros').innerText = biblioteca.length;
}
// Inicia a função assim que o site carrega
window.onload = carregarBiblioteca;

//botao para Baixar
function baixarEReencaminhar(urlLivro, idLivro) {
    // 1. Verificar se o utilizador já clicou na publicidade nos últimos 10 minutos
    const jaClicou = localStorage.getItem('clique_' + idLivro);

    if (!jaClicou) {
        // --- PRIMEIRO CLIQUE (Abrir Publicidade) ---
        const publicidade = "https://rzekl.com/c/1e8d1144946b7f02e05e16525dc3e8/?ulp=https%3A%2F%2Fa.aliexpress.com%2F_EHQU8ay";
        window.open(publicidade, '_blank');

        // Guarda na memória que ele já clicou (timestamp para expirar depois)
        localStorage.setItem('clique_' + idLivro, Date.now());

        // Atualiza o botão visualmente agora (caso não reinicie)
        atualizarBotaoParaVerde(idLivro);
        
        // Se a página reiniciar quando ele voltar, a função 'carregarBiblioteca' 
        // precisará de um pequeno ajuste que faremos a seguir.
    } else {
        // --- SEGUNDO CLIQUE (Download Direto) ---
        window.location.href = urlLivro;

        // Opcional: Limpar a memória após o download para ele poder baixar de novo outro dia
        localStorage.removeItem('clique_' + idLivro);
    }
}

// Função auxiliar para mudar a cor do botão
function atualizarBotaoParaVerde(idLivro) {
    const card = document.querySelector(`[data-id="${idLivro}"]`);
    if (card) {
        const botao = card.querySelector('.btn-baixar');
        botao.innerHTML = "✅ Confirmar Download";
        botao.style.backgroundColor = "#28a745";
        botao.style.color = "white";
    }
}
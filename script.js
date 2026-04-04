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
        id: "lp-01", //deve ser formado em pela combinacao da abreviacao do titulo, nome do autor e classe; as classe universitaria sao colocadas sem o zero para diferenciar do ensino primário
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
        link: "https://drive.google.com/uc?export=download&id=1F7H1yQoY5g8o-Snkb9tMVXoqz7qBYspK/view?usp",
        missao: "Explorador de Letras",
        autor: "Moderna editora",
    },
    { 
        id: "edmusical-01", 
        classe: "1ª Classe", 
        titulo: "Educação Musical", 
        img: "img/edmusical1classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1eLWl9_oJV9Fiy8j-qSK3ArPxaIBGnKqb/view?usp",
        missao: "Explorador de Letras",
        autor: "Moderna editora",
    },
    { 
        id: "edmeio-01", 
        classe: "1ª Classe", 
        titulo: "Língua Portuguesa", 
        img: "img/edmeio1classe.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1-B3XFabzjMVD2zMexZTGyNBteGdGRq_6/view?usp",
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
        missao: "Explorador de Desenho",
        autor: "Leonardo Ch. Ribeiro",
    },
    { 
        id: "dt2lchr-1", 
        classe: "1º ano faculdade uan DMG", 
        titulo: "Desenho Técnico 2", 
        img: "img/dt2lchr.jpg", 
        link: "https://drive.google.com/uc?export=download&id=1cnCegN_QQb9Pu5QR3xX1WcE1cgVsfG5S",
        missao: "Explorador de Desenho",
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
                <small>Classe: ${livro.classe}</small>
            </div>
            <a href="${livro.link}" class="btn-baixar">Baixar PDF</a>
        </div>
    `).join('');

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
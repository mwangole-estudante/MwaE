let pontos = 0;

function adicionarPonto() {
    pontos++;
    document.getElementById('pontos').innerText = pontos;
}
function mostrarSecao(idDaSecao) {
    // 1. Seleciona todas as sections do site
    let secoes = document.querySelectorAll('section');

    // 2. Esconde todas elas uma por uma
    secoes.forEach(s => {
        s.style.display = 'none';
    });

    // 3. Mostra apenas aquela que tem o ID que clicámos
    document.getElementById(idDaSecao).style.display = 'block';
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

// Seleciona a barra de pesquisa e todos os livros da biblioteca
const barraPesquisa = document.getElementById('inputPesquisa');
const livros = document.querySelectorAll('.livro-card');

// Ouve o que o usuário digita
barraPesquisa.addEventListener('input', function() {
    const termoBusca = barraPesquisa.value.toLowerCase(); // O que foi digitado (em minúsculas)

    livros.forEach(livro => {
        // Pega o conteúdo do data-class que adicionamos no HTML
        const infoLivro = livro.getAttribute('data-class').toLowerCase();
        
        // Se o termo pesquisado estiver dentro da info do livro, ele aparece
        if (infoLivro.includes(termoBusca)) {
            livro.style.display = "block"; // Mostra o livro
        } else {
            livro.style.display = "none";  // Esconde o livro
        }
    });
});
// Faz com que o Enter feche o teclado no telemóvel
barraPesquisa.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        barraPesquisa.blur(); // Tira o foco da barra e esconde o teclado
    }
});
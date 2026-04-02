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
            livro.style.display = "block"; // Mostra o livro
        } else {
            livro.style.display = "none";  // Esconde o livro
        }
    });
});
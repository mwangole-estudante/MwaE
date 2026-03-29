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
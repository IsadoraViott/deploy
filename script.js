async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = {
        nome,
        email,
        senha
    }

    console.log(data);
    try {
        const response = await fetch('http://localhost:3001/usuarios/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const results = await response.json();

        if (results.success) {
            console.log(results)
            alert(results.message)
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function logar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_login').value;
    const senha = document.getElementById('senha_login').value;

    const data = { nome, senha };
    console.log(data);

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let results = await response.json();

        if (results.success) {
            let usuarioData = results;

            localStorage.setItem('informacoes', JSON.stringify(usuarioData));

            let html = document.getElementById('informacoes');
            let dados = JSON.parse(localStorage.getItem('informacoes'));
            console.log(dados);

            html.innerHTML = `<div style="display: block; flex-direction: column; align-items:end">
            id: ${dados.data.id}, nome: ${dados.data.nome}, email: ${dados.data.email}
            </div>`;
            html.style.display = "block";

        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar ao servidor.");
    }
}

// verificar se o usuário está logado ao carregar a página
window.addEventListener("load", () => {

    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes');
        let dados = JSON.parse(localStorage.getItem('informacoes'));


        html.innerHTML = `<div style="display: block; flex-direction: column; align-items:end">
            id: ${dados.data.id}, nome: ${dados.data.nome}, email: ${dados.data.email}
            </div>`;
            html.style.display = "block";
    }
})

// função de logout (descomentada para uso)

function sairdaconta(event) {
    console.log(informacoes)
    localStorage.removeItem('informacoes');
    window.location.href = "index.html";
};
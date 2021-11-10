function cadastrar() {
    let users = JSON.parse(localStorage.getItem("users"));
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;
    let permissao = document.getElementById("role").value;

    let userId = users.length;

    let user = {
        id: userId,
        nome: nome, 
        senha: senha,
        role: permissao
    };

    users.forEach(auxUser => {
        if (auxUser.nome == user.nome) {
            alert("Usuário ja cadastrado.");
            return;
        }
    });

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")))
}

function logar() {
    let users = JSON.parse(localStorage.getItem("users"));
    let nome = document.getElementById("nome").value;
    let senha = document.getElementById("senha").value;

    let user = {
        nome: nome, 
        senha: senha
    };

    users.forEach(auxUser => {
        if (auxUser.nome == user.nome && auxUser.senha == user.senha) {
            sessionStorage.setItem("loggedUser", JSON.stringify(auxUser));
            console.log("Login bem sucedido");
            window.location.replace("./home.html");
            return;
        }
    });

    alert("Nome ou senha inválidos.");
}
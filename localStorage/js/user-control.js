function cadastrar() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let permissao = document.getElementById("role").value;

    let user = {
        email: email, 
        senha: senha,
        role: permissao
    };

    for (auxUser in users) {
        if (auxUser.email == user.email) {
            console.log("Usuário ja cadastrado.")
            return;
        }
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")))
}

function logar() {
    let users = JSON.parse(localStorage.getItem("users"));
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    let user = {
        email: email, 
        senha: senha
    };

    for (auxUser in users) {
        if (auxUser.email == user.email && auxUser.senha == user.senha) {
            localStorage.setItem("loggedUser", JSON.stringify(auxUser));
            console.log("Login bem sucedido");
            window.location.replace("./home.html");
            return;
        }
    }
    console.log("Email ou senha inválidos.");

}
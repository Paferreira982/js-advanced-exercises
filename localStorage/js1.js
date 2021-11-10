let users = JSON.parse(localStorage.getItem("users"));

function cadastrar() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let permissao = document.getElementById("role").value;

    let user = {
        email: email, 
        senha: senha,
        role: permissao
    };

    if (users == null) {
        users = [];
    } else {
        for (auxUser in users) {
            if (auxUser.email == user.email) {
                console.log("Usuário ja cadastrado.")
                return;
            }
        }
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")))
}

function logar() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    
    let user = {
        email: email, 
        senha: senha
    };

    if (users == null) {
        console.log("Não há nenhum usuário cadastrado.");
    } else {
        for (auxUser in users) {
            if (auxUser.email == user.email && auxUser.senha == user.senha) {
                localStorage.setItem("loggedUser", JSON.stringify(auxUser));
                console.log("Login bem sucedido");
                return;
            }
        }
        console.log("Email ou senha inválidos.")
    }
}
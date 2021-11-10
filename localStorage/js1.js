let users = JSON.parse(localStorage.getItem("users"));

let email = document.getElementById("email").value;
let senha = document.getElementById("senha").value;

function cadastrar() {
    let user = {
        email: email, 
        senha: senha
    };

    if (users == null) {
        users = [];
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
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
    let user = {
        email: email, 
        senha: senha
    };

    if (users == null) {
        console.log("Não há nenhum usuário cadastrado.");
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user.email) {
                if (users[i].senha == user.senha) {
                    console.log("Login bem sucedido");
                    return;
                }
            }
        }
        console.log("Email ou senha inválidos.")
    }
}
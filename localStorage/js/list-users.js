$(document).ready(() => {
    let users = JSON.parse(localStorage.getItem("users"));

    let text = "";
    users.forEach(auxUser => {
        text += "<br>Nome: " + auxUser.nome + " // Senha: " + auxUser.senha + " // Role: " + auxUser.role;
    });

     $("#all-users").append(text);
});
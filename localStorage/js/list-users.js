let users = JSON.parse(localStorage.getItem("users"));
let allUsers = document.getElementById("all-users");
let text = "";

if (users == null) {
    allUsers.innerHTML = "Nenhum usuário cadastrado";
} else {
    for (auxUser in users) {
        text += "<br> Email: " + auxUser.email + " // Senha: " + auxUser.senha + " // Role: " + auxUser.role;
    }

    allUsers.innerHTML = text;
}
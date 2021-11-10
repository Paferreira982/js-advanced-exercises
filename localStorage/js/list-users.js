let users = JSON.parse(localStorage.getItem("users"));
let allUsers = document.getElementById("all-users");
let text = "";

users.forEach(auxUser => {
    text += "<br> Id: " + auxUser.id + "// Email: " + auxUser.email + " // Senha: " + auxUser.senha + " // Role: " + auxUser.role;
});

allUsers.innerHTML = text;
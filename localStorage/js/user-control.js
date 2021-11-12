$("#btn-cadastrar").click(() => {
    let users = JSON.parse(localStorage.getItem("users"));

    let user = {
        nome: $("#nome").value, 
        senha: $("#senha").value,
        role: $("#role").value
    };

    users.forEach(auxUser => {
        if (auxUser.nome == user.nome) {
            alert("Usuário ja cadastrado.");
            return;
        }
    });

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")));
});

$("#btn-logar").click(() => {
    let users = JSON.parse(localStorage.getItem("users"));

    let user = {
        nome: $("#nome").value, 
        senha: $("#senha").value
    };

    let loguei = false;
    users.forEach(auxUser => {
        if (auxUser.nome == user.nome && auxUser.senha == user.senha) {
            sessionStorage.setItem("loggedUser", JSON.stringify(auxUser));
            window.location.replace("./home.html");
            loguei = true;
        }
    });

    if (!loguei) alert("Nome ou senha inválidos.");
});
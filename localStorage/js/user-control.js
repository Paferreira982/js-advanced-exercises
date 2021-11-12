$("#btn-cadastrar").click(() => {
    let users = JSON.parse(localStorage.getItem("users"));

    let nome = $("#nome").val();
    let senha = $("#senha").val();
    let role = $("#role").val();

    let user = {
        nome: nome, 
        senha: senha,
        role: role
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

    let nome = $("#nome").val();
    let senha = $("#senha").val();

    let user = {
        nome: nome, 
        senha: senha
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
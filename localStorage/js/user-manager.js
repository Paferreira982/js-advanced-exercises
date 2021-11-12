$("#btn-buscar").click(() => {
    $("#form-container").css("display","none");
    let user = locateByName($("#searcher").val());

    if (user) {
        sessionStorage.setItem("searchedUser", JSON.stringify(user));
        $("#form-container").css("display","inline-block");

        $("#nome").val(user.nome);
        $("#senha").val(user.senha);
        $("#role").val(user.role);
    } else {
        clearSearchedUserFromSession();
        alert("Usuário não encontrado.");
    }
});

$("#btn-editar").click(() => {
    let searchedUser = JSON.parse(sessionStorage.getItem("searchedUser"));

    let users = removeUserFromList(searchedUser);
    let nome = $("#nome").val();
    let senha = $("#senha").val();
    let role = $("#role").val();

    let user = {
        nome: nome,
        senha: senha,
        role: role
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem("users")));
});

$("#btn-excluir").click(() => {
    let user = JSON.parse(sessionStorage.getItem('searchedUser'));
    let users = JSON.parse(localStorage.getItem("users"));

    for (let i = 0; i < users.length; i++) {
        if (users[i].nome == user.nome) {
            users.splice(i,1);
            localStorage.setItem("users", JSON.stringify(users));
            $("#form-container").css("display","none");
            clearSearchedUserFromSession();
            break;
        }
    }
});

function removeUserFromList(user) {
    let users = JSON.parse(localStorage.getItem("users"));

    for (let i = 0; i < users.length; i++) {
        if (users[i].nome == user.nome) {
            users.splice(i,1);
            localStorage.setItem("users", JSON.stringify(users));
            break;
        }
    }

    return users;
}

function locateByName(nameSearched) {
    let users = JSON.parse(localStorage.getItem("users"));
    let user;
    users.forEach(auxUser => {
        if (auxUser.nome == nameSearched) {
            user = auxUser;
            return;
        }
    });
    return user;
}

function clearSearchedUserFromSession() {
    sessionStorage.removeItem("searchedUser");
}
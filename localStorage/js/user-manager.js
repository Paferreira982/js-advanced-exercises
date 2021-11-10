function buscar() {
    document.getElementById("form-container").style.display = "none";

    let nameSearched = document.getElementById("searcher").value;
    let user = locateByName(nameSearched);

    if (user) {
        sessionStorage.setItem("searchedUser", JSON.stringify(user));
        document.getElementById("form-container").style.display = "inline-block";

        document.getElementById("nome").value = user.nome;
        document.getElementById("senha").value = user.senha;
        document.getElementById("role").value = user.role;

    } else {
        clearSearchedUserFromSession();
        alert("Usuário não encontrado.");
    }
}

function editar() {
    let searchedUser = JSON.parse(sessionStorage.getItem("searchedUser"));
    excluir(searchedUser);
}

function excluir(user) {
    let users = JSON.parse(localStorage.getItem("users"));

    for (let i = 0; i < users.length; i++) {
        if (users[i].nome == user.nome) {
            users.splice(i,1);
            localStorage.setItem("users", JSON.stringify(users));
            document.getElementById("form-container").style.display = "none";
            clearSearchedUserFromSession();
            console.log("Usuário Removido");
            return;
        }
    }
    console.log("Usuário não removido");
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
function buscar() {
    clearUserSearchedFromSession();
    document.getElementById("form-container").style.display = "none";

    let nameSearched = document.getElementById("searcher").value;
    let user = locateByName(nameSearched);

    if (user) {
        sessionStorage.setItem("searchedUser", JSON.stringify(user));
        document.getElementById("form-container").style.display = "inline-block";

        document.getElementById("nome").value = user.nome;
        document.getElementById("senha").value = user.senha;
        document.getElementById("role").value = user.role;

    } else
        alert("Usuário não encontrado.");

}

function editar() {
    let user
}

function excluir() {
    
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

function clearUserSearchedFromSession() {
    sessionStorage.removeItem("searchedUser");
}
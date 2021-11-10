window.onload = function() {
    let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (loggedUser == null) {
        console.log("Nenhum Usuário logado, redirecionado para a tela de login.");
        window.location.replace("./index.html");
    } else {
        if (loggedUser.role == "admin") {
            let adminAreas = document.getElementsByClassName("role-admin");

            for (let i = 0; i < adminAreas.length; i++)
                adminAreas[i].style.display = "inline-block";
        }
    }
};
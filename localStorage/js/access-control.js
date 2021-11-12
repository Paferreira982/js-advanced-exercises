$(document).ready(() => {
    let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

    if (loggedUser == null)
        window.location.replace("./index.html");
    else {
        if (loggedUser.role == "admin") {
            $(".role-admin").each(function(){
                $(this).css("display","inline-block");
            });
        }
    }
});
window.onload = function() {
    sessionStorage.clear();
    if (JSON.parse(localStorage.getItem("users")) == null) {
        let users = [];
        let defaultUser =  {
            id: 0,
            nome: "root", 
            senha: "root",
            role: "admin"
        };

        users.push(defaultUser);
        localStorage.setItem("users", JSON.stringify(users));
    }
};
$(document).ready(function () {

    $('.message a').click(function () {
        toggleMenu();
    });

    $("#btn_login").click(function () {
        login($("#l_username"), $("#l_password"));
    });

    $("#btn_register").click(function () {
        register($("#r_username"), $("#r_email"), $("#r_password"));
    });

    const token = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
        $.ajax({
            type: "get",
            headers: {
                "Authorization": token,
            },
            cache: false,
            url: "http://localhost:3000/login",
            error: function (xhr, status, error) {
            },
            success: function (data) {
                window.location.replace("http://localhost:4000/home");
            }
        });
    }

});

function toggleMenu() {
    $('form').animate({
        height: "toggle",
        opacity: "toggle"
    }, "slow");
}

function login(username, password) {
    if (username.val() == "") {
        alert("Informe o usuário!");
        username.focus();
        return;
    } else if (password.val() == "") {
        alert("Informe a senha!");
        password.focus();
        return;
    } else {

        $("#resultado").html("Autenticando...");

        $.ajax({
            type: "post",
            data: {
                username: username.val(),
                password: password.val()
            },
            cache: false,
            url: "http://localhost:3000/login",
            dataType: "json",
            error: function (xhr, status, error) {
                $("#resultado").html("<font color=\"red\">Dados incorretos!</font>");
            },
            success: function (data) {
                localStorage.setItem("token", "JWT "+ data.token);
                localStorage.setItem("username", username.val());
                $("#resultado").html("Dados confirmados com sucesso.");
                window.location.replace("http://localhost:4000/home");
            }
        });
    }
}

function register(username, email, password) {
    if (username.val() == "") {
        alert("Informe o usuário!");
        username.focus();
        return;
    } else if (email.val() == "") {
        alert("Informe o e-mail!");
        email.focus();
        return;
    } else if (password.val() == "") {
        alert("Informe a senha!");
        password.focus();
        return;
    } else {

        $("#resultado").html("Enviando dados...");

        $.ajax({
            type: "post",
            data: {
                username: username.val(),
                email: email.val(),
                password: password.val()
            },
            cache: false,
            url: "http://localhost:3000/users",
            dataType: "json",
            error: function (xhr, status, error) {
                $("#resultado").html("<font color=\"red\">Já existe um usuário com esse usuário ou e-mail!</font>");
            },
            success: function () {
                $("#resultado").html("Cadastrado com sucesso.");
                toggleMenu();
            }
        });
    }
}
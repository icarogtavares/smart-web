$(document).ready(function () {

    $("#logout").click(function () {
        logout();
    });

    $("#welcome").html("Olá, " + localStorage.getItem("username"));

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
                window.location.replace("http://localhost:4000/");
            },
            success: function (data) {

            }
        });
    } else {
        window.location.replace("http://localhost:4000/");
    }

});

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
}
$(document).ready(function () {


    //----------------------------    LOGIN    ---------------------------------------------------------

    $("#formLogin").on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();

        $.ajax({
            method: "POST",
            url: "http://localhost/pariApi/web/app_dev.php/api/login_check",
            data: {username: data[0].value, password: data[1].value},
            success: function (data) {
                token=data.token;
                genereView('home.html.js');
            },
            error: function (request, status, error) {
                if (request.status == 401) {
                    displayFlashBag({message: "Mauvais couple d'identifiants"})
                } else if (request.status >= 500 && request.status < 600) {
                    displayFlashBag({message: "Erreur du serveur, veuillez réessayer plus tard"})
                }
            }
        })
    })

    //----------------------------    REGISTER    ---------------------------------------------------------

    $("#formRegister").on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serializeArray();

        $.ajax({
            method: "POST",
            url: "http://localhost/pariApi/web/app_dev.php/api/login_check",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", authorizationToken);
            },
            data: {username: data[0].value, password: data[1].value},
            success: function (data) {
                genereView('home.html.js');
            },
            error: function (request, status, error) {
                if (request.status == 401) {
                    displayFlashBag({message: "Mauvais couple d'identifiants"})
                } else if (request.status >= 500 && request.status < 600) {
                    displayFlashBag({message: "Erreur du serveur, veuillez réessayer plus tard"})
                }
            }
        })
    })


    //----------------------------    FUNCTIONS    ---------------------------------------------------------
    function displayFlashBag(array) {
        alert(array.message);
    }


})
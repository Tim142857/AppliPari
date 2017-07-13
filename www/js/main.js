//----------------------------    NAVBAR    ---------------------------------------------------------

$('.navbar a').on('click', function (e) {
    e.preventDefault();
    var template = $(this).attr('data-target');
    var callback = $(this).attr('data-callback');
    genereView(template, callback);
    $('.navbar-toggle').click();
})

//----------------------------    LOGIN    ---------------------------------------------------------

$("#formLogin").on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();

    $.ajax({
        method: "POST",
        url: "http://localhost/pariApi/web/app_dev.php/api/login_check",
        data: {username: data[0].value, password: data[1].value},
        dataType: "text",
        success: function (data) {
            data = JSON.parse(data);
            authorizationToken = data.token;
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

$(".main-container").on('submit', '#formRegister', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();

    if (data[2].value != data[3].value) {
        displayFlashBag({message: "Les mots de passe ne correspondent pas"});
    } else {
        $.ajax({
            method: "POST",
            url: "http://localhost/pariApi/web/app_dev.php/api/user",
            data: {username: data[0].value, email: data[1].value, plainPassword: data[2].value},
            dataType: "text",
            success: function (data) {
                console.log('success');
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
    }
})


//----------------------------    FUNCTIONS    ---------------------------------------------------------

var getParisDispos = function () {
    alert('test');
}
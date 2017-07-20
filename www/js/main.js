//----------------------------    NAVBAR    ---------------------------------------------------------

$('.navbar a').on('click', function (e) {
    e.preventDefault();
    var template = $(this).attr('data-target');
    var callback = $(this).attr('data-callback');
    genereView(template, callback);
    $('.navbar-toggle').click();
})

//----------------------------    LOGIN    ---------------------------------------------------------

var saveToken = function (data) {
    // console.log(data);
    params.authorizationToken = data;
}

$("#formLogin").on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
        method: "POST",
        url: params.baseUrl + "api/login_check",
        data: {username: data[0].value, password: data[1].value},
        dataType: "text",
        success: function (data) {
            data = JSON.parse(data);
            saveToken(data.token);
            $('.navbar-default').removeClass('hidden');
            genereView('home.html.js');
        },
        error: function (request, status, error) {
            var err = JSON.parse(request.responseText).message;
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
        var data = {username: data[0].value, email: data[1].value, plainPassword: data[2].value};

        var successFunction = function (data) {
            displayFlashBag({message: "Inscription réussie, vous pouvez vous connecter"});
            genereView('login.html.js');
        };
        var errorFunction = function (data) {
        };
        sendAjaxRequest("POST", params.baseUrl + "api/user", data, successFunction);
    }
})

//----------------------------    PARIS DISPOS    ---------------------------------------------------------

$('.main-container').on('click', '.btn-equipe', function (e) {
    e.preventDefault();
    //S'il ya deja un autre choisi, je le deselectionne
    $(this).closest('.pari-dispo-detail').find('.choosen-team').not(this).removeClass('choosen-team');

    var miseInput = $(this).closest('.pari-dispo-detail').find('.input-mise');
    var mise = $(miseInput).val();
    var deltaMise;

    //Ajout graphique de la selection et mise a jour valeur par defaut des mises(0,1)
    if ($(this).hasClass('choosen-team')) {
        $(this).removeClass('choosen-team');
        deltaMise = -1 * mise;
        $(miseInput).val(0);
    } else {
        $(this).addClass('choosen-team');
        $(miseInput).val(1);
        deltaMise = 1;
    }

    //Mise a jour du total
    updateTotal();
})

$('.main-container').on('change', '.input-mise', function () {
    //check si ya bien une equipe selectionnee sinon pas de mise
    var myBool = $(this).closest('.pari-dispo-detail').find('.choosen-team').length == 1;
    if (!myBool) {
        displayFlashBag({message: "Veuillez d'abord sélectionner une équipe"});
        $(this).val(0);
    } else {
        //Si mise==0, deselection de l'equipe choisie
        if ($(this).val() == 0) {
            $(this).closest('.pari-dispo-detail').find('.choosen-team').removeClass('choosen-team');
        }
        updateTotal();
    }
});

$('.main-container').on('click', '#valider-mises', function (e) {
    e.preventDefault();

    var textValidation = "";

    $('.pari-dispo-detail').each(function (index, elm) {
        if ($(elm).find('.choosen-team').length == 1) {
            var equipe = $(this).find('.choosen-team').closest('.team').find('.team-name').text();
            var mise = $(this).find('.input-mise').val();
            textValidation += "Mise de " + mise + " sur " + equipe + "\n";
        }
    })
    displayFlashBag({message: textValidation});
});

$('.main-container').on('click', '.sport-nom', function (e) {
    e.preventDefault();

    if ($(this).nextUntil('.sport-nom, .total').hasClass('hidden')) {
        $(this).nextUntil('.sport-nom, .total').removeClass('hidden');
    } else {
        $(this).nextUntil('.sport-nom, .total').addClass('hidden');
    }
});


function updateTotal() {
    var totalMises = 0;
    $(".input-mise:not(#total-mises)").each(function (index, elm) {
        var mise = parseInt($(elm).val());
        totalMises += mise;
        if (index == $(".input-mise:not(#total-mises)").length - 1) {
            $('#total-mises').val(totalMises);
        }
    })
}


//----------------------------    FUNCTIONS    ---------------------------------------------------------


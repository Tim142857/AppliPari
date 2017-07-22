var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//----------------------------    PARAMETERS    ---------------------------------------------------------

var views = [];
var params = [];
params.authorizationToken = "";
params.baseUrl = "http://localhost/symfonyapi/web/app_dev.php/";

//----------------------------    FUNCTIONS    ---------------------------------------------------------


function genereView(template, callback) {
    $(".main-container").html(views[template]);

    if (typeof callback === 'string' && typeof window[callback] == 'function') {
        window[callback]();
    }
}


function displayFlashBag(array) {
    alert(array.message);
}

function sendAjaxRequest(method, url, data, successFunction, errorFunction) {
    $.ajax({
        method: method,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Bearer " + params.authorizationToken);
            $("div#divLoading").addClass('show');
        },
        url: url,
        data: data,
        dataType: "text",
        success: function (data) {
            $("div#divLoading").removeClass('show');
            successFunction(data);
        },
        error: function (request, status, error) {
            $("div#divLoading").removeClass('show');
            if (request.readyState == 0) {
                displayFlashBag({message: "Il semblerait que vous avez un problème de réseau"})
            }
            else if (request.status == 401) {
                var err = JSON.parse(request.responseText).message;
                if (err == "Expired JWT Token" && err == "Invalid JWT Token") {
                    displayFlashBag({message: "Vous avez été deconnecté, vous allez être redirigé vers la page de connexion"});
                    logout();
                }
                else if (err == "Expired JWT Token") {

                }
                displayFlashBag({message: "Mauvais couple d'identifiants"})
            } else if (request.status >= 500 && request.status < 600) {
                displayFlashBag({message: "Erreur du serveur, veuillez réessayer plus tard"})
            }
            else {
                var err = JSON.parse(request.responseText);
                if (err != "" && err != "") {//A a méliorer cf undefined
                    displayFlashBag({message: convertErrorsToString(err)})
                } else {
                    displayFlashBag({message: "Une erreur est survenue, veuillez réessayer plus tard"})
                }
            }
        }
    })
}

function logout() {
    genereView('login.html.js');
    $('.navbar-default').addClass('hidden');
    params.authorizationToken = "";
}

function convertErrorsToString(errors) {
    var string = "";
    for (var key in errors) {
        string += key + ':' + "\n";
        errors[key].forEach(function (elm, index) {
            string += "\t" + elm + "\n";
        })
    }
    return string;
}
genereModal('title test', 'body!', {
    valid: {text: 'Valider', functionName: 'functionValid'},
    cancel: {text: "Annuler", functionName: 'functionCancel'}
});
function functionValid() {
    alert('modal valid!');
}

function functionCancel() {
    alert('modal canceled!');
}

$('#myModal').modal('show');

// options
//array= { valid:{text, functionName} , cancel:{text, functionName} }
function genereModal(title, body, options) {
    $('.modal-title').text(title);
    $('.modal-body').text(body);
    if (typeof options == "object") {
        var html = "";
        if ("valid" in options) {
            if ("text" in options.valid && "functionName" in options.valid) {
                html += "<button type='button' class='btn btn-primary btn-choice-modal' id='valid-modal' onclick='" + options.valid.functionName + "()" + "'>" + options.valid.text + "</button>";
            }
        }
        if ("cancel" in options) {
            if ("text" in options.cancel && "functionName" in options.cancel) {
                html += "<button type='button' class='btn btn-primary btn-choice-modal' id='cancel-modal' onclick='" + options.cancel.functionName + "()" + "'>" + options.cancel.text + "</button>";
            }
        }
        $('.modal-footer').append(html);
    }
}

$('body').on('click', '.btn-choice-modal', function () {
    $('#myModal').modal('hide');
});


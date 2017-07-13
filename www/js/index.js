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
var authorizationToken = "";

//----------------------------    FUNCTIONS    ---------------------------------------------------------


function genereView(template, callback) {
    $(".main-container").html(views[template]);

    //Le callback est interprété comem une string et non comme une function
    //trouve la funciton
    if (true) {
        console.log(typeof(callback));
        console.log(callback);
        callback();
    }
}
function displayFlashBag(array) {
    alert(array.message);
}


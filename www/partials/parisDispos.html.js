views['parisDispos.html.js'] = `
<h2>Paris dispos</h2>
<table class="table">
</table>
`;


var getParisDispos = function () {
    var data = {};

    var successFunction = function (data) {
        data = JSON.parse(data);

        //Tri par sport
        data.sort(function (a, b) {
            return a.sport.id - b.sport.id;
        });

        var counter = 0;
        data.forEach(function (elm, index) {
            if (index == 0 || elm.sport.id != data[index - 1].sport.id) {
                $('.main-container').append("<h3 class='sport-nom'>" + elm.sport.nom + "</h3>");
            }
            $('.main-container').append(getPariDispoDetailHtml(elm));
            counter++;
            if (counter == data.length) {
                var html = "<div class='row total'>";
                html += "<div class='col-xs-9'>";
                html += "Total";
                html += "</div>";
                html += "<div class='col-xs-3'>";
                html += "<input type='number' class='form-control input-mise' value='0' id='total-mises' disabled>";
                html += "</div>";
                html += "</div>";
                html += "<div class='row'>";
                html += "<div class='col-xs-12'>";
                html += "<div><button type='submit' class='btn btn-default pull-right' id='valider-mises'>Valider mises</button></div>";
                html += "</div>";
                html += "</div>"
                $('.main-container').append(html);
            }
        })
    };

    var errorFunction = function (data) {
        console.log('error');
    }
    sendAjaxRequest("GET", params.baseUrl + "api/parisDispos", data, successFunction, errorFunction);
}

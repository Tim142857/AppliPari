var getPariDispoDetailHtml = function (pariDispo) {
    var html = "<div class='row pari-dispo-detail' data-id-pari='" + pariDispo.id + "'>";
    html += "<div class='col-xs-3 team'>";
    html += "<div class='team-name'>" + pariDispo.equipe1 + "</div>";
    html += "<div><button type='submit' class='btn btn-default btn-equipe'>" + pariDispo.cote1 + "</button></div>";
    html += "</div>";

    if (typeof pariDispo.cote_nul != "undefined") {

        html += "<div class='col-xs-3 team'>";
        html += "<div class='team-name'>" + "Nul" + "</div>";
        html += "<div><button type='submit' class='btn btn-default btn-equipe'>" + pariDispo.cote_nul + "</button></div>";
        html += "</div>";
    } else {
        html += "<div class='col-xs-3'></div>";
    }

    html += "<div class='col-xs-3 team'>";
    html += "<div class='team-name'>" + pariDispo.equipe2 + "</div>";
    html += "<div><button type='submit' class='btn btn-default btn-equipe'>" + pariDispo.cote2 + "</button></div>";
    html += "</div>";

    html += "<div class='col-xs-3'>";
    html += "<div class='form-group'>";
    html += "<input type='number' class='form-control input-mise' value='0' min='0'>";
    html += "</div>";
    html += "</div>";

    html += "</div>";


    return html;
}

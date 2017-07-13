views['parisDispos.html.js'] = function () {
    var html2 = "";
    $.ajax({
        method: "GET",
        url: "http://localhost/pariApi/web/app_dev.php/api/parisDispos",
        dataType: "text",
        headers: {
            "Authorization": "Bearer " + authorizationToken
        },
        success: function (data) {
            data = JSON.parse(data);
            html2 = data[0].sport.nom;
            console.log(html2);
            // html2 += `
            // <table class='table'>
            // <tr><td>Equipe 1</td><td></td></tr>
            // </table>
            // `;

            var html = ` <div class="row">
                        <div class="col-xs-12">
                        <h2>Paris dispos</h2>`;
            html += html2;
            html += `</div>
                        </div>
                            `;
            console.log(html);
            return html;
        },
        error: function (request, status, error) {
            if (request.status == 401) {
                displayFlashBag({message: "Mauvais couple d'identifiants"})
            } else if (request.status >= 500 && request.status < 600) {
                displayFlashBag({message: "Erreur du serveur, veuillez réessayer plus tard"})
            }
        }
    })

};

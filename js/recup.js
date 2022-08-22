window.onload = function () {

    //function getAllUrlParams() {
    function getUrlParameter(parameter) {
        parameter = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?|&]' + parameter.toLowerCase() + '=([^&#]*)');
        var results = regex.exec('?' + document.location.href.toLowerCase().split('?')[1]);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    let demande = document.getElementById("demande");
    let nom = document.getElementById("nom");
    let prenom = document.getElementById("prenom");
    let courriel = document.getElementById("mail");
    let message = document.getElementById("message");
    let photo = document.getElementById("photo");

    demande.innerText = "votre demande concerne : " + getUrlParameter("demande");
    nom.innerText = "votre nom : " + getUrlParameter("nom");
    prenom.innerText = "votre prénom : " + getUrlParameter("prenom");
    courriel.innerText = "votre mail : " + getUrlParameter("mail");
    message.innerText = "votre message : " + getUrlParameter("message");
    photo.innerText = "La photo choisie : " + getUrlParameter("photo");

}
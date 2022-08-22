
/*Déclaration des class*/
class Client {
    #nom;
    #prenom;
    #email;
    #photo;

    constructor(nom, prenom, email, photo) {
        this.setNom(nom);
        this.setPrenom(prenom);
        this.setEmail(email);
        this.setPhoto(photo);
    }

    getNom() {
        return this.#nom;
    }
    getPrenom() {
        return this.#prenom;
    }
    getEmail() {
        return this.#email;
    }
    getPhoto() {
        return this.#photo;
    }

    setNom(nom) {
        this.#nom = nom;
    }
    setPrenom(prenom) {
        this.#prenom = prenom;
    }
    setEmail(email) {
        this.#email = email;
    }
    setPhoto(photo) {
        this.#photo = photo;
    }
}

class Message {
    #type;
    #message;
    #client;

    constructor(type, message, client) {
        this.setType(type);
        this.setMessage(message);
        this.setClient(client);
    }

    getType() {
        return this.#type;
    }

    getMessage() {
        return this.#message;
    }

    getClient() {
        return this.#client;
    }

    setType(type) {
        this.#type = type;
    }

    setMessage(message) {
        this.#message = message;
    }

    setClient(client) {
        this.#client = client;

    }
}

class Photo {
    #libelle
    #source

    constructor(libelle, source) {
        this.setLibelle(libelle);
        this.setSource(source);
    }

    getLibelle() {
        return this.#libelle;
    }

    getSource() {
        return this.#source;
    }

    setLibelle(libelle) {
        this.#libelle = libelle;
    }

    setSource(source) {
        if (source == (SOURCES_PHOTO + "Choisir photo.jpg")) {
            this.#source = SOURCES_PHOTO + "neutre.jpg";
        } else {
            this.#source = source;
        }
    }
}

/*Déclaration des CONSTANTE*/
const TAB_TYPE_DEMANDE = ["Votre demande concerne",
    "Information articles",
    "Commande & paiement",
    "Expédition & livraison",
    "Retour, échange & remboursement",
    "Code promo & Bon d'achat",
    "Newsletters",
    "Problème technique",
    "Autres demandes",
    "Protection des données personnelles"];

const TAB_CHOIX_PHOTO = ["Choisir photo", "alain",
    "albert", "alfred", "alphonse",
    "alphonsine", "berth", "elisabeth",
    "gertrude", "gilbert", "gilberte",
    "hugh", "jacques", "john"];

const SOURCES_PHOTO = "./photos/";
const NB_MIN_CARACT = 3;

/*Déclaration des variables GLOBAL*/
/*Champ du formulaire*/
let eltTypeDemande = document.getElementById("selectType");
let eltMessage = document.getElementById("message");
let eltPrenom = document.getElementById("prenom");
let eltNom = document.getElementById("nom");
let eltCourriel = document.getElementById("courriel");
let eltChoisirPhoto = document.getElementById("selectPhoto");

/*Champ Erreur*/
let eltMessageError = document.getElementById("messageError");
let eltPrenomError = document.getElementById("prenomError");
let eltNomError = document.getElementById("nomError");
let eltCourrielError = document.getElementById("courrielError");
let eltPhotoError = document.getElementById("photoError");

/*Photo du formulaire*/
let eltImagePhoto = document.getElementById("image");

/*Bouton du formulaire*/
let eltBtnValide = document.getElementById("valid");
let eltBtnReset = document.getElementById("btnReset");

/*Déclaration des Instance de class*/
let tabPhoto = new Array;
let photoClient = new Photo;
TAB_CHOIX_PHOTO.forEach(photo => {
    tabPhoto.push(new Photo(photo, SOURCES_PHOTO + photo + ".jpg"));
});

/*Déclaration des fonctions*/
/**
 * Test de la saisie de plus de 3 caractères
 * @param {HTMLElement} champ le champ HTML à contrôler
 * @param {HTMLElement} messErr le champ d'erreur à modifier
 * @returns Résultat du contrôle
 */
function testSaisie(champ, messErr) {
    let saiOK
    if (champ.value.length >= NB_MIN_CARACT) {
        messErr.textContent = "";
        champ.style.border = "solid black 1px";
        messErr.style.color = "black";
        saiOK = true;
    } else {
        messErr.textContent = "ERREUR : Trois caractère minimum pour le champ " + champ.id
        champ.style.border = "solid red 1px";
        messErr.style.color = "red";
        saiOK = false;
    }
    return saiOK;
}

/*Fonction d'envoie du formulaire*/
/**
 * 
 * @param {Event} evt 
 */
function envoiformulaire(evt) {

    let messageEnvoye = new Message;
    let client = new Client;
    let erreurSaisie = false;

    /*controle et mise à jour de info client */
    if (testSaisie(eltPrenom, eltPrenomError)) {
        client.setPrenom(eltPrenom.value);
    } else {
        erreurSaisie = true;
    }

    if (testSaisie(eltNom, eltNomError)) {
        client.setNom(eltNom.value);
    } else {
        erreurSaisie = true;
    }

    if (testSaisie(eltCourriel, eltCourrielError)) {
        client.setEmail(eltCourriel.value);
    } else {
        erreurSaisie = true;
    }

    if (eltChoisirPhoto[eltChoisirPhoto.selectedIndex].textContent != "Choisir photo") {
        client.setPhoto(photoClient);
        eltPhotoError.textContent = "";
        eltImagePhoto.style.border = "solid black 1px";
    } else {
        eltPhotoError.textContent = "ERREUR : Sélectionner un photo"
        eltPhotoError.style.color = "red";
        eltImagePhoto.style.border = "solid red 1px";
        erreurSaisie = true;
    }

    /*controle et mise à jour de info demande client */
    messageEnvoye.setType(eltTypeDemande.value);

    if (testSaisie(eltMessage, eltMessageError)) {
        messageEnvoye.setMessage(eltMessage.value);
    } else {
        erreurSaisie = true;
    }
    messageEnvoye.setClient(client);

    /*contrôle dans la console des instances*/
    console.log(messageEnvoye);
    console.log(client);

    /*Annulation de submit si la saisie n'ai pas valide*/
    if (erreurSaisie) {
        evt.preventDefault();
    }
}

/*---------------------------------MAIN---------------------------------*/

/*Modification du HTML via DOM*/
/*Remplissage du champ liste déroulante -> "Votre demande"*/
TAB_TYPE_DEMANDE.forEach(demande => {
    let eltOption = document.createElement("option");
    eltOption.value = demande;
    eltOption.textContent = demande;
    eltTypeDemande.appendChild(eltOption);
});

/*Remplissage du champ liste déroulante -> "Choix photo"*/
tabPhoto.forEach(photo => {
    let eltOption = document.createElement("option");
    eltOption.value = photo.getSource();
    eltOption.textContent = photo.getLibelle();
    eltChoisirPhoto.appendChild(eltOption);
});

/*Modification de la photo en fonction de la sélection*/
eltChoisirPhoto.addEventListener("input", () => {
    eltImagePhoto.src = eltChoisirPhoto.value;
    photoClient.setSource(eltChoisirPhoto.value);
    photoClient.setLibelle(eltChoisirPhoto[eltChoisirPhoto.selectedIndex].textContent);
    console.log(photoClient);
});

/*Envoi du formulaire et contrôle*/
eltBtnValide.addEventListener("click", envoiformulaire, false);

/*Contrôle de champ sur modification*/
eltMessage.addEventListener("input", () => {
    testSaisie(eltMessage, eltMessageError)
});

eltPrenom.addEventListener("input", () => {
    testSaisie(eltPrenom, eltPrenomError)
});

eltNom.addEventListener("input", () => {
    testSaisie(eltNom, eltNomError)
});

eltCourriel.addEventListener("input", () => {
    testSaisie(eltCourriel, eltCourrielError)
});

eltChoisirPhoto.addEventListener("input", () => {
    if (eltChoisirPhoto[eltChoisirPhoto.selectedIndex].textContent != "Choisir photo") {
        eltPhotoError.textContent = "";
        eltImagePhoto.style.border = "solid black 1px";
    } else {
        eltPhotoError.textContent = "ERREUR : Sélectionner un photo"
        eltPhotoError.style.color = "red";
        eltImagePhoto.style.border = "solid red 1px";
        erreurSaisie = true;
    }
});


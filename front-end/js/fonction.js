//afficher la quantité
function affichageQuantitePanier() {
    let totalPanier = 0;
    let quantiteAffichage = document.querySelector("#affichagePanier");

    let panierProduits = JSON.parse(localStorage.getItem("panierProduits"));
    if  (panierProduits) {
        for (let i=0; i < panierProduits.length; i++) {
            totalPanier += panierProduits[i].quantite;
        };
    };
    
    quantiteAffichage.innerHTML = totalPanier;
    return totalPanier;
};

//afficher l'alert produit ajouter au panier
let btnFermer = document.querySelector(".confirmation");
function affichePopUp() {
    btnFermer.style.display = "block";   
};

//alert 
function alertFonctionnement() {
    return "Problème sur notre site, Veillez revenir ultérieurement !";
};

//alert de l'adresse postale
function AlertAdresse() {
    let positionElementAdresse = document.querySelector(".col-md-7");
        let structureHtmlAdresse = `<div class="verification-ville">
          <div class="alert alert-danger" role="alert">
          L'adresse n'est pas valide !
          </div>
          </div>`;
        positionElementAdresse.insertAdjacentHTML("beforebegin", structureHtmlAdresse);
};

//alert de l'Email
function alertEmail() {
    let positionElementMail = document.querySelector(".col-md-6");
        let structureHtmlMail = `<div class="verification-ville">
          <div class="alert alert-danger" role="alert">
            Email : L'adresse mail n'est pas valide !
          </div>
          </div>`;
          positionElementMail.insertAdjacentHTML("afterend", structureHtmlMail);
};

//alert ville
function alertVille() {
    let positionElementAlertVille = document.querySelector(".col-md-7");
    let structureVerificationVille = `<div class="verification-ville">
      <div class="alert alert-danger" role="alert">
        Ville : chiffre et symbole ne sont pas autorisé  !
      </div>
      </div>`;
      positionElementAlertVille.insertAdjacentHTML("beforeend", structureVerificationVille);
};

//alert nom et prénom 
function alertNomPrenom() {
    let positionElementAlert = document.querySelector(".form-control");
    let structureVerification = `
      <div class="verification">
       <div class="alert alert-danger" role="alert">
        Chiffre et symbole ne sont pas autorisé Ne pas dépasser 20 caractère, minimun 3 caractère !
       </div>
      </div>`;
      positionElementAlert.insertAdjacentHTML("afterend", structureVerification); 
};

//controler le formulaire avec les expression régulière
function regex(value) {
     return /^[A-Za-z]{3,20}$/.test(value);
    };

function regExEmail(value) {
     return /^[A-Za-z0-9-éàè.]+@[a-z.]+[a-z.]$/.test(value);
    };

function regExAdress(value) {
     return /^[A-Za-z0-9-éàè\s]{10,50}$/.test(value);
    };

    

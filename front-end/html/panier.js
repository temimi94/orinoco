let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

//selection de l'id pour injecter le html
const produitPanier = document.querySelector("#container-panier");

//vérification du panier 
if(produitLocalStorage === null || produitLocalStorage == 0) {
   const panierVide = `
     <div class="container-panier-vide">
     <div>Le panier est vide</div>
     </div>`;

   produitPanier.innerHTML = panierVide;
} else {//sinon afficher les produits dans le panier 
    let afficherProduitPanier = [];
    for(j = 0; j < produitLocalStorage.length; j++) {
    afficherProduitPanier += `<table class="table">
      <tbody>
       <tr>
        <td><img src="${produitLocalStorage[j].image}"></td>
        <td>${produitLocalStorage[j].nomProduit}</td>
        <td>${produitLocalStorage[j].prix}€</td>
       </tr>
      </tbody>
      </table>`;
     }
     if (j == produitLocalStorage.length) {
      produitPanier.innerHTML = afficherProduitPanier;
     }
}

/*----------création du btn vider le panier-----------*/
//inserer le code html
function panierVide() { 
const btnViderPanier = `
  <button class="btn-tous-supprimer"> Vider le panier </button>`;
  produitPanier.insertAdjacentHTML("afterend", btnViderPanier);

//selectionner le bouton
const btnTousSupprimer = document.querySelector(".btn-tous-supprimer");

//suppression de la key produit local
btnTousSupprimer.addEventListener('click', (e) => {
   e.preventDefault();

   //removeItem pour vider le local 
   localStorage.removeItem("produits");
   localStorage.removeItem("prixTotal");
   window.location.href="panier.html";
});
}
panierVide();
/*----------------montant total du panier----------*/
//declaration pour stocker le prix total
const prixPanier = () => { 
let prixTotalPanier = [];

//chercher les prix dans le panier 
for (let k = 0; k < produitLocalStorage.length; k++) {
   let prixProduitsDansPanier = produitLocalStorage[k].prix;
  
   //mettre le prix du panier dans la variable du total
   prixTotalPanier.push(prixProduitsDansPanier);
}

//additionner les prix qu'il ya dans le tableau 
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalPanier.reduce(reducer, 0);

//insertion du html du prix total à afficher
const affichagePrixTotal = `
  <div class="affichage-prix-total">Le prix total :
   ${prixTotal}€</div>`;

//injection du code dans le fichier panier.html
produitPanier.insertAdjacentHTML("beforeend", affichagePrixTotal);
localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}
prixPanier() ;
/*-----------Formulaire----------------*/
const formulaireDeContact = () => {
   const positionElement = document.querySelector(".formulaire");
   const structureHtmlFormulaire = `<div class="formulaire-contact>
    <div class="row g-3">
      <div class="col">
        <label for="nom" class="nom">Nom</label>
        <input type="text" class="form-control" id="nom" placeholder="Nom" aria-label="First name">
      </div>
      <div class="col">
        <label for="prenom" class="prenom">Prénom</label>
        <input type="text" class="form-control" id="prenom" placeholder="Prénom" aria-label="Last name">
      </div>
    </div>
    <form class="row g-3">
    <div class="col-md-6">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" placeholder="hamdaouirogoya@outlook.fr" id="email">
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">Adresse</label>
      <textarea type="text" class="form-control" id="adresse" placeholder="11 rue louise michel"></textarea>
    </div>
    <div class="col-md-7">
      <label for="inputCity" class="form-label">Ville</label>
      <input type="text" class="form-control" placeholder="Bobigny" id="ville">
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Confirmer</button>
    </div>
    </form>
   </div>`;
   positionElement.innerHTML = structureHtmlFormulaire;

};
formulaireDeContact();

const controleForm = () => { 
//controle du formulaire
  const btnConfirmer= document.querySelector(".btn-primary");
  btnConfirmer.addEventListener('click', (e) => {
   e.preventDefault();

   //récuperer les valeur du form
   const contact = {
      lastName: document.querySelector("#prenom").value,
      firstName: document.querySelector("#nom").value,
      address: document.querySelector("#adresse").value,
      city: document.querySelector("#ville").value,
      email: document.querySelector("#email").value
   } 

   localStorage.setItem("contact", JSON.stringify(contact));

   const products = [] ;
   for (let n = 0; n < produitLocalStorage.length; n++) {
   products.push(produitLocalStorage[n].idProduit)
   }

   //prendre la key dans le localStorage
   const getLocalStorage = localStorage.getItem("contact");
   //convertir la chaine de caractère en oblet js
   const convertionLocalStorage = JSON.parse(getLocalStorage); 

   //mettre les valeurs du local dans les champs du form
   document.querySelector("#prenom").value = convertionLocalStorage.lastName;
   document.querySelector("#nom").value = convertionLocalStorage.firstName;
   document.querySelector("#email").value = convertionLocalStorage.email;
   document.querySelector("#adresse").value = convertionLocalStorage.address;
   document.querySelector("#ville").value = convertionLocalStorage.city;


/*---------controle du formulaire-------*/
  
   function regex(value) { return /^[A-Za-z]{3,20}$/.test(value);}
   function regExEmail(value) { return /^[A-Za-z0-9-éàè.]+@[a-z.]+[a-z.]$/.test(value);}
   function regExAdress(value) { return /^[A-Za-z0-9-éàè\s]{10,50}$/.test(value);}

   let positionElementAlert = document.querySelector(".form-control");
   let structureVerification = `
    <div class="verification">
      <div class="alert alert-danger" role="alert">
         Chiffre et symbole ne sont pas autorisé Ne pas dépasser 20 caractère, minimun 3 caractère !
      </div>
    </div>`;

   //controle de la validité du prénom 
   function prenomControle() {
      const lePrenom = contact.lastName;
   if(regex(lePrenom)){
       return true;
   } else {
        positionElementAlert.insertAdjacentHTML("afterend", structureVerification); 
   }
   };

   //controle de la validité du nom 
   function nomControle() {
   const leNom = contact.firstName;
   if(regex(leNom)){
       return true;
   } else {
      positionElementAlert.insertAdjacentHTML("afterend", structureVerification); 
   }
   };

   //controle de la validité de la ville
   function villeControle() {
   const laVille = contact.city;
   if(regex(laVille)){
       return true;
   } else { 
      let positionElementAlertVille = document.querySelector(".col-md-7");
      let structureVerificationVille = `<div class="verification-ville">
      <div class="alert alert-danger" role="alert">
        Ville : chiffre et symbole ne sont pas autorisé  !
      </div>
      </div>`;
      positionElementAlertVille.insertAdjacentHTML("beforeend", structureVerificationVille);
      return false;
      }
   };

   //controle de la validité du mail
   function emailControle () {
   const leMail = contact.email;
   if(regExEmail(leMail)){
       return true;
   } else {
       let positionElementMail = document.querySelector(".col-md-6");
       let structureHtmlMail = `<div class="verification-ville">
         <div class="alert alert-danger" role="alert">
          Email : L'adresse mail n'est pas valide !
         </div>
         </div>`;
         positionElementMail.insertAdjacentHTML("afterend", structureHtmlMail);
         return false;
     }   
   };

   //controle de la validité de l'adresse
   function adresseControle() {
   const adresse =contact.address;
   if(regExAdress(adresse)){
       return true;
   } else {
       let positionElementAdresse = document.querySelector(".col-md-7");
       let structureHtmlAdresse = `<div class="verification-ville">
        <div class="alert alert-danger" role="alert">
         L'adresse n'est pas valide !
        </div>
        </div>`;
       positionElementAdresse.insertAdjacentHTML("beforebegin", structureHtmlAdresse);
       return false;
   }   
   };   

   if(prenomControle() && nomControle() && villeControle() && emailControle() && adresseControle()) {
      //mettre l'objet formulaire dans le local
      localStorage.setItem("contact", JSON.stringify(contact));
      } else {
         return false;
      };
    
  
/***************enregistrer les donners et confirmer la commande----------*/
function recupInfo() { 
   const promise = fetch("http://localhost:3000/api/teddies/order", {
   method: "POST",
   body: JSON.stringify({contact, products}),
   headers: {
    "Content-Type": "application/json",
     }
   });

   promise.then(async (reponse) => {
    try {
       const contenu = await reponse.json();
       contenu = localStorage.setItem("contenu", JSON.stringify(contenu));
    } catch(e) {
      console.log(e);
    }
   });
  }
  recupInfo();

   localStorage.removeItem("produits"); 
   window.location.href="confirmation.html";
});
}
controleForm() ;
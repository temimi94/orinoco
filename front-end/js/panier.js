let produitLocalStorage = JSON.parse(localStorage.getItem("panierProduits"));

//selection de l'id pour injecter le html
const produitPanier = document.querySelector("#container-panier");

//vérification du panier 
if(produitLocalStorage === null || produitLocalStorage < 1) { 
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
        <td class="imagePeluche"><img src="${produitLocalStorage[j].image}"></td>
        <td>Quantité : ${produitLocalStorage[j].quantite}</td>
        <td>Nom : ${produitLocalStorage[j].nomProduit}</td>
        <td>Couleur : ${produitLocalStorage[j].option_produit}</td>
        <td>Prix : ${produitLocalStorage[j].prix * produitLocalStorage[j].quantite}€</td>
       </tr>
      </tbody>
      </table>`;
    };
    
    if (j == produitLocalStorage.length) {
      produitPanier.innerHTML = afficherProduitPanier;
     };
};

/*----------création du btn vider le panier-----------*/


function panierVide() {
  //structure du code html
  const btnViderPanier = `
    <button class="btn-tous-supprimer"> Vider le panier </button>`;

  //injection du html
  produitPanier.insertAdjacentHTML("afterend", btnViderPanier);
  
  //récuperation de la class du btn vider le panier
  const btnTousSupprimer = document.querySelector(".btn-tous-supprimer"); 
 
  btnTousSupprimer.addEventListener('click', (e) => {
    e.preventDefault();
    //removeItem pour vider le local 
    localStorage.clear();
    window.location.href="panier.html";
  });
};

/*----------------montant total du panier----------*/

//declaration pour stocker le prix total
const prixPanier = () => { 
  let prixTotalPanier = [];
  //chercher les prix dans le panier 
  if (produitLocalStorage && produitLocalStorage.length >= 1) {
    for (let k = 0; k < produitLocalStorage.length; k++) {
      //multiplier le prix par la quantité
      let prixProduitsDansPanier = produitLocalStorage[k].prix * produitLocalStorage[k].quantite;
      
      //mettre le prix du panier dans la variable du total
      prixTotalPanier.push(prixProduitsDansPanier);
    };
  };

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
};

/*-----------Formulaire----------------*/

const formulaireDeContact = () => {

  //récuperation de la class pour injecter le html
  const positionElement = document.querySelector(".formulaire");

  //structure du html
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

const controleForm = () => { 

  if (produitLocalStorage < 1) {
    console.log("panier vide") 
  
  }else { 
    formulaireDeContact();
    panierVide();
    prixPanier();
  
    //contrôle du formulaire
    const btnConfirmer= document.querySelector(".btn-primary");
    btnConfirmer.addEventListener('click', (e) => {
      e.preventDefault();
      //récuperer les valeurs du formulaire
      const contact = {
        lastName: document.querySelector("#prenom").value,
        firstName: document.querySelector("#nom").value,
        address: document.querySelector("#adresse").value,
        city: document.querySelector("#ville").value,
        email: document.querySelector("#email").value
      };

      localStorage.setItem("contact", JSON.stringify(contact));
      const products = [] ;
      for (let n = 0; n < produitLocalStorage.length; n++) {
        products.push(produitLocalStorage[n].idProduit)
      };

      //prendre la key dans le localStorage
      const getLocalStorage = localStorage.getItem("contact");
      //convertir la chaine de caractère en oblet js
      const convertionLocalStorage = JSON.parse(getLocalStorage); 

      //mettre les valeurs du localStorage dans les champs du formulaire
      document.querySelector("#prenom").value = convertionLocalStorage.lastName;
      document.querySelector("#nom").value = convertionLocalStorage.firstName;
      document.querySelector("#email").value = convertionLocalStorage.email;
      document.querySelector("#adresse").value = convertionLocalStorage.address;
      document.querySelector("#ville").value = convertionLocalStorage.city;

     
      //controle de la validité du prénom 
      function prenomControle() {
        const lePrenom = contact.lastName;
        if(regex(lePrenom)){
            displayNone();
            return true;
        } else {
          alertNomPrenom();
        };
      };

      //controle de la validité du nom 
      function nomControle() {
        const leNom = contact.firstName;
        if(regex(leNom)){
          displayNone();
          return true;
        } else {
          alertNomPrenom();
        };
      };

      //controle de la validité de la ville
      function villeControle() {
        const laVille = contact.city;
        if(regex(laVille)){
          displayNone();
          return true;
        } else {
          alertVille();
          return false;
          };
        };

      //controle de la validité du mail
      function emailControle () {
        const leMail = contact.email;
        if(regExEmail(leMail)){
          displayNone();
          return true;
        } else {
          alertEmail();
          return false;
          };   
        };

      //controle de la validité de l'adresse
      function adresseControle() {
        const adresse =contact.address;
        if(regExAdress(adresse)){
          displayNone();
          return true;
        } else {
          AlertAdresse();
          return false;
        };   
      };   

      if(prenomControle() && nomControle() && villeControle() && emailControle() && adresseControle()) {
        //mettre l'objet formulaire dans le local
        localStorage.setItem("contact", JSON.stringify(contact));
        } else {
          return false;
        };

      // Se connecte à l'API pour envoyer des données
      const recupInfo = () =>  { 
        const promise = fetch(" http://localhost:3000/api/teddies/order", {
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
            console.log(alertFonctionnement());
          } 
        });
      };
      recupInfo();
     
    localStorage.removeItem("panierProduits"); 
    window.location.href="confirmation.html";
  });
  };
};
controleForm();
affichageQuantitePanier();

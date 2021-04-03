/*-------------recupération de l'url par l'id---------------------------*/
const urlProduct = document.location.search;
const idProduct = new URLSearchParams(urlProduct).get("id");
const url = "http://localhost:3000/api/teddies/"+idProduct;

/*----déclarer la fonction pour récuperer les produits par le id--------*/
 const produitselectionner = async function() {
 try {
    let reponse = await fetch(url);
      if(reponse.ok) {

        let produits = await reponse.json();

        //recupération des couleurs
        let couleurs = produits.colors;

        let choixCouleurs = "" ;
        for (let i = 0; i < couleurs.length; i++) {
            choixCouleurs += `<option value="${couleurs[i]}"
           >${couleurs[i]}</option>`;
           }

        //recuperation du id dans le html 
        let affichageProduits = document.querySelector('#affichage-teddy');

        let prix = produits.price/100;

        function affichageTeddy() { 
        let structureHtml = `<div id="teddy">
          <img src="${produits.imageUrl}" alt="teddy">
          <p class="nom-teddy">${produits.name}</p>
          <p class="descript"> ${produits.description}</p></div>
          <p class="prix">${prix} €</p>
          <form>
          <label for="option-produit"></label>
          <select name="option-produit" id="option-produit">
          ${choixCouleurs}
          </select>
          <button class="envoyer">Ajouter au panier</button>`;

          affichageProduits.innerHTML = structureHtml ;
        }
        affichageTeddy();
          //récuperation de id de la lavue de l'option
          let idValue = document.querySelector('#option-produit');

          //sélection du btn envoyé au panier
          let btn_envoyerPanier = document.querySelector('.envoyer');

          btn_envoyerPanier.addEventListener('click',(event) => {
            event.preventDefault();

            //mettre le choix de l'utilisateur
            const choixProduits = idValue.value;

            //récuperation des valeurs 
            let valeurProduits = {
            nomProduit: produits.name,
            image:produits.imageUrl, 
            idProduit: produits._id,
            option_produit : choixProduits,
            prix : prix
            }
            console.log(valeurProduits);

 /*-------------------------------------LE-LOCALE-STOCAGE-------------------------------------------------*/
 //-------------------------stockaer-la-récupération-des-valeurs-du-formulaire-dans-le-locale-------------*/
 //declaration de la variable pour mettre les key et les values qui sont dans le local
           let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

           const ajouterProduitLocalStorage = () => {
           //ajout dans le tableau de l'objet avec les valeurs
           produitLocalStorage.push(valeurProduits);
           //la transformation en format JSON et envoyer dans le local 
           localStorage.setItem("produits", JSON.stringify(produitLocalStorage));
          }

          //voir si il ya déja des produits enregistré dans le local
          if (produitLocalStorage){
            ajouterProduitLocalStorage();
          } //et si il n ya pas des produit enregistré dans le local
          else{
            produitLocalStorage = [];
            ajouterProduitLocalStorage();   
          } 
          });

          let btnFermer = document.querySelector(".confirmation");
          let btnPanier = document.querySelector(".envoyer");
   
          btnPanier.addEventListener('click', affichePopUp);
            function affichePopUp() {
            btnFermer.style.display = "block";   
          }
      } else {
      console.error(reponse.status);
      }
  } catch(e) {
    console.log(e);
  }  
};

produitselectionner ();


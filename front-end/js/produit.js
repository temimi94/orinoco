/*-------------recupération de l'url par l'id---------------------------*/
const urlProduct = document.location.search;
const idProduct = new URLSearchParams(urlProduct).get("id");
const url = "http://localhost:3000/api/teddies/"+idProduct;

/*----déclarer la fonction pour récuperer les produits par le id--------*/
 const produitSelectionner = async function() {
   try {
      let reponse = await fetch(url);
      if(reponse.ok) {

        let produits = await reponse.json();
        let prix = produits.price/100;
        
        function affichageTeddy() {  

          //recupération des couleurs
          let couleurs = produits.colors;
          let choixCouleurs = "" ;
          for (let i = 0; i < couleurs.length; i++) {
            choixCouleurs += `<option value="${couleurs[i]}"
            >${couleurs[i]}</option>`;
          };
          
          //faire une option de quantité  
          let quantite = [1,2,3,4,5];
          let nombreProduit = "";
          for (let r = 0; r < quantite.length; r++){
            nombreProduit += `<option value="${quantite[r]}"
            >${quantite[r]}</option>`;
          };

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
              <select name="nombre-produit" id="nombre-produit">
              ${nombreProduit}
              </select>
              <button class="envoyer">Ajouter au panier</button>`;

          //récuperation du id dans le html 
          let affichageProduits = document.querySelector('#affichage-teddy');
          affichageProduits.innerHTML = structureHtml ;
        };
        affichageTeddy();

        //récuperation de id de la value de l'option
        let idValue = document.querySelector('#option-produit');

        //récuperation de id de la value de la quantité
        let idValueNombreProduits = document.querySelector('#nombre-produit');

        //sélection du btn envoyé au panier
        let btn_envoyerPanier = document.querySelector('.envoyer');

        btn_envoyerPanier.addEventListener('click', function ajouterProduitStorage(event) {
          event.preventDefault();
            //création localStorage
            let panierProduits = JSON.parse(localStorage.getItem("panierProduits")) || [];
            let produitDansPanier = false;

            //mettre le choix de l'utilisateur
            const choixProduits = idValue.value;
            const choixQuantite = Number(idValueNombreProduits.value);

            //récuperation des valeurs 
            let valeurProduits = {
            nomProduit: produits.name,
            image:produits.imageUrl, 
            idProduit: produits._id,
            option_produit : choixProduits,
            quantite: choixQuantite ,
            prix : prix
            };

/*------LE-LOCALE-STOCAGE------*/
//stocker-la-récupération-des-valeurs-du-formulaire-dans-le-locale
//déclaration de la variable pour mettre les key et les values qui sont dans le local

            if(panierProduits && panierProduits.length >= 1) {
              panierProduits = JSON.parse(localStorage.getItem("panierProduits"));
              for ( let i = 0; i < panierProduits.length; i++){
                if(produits._id === panierProduits[i].idProduit && choixProduits === panierProduits[i].option_produit){
                  panierProduits[i].quantite = panierProduits[i].quantite + choixQuantite ;
                  quantite = panierProduits[i].quantite ;
                  produitDansPanier = true ;
                };
              };
            };

            if(produitDansPanier == false) {
              panierProduits.push(valeurProduits); 
            };

            localStorage.setItem("panierProduits",JSON.stringify(panierProduits));
          });

          let btnPanier = document.querySelector(".envoyer");
      
          btnPanier.addEventListener('click', affichePopUp);
        } else {
          console.error(reponse.status);
        };
      } catch(e) {
        console.log(alertFonctionnement());
      };
  };
  affichageQuantitePanier()
produitSelectionner();

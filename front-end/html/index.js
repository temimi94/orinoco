/*----------------affichage des produits--------------*/

// déclarer la fonction pour recupérer nos produits avec la méthode FETCH

const recupProduits = async function() {
    try {
        let reponse = await fetch("http://localhost:3000/api/teddies");

        if (reponse.ok) {

            let produits = await reponse.json();
            console.log(produits);

            function affichageProduits() {         
            let structureHtml = "";
            for ( let i = 0; i < produits.length; i++) {
                structureHtml+= `<div class="card" >
                <img src="${produits[i].imageUrl}" class="card-img-top" alt="image-du-peluche">
                <div class="card-body">
                  <h5 class="card-title">${produits[i].name}</h5>
                  <p class="card-text">${produits[i].description}</p>
                  <a href="produit.html?id=${produits[i]._id}" class="btn btn-primary">Découvrir</a>
                </div>
              </div>`
            };

            let injectionHtml = document.querySelector('#affichage-produit');
            injectionHtml.innerHTML = structureHtml;
        }
        affichageProduits();
        } else {
            console.error (reponse.status);
        } 
        }catch (e) {
        console.log(e) ;
    }
}
recupProduits();

let confirmationCommande = JSON.parse(localStorage.getItem("contenu"));
let confirmationContact = JSON.parse(localStorage.getItem("contact"));
let confirmationPrix = JSON.parse(localStorage.getItem("prixTotal"));

let positionElementConfirmation = document.querySelector("#confirmation-commande");
let structureHtmlConfirmation = `
  <div class="card" style="width: 25rem;">
  <div class="card-body">
    <h4 class="card-title">Confirmation de Commande</h4>
    <h5 class="card-subtitle mb-2 text-muted">Commande numéro : 
    ${confirmationCommande.orderId}</h5>
    <p>Adresse de livraison : <br/>
    ${confirmationContact.lastName}
    ${confirmationContact.firstName}<br/>
    ${confirmationContact.address},
    ${confirmationContact.city}<br/>
    ${confirmationContact.email}</p>
    <p class="card-text"> 
    Merci ${confirmationContact.lastName} d'avoir commandé chez nous.<br/> Nous pensons que vous serez satisfaits
    de la qualité de nos produits.<br/> 
    C'est bien cette qualité qui nous différencie de nos concurrents.<br/></p>
    <p class="recap">Voici le prix total de votre commande :
    <strong>${confirmationPrix}€</strong></p>
    <button class="btn-fermer" onclick="closeModal()">
    <a href="index.html" class="card-link">Fermer</a></button>
  </div>
  `;
positionElementConfirmation.innerHTML = structureHtmlConfirmation;

const fermer = document.querySelector(".btn-fermer");
function closeModal() {
  localStorage.clear();
}

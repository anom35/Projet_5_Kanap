let arrayItems = []
let nbreArticles, articleEnCours = 0

nbreArticles = localStorage.length

if (nbreArticles > 0) {
    console.log(nbreArticles + " articles dans le panier")                          //! à supprimer
    let valeurTotal, totalArticles = 0
    for (let cpt=0; cpt<nbreArticles; cpt++) {
        arrayItems.push(JSON.parse(localStorage.getItem(localStorage.key(cpt))))

        valeurTotal += (arrayItems[cpt].price * arrayItems[cpt].quantity)
        totalArticles += arrayItems[cpt].quantity
        console.log(arrayItems[cpt].price + " - " + arrayItems[cpt].quantity)
        let parent = document.querySelector("#cart__items")
        console.log(parent)
        if (parent != null) {
            createAndAffectStruct(parent, cpt)
        }
    }
    console.log(valeurTotal + " - " + totalArticles)
    displayTotal(valeurTotal, totalArticles)
}

const varClickDelete = document.querySelector(".deleteItem")    // sélection la classe du Bouton Delete
varClickDelete.addEventListener("click", deleteArticle);        // déclanche la fonction addEventListener au click sur le bouton

//! arrêt ici, valeurTotal = NaN à résoudre.

function displayTotal(valeur, quantity) {
    const varTotal = document.querySelector("#totalPrice")
    varTotal.textContent = Number(valeur)
    console.log(valeur)
    const total = document.querySelector("#totalQuantity")
    total.textContent = quantity
}

// fonction qui créer la structure HTML et affecte les valeurs du panier
function createAndAffectStruct(parent, cpt) {
    parent.innerHTML += `
    <article class="cart__item" data-id="${arrayItems[cpt].id}" data-color="${arrayItems[cpt].color}">
        <div class="cart__item__img">
          <img src="${arrayItems[cpt].image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${arrayItems[cpt].title}</h2>
                <p>Couleur : ${arrayItems[cpt].color}</p>
                <p>Prix : ${arrayItems[cpt].price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${arrayItems[cpt].quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayItems[cpt].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}


function deleteArticle() {

}
let arrayItems  = []
let valeurTotal = 0
if (localStorage.length > 0) {
    for (let cpt in localStorage) {
        console.log(cpt)
        arrayItems.push(JSON.parse(localStorage.getItem(localStorage.key(cpt))))

        valeurTotal += arrayItems[cpt].price * arrayItems[cpt].quantity
        totalArticles += arrayItems[cpt].quantity

        let parent = document.querySelector("#cart__items")
        if (parent != null) {
            createAndAffectStruct(parent, cpt)
        }
    }
    displayTotal(valeurTotal, totalArticles)
}

// création d'évennements pour les boutons "supprimer"
let varClickDelete = document.querySelectorAll(".deleteItem")   
varClickDelete.forEach(function(elem) {
    elem.addEventListener("click", deleteArticleFromCart(elem.id));              
})

// création d'évennements pour les boutons "supprimer"
let varClickModifyQuantity = document.querySelectorAll(".itemQuantity")   
varClickModifyQuantity.forEach(function(elem) {
    elem.addEventListener("click", modifyQuantity);              
})



// function qui affiche le nombre total d'article et le total
function displayTotal(valeur, quantity) {
    const varTotal = document.querySelector("#totalPrice")
    varTotal.setAttribute("style", "font-weight: bold;")
    varTotal.textContent = "" + valeur + ""

    const total = document.querySelector("#totalQuantity")
    total.setAttribute("style", "font-weight: bold;")
    total.textContent = "" + quantity + ""
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

// location.reload()
if (localStorage.length > 0) {
    let arrayItems      = []
    let arrayStorage    = []
    let valeurTotal     = 0
    let totalArticles   = 0
    for (let cpt=0; cpt < localStorage.length; cpt++) {
        console.log(cpt)
        arrayStorage = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
        arrayItems = retrieveProduct(arrayStorage.id)

        console.log("varId:",arrayStorage.id)
        valeurTotal += arrayItems.price * arrayItems.quantity
        totalArticles += arrayItems.quantity
        console.log(arrayItems)
        let parent = document.querySelector("#cart__items")
        if (parent != null) {
            createAndAffectStruct(parent, cpt, arrayItems)
        }
    }
    displayTotal(valeurTotal, totalArticles)
}

function retrieveProduct(varId) {
    fetch("http://localhost:3000/api/products/" + varId)  
    .then((res) => res.json())
    .then((data) => { return data })
}

// création d'évennements pour les boutons "supprimer"
let varClickDelete = document.querySelectorAll(".deleteItem")   
varClickDelete.forEach(function(elem) {
    elem.addEventListener("click", deleteArticleFromCart(elem.id));              
})

// création d'évennements pour les boutons "supprimer"
let varClickModifyQuantity = document.querySelectorAll(".itemQuantity")   
varClickModifyQuantity.forEach(function(elem) {
    elem.addEventListener("click", changeQuantityFromCart(elem.id))
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
function createAndAffectStruct(parent, cpt, arrayItems) {
    console.log(arrayItems)
    parent.innerHTML += `
    <article class="cart__item" data-id="${arrayItems.id}" data-color="${arrayItems.color}">
        <div class="cart__item__img">
          <img src="${arrayItems.image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${arrayItems.title}</h2>
                <p>Couleur : ${arrayItems.color}</p>
                <p>Prix : ${arrayItems.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${arrayItems.quantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayItems.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}

// location.reload()


// fonction sauvegarde du panier dans le localstorage
function saveCart(cart) {
    localStorage.setItem(cart.id, JSON.stringify(cart))
}

// fonction récupère un article
function getCart(varId) {
    let panier = JSON.parse(localStorage.getItem(varId))
    if (panier == null ) {
        return []
    } else {
        return JSON.parse(panier)
    }
}

// fonction qui supprimer un article du panier
function deleteArticleFromCart(product) {
    let panier = getCart(product)
    panier = panier.filter(p => p.id != product.id) // filtre tous ceux qui sont différent et supprime celui qui est indentique
    saveCart(panier)
}

// fonction qui change la quantité d'un article dans le panier
function changeQuantityFromCart(product, quantity) {
    let panier = getCart(product)
    let productExist = panier.find(p => p.id == product.id)
    if (productExist != undefined) {
        productExist.quantity += quantity
        if (productExist.quantity <= 0) {
            deleteArticleFromCart(productExist)
        } else {
            saveCart(panier)
        }
    } 
}

// fonction qui calcul le nombre d'articles total dans le panier
function calculNumberArticles() {
    let panier = getCart()
    let number = 0
    for (let article of panier) {
        number += article.quantity
    }
    return number
}

// fonction qui calcul le prix total dans le panier
function calculTotalPrice() {
    let panier = getCart()
    let total = 0
    for (let article of panier) {
        total += article.price
    }
    return total
}

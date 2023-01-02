let panier = []
if (localStorage.length > 0) {
    let record      = {}
    const numberOfRecord = localStorage.length 
    for (let cpt=0; cpt < numberOfRecord; cpt++) {
        const items         = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
        // const itemId        = items.id
        // const itemColor     = items.color
        // const itemQuantity  = items.quantity
        // c(itemId + " / " + itemColor + " / " + itemQuantity)
        fetch("http://localhost:3000/api/products/" + items.id)  
        .then((res) => res.json())
        .then((data) => { 
            record = {
                id          : items.id,
                color       : items.color,
                quantity    : items.quantity,
                price       : data.price,
                name        : data.name,
                description : data.description,
                imageUrl    : data.imageUrl,
                altTxt      : data.altTxt,
            }
            panier.push(record)
            createStructure(record)
         })
        .catch((error) => { window.alert("Connexion au serveur impossible !") })
    }
    displayQuantityTotal()
    displayTotalPrice()
} else {
    window.alert("votre panier est vide !")
}


function getProduct(varId) {
    return fetch("http://localhost:3000/api/products/" + varId)  
        .then((res) => res.json())
        .then((data) => { return JSON.parse(data) })
        .catch((error) => { window.alert("Connexion au serveur impossible !") })
}

function createStructure(item) {
    const parent = document.querySelector("#cart__items")
    if (testParent(parent)) {
        parent.innerHTML += `
        <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    }
}

const allItemQuantity = document.querySelectorAll(".itemQuantity")
c(allItemQuantity)
for (let i = 0; i < allItemQuantity.length; i++) {
    allItemQuantity[i].addEventListener("change", (element) => {
        c(element)
    });
}


function c(texte) { console.log(texte) }


// fonction qui test le retour d'un querySelector
function testParent(parent) {
    if (parent != null) return true
    else return false
}

// fonction qui recherche un doublon ou les paramètres "id" et "color" sont ceux de l'article en cours 
function findIdColor(id, color) {
    // id = id.substring(1, id.length - 1)
    const valRetour = panier.find((element) => element.id == id && element.color == color)
    if (valRetour != undefined) return valRetour
    else return undefined
}


function updateQuantity() {
    // item.quantity =  parseInt(document.querySelector(".itemQuantity").value)
    // displayQuantityTotal()
    // displayTotalPrice()
    // saveData(item)
}

function displayQuantityTotal() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = panier.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}
  
function displayTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = panier.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
}

function saveData(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}


function deleteData(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}
  
  
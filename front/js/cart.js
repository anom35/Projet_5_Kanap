let panier = []
if (localStorage.length > 0) {
    let record = {}
    for (let cpt=0; cpt < localStorage.length; cpt++) {
        const items = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
        const itemId        = items.id
        const itemColor     = items.color
        const itemQuantity  = items.quantity
        c(itemId + " - " + itemColor + " - " + itemQuantity)
        getProduct(localStorage.key(cpt)).then((data) => {
            record = {
                id          : itemId,
                color       : itemColor,
                quantity    : itemQuantity,
                price       : data.price,
                name        : data.name,
                description : data.description,
                imageUrl    : data.imageUrl,
                altTxt      : data.altTxt,
            }
            panier.push(record)
            createStructure(record)
        })
    }
    displayQuantityTotal()
    displayTotalPrice()
} else {
    window.alert("votre panier est vide !")
}


function getProduct(varId) {
    return fetch("http://localhost:3000/api/products/" + varId)  
        .then((res) => res.json())
        .then((data) => { return data })
        .catch((error) => {
            window.alert("Connexion au serveur impossible !")
          })
}

function createStructure(item) {
    c(item)
    const parent = document.querySelector("#cart__items")
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
    const itemSearch = `article[data-id="${item.id}"][data-color="${item.color}"]`
    const varInput = document.querySelector(itemSearch)
    varInput.addEventListener("input", () => updateQuantity(item.id, input.value, item))
}

function c(texte) { console.log(texte) }

function updateQuantity(id, newValue, item) {
    const itemToUpdate = panier.find((item) => item.id === id)
    itemToUpdate.quantity = parseInt(newValue)
    item.quantity = itemToUpdate.quantity
    displayQuantityTotal()
    displayTotalPrice()
    saveData(item)
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
  
  
let arrayItems = []
let articleEnCours = 0

if (localStorage.length > 0) {
    let valeurTotal     = 0
    let totalArticles   = 0
    for (let cpt=0; cpt<localStorage.length; cpt++) {
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

// let elementsArray = document.querySelectorAll("whatever");
// elementsArray.forEach(function(elem) {
//     elem.addEventListener("input", function() {
//         //this function does stuff
//     });
// });

// création d'évennements pour les boutons "supprimer"
let varClickDelete = document.querySelectorAll(".deleteItem")   
varClickDelete.forEach(function(elem) {
    elem.addEventListener("click", deleteArticle);              
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
                <p class="deleteItem" data-number="${cpt}">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}


function deleteArticle() {
    const value = this.getAttribute("data-number")
    console.log("this: " + this + ", value: " + value)
    localStorage.removeItem(localStorage.getItem(value))
}
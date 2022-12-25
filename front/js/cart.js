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

// création d'évennements pour les boutons "supprimer"
let varClickDelete = document.querySelectorAll(".deleteItem")   
varClickDelete.forEach(function(elem) {
    elem.addEventListener("click", deleteArticle);              
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
                    <input type="number" data-number="${cpt}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayItems[cpt].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-number="${cpt}">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`
}

// fonction qui supprimer l'article du localStorage et recharge la page
function deleteArticle() {
    const value = this.getAttribute("data-number")
    localStorage.removeItem(arrayItems[value].id)
    location.reload()
}

// fonction qui modifie la quantité d'un article dans le panier et met à jour le prix et le nombre d'articles
function modifyQuantity() {
    let value = JSON.stringify(objJson); 
    localStorage.setItem(varId, objCart); 




    // const value  = this.getAttribute("data-number")
    // const varId  = arrayItems[value].id
    // const parent = document.querySelector(`[data-id="${varId}"] input`)
    // console.log(parent)
    // if (parent != null) {
    //     const valQuantity = parent.value

    //     const varTotal = document.querySelector("#totalPrice")
    //     varTotal.textContent = "" + valQuantity * arrayItems[value].price + ""

    //     // const findId  = JSON.parse(localStorage.getItem(localStorage.key(value)))
    //     // const valFind = findId.quantity
    //     let totalArticles = 0
    //     for (let cpt=0; cpt<localStorage.length; cpt++) {
    //         totalArticles += JSON.parse(localStorage.getItem(localStorage.key(cpt))).quantity
    //     }

    //     const total   = document.querySelector("#totalQuantity")
    //     total.value = totalArticles
    // }
    //! à continuer
}






// Mise à jour de la quantité en fonction des changements apporté sur la page
function updateQuantity() {
    document.addEventListener('change', function(event) {
        if(event.target.classList.contains('itemQuantity')) {
            if(event.target.value >= 1 && event.target.value <= 100) {
                getTotal();
                let product = productInLocalStorage.find(element => element._id == event.target.parentElement.parentElement.parentElement.parentElement.dataset.id && element.color == event.target.parentElement.parentElement.parentElement.parentElement.dataset.color);
                product.quantity = event.target.value;
                localStorage.setItem("product", JSON.stringify(productInLocalStorage));
            }else {
                window.alert("Champ incorrect! La quantité doit être comprise entre 1 et 100");
            }
        }
    });
    
}
updateQuantity();

// Supprime le produit du panier suite à l'appuie sur le boutton
function deleteProduct() {
    const btnProductDeleted = document.getElementsByClassName("deleteItem");

    for (let btn of btnProductDeleted) {
        btn.addEventListener('click' , function(event) {
            let product = productInLocalStorage.find(element => element._id == event.target.parentElement.parentElement.parentElement.parentElement.dataset.id && element.color == event.target.parentElement.parentElement.parentElement.parentElement.dataset.color);
            productInLocalStorage.splice(productInLocalStorage.indexOf(product), 1);
            localStorage.setItem("product" , JSON.stringify(productInLocalStorage));
            location.reload();
        });
    }
}
deleteProduct();
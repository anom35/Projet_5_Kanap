if (localStorage.length > 0) {
    let valeurTotal    = 0
    let totalArticles  = 0
    let array          = []
    let data           = []
    array = JSON.parse(localStorage.getItem("product"))
    for (let cpt=0; cpt < array.length; cpt++) {
        getProduct(array[cpt].id).then((data) => {
            totalArticles += array[cpt].quantity
            valeurTotal += parseInt(data.price) * array[cpt].quantity
            displayTotal(parseInt(valeurTotal), totalArticles)
            createProduct(data, array[cpt].color, array[cpt].quantity)
        })
    }
}

function createProduct(array, arrayColor, arrayQuantity) {
    let parent = document.querySelector("#cart__items")
    if (parent != null) {
        parent.innerHTML += `
        <article class="cart__item" data-id="${array.id}" data-color="${array.color}">
            <div class="cart__item__img">
            <img src="${array.imageUrl}" alt="${array.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${array.name}</h2>
                    <p>Couleur : ${arrayColor}</p>
                    <p>Prix : ${array.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayQuantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
        // `${array.id}` = addEventListener("click", changeQuantityFromCart(array.id, arrayQuantity))
    }
}

function getProduct(id) {
    return fetch("http://localhost:3000/api/products/" + id)  
    .then((res) => res.json())
    .then((data) => { return data })
    .catch((error) => {
        window.alert("Connexion au serveur impossible !")
        console.error("error: " + error)
    })
}

function c(valeur) { console.log(valeur) }


// let varClickDeleteArticle = document.querySelectorAll(".deleteItem")   
// let varClickModifyQuantity = document.querySelectorAll(".itemQuantity")  
// c(typeof(varClickDeleteArticle), "-", typeof(varClickModifyQuantity))
// for(let cpt=0; cpt < localStorage.length; cpt++) {
//     let data = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
//     varClickDeleteArticle[cpt] = document.addEventListener("click", deleteArticleFromCart(data.id))
//     varClickModifyQuantity[cpt] = document.addEventListener("change", changeQuantityFromCart(data.id))
// }

// création d'évennements pour modifier les quantités"
// document.querySelectorAll(".itemQuantity").forEach(elem => elem.addEventListener("click", changeQuantityFromCart(elem)))


// function qui affiche le nombre total d'articles et le prix total
function displayTotal(valeur, quantity) {
    const varTotal = document.querySelector("#totalPrice")
    varTotal.textContent = valeur
    const total = document.querySelector("#totalQuantity")
    total.textContent = quantity
}




// fonction sauvegarde du panier dans le localstorage
function saveCart(cart) {
    localStorage.setItem(cart.id, JSON.stringify(cart))
}

// fonction qui supprimer un article du panier
function deleteArticleFromCart(id) {
    const result = JSON.parse(localStorage.getItem(localStorage.key(id)))
    if (result != null) {
        localStorage.removeItem(id)
        location.reload()
    }
}

// fonction qui change la quantité d'un article dans le panier
function changeQuantityFromCart(id, qtyStorage) {
    c(id)
    getProduct(id).then((data) => {
        let productExist = panier.find(p => p.id == data.id)
        if (productExist != undefined) {
            productExist.quantity += data.quantity
            if (productExist.quantity <= 0) {
                deleteArticleFromCart(productExist)
            } else {
                saveCart(panier)
            }
        } 
    })
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
// updateQuantity();

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
// deleteProduct();
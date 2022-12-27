if (localStorage.length > 0) {
    let arrayStorage   = []
    let valeurTotal    = 0
    let totalArticles  = 0
    for (let cpt=0; cpt < localStorage.length; cpt++) {
        arrayStorage.push(JSON.parse(localStorage.getItem(localStorage.key(cpt))))
        let parent = document.querySelector("#cart__items")
        if (parent != null) {
            fetch("http://localhost:3000/api/products/" + arrayStorage[cpt].id)  
            .then((res) => res.json())
            .then((data) => { 
                totalArticles += arrayStorage[cpt].quantity
                valeurTotal += parseInt(data.price) * arrayStorage[cpt].quantity
                displayTotal(parseInt(valeurTotal), totalArticles)
                parent.innerHTML += `
                <article class="cart__item" data-id="${arrayStorage[cpt].id}" data-color="${data.color}">
                    <div class="cart__item__img">
                    <img src="${data.imageUrl}" alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p>Couleur : ${arrayStorage[cpt].color}</p>
                            <p>Prix : ${data.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayStorage[cpt].quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
            })
        }
    }
}



function c(valeur) {
    console.log(valeur)
}


// let varClickDeleteArticle = document.querySelectorAll(".deleteItem")   
// let varClickModifyQuantity = document.querySelectorAll(".itemQuantity")  
// c(typeof(varClickDeleteArticle), "-", typeof(varClickModifyQuantity))
// for(let cpt=0; cpt < localStorage.length; cpt++) {
//     let data = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
//     varClickDeleteArticle[cpt] = document.addEventListener("click", deleteArticleFromCart(data.id))
//     varClickModifyQuantity[cpt] = document.addEventListener("change", changeQuantityFromCart(data.id))
// }

// création d'évennements pour les boutons "supprimer"
// let varClickModifyQuantity = document.querySelectorAll(".itemQuantity")   
// varClickModifyQuantity.forEach(function(elem) {
//     elem.addEventListener("change", changeQuantityFromCart(elem))
// })

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
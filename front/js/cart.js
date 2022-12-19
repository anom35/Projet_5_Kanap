let arrayItems = []
let nbreArticles = 0

nbreArticles = localStorage.length

if (nbreArticles > 0) {
    console.log(nbreArticles + " articles dans le panier")                          //! à supprimer

    for (let cpt=0; cpt<nbreArticles; cpt++) {
        arrayItems.push(JSON.parse(localStorage.getItem(localStorage.key(cpt))))

        console.log("Article: " + cpt + " valeur ID: " + arrayItems[cpt].id)        //! à supprimer
        createBalises(arrayItems[cpt])
    }



}





function createBalises(array) {
    const varArticle = document.createElement("article");
    varArticle.classList.add("cart__item")
    varArticle.setAttribute("data-id", array.id)
    varArticle.setAttribute("data-color", array.color)

    const varDiv = document.createElement("div")
    varDiv.classList.add("cart__item__img")

    const varImg = document.createElement("img");
    varImg.src = array.image
    varImg.alt = "Photographie d'un canapé"
    varImg.height = "200"

    const parent = document.querySelector("#cart__items", varArticle)
    parent.appendChild(varArticle) 
    parent.appendChild(varDiv) 
    parent.appendChild(varImg) 

    createBalisesAfterImg(array)
}


function createBalisesAfterImg(array) {
    const varDiv = document.createElement("div")
    varDiv.classList.add("cart__item__content")

    const varDiv2 = document.createElement("div")
    varDiv2.classList.add("cart__item__content__description")

    const varH2 = document.createElement("h2")
    varH2.textContent = "Nom du produit"

    const varP = document.createElement("p")
    varP.textContent = array.color

    const varPrice = document.createElement("p")
    varPrice.textContent = array.price

    const parent = document.querySelector(".cart__item", varDiv)
    console.log(parent)
    parent.appendChild(varDiv) 
    parent.appendChild(varDiv2) 
    parent.appendChild(varH2) 
    parent.appendChild(varP) 
    parent.appendChild(varPrice) 
}



// <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//   <div class="cart__item__img">
//     <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//   </div>
//   <div class="cart__item__content">
//     <div class="cart__item__content__description">
//       <h2>Nom du produit</h2>
//       <p>Vert</p>
//       <p>42,00 €</p>
//     </div>
//     <div class="cart__item__content__settings">
//       <div class="cart__item__content__settings__quantity">
//         <p>Qté : </p>
//         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//       </div>
//       <div class="cart__item__content__settings__delete">
//         <p class="deleteItem">Supprimer</p>
//       </div>
//     </div>
//   </div>
// </article>


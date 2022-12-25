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




// récupère l'URL et l'ID de l'article
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL

// interroge la base de données
searchProduct(urlParams.get("id"))

// recherche un produit par son id
function searchProduct(varId) {
    fetch("http://localhost:3000/api/products/" + varId)  // les délimiteurs Backtics sur pc "ALT GR + 7"
        .then((res) => res.json())
        .then((data) => loadCard(data))
}
function seekchProduct(varId) {
    fetch("http://localhost:3000/api/products/" + varId)  // les délimiteurs Backtics sur pc "ALT GR + 7"
        .then((res) => res.json())
        .then((data) => { return data })
}

// fonction appelé directement
function loadCard(data) {

    let parent = document.querySelector(".item__img")
    parent.innerHTML += "<img src=\""+ data.imageUrl+ "\" alt=\"" + data.altTxt + "\">"
    console.log("<img src=\""+ data.imageUrl+ "\" alt=\"" + data.altTxt + "\">")

    parent = document.querySelector("#title")
    parent.textContent = data.name

    parent = document.querySelector("#price")
    parent.textContent = data.price

    parent = document.querySelector("#description")
    parent.textContent = data.description

    for (cpt = 0; cpt < data.colors.length; cpt++) {
        createChoice(data.colors[cpt])                 // boucle pour charger les 3 couleurs
    }
}



// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option") // créer l'élément option
    varOption.value = varChoice                        // affecte la valeur de value
    varOption.textContent = varChoice                  // affecte le texte affiché
    const parent = document.querySelector("#colors")
    parent.appendChild(varOption)    
}


const varAddArticle = document.querySelector("#addToCart")   // sélection l'ID du Bouton
varAddArticle.addEventListener("click", addQuantityToCart);  // déclanche la fonction addEventListener au click sur le bouton

function addQuantityToCart() {

    const quantityInput = document.querySelector("#quantity") // récupère la valeur
    const varQuantity = quantityInput.value                   //
    const choiceColor = document.querySelector("#colors")     // récupère la valeur
    const varColor = choiceColor.value                        //

    if ((varQuantity > 0) && (varColor != "")) {

        colorGrisBorder()                                     // remet les bordures en gris
        console.log("------  enregistrement  -------")
        let objJson = {                                       // créer un objet de commande
            id      : varId,
            color   : varColor,
            quantity: parseInt(varQuantity)
         }

//        searchDuplicate(varId, varColor, varQuantity)
        let objCart = JSON.stringify(objJson);                // transforme un objet en texte json
        localStorage.setItem(varId, objCart);                 // sauvegarde dans le localstorage
        document.location.href="index.html"
    }
    else {
        testContentFields(varQuantity, varColor)
    }
}



function searchDuplicate(id, color, quantity) {
    let varColor    = ""
    let arrayItems  = []
    let varQuantity = quantity
    let a, valKey   = 0

    // compte si plusieurs articles identiques existe
    for (let cpt=0; cpt < localStorage.length; cpt++) {
        arrayItems.push(JSON.parse(localStorage.getItem(localStorage.key(cpt))))
        if ((arrayItems[cpt].id === id) && (arrayItems[cpt].color === color)) {
            a += 1
        }
    }
    if (a >= 2) {
        // si plusieurs acticles existent, il faut cumuler les quantités et n'en laisser qu'un
        for (let cpt=0; cpt < localStorage.length; cpt++) {
            if ((arrayItems[cpt].id === id) && (arrayItems[cpt].color === color)) {
                varQuantity += arrayItems[cpt].quantity
            }
        }
    }

}




// fonction qui test si les champs sont remplis
function testContentFields(varQuantity, varColor) {
    if (varQuantity <= 0) { 
        const varElement = document.querySelector("input")              // sinon la bordure passe en rouge
        const varParent = document.getElementById("#quantity")          //
        varElement.setAttribute("style", "border:2px solid #FF0000;")   //
    } else {
        const varSelect = document.querySelector("input")               // sinon la bordure passe en grise
        const varColors = document.getElementById("#quantity")
        varSelect.setAttribute("style", "border:1px solid #767676;")
    }
    if (varColor == "") {                   
        const varElement = document.querySelector("select")             // sinon la bordure passe en rouge
        const varParent = document.getElementById("#colors")            //
        varElement.setAttribute("style", "border:2px solid #FF0000;")   //
    }  else {
        const varElement = document.querySelector("select")             // sinon la bordure passe en grise
        const varParent = document.getElementById("#colors")            //
        varElement.setAttribute("style", "border:1px solid #767676;")   //
    }
}



function colorGrisBorder() {                                                // remet les bordures en gris
    const varInput = document.querySelector("input")
    const varQuantity = document.getElementById("#quantity")
    varInput.setAttribute("style", "border:1px solid #767676;")

    const varSelect = document.querySelector("select")
    const varColors = document.getElementById("#colors")
    varSelect.setAttribute("style", "border:1px solid #767676;")
}
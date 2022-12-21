// récupération de l'URL et l'ID de l'article
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL
const varId     = urlParams.get("id")               // récupère l'ID de l'article
let arrayData   = []

// interroge la base de données
fetch(`http://localhost:3000/api/products/${varId}`)  // les délimiteurs Backtics sur pc "ALT GR + 7"
    .then((res) => res.json())
    .then((data) => loadCard(data))


// fonction appelé directement
function loadCard(data) {
    arrayData = data

    let parent = document.querySelector(".item__img")
    parent.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`

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

    console.log("Title:" + arrayData.name)
    console.log("Desc:" + arrayData.description)  

    if ((varQuantity > 0) && (varColor != "")) {

        colorGrisBorder()                                              // remet les border gris
        console.log("------  enregistrement  -------")
        let objJson = {                                                     // créer un objet de commande
            id      : varId,
            title   : arrayData.name,
            description : arrayData.description,
            color   : varColor,
            price   : arrayData.price,
            image   : arrayData.imageUrl,
            quantity: Number(varQuantity)
         }
        let objCart = JSON.stringify(objJson);                              // transforme un objet en texte json
        localStorage.setItem(varId, objCart);                               // sauvegarde dans le localstorage

        console.log("Cart: " + objCart.title)                   //! à supprime

    }
    else {
        testContentFields(varQuantity, varColor)
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
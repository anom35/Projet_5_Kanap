
// récupère l'URL et l'ID de l'article
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL
let varId       = urlParams.get("id")

// interroge la base de données
searchProduct()


// recherche un produit par son id et charge une fonction précise
function searchProduct() {
    fetch("http://localhost:3000/api/products/" + varId)  
        .then((res) => res.json())
        .then((data) => loadCard(data))
}


// fonction appelé directement
function loadCard(data) {
    console.log(data.id)
    let parent = document.querySelector(".item__img")
    parent.innerHTML += "<img src=\""+ data.imageUrl + "\" alt=\"" + data.altTxt + "\">"
    parent = document.querySelector("#title")
    parent.textContent = data.name
    parent = document.querySelector("#price")
    parent.textContent = data.price
    parent = document.querySelector("#description")
    parent.textContent = data.description
    for (cpt = 0; cpt < data.colors.length; cpt++) {
        createChoice(data.colors[cpt])                
    }
}



// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option")
    varOption.value = varChoice                       
    varOption.textContent = varChoice                 
    const parent = document.querySelector("#colors")
    parent.appendChild(varOption)    
}

// déclanche la fonction addQuantityToCard au click sur le bouton
const varAddArticle = document.querySelector("#addToCart") 
varAddArticle.addEventListener("click", addQuantityToCart);  

function addQuantityToCart() {
    const quantityInput = document.querySelector("#quantity")
    const varQuantity = quantityInput.value                  
    const choiceColor = document.querySelector("#colors")    
    const varColor = choiceColor.value                       

    if ((varQuantity > 0) && (varColor != "")) {
        colorGrisBorder()                                     // remet les bordures en gris
        let objJson = {    
            id      : varId,
            color   : varColor,
            quantity: parseInt(varQuantity)
         }
        // searchDuplicate(varId, varColor, varQuantity)
        saveCart(objJson)
        document.location.href="index.html"
    }
    else {
        testContentFields(varQuantity, varColor)
    }
}


// fonction qui test si les champs sont remplis, sinon change les bordures en rouge
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


// fonction qui met les bordures en gris
function colorGrisBorder() {                                                // remet les bordures en gris
    const varInput = document.querySelector("input")
    const varQuantity = document.getElementById("#quantity")
    varInput.setAttribute("style", "border:1px solid #767676;")

    const varSelect = document.querySelector("select")
    const varColors = document.getElementById("#colors")
    varSelect.setAttribute("style", "border:1px solid #767676;")
}

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
        return JASON.parse(panier)
    }
}

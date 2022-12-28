
// récupère l'URL et l'ID de l'article
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL
let varId       = urlParams.get("id")
searchProduct()

// recherche un produit par son id et charge une fonction précise
function searchProduct() {
    fetch("http://localhost:3000/api/products/" + varId)  
        .then((res) => res.json())
        .then((data) => loadCard(data))
        .catch((error) => {
            window.alert("Connexion au serveur impossible !")
          })
}


// fonction appelé directement après récupération des données du fetch
function loadCard(data) {
    if (data != null) {
        let parent = document.querySelector(".item__img")
        if (testParent(parent)) { parent.innerHTML += "<img src=\""+ data.imageUrl + "\" alt=\"" + data.altTxt + "\">" }
        parent = document.querySelector("#title")
        if (testParent(parent)) { parent.textContent = data.name }
        parent = document.querySelector("#price")
        if (testParent(parent)) { parent.textContent = data.price }
        parent = document.querySelector("#description")
        if (testParent(parent)) { parent.textContent = data.description }
        for (cpt = 0; cpt < data.colors.length; cpt++) {
            createChoice(data.colors[cpt])                
        }
    }
}

// fonction qui test un parent et renvois true si tout est ok, sinon false
function testParent(parent) {
    if (parent != null) { return true } else { return false }
}

// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option")
    varOption.value = varChoice 
    varOption.textContent = varChoice
    const parent = document.querySelector("#colors")
    if (testParent(parent)) { parent.appendChild(varOption) }
}

// déclanche la fonction addQuantityToCard au click sur le bouton
const varAddArticle = document.querySelector("#addToCart") 
varAddArticle.addEventListener("click", addQuantityToCart);  


// function qui ajoute un article et test s'il existe déjà, si oui, alors il ajoute la quantité à l'article existant
function addQuantityToCart(objJson) {
    const btnAddToCart = document.getElementById("addToCart")
    let arrayProduct = JSON.parse(localStorage.getItem("product"))

    const quantityInput = document.querySelector("#quantity")
    const varQuantity = quantityInput.value 
    console.log(varQuantity)
    const choiceColor = document.querySelector("#colors")    
    const varColor = choiceColor.value
    console.log(varColor)

    // test si quantity est en 1 et 100 et si la couleur n'est pas vide
    if ((varQuantity > 0 && varQuantity <= 100) && (varColor != "")) {
        colorGrisBorder()                                 
        let objJson = { id: varId, color: varColor, quantity: parseInt(varQuantity) }
        // si le tableau est null, alors l'initialiser et ajouter l'objet puis sauvegarder dans le localstorage
        if (arrayProduct == null) {
            arrayProduct = []
            arrayProduct.push(objJson)  
        } else {
            // le tableau existe, alors chercher si un doublon existe
            let seekArrayProduct = arrayProduct.find(element => element.id == objJson.id && element.color == objJson.color)
            if (seekArrayProduct) {
                if (parseInt(seekArrayProduct.quantity) + parseInt(objJson.quantity)) {
                    arrayProduct.forEach(element => {
                        if (element.id == objJson.id && element.color == objJson.color) {
                            element.quantity = parseInt(element.quantity) + parseInt(objJson.quantity)
                        }
                    });                
                } else { return window.alert("Quantité maximale dans le panier est atteinte") }
            } else { arrayProduct.push(objJson) }
        }
        localStorage.setItem("product", JSON.stringify(arrayProduct))
        window.location.href = "index.html"
    } else { testContentFields(varQuantity, varColor) }
}

// fonction qui test si les champs sont remplis, sinon change les bordures en rouge
function testContentFields(varQuantity, varColor) {
    if (varQuantity <= 0) { 
        const varElement = document.querySelector("input")
        const varParent = document.getElementById("#quantity")
        console.log(varElement)
        if (testParent(varElement)) { varElement.setAttribute("style", "border:2px solid #FF0000;") }
    } else {
        const varSelect = document.querySelector("input")         
        const varColors = document.getElementById("#quantity")
        if (testParent(varSelect)) { varSelect.setAttribute("style", "border:1px solid #767676;") }
    }
    if (varColor == "") {                   
        const varElement = document.querySelector("select")
        const varParent = document.getElementById("#colors")  
        if (testParent(varElement)) varElement.setAttribute("style", "border:2px solid #FF0000;")  
    }  else {
        const varElement = document.querySelector("select")
        const varParent = document.getElementById("#colors")
        if (testParent(varElement)) varElement.setAttribute("style", "border:1px solid #767676;")
    }
}


// fonction qui met les bordures en gris
function colorGrisBorder() {                              
    const varInput = document.querySelector("input")
    const varQuantity = document.getElementById("#quantity")
    if (testParent(varInput)) varInput.setAttribute("style", "border:1px solid #767676;")

    const varSelect = document.querySelector("select")
    const varColors = document.getElementById("#colors")
    if (testParent(varSelect)) varSelect.setAttribute("style", "border:1px solid #767676;")
}

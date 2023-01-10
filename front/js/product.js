//
//-----------------------------------------------------
// récupère l'URL et l'ID de l'article
//-----------------------------------------------------
//
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL
let varId       = urlParams.get("id")
let panier       = []
searchProduct()
//
//-----------------------------------------------------
// recherche un produit par son id et charge une fonction précise
//-----------------------------------------------------
//
async function searchProduct() {
    await fetch("http://localhost:3000/api/products/" + varId)  
        .then((res) => res.json())
        .then((data) => loadCard(data))
        .catch((error) => {
            console.log(error)
            window.alert("--  Connexion au serveur impossible !  --")
          })
}
//
//-----------------------------------------------------
// fonction appelé directement après récupération des données du fetch
//-----------------------------------------------------
//
function loadCard(data) {
    if (data != null) {
        let parent = document.querySelector(".item__img")
        if (testParent(parent)) parent.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">` 
        parent = document.querySelector("#title")
        if (testParent(parent)) parent.textContent = data.name
        parent = document.querySelector("#price")
        if (testParent(parent)) parent.textContent = data.price 
        parent = document.querySelector("#description")
        if (testParent(parent)) parent.textContent = data.description 
        for (let cpt = 0; cpt < data.colors.length; cpt++) {
            createChoice(data.colors[cpt])                
        }
        loadPanier()
    }
}
//
//-----------------------------------------------------
// function qui charge le contenu du panier en vue de trouver des doublons
//-----------------------------------------------------
//
function loadPanier() {
    const nbreRec  = localStorage.length
    let valStorage = {}
    for (let cpt=0; cpt < nbreRec; cpt++) {
        valStorage = JSON.parse(localStorage.getItem(localStorage.key(cpt)))
        panier.push(valStorage)
    }
}
//
//-----------------------------------------------------
// déclenche la fonction addQuantityToCard au click sur le bouton
//-----------------------------------------------------
//
document.querySelector("#addToCart").addEventListener("click", addQuantityToCart)
//
//-----------------------------------------------------
// déclenche la fonction modifyQuantity lorsque la quantité est modifié, et la met à jour
//-----------------------------------------------------
//
document.querySelector('[name="itemQuantity"]').addEventListener("input", modifyQuantity)
//
//-----------------------------------------------------
// fonction qui test le retour d'un querySelector
//-----------------------------------------------------
//
function testParent(parent) { return (parent != null) ? true : false }
//
//-----------------------------------------------------
// fonction de création de la balise image <option>
//-----------------------------------------------------
//
function createChoice(varChoice) {
    const varOption = document.createElement("option")
    varOption.value = varChoice 
    varOption.textContent = varChoice
    const parent = document.querySelector("#colors")
    if (testParent(parent)) parent.appendChild(varOption)
}
//
//-----------------------------------------------------
// function qui ajoute un article et test s'il existe déjà, si oui, alors il ajoute la quantité à l'article existant
//-----------------------------------------------------
//
function addQuantityToCart() {
    // récupère la quantité et la couleur sélectionné
    const currentQuantity = document.querySelector("#quantity").value
    const currentColor    = document.querySelector("#colors").value  
    let arrayProduct      = []
    if (localStorage.length > 0) {
        arrayProduct = findIdColor(varId, currentColor)
        if ((currentQuantity > 0 && currentQuantity <= 100) && (currentColor != "")) {
            colorGrisBorder()                              
            if (arrayProduct != undefined) {
                arrayProduct.quantity += parseInt(currentQuantity) 
                if (arrayProduct.quantity > 100) {
                    document.querySelector("#quantity").value = 100
                    arrayProduct.quantity = 100
                }
            } else {
                let objJson = {
                    id       : varId,
                    quantity : parseInt(currentQuantity),
                    color    : currentColor
                }
                arrayProduct = objJson
            }
            saveData(arrayProduct)
            window.location.href = "index.html"
        } else { 
            testContentFields(currentQuantity, currentColor) 
        }
    } else {
        if ((currentQuantity > 0 && currentQuantity <= 100) && (currentColor != "")) {
            let objJson = {
            id       : varId,
            quantity : parseInt(currentQuantity),
            color    : currentColor
            }
            arrayProduct = objJson
            saveData(arrayProduct)
            window.location.href = "index.html"
        } else { 
            testContentFields(currentQuantity, currentColor) 
        }
    }
}
//
//-----------------------------------------------------
// fonction qui récupère la quantité MAJ et l'enregistre dans le localStorage
//-----------------------------------------------------
//
function modifyQuantity() {
    const currentColor  = parseInt(document.querySelector("#colors").value)
    let arrayProduct    = findIdColor(varId, currentColor)
    let currentQuantity = parseInt(document.querySelector("#quantity").value)
    if (currentQuantity != null && arrayProduct != undefined) {
        arrayProduct.quantity = parseInt(document.querySelector("#quantity").value)
        saveData(arrayProduct)
    }
}
//
//-----------------------------------------------------
// fonction qui recherche un doublon ou les paramètres "id" et "color" sont ceux de l'article en cours 
//-----------------------------------------------------
//
function findIdColor(id, color) {
    const valRetour = panier.find((element) => element.id == id && element.color == color)
    return (valRetour != undefined) ? valRetour : undefined
}
//
//-----------------------------------------------------
// fonction de sauvegarde des données dans le localStorage
//-----------------------------------------------------
//
function saveData(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}
//
//-----------------------------------------------------
// fonction qui test si les champs sont remplis, sinon change les bordures en rouge
//-----------------------------------------------------
//
function testContentFields(varQuantity, varColor) {
    if (varQuantity <= 0 || varQuantity > 100) { 
        const varElement = document.querySelector("input")
        const varParent = document.getElementById("#quantity")
        varElement.setAttribute("style", "border:2px solid #FF0000;") 
    } else {
        const varSelect = document.querySelector("input")         
        const varColors = document.getElementById("#quantity")
        varSelect.setAttribute("style", "border:1px solid #767676;") 
    }
    if (varColor == "") {                   
        const varElement = document.querySelector("select")
        const varParent = document.getElementById("#colors")  
        varElement.setAttribute("style", "border:2px solid #FF0000;")  
    }  else {
        const varElement = document.querySelector("select")
        const varParent = document.getElementById("#colors")
        varElement.setAttribute("style", "border:1px solid #767676;")
    }
}
//
//-----------------------------------------------------
// fonction qui met les bordures en gris
//-----------------------------------------------------
//
function colorGrisBorder() {                              
    const varInput = document.querySelector("input")
    const varQuantity = document.getElementById("#quantity")
    varInput.setAttribute("style", "border:1px solid #767676;")

    const varSelect = document.querySelector("select")
    const varColors = document.getElementById("#colors")
    varSelect.setAttribute("style", "border:1px solid #767676;")
}

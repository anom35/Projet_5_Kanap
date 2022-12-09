// récupération de l'URL et l'ID de l'article
const urlPage   = window.location.search
const urlParams = new URLSearchParams(urlPage)
const varId     = urlParams.get("id")
console.log({ varId })

// interroge la base de données
fetch(`http://localhost:3000/api/products/${varId}`)
    .then((res) => res.json())
    .then((data) => loadCard(data))


// fonction appelé directement
function loadCard(data) {

    console.log(data)
    createImg(data.imageUrl, data.altTxt)           // appelle des fonctions
    createPrice(data.price)                         // 
    createDescription(data.description)             //
    createTitle(data.name)                          //

    for (cpt = 0; cpt < data.colors.length; cpt++) {
        createChoice(data.colors[cpt])              // boucle pour charger les 3 couleurs
    }
}

// function de mise à jour du prix
function createPrice(varPrice) {
    const parent = document.querySelector("#price") // cherche l'ID price
    valideAppendData(parent, varPrice)              // ajoute le prix dans la balise <span>
}


// function de mise à jour de la description
function createDescription(varDescription) {
    const parent = document.querySelector("#description") // cherche l'ID description
    valideAppendData(parent, varDescription)              // ajoute la description dans la balise <p>
}


// function de mise à jour du titre
function createTitle(varTitle) {
    const parent = document.querySelector("#title") // cherche l'ID title
    valideAppendData(parent, varTitle)              // ajoute le prix dans la balise <h1>
}


// fonction de création de la balise image <img>
function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")     // créer l'élément image
    image.src = varImageUrl                         // affecte l'URL source
    image.alt = varAltTxt                           // affecte le texte ALT
    const parent = document.querySelector(".item__img")  // sélectionne la class="item__img"
    valideAppendChild(parent, image)                // ajoute la balise <img>
}


// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option") // créer l'élément option
    varOption.value = varChoice                        // affecte la valeur de value
    varOption.textContent = varChoice                  // affecte le texte affiché
    const parent = document.querySelector("#colors")
    valideAppendChild(parent, varOption)                  // ajoute la balise <option>
}

// fonction qui test et ajoute une balise enfant
function valideAppendChild(varParent, varValue) {
    if (varParent != null) {                              // test si le parent recherché existe bien
        varParent.appendChild(varValue)                   // ajoute la balise
    }
}

// fonction qui test et ajoute des données à une balise
function valideAppendData(varParent, varValue) {
    if (varParent != null) {                              // test si le parent recherché existe bien
        varParent.textContent = varValue                  // ajoute les données
    }
}
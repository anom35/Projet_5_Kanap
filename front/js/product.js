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

    for (cpt = 0; cpt <= 2; cpt++) {
        createChoice(data.colors[cpt])              // boucle pour appeler la fonction et charger les 3 couleurs
    }
}

// function de mise à jour du prix
function createPrice(varPrice) {
    const parent = document.querySelector("#price") // cherche l'ID price
    if (parent != null) {                           // si ID existant, alors je continue
        parent.textContent = varPrice               // ajoute le prix dans la balise <h1>
    }
}


// function de mise à jour de la description
function createDescription(varDescription) {
    const parent = document.querySelector("#description") // cherche l'ID description
    if (parent != null) {                                 // si ID existant, alors je continue
        parent.textContent = varDescription               // ajoute le prix dans la balise <p>
    }
}


// function de mise à jour du titre
function createTitle(varTitle) {
    const parent = document.querySelector("#title") // cherche l'ID title
    if (parent != null) {                           // si ID existant, alors je continue
        parent.textContent = varTitle               // ajoute le prix dans la balise <h1>
    }
}


// fonction de création de la balise image <img>
function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")     // créer l'élément image
    image.src = varImageUrl                         // affecte l'URL source
    image.alt = varAltTxt                           // affecte le texte ALT

    // supprime les attributs non utilisés qui apparaissent par défaut
    image.removeAttribute("title")
    image.removeAttribute("style")
    const parent = document.querySelector(".item__img")
    if (parent != null) {                            // test si le parent recherché existe bien
        parent.appendChild(image)                    // ajoute la balise <img>
    }
}


// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option") // créer l'élément option
    varOption.value = varChoice                        // affecte la valeur de value
    varOption.textContent = varChoice                  // affecte le texte affiché
    const parent = document.querySelector("#colors")
    if (parent != null) {                              // test si le parent recherché existe bien
        parent.appendChild(varOption)                  // ajoute la balise <option>
    }
}
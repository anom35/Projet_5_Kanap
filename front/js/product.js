// récupération de l'URL et l'ID de l'article
const urlPage   = window.location.search            // récupère l'URL de la page
const urlParams = new URLSearchParams(urlPage)      // récupère les données après le ? de l'URL
const varId     = urlParams.get("id")               // récupère l'ID de l'article
let varPrice    = 0
let urlImage    = ""

// interroge la base de données
fetch(`http://localhost:3000/api/products/${varId}`)  // les délimiteurs Backtics sur pc "ALT GR + 7"
    .then((res) => res.json())
    .then((data) => loadCard(data))


// fonction appelé directement
function loadCard(data) {
    urlImage = data.imageUrl
    varPrice = data.price
    console.log(data)                                  //! a supprimé
    createImg(data.imageUrl, data.altTxt)              // appel des fonctions de créations de balises
    createPrice(data.price)                            // ou d'affection de valeurs
    createDescription(data.description)                //
    createTitle(data.name)                             //

    for (cpt = 0; cpt < data.colors.length; cpt++) {
        createChoice(data.colors[cpt])                 // boucle pour charger les 3 couleurs
    }
}

// function de mise à jour du prix
function createPrice(varPrice) {
    const parent = document.querySelector("#price")     // cherche l'ID price
    valideAppendData(parent, varPrice)                  // ajoute le prix dans la balise <span>
}


// function de mise à jour de la description
function createDescription(varDescription) {
    const parent = document.querySelector("#description") // cherche l'ID description
    valideAppendData(parent, varDescription)              // ajoute la description dans la balise <p>
}


// function de mise à jour du titre
function createTitle(varTitle) {
    const parent = document.querySelector("#title")     // cherche l'ID title
    valideAppendData(parent, varTitle)                  // ajoute le prix dans la balise <h1>
}


// fonction de création de la balise image <img>
function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")         // créer l'élément image
    image.src = varImageUrl                             // affecte l'URL source
    image.alt = varAltTxt                               // affecte le texte ALT
    const parent = document.querySelector(".item__img")  // sélectionne la class="item__img"
    valideAppendChild(parent, image)                    // ajoute la balise <img>
}


// fonction de création de la balise image <option>
function createChoice(varChoice) {
    const varOption = document.createElement("option") // créer l'élément option
    varOption.value = varChoice                        // affecte la valeur de value
    varOption.textContent = varChoice                  // affecte le texte affiché
    const parent = document.querySelector("#colors")
    valideAppendChild(parent, varOption)               // ajoute la balise <option>
}

// fonction qui test et ajoute une balise enfant
function valideAppendChild(varParent, varValue) {
    if (varParent != null) {                           // test si le parent recherché existe bien
        varParent.appendChild(varValue)                // ajoute la balise
    }
}

// fonction qui test et ajoute des données à une balise
function valideAppendData(varParent, varValue) {
    if (varParent != null) {                           // test si le parent recherché existe bien
        varParent.textContent = varValue               // ajoute les données
    }
}


const varAddArticle = document.querySelector("#addToCart")   // sélection l'ID du Bouton
varAddArticle.addEventListener("click", addQuantityToCart);  // déclanche la fonction addEventListener au click sur le bouton

function addQuantityToCart() {

    let cart = []                                          // panier = array[]

    const quantityInput = document.querySelector("#quantity") // récupère la valeur
    const varQuantity = quantityInput.value                   //

    const choiceColor = document.querySelector("#colors")     // récupère la valeur
    const varColor = choiceColor.value                        //
    cart = [varId, varColor, varQuantity]

    
    if (varQuantity > 0 && varColor != "") {
        // sauvegarde l'Id, la quantité et la couleur de l'article

        // La syntaxe localStorage.setItem() permet de stocker une donnée
        // localStorage.setItem("prenom", "dany");

        // La syntaxe localStorage.getItem() permet de récupérer une donnée
        // localStorage.getItem("prenom");

        // La syntaxe localStorage.removeItem() permet de supprimer une donnée
        // localStorage.removeItem("prenom");

        // La syntaxe localStorage.length() permet d’obtenir le nombre de paires clé/valeur
        // localStorage.length;

        // La syntaxe localStorage.key() permet d’obtenir le nom de la clé en fonction de l’index spécifié
        // localStorage.key(0); // renvoie la clé 'prenom'

        // Pour obtenir toutes les clés

        // for( let i = 0; i < localStorage.length; i++){
        //     localStorage.key(i);
        // }

        // Stockage:
        // let objJson = {
        //     prenom : "dany",
        //     age : 30,
        //     taille : 170
        // }
        // let objLinea = JSON.stringify(objJson);
        // localStorage.setItem("obj",objLinea);
        
        // Lecture:
        // let objLinea = localStorage.getItem("obj");
        // let objJson = JSON.parse(objLinea);
        // alert(objJson.age) // renvoie 30

        colorGrisBorder()                                                   // remet les border gris

        let objJson = {                                                     // créer un objet de commande
            id      : varId,
            color   : varColor,
            price   : varPrice,
            image   : urlImage,
            quantity: Number(varQuantity)
         }
        let objCart = JSON.stringify(objJson);                              // transforme un objet en texte json
        localStorage.setItem(varId, objCart);                               // sauvegarde dans le localstorage

        console.log("Cart: " + objCart + " - " + objJson)                   //! à supprime

      //  window.location.href = "index.html"                               // retour à la page d'accueil
    }
    else {
        if ((varQuantity == null) || (varQuantity === 0)) {                  // test la quantité est bonne,
            const varElement = document.querySelector("input")              // sinon la bordure passe en rouge
            const varParent = document.getElementById("#quantity")          //
            varElement.setAttribute("style", "border:2px solid #FF0000;")   //
        }
        if ((varColor == null) || (varColor === "")) {                       // test la couleur est sélectionné, 
            const varElement = document.querySelector("select")             // sinon la bordure passe en rouge
            const varParent = document.getElementById("#colors")            //
            varElement.setAttribute("style", "border:2px solid #FF0000;")   //
        }
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
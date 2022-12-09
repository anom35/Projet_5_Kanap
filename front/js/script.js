// interroge la base de données
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => ajouteArticles(data))               // resultat envoyé à la function ajouteArticles


// fonction qui boucle pour afficher tous les articles
function ajouteArticles(varData) {
    
    for (let cpt = 0; cpt < varData.length; cpt++) {    // boucle sur tous les articles
        element = varData[cpt]                          // affecte l'élément en cours à la variable element

        const artLink = createLink(element._id)             // création des balises <a> + lien
        const article = document.createElement("article")   // création des balises <article>

        //! A TESTER
        //? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        //? ex: const { a, b } = obj;   // affecte aux variables a et b les valeurs de l'objet obj

        // création des balises <img>, <h3> et <p>
        const artImage          = createImg(element.imageUrl, element.altTxt)
        const artH3             = createH3(element.name)
        const artDescription    = CreateParagraphe(element.description)

        loadElementsArticle(article, artImage, artH3, artDescription)   // ajoute des balises <img>, <h3>, <p> dans la balise <article>
        AjoutArticle(artLink, article)              // ajoute le lien de l'article en cours et la balise <article>
        console.log(artLink + " - " + article)
    }
}

// function de chargement des éléments de la balise <article>
function loadElementsArticle(baliseArticle, artImage, artH3, artDescription) {
    baliseArticle.appendChild(artImage)             // ajoute la balise <img> dans la balise <article>
    baliseArticle.appendChild(artH3)                // ajoute la balise <h3> dans la balise <article>
    baliseArticle.appendChild(artDescription)       // ajoute la balise <p> dans la balise <article>
}

// fonction de création de code dans la section avec l'ID #items
function AjoutArticle(varId, article) {
    const items = document.querySelector("#items")  // cherhche l'ID #items et affecte le resultat à items
    if (items != null) {                            // s'il trouve l'ID #items, il exécute la condition
      items.appendChild(varId)                      // ajoute la balise <a> avec le lien du produit
      varId.appendChild(article)                    // ajoute la balise <article>
    }
}

// fonction de création de la balise de lien <a>
function createLink(varId) {
    const baliseLink = document.createElement("a")  // création de la balise <a>
    baliseLink.href = "product.html?id=" + varId    // ajoute à l'attribut href="" le chemin de l'article
    return baliseLink
}

// fonction de création de la balise image <img>
function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")     // création de la balise <img>
    image.src = varImageUrl                         // ajoute l'URL à l'attribut src=""
    image.alt = varAltTxt                           // ajoute le texte de l'attribut alt=""
    return image
}
  

// fonction de création de la balise <H3> + la classe productName <h3 class="productName">
function createH3(name) {
    const varH3 = document.createElement("h3")      // création de la balise <h3>
    varH3.textContent = name                        // ajoute le texte de la balise H3
    varH3.classList.add("productName")              // création de la classe productName
    return varH3
}


// fonction de création de la balise <p> + la classe productDescription <p class="productDescription">
function CreateParagraphe(description) {
    const p = document.createElement("p")           // creation de la balise <p>
    p.textContent = description                     // ajout le texte de la description
    p.classList.add("productDescription")           // création de la classe productDescription
    return p
}

// interroge la base de données
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => ajouteArticles(data))


// fonction qui boucle pour afficher tous les articles
function ajouteArticles(varData) {

    for (let cpt = 0; cpt < varData.length; cpt++) {
        element = varData[cpt]

        // création des balises <a> et <article>
        const artLink = createLink(element._id)
        const article = document.createElement("article")

        // A TESTER
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        // ex: const { a, b } = obj;   // affecte aux variables a et b les valeurs de l'objet obj

        // création des balises <img>, <h3> et <p>
        const artImage          = createImg(element.imageUrl, element.altTxt)
        const artH3             = createH3(element.name)
        const artDescription    = CreateParagraphe(element.description)

        loadElementsArticle(article, artImage, artH3, artDescription)
        AjoutArticle(artLink, article)
    }
}

// function de chargement des éléments de la balise <article>
function loadElementsArticle(baliseArticle, artImage, artH3, artDescription) {
    baliseArticle.appendChild(artImage)
    baliseArticle.appendChild(artH3)
    baliseArticle.appendChild(artDescription)
}

// fonction de création de code dans la section avec l'ID #items
function AjoutArticle(varId, article) {
    const items = document.querySelector("#items")

    // s'il trouve l'ID #items alors il exécute la condition
    if (items != null) {
      items.appendChild(varId)
      varId.appendChild(article)
    }
}

// fonction de création de la balise de lien <a>
function createLink(varId) {
    const baliseLink = document.createElement("a")
    baliseLink.href = "product.html?id=" + varId
    return baliseLink
}

// fonction de création de la balise image <img>
function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")
    image.src = varImageUrl
    image.alt = varAltTxt

    // supprime les attributs non utilisés qui apparaissent par défaut
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
  }
  

// fonction de création de la balise <H3> + la classe productName <h3 class="productName">
function createH3(name) {
    const varH3 = document.createElement("h3")
    varH3.textContent = name

    // création de la classe productName
    varH3.classList.add("productName")
    return varH3
}


// fonction de création de la balise <p> + la classe productDescription <p class="productDescription">
function CreateParagraphe(description) {
    const p = document.createElement("p")
    p.textContent = description

    // création de la classe productDescription
    p.classList.add("productDescription")
    return p
}

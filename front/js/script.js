// interroge la base de données
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => ajouteArticles(data))              


// fonction qui boucle pour afficher tous les articles
function ajouteArticles(varData) {

    for (let cpt = 0; cpt < varData.length; cpt++) {   
        element = varData[cpt]                         
        console.log(element)

        let article = document.querySelector("#items").innerHTML += `
        <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>`
     }
}
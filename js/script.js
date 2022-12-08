// interroge la base de données
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addArticle(data))







// fonction qui charge un article et l'affiche
function addArticle(varData) {

    const varElement   = document.createElement("a")
    varElement.href    = "./product.html?id=" + varData[0]._id
    varElement.text    = "Un beau canapé"

    // const varImage   = document.createElement("img")
    // varImage.src     = varData[0]._imageUrl
    // varImage.alt     = varData[0]._altTxt

    // const varName    = document.createElement("h3")
    // varName.h3       = varData[0].name

    // const varDescription     = document.createElement("p")
    // varDescription.p         = varData[0].description

    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(varElement)
    }
}




        //   <a href="./product.html?id=42">
        //     <article>
        //       <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
        //       <h3 class="productName">Kanap name1</h3>
        //       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
        //     </article>
        //   </a>
// récupération de l'URL et l'ID de l'article
const urlPage   = window.location.search
const urlParams = new URLSearchParams(urlPage)
const varId     = urlParams.get("id")
console.log({ varId })

// interroge la base de données
fetch(`http://localhost:3000/api/products/${varId}`)
    .then((res) => res.json())
    .then((data) => fillCard(data))


function fillCard(data) {
    console.log(data)
    const items = document.querySelector("#item__img")
    if (items != null) {
        const varImage = items.createImg(data.imageUrl, data.altTxt)
        items.appendChild(varId)
        var_Id.appendChild(varImage)
    }
}


function createImg(varImageUrl, varAltTxt) {
    const image = document.createElement("img")
    image.src = varImageUrl
    image.alt = varAltTxt

    // supprime les attributs non utilisés qui apparaissent par défaut
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
  }
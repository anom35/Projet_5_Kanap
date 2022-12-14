// déclare les variables globale
let cart          = []
let displayUnique = true

// charge tout le localStorage dans le panier
loadCart()

// sélectionne le bouton "Commander" et le met en écoute d'un click
const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (order) => submitForm(order))

// fonction qui rempli le panier avec le contenu du localStorage, et affiche les articles
async function loadCart() {
  const items  = localStorage.length
  for (let cpt = 0; cpt < items; cpt++) {
    const item  = localStorage.getItem(localStorage.key(cpt))
    let itemParser = JSON.parse(item)
    await fetch("http://localhost:3000/api/products/" + itemParser.id)  
    .then((res)  => res.json())
    .then((data) => {  
      let objectProduct = {
        id       : itemParser.id,
        color    : itemParser.color,
        quantity : itemParser.quantity,
        imageUrl : data.imageUrl,
        altTxt   : data.altTxt,
        price    : data.price,
        name     : data.name
      }
      cart.push(objectProduct)
      if (displayUnique) displayItem(cart[cpt])
    })
    .catch((error) => {
        window.alert("--  Connexion au serveur impossible !  --")
        console.log(error)
      })
  }
  displayUnique = false
}
//
//-----------------------------------------------------
// affichage d'un article en lançant ca création HTML
//-----------------------------------------------------
//
function displayItem(item) {
  const article = createArticle(item)
  const imageDiv = createImageDiv(item)
  article.appendChild(imageDiv)
  const cardItem = createStructDescription(item)
  article.appendChild(cardItem)
  document.querySelector("#cart__items").appendChild(article)
  afficheTotalQuantity()
  afficheTotalPrice()
  initLoad()
}
//
//-----------------------------------------------------
// fonction qui récupère les quantités et les additionnes pour afficher le total
//-----------------------------------------------------
//
function afficheTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity")
  const total = cart.reduce((total, item) => total + item.quantity, 0)
  totalQuantity.textContent = total
}
//
//-----------------------------------------------------
// fonction qui récupère les quantités et prix et afficher le montant total du panier
//-----------------------------------------------------
//
function afficheTotalPrice() {
  const totalPrice = document.querySelector("#totalPrice")
  const total = cart.reduce((total, item) => total+ item.price * item.quantity, 0)
  totalPrice.textContent = total
}
//
//-----------------------------------------------------
// fonction qui fabrique la partie description de l'article
//-----------------------------------------------------
//
function createStructDescription(item) {
  const cardItem = document.createElement("div")
  cardItem.classList.add("cart__item__content")
  const description = createDescription(item)
  const settings = createDivSettings(item)
  cardItem.appendChild(description)
  cardItem.appendChild(settings)
  return cardItem
}
//
//-----------------------------------------------------
// fonction qui met en écoute le lien de suppression et les modifications de quantités
//-----------------------------------------------------
//
function createDivSettings(item) {
  const elementDiv = document.createElement("div")
  elementDiv.classList.add("cart__item__content__settings")
  addDivQuantity(elementDiv, item)
  addDivDelete(elementDiv, item)
  return elementDiv
}
//
//-----------------------------------------------------
// fonction qui créer le block de suppression et met le lien "supprimer" en écoute
//-----------------------------------------------------
//
function addDivDelete(settings, item) {
  const div = document.createElement("div")
  div.classList.add("cart__item__content__settings__delete")
  div.addEventListener("click", () => deleteItem(item))
  const p   = document.createElement("p")
  p.classList.add("deleteItem")
  p.textContent = "Supprimer"
  div.appendChild(p)
  settings.appendChild(div)
}
//
//-----------------------------------------------------
// fonction qui cherche l'article à supprimer du panier et mettre à jour l'affichage
//-----------------------------------------------------
//
function deleteItem(item) {
  const itemForDelete = cart.findIndex(
    (product) => product.id === item.id && product.color === item.color
  )
  if (itemForDelete > -1) {
    cart.splice(itemForDelete, 1)
    afficheTotalPrice()
    afficheTotalQuantity()
    deleteData(item)
    deleteArticle(item)
  }
}
//
//-----------------------------------------------------
// fonction de suppression d'article appelé par la fonction précédente
//-----------------------------------------------------
//
function deleteArticle(item) {
  const itemForDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
  itemForDelete.remove()
}
//
//-----------------------------------------------------
// fonction qui créer la DIV comprenant le INPUT et met en écoute pour la modification de quantité
//-----------------------------------------------------
//
function addDivQuantity(settings, item) {
  const quantity = document.createElement("div")
  quantity.classList.add("cart__item__content__settings__quantity")
  const p = document.createElement("p")
  p.textContent = "Qté : "
  quantity.appendChild(p)
  const input = document.createElement("input")
  input.type  = "number"
  input.classList.add("itemQuantity")
  input.name  = "itemQuantity"
  input.min   = "1"
  input.max   = "100"
  input.value = parseInt(item.quantity)
  input.addEventListener("input", () => ListenQuantity(item.id, parseInt(input.value), item))
  quantity.appendChild(input)
  settings.appendChild(quantity)
}
//
//-----------------------------------------------------
// fonction qui met à jour la modification de quantité d'un article
//-----------------------------------------------------
//
function ListenQuantity(id, newValue, item) {
  const itemUpdate = cart.find((product) => product.id === id && product.color == item.color) 
  itemUpdate.quantity = parseInt(newValue)
  item.quantity = parseInt(itemUpdate.quantity)  
  afficheTotalQuantity()
  afficheTotalPrice()
  saveModifyData(item)
}
//
//-----------------------------------------------------
// fonction qui supprimer un article du localStorage
//-----------------------------------------------------
//
function deleteData(item) {
  const key = `${item.id}-${item.color}`
  localStorage.removeItem(key)
}
//
//-----------------------------------------------------
// fonction qui sauvegarde un article dans le localStorage
//-----------------------------------------------------
//
function saveModifyData(item) {
  let tempArray    = item
  delete tempArray.price
  const dataToSave = JSON.stringify(tempArray)
  const key        = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
  cart.splice(0, cart.length)
  loadCart()
}
//
//-----------------------------------------------------
// fonction qui affecte un pattern regex au input #email,
// met un peu de padding-left pour une question d'esthétique, 
// et test si les éléments du formulaire sont vides.
//-----------------------------------------------------
//
function initLoad() {
  document.getElementById("mess-oblig").style.textAlign = "right"
  const email = document.querySelector("#email")
  email.addEventListener("keyup", (element) => controlEmail())
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  inputs.forEach((element) => { 
    if (element.value != "") {
      if (element.id === "order") element.setAttribute("style", "padding-left: 28px;")
      if (element.id != "order") element.setAttribute("style", "padding-left: 15px;") 
    } else {
      if (element.id != "order") element.setAttribute("style", "padding-left: 15px;")
    }
  })
}
//
//-----------------------------------------------------
// fonction qui à chaque frappe de caractère si le contenu est correctement formaté
//-----------------------------------------------------
//
function controlEmail() { 
  const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i)
  const elem    = document.querySelector("#email")
  const valueTextEmail = elem.value
  const resultRegex    = valueTextEmail.match(pattern)
  const errorMsg       = document.querySelector("#emailErrorMsg")
  if (resultRegex == null) {
    elem.setAttribute("style", "color: #FF0000")
    errorMsg.textContent = "Veuillez entrer une adresse email valide !"
    return false
  } else {
    elem.setAttribute("style", "color: #000")
    errorMsg.textContent = ""
    return true
  }
}
//
//-----------------------------------------------------
// fonction qui créer la DIV qui contient la description de l'article et le prix
//-----------------------------------------------------
//
function createDescription(item) {
  const description = document.createElement("div")
  description.classList.add("cart__item__content__description")
  const h2       = document.createElement("h2")
  h2.textContent = item.name
  const p        = document.createElement("p")
  p.textContent  = item.color
  const p2       = document.createElement("p")
  p2.textContent = item.price + " €"
  description.appendChild(h2)
  description.appendChild(p)
  description.appendChild(p2)
  return description
}
//
//-----------------------------------------------------
// fonction qui créer l'élément article
//-----------------------------------------------------
//
function createArticle(item) {
  const article = document.createElement("article")
  article.classList.add("cart__item")
  article.dataset.id    = item.id
  article.dataset.color = item.color
  return article
}
//
//-----------------------------------------------------
// fonction qui créer la DIV image
//-----------------------------------------------------
//
function createImageDiv(item) {
  const div   = document.createElement("div")
  div.classList.add("cart__item__img")
  const image = document.createElement("img")
  image.src   = item.imageUrl
  image.alt   = item.altTxt
  div.appendChild(image)
  return div
}
//
//-----------------------------------------------------
// fonction qui transmet le formulaire et les données à la page confirmation.html
//-----------------------------------------------------
//
function submitForm(order) {
  order.preventDefault()     // empêche de rafraichir la page
  if (cart.length === 0) { 
    theBasketIsEmpty()
    return 
  }
  // test si les champs sont vides
  const pass = testFieldsIsEmpty()
  if (pass) {
      // construit l'objet avec les données de contacts et la liste des IDs des articles
      const contactForm = createObjetForContactForm()

      if (controlEmail()) sendCommand(contactForm)
  }
}
//
//-----------------------------------------------------
// fonction qui transmet la commande
//-----------------------------------------------------
//
async function sendCommand(contactForm) {
  await fetch("http://localhost:3000/api/products/order", {
    method: "POST",                     
    body: JSON.stringify(contactForm),
    headers: { "Content-Type"  : "application/json" }
  })
    .then((res) => res.json())
    .then((data) => { 
      const orderId = data.orderId
      window.location.href = "confirmation.html?orderId=" + orderId
    })
    .catch((err) => {
      console.error(err)
      alert("erreur: " + err)
    })
}
//
//-----------------------------------------------------
// fonction qui affiche "Votre panier est vide !"
//-----------------------------------------------------
//
function theBasketIsEmpty() {
  const parent = document.querySelector("#mess-oblig")
  parent.style.color       = "#82FA58"
  parent.style.fontweight  = "bold"
  parent.style.borderStyle = "solid"
  parent.style.borderColor = "#E3F6CE"
  parent.style.background  = "#3d4c68"
  parent.style.padding     = "10px"
  parent.style.borderRadius= "15px"
  parent.style.textAlign   = "center"
  parent.textContent       = "Votre panier est vide"
}
//
//-----------------------------------------------------
// fonction qui renvoie un tableau de tous les IDs des articles du panier
//-----------------------------------------------------
//
function listIDs() {
  const numberOfProducts = localStorage.length
  let ids = []
  for (let cpt = 0; cpt < numberOfProducts; cpt++) {
    const key = localStorage.key(cpt)
    const id  = key.split("-")[0]  // transforme la clé en tableau et renvoie la 1ère valeur [0]
    ids.push(id)
  }
  return ids
}
//
//-----------------------------------------------------
// fonction qui test si le contenu d'un champs est vide, et met la bordure en rouge ou en gris
//-----------------------------------------------------
//
function testInData(element) {
   if (element.id != "order") {
    if (element.value === "") {
      element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
    } else {
      element.setAttribute("style", "border:1px solid #767676; padding-left: 15px;")
      switch(element.id) {
        case "firstName" : { 
          document.querySelector("#firstNameErrorMsg").textContent = ""
          break
        }
        case "lastName"  : { 
          document.querySelector("#lastNameErrorMsg").textContent = ""
          break
        }
        case "address"   : { 
          document.querySelector("#addressErrorMsg").textContent = ""
          break
        }
        case "city"      : { 
          document.querySelector("#cityErrorMsg").textContent = ""
          break
        }
      }
    }
  }
}
//
//-----------------------------------------------------
// fonction qui créer l'objet qui renvoi les données de contact
//-----------------------------------------------------
//
function createObjetForContactForm() {
  const form = document.querySelector(".cart__order__form")
  const contactForm = {
      contact : { 
        firstName : form.firstName.value, 
        lastName  : form.lastName.value, 
        address   : form.address.value, 
        city      : form.city.value, 
        email     : form.email.value
      }, products: listIDs()  // fournit la liste des IDs à transmettre
    }  
    return contactForm
}
//
//-----------------------------------------------------
// fonction qui test si les champs contact sont vides
//-----------------------------------------------------
//
function testFieldsIsEmpty() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input")
  let pass = true
  inputs.forEach((element) => {

    element.addEventListener("input", () => testInData(element))

    switch(element.id) {
      case "firstName" : { 
        if (element.value == "") {
          element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
          document.querySelector("#firstNameErrorMsg").textContent = "Veuillez entrer votre prénom"
          pass = false 
        }
      }
      case "lastName" : { 
        if (element.value == "") {
          element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
          document.querySelector("#lastNameErrorMsg").textContent = "Veuillez entrer votre nom"
          pass = false 
        }
      }
      case "address" : {
        if (element.value == "") {
          element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
          document.querySelector("#addressErrorMsg").textContent = "Veuillez entrer votre adresse"
          pass = false 
        }
      }
      case "city" : {
        if (element.value == "") {
          element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
          document.querySelector("#cityErrorMsg").textContent = "Veuillez entrer une ville"
          pass = false 
        }
      }
      case "email" : {
        if (element.value == "") {
          element.setAttribute("style", "border:1px solid #FF0000; padding-left: 15px;")
          document.querySelector("#emailErrorMsg").textContent = "Veuillez entrer une adresse email valide !"
          pass = false 
        }
      }
    }
  })
  return pass
}
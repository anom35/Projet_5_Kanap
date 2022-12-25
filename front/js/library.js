
// fonction sauvegarde du panier dans le localstorage
export function saveCart(cart) {
    localStorage.setItem(cart.id, JSON.stringify(cart))
}

// fonction récupère un article
export function getCart() {
    let panier = JSON.parse(localStorage.getItem(varId))
    if (panier == null ) {
        return []
    } else {
        return JASON.parse(panier)
    }
}

// fonction qui ajoute au panier
export function addCart(product) {
    let panier = getproduct()
    let productExist = panier.find(p => p.id == product.id)
    if (productExist != undefined) {
        productExist.quantity++
    } else {
        productExist.quantity = 1
        panier.push(product)
    }
    saveCart(panier)
}

// fonction qui supprimer un article du panier
export function deleteArticleFromCart(product) {
    let panier = getCart()
    panier = panier.filter(p => p.id != product.id) // filtre tous ceux qui sont différent et supprime celui qui est indentique
    saveCart(panier)
}

// fonction qui change la quantité d'un article dans le panier
export function changeQuantityFromCart(product, quantity) {
    let panier = getproduct()
    let productExist = panier.find(p => p.id == product.id)
    if (productExist != undefined) {
        productExist.quantity += quantity
        if (productExist.quantity <= 0) {
            deleteArticleFromCart(productExist)
        } else {
            saveCart(panier)
        }
    } 
}

// fonction qui calcul le nombre d'articles total dans le panier
export function calculNumberArticles() {
    let panier = getCart()
    let number = 0
    for (let article of panier) {
        number += article.quantity
    }
    return number
}

// fonction qui calcul le prix total dans le panier
export function calculTotalPrice() {
    let panier = getCart()
    let total = 0
    for (let article of panier) {
        total += article.price
    }
    return total
}
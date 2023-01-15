let orderId = new URLSearchParams(window.location.search).get("orderId")
document.getElementById("orderId").textContent =  orderId
window.localStorage.clear()
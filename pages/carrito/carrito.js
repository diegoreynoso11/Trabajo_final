let carrito = JSON.parse(localStorage.getItem("carrito")) || {};


function agregarAlCarrito(listItem) {
  var cartItem = {
    id: listItem.id,
    title: listItem.querySelector(".h1-catalogo").innerText,
    price: listItem.querySelector("p").innerText,
    thumbnail: listItem.querySelector(".li-img-catalogo").src,
    quantity: 1,
};
  if (carrito.hasOwnProperty(cartItem.id)) {
    cartItem.quantity = carrito[cartItem.id].quantity + 1;
  }
  carrito[cartItem.id] = { ...cartItem };
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // console.log(carrito)
}

for (let item in carrito) {
    console.log(carrito[item].price);
    const carritoLista = document.querySelector("#carrito");
    const newLi = document.createElement("li");
    newLi.innerHTML = `<li id="${carrito[item].id}"class=li-carrito>
    <h2 class="h1-carrito">${carrito[item].title}</h2>
            <p>$ ${carrito[item].price} </p>
            <p>${carrito[item].quantity} </p>
            
            <img class="li-img-carrito" src="${carrito[item].thumbnail}" title="${carrito[item].title}" alt="${carrito[item].title}">
            </li>
            `;
            carritoLista.appendChild(newLi);
  }
function crearElementoCarrito() {
}
crearElementoCarrito()
export { agregarAlCarrito };

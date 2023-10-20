//JSON.parse(localStorage.getItem("carrito")) ||
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};
const total = document.getElementById("total");
const cantidadProductos = document.getElementById("cantidadProductos");
const totalTitulo = document.querySelector(".total-h2");
const cantidadProductosTitulo = document.querySelector(".cantidadProductos-h2");
const botonPagar = document.querySelector(".boton-pagar")
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
}
function nuevoElemento() {
  for (let item in carrito) {
    const nPrecio = Number(carrito[item].price) * carrito[item].quantity;
    const carritoLista = document.querySelector("#carrito");
    const newLi = document.createElement("li");
    newLi.innerHTML = `
  <li id="${carrito[item].id}" class=li-carrito>
                    <h1 class="h1-carrito">${carrito[item].title}</h1>
                    <img class="li-img-carrito" src="${carrito[item].thumbnail}" title="${carrito[item].title}" alt="${carrito[item].title}">
  <p>$ ${carrito[item].price} </p>
            <span>Cantidad : </span><p class="quantity">${carrito[item].quantity} </p>
            <div class="btn-sum-res">
            <button class="mas" id="${carrito[item].id}-mas">+</button>
            <button class="minus" id="${carrito[item].id}-minus">-</button>
            </div>
            <button class="btn-delete" id="${carrito[item].id}-delete">Eliminar</button>
            <p id="${carrito[item].id}" class="subtotal">Subtotal : ${nPrecio}</p>
            </li>
            `;
    if (carritoLista) {
      carritoLista.appendChild(newLi);
    }
    newLi.addEventListener("click", (e) => {
      btnAccion(e);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
  }
}
nuevoElemento();

const btnAccion = (e) => {
  const listItem = e.target.closest("li");
  //sumar
  if (e.target.classList.contains("mas")) {
    const subtotal = listItem.querySelector(".subtotal");
    const productId = listItem.id;
    const cartItem = carrito[productId];

    cartItem.quantity++;
    const quantityElement = listItem.querySelector(".quantity");
    if (quantityElement) {
      subtotal.textContent = `Subtotal : ${cartItem.price * cartItem.quantity}`;
      quantityElement.textContent = cartItem.quantity;
    }
    actualizarTotalYCantidad();
  }
  //restar
  if (e.target.classList.contains("minus")) {
    const subtotal = listItem.querySelector(".subtotal");
    const productId = listItem.id;
    const cartItem = carrito[productId];
    cartItem.quantity--;
    const quantityElement = listItem.querySelector(".quantity");
    if (quantityElement) {
      subtotal.textContent = `Subtotal : ${cartItem.price * cartItem.quantity}`;
      quantityElement.textContent = cartItem.quantity;
    }
    if (cartItem.quantity === 0) {
      delete carrito[productId];
      listItem.remove();
    }
    actualizarTotalYCantidad();
  }
  //eliminar
  if (e.target.classList.contains("btn-delete")) {
    const productId = listItem.id;
    delete carrito[productId];
    listItem.remove();
    actualizarTotalYCantidad();

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  e.stopPropagation();
};
function actualizarTotalYCantidad() {
  const nCantidad = Object.values(carrito).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );
  if (nCantidad === 0 && nPrecio === 0) {
    if (total) {
      total.innerHTML = "Ningun producto en el carrito";
    }

    if (cantidadProductos) {
      cantidadProductos.innerHTML = "";
      totalTitulo.innerHTML = "";
      cantidadProductosTitulo.innerHTML = "";
      botonPagar.style.visibility = "hidden"
    }
  } else {
    if (total) {
      total.innerHTML = `$ ${nPrecio}`;
    }

    if (cantidadProductos) {
      cantidadProductos.innerHTML = nCantidad;
    }
  }
}
actualizarTotalYCantidad();
export { agregarAlCarrito };

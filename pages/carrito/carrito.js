//JSON.parse(localStorage.getItem("carrito")) ||
let carrito =  {};
const total = document.getElementById("total");
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
let totalProducto = 0;
for (let item in carrito) {
  // console.log(carrito);
  const carritoLista = document.querySelector("#carrito");
  const newLi = document.createElement("li");
  let subtotal = Number(carrito[item].price) * carrito[item].quantity;
  totalProducto += subtotal;
  console.log(carrito);
  newLi.innerHTML = `
                    <li id="${carrito[item].id}" class=li-carrito>
                    <h2 class="h1-carrito">${carrito[item].title}</h2>
                    <img class="li-img-carrito" src="${
                      carrito[item].thumbnail
                    }" title="${carrito[item].title}" alt="${
    carrito[item].title
  }">
            <p>$ ${carrito[item].price} </p>
            <p>Cantidad : ${carrito[item].quantity} </p>
            <div class="btn-sum-res">
            <button>+</button>
            <button>-</button>
            </div>
          <button class="btn-delete">Eliminar</button>
            
            <p>Subtotal : ${
              Number(carrito[item].price) * carrito[item].quantity
            }</p>
            </li>
            `;
  carritoLista.appendChild(newLi);
}
// total.innerHTML = `$ ${totalProducto}`;
function crearElementoCarrito() {}
crearElementoCarrito();
export { agregarAlCarrito };

import { agregarAlCarrito } from '../carrito/carrito.js';


async function agregarElemento() {
  const catalogoLista = document.querySelector("#catalogo");
  try {
    const busqueda = await fetch("../../.json/csvjson.json");
    const dataBusqueda = await busqueda.json();
    //buscador por input
    const buscador = document.getElementById("buscador");
    buscador.addEventListener("input", (e) => {
      const nwbusqueda = dataBusqueda.filter(
        (item) => item.name === e.target.value
      );
      console.log(item.name)
    });
    for (let i = 0; i < 6; i++) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${
          dataBusqueda[parseInt(Math.random() * dataBusqueda.length)].name
        }`
      );
      const dataResponse = await response.json();
      const newItem = dataResponse.results[0];
      console.log(newItem);

      const newLi = document.createElement("li");
      newLi.innerHTML = `<li id="${newItem.id}"class=li-catalogo>
          <h2 class="h1-catalogo">${newItem.title}</h2>
          <strong>Precio:</strong> 
          <p>$ ${newItem.price} </p>
          <img class="li-img-catalogo" src="${newItem.thumbnail}" title="${newItem.title}" alt="${newItem.title}">
          <div class="div-info-catalogo">
          <button  class="button-icon info"><img src="../../statics/icons/info.svg" title="Informacion" alt="Informacion" class="icon-img"></button>
          <button  class="cart button-icon"><img src="../../statics/icons/cart.svg" title="Agregar al carrito" alt="CarritoSvg" class="icon-img"></button>
          </div>
          </li>
          `;
      catalogoLista.appendChild(newLi);
    }
    const info = document.querySelectorAll(".info");
    const cart = document.querySelectorAll(".cart");
    info.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        console.log("carrito", index, e.target.closest('li'));
      });
    });
    cart.forEach((btn, index) => {
      btn.addEventListener("click", (e) => {
        var listItem = e.target.closest('li');
        agregarAlCarrito(listItem)
        
    });
  });
} catch (error) {
  console.error(error);
}
}
agregarElemento();

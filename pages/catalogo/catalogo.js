import {
  agregarAlCarrito,
  carrito,
  actualizarTotalYCantidad,
} from "../carrito/carrito.js";

const h1ProductosCatalogo = document.querySelector(".h1-productos-catalogo");
const totCarrito = document.querySelector("#tot-carrito");
const table = document.querySelector(".table-catalogo")
const modal = document.getElementById("modal")
const cerrarModal = document.querySelector(".cerrar-modal")
const blurElement = document.querySelector(".blur")
async function agregarElemento() {
  const catalogoLista = document.querySelector("#catalogo");
  try {
    const busqueda = await fetch("../../.json/csvjson.json");
    const dataBusqueda = await busqueda.json();
    //buscador por input
    const buscador = document.getElementById("buscador");
    let timeout = null;
    buscador.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        catalogoLista.innerHTML = "";
        if (e.target.value.trim() !== "") {
          const nwbusqueda = dataBusqueda.filter((item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
          );
          if (nwbusqueda.length === 0) {
            h1ProductosCatalogo.innerHTML = "Ningun producto encontrado";
          } else {
            h1ProductosCatalogo.innerHTML = "Productos encontrados..";
          }
          for (let i = 0; i <= nwbusqueda.length; i++) {
            const element = nwbusqueda[i];
            const res = await fetch(
              `https://api.mercadolibre.com/sites/MLA/search?q=${element.name}`
            );
            const dataRes = await res.json();
            const newLi = document.createElement("li");
            const newItem = dataRes.results[0];
            newLi.innerHTML = `<li id="${newItem.id}"class=li-catalogo>
        <h2 class="h1-catalogo">${element.name}</h2>
        <strong>Precio:</strong><br/>
        <div class="div-precio-catalogo">
        <span>$</span><p>${newItem.price} </p>
        </div>
        <img class="li-img-catalogo" src="${newItem.thumbnail}" title="${newItem.title}" alt="${newItem.title}">
        <div class="div-info-catalogo">
        <button class="button-icon info"><img src="../../statics/icons/info.svg" title="Funcionalidad en proceso.." alt="Informacion" class="icon-img"></button>
        <button  class="cart button-icon"><img src="../../statics/icons/cart.svg" title="Agregar al carrito" alt="CarritoSvg" class="icon-img"></button>
        </div>
        </li>
        `;
            catalogoLista.appendChild(newLi);
          }
        }
      }, 1000);
    });
    for (let i = 0; i < 6; i++) {
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${
          dataBusqueda[parseInt(Math.random() * dataBusqueda.length)].name
        }`
      );
      const dataResponse = await response.json();
      const newItem = dataResponse.results[0];
      const newLi = document.createElement("li");
      newLi.innerHTML = `<li id="${newItem.id}"class=li-catalogo>
          <h2 class="h1-catalogo">${newItem.title}</h2>
          <strong>Precio:</strong><br/>
          <div class="div-precio-catalogo">
          <span>$</span><p>${newItem.price} </p>
          </div>
          <img class="li-img-catalogo" src="${newItem.thumbnail}" title="${newItem.title}" alt="${newItem.title}">
          <div class="div-info-catalogo">
          <button class="button-icon info"><img src="../../statics/icons/info.svg" title="Funcionalidad en proceso" alt="Informacion" class="icon-img"></button>
          <button class="cart button-icon"><img src="../../statics/icons/cart.svg" title="Agregar al carrito" alt="CarritoSvg" class="icon-img"></button>
          </div>
          </li>
          `;
      catalogoLista.appendChild(newLi);
    }
    catalogoLista.addEventListener("click", (e) => {
      //funcionalidad en proceso
      if (e.target.closest(".info")) {
        blurElement.style.visibility = "visible"
        modal.style.opacity = "1"
        modal.style.visibility = "visible"
        var infoItem = e.target.closest("li");
        obtenerDescripcion(infoItem.id)
      } else if (e.target.closest(".cart")) {
        var listItem = e.target.closest("li");
        agregarAlCarrito(listItem);
        let cantidad = actualizarTotalYCantidad();
        totCarrito.innerHTML = `${cantidad}`;
        totCarrito.style.visibility = "visible";
      }
    });
  } catch (error) {
    console.error(error);
  }
}
async function obtenerDescripcion(id) {
  const response = await fetch(
    `https://api.mercadolibre.com/items/${id}?attributes=attributes&include_internal_attributes=true`
  );
  const dataResponse = await response.json();
  table.innerHTML = "";
  dataResponse.attributes.map((attribute) => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    tdName.textContent = attribute.name;
    tdValue.textContent = attribute.value_name;
    tr.append(tdName, tdValue)
    table.append(tr)
  })
    
  
}
cerrarModal.addEventListener("click", () => {
  modal.style.opacity = "0"
  modal.style.visibility = "hidden";
  blurElement.style.visibility = "hidden"


})
agregarElemento();

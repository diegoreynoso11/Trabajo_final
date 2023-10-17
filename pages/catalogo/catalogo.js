document.addEventListener("DOMContentLoaded", function () {
  async function agregarElemento() {
    const catalogoLista = document.querySelector("#catalogo");
    try {
      const busqueda = await fetch("../../.json/csvjson.json");
      const dataBusqueda = await busqueda.json();

      for (let i = 0; i < 8; i++) {
        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?q=${
            dataBusqueda[parseInt(Math.random() * 901)].name
          }`
        );
        const dataResponse = await response.json();
        const firtItem = dataResponse.results[0];
        console.log(firtItem);
        const newLi = document.createElement("li");
        newLi.innerHTML = `<li class=li-catalogo>
          <h2 class="h1-catalogo">${firtItem.title}</h2>
          <strong>Precio:</strong> 
          <p>$ ${firtItem.price} </p>
          <img class="li-img-catalogo" src="${firtItem.thumbnail} " alt="${firtItem.title}">
          <div class="div-info-catalogo">
          <button>Mas<br/>informacion</button>
          <button>Agregar al<br/>Carrito</button>
          </div>
          
          </li>
          `;
        catalogoLista.appendChild(newLi);
      }
    } catch (error) {
      console.error(error);
    }
  }
  agregarElemento();
});

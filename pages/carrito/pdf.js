const fs = require('fs');
import * as pdfkit from './pdfkit.js';
// Tus datos del carrito
let carrito = {
    "MLA881484955": {
        id: "MLA881484955",
        price: "7199",
        quantity: 1,
        thumbnail: "http://http2.mlstatic.com/D_790773-MLA69854166764_062023-I.jpg",
        title: "Galletitas Santa María X6 Cajas(200gr) Vs Sabores Sin Tacc"
    },
    "MLA1365295500": {
        id: 'MLA1365295500',
        title: 'Pimienta Negra En Grano - Sin Tacc - Pote De 150gr',
        price: '2850',
        thumbnail: 'http://http2.mlstatic.com/D_678428-MLA53490708574_012023-I.jpg',
        quantity: 1
    }
};

// Crear un documento PDF
var doc = new PDFDocument;

doc.pipe(fs.createWriteStream('output.pdf'));

// Añadir los datos del carrito al PDF
for (let item in carrito) {
    doc.fontSize(14)
       .text(`${carrito[item].title}`, {underline: true})
       .fontSize(12)
       .text(`Precio: ${carrito[item].price}`)
       .text(`Cantidad: ${carrito[item].quantity}`)
       .moveDown();
}
console.log(doc)
doc.end();


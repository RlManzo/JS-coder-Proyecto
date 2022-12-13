
class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }

}

const producto1 = new Producto(1, "Remera Lisa", 1500, "img/muestra-jaa.png");
const producto2 = new Producto(2, "Remera Dignidad", 1500, "img/muestra-j10.png");
const producto3 = new Producto(3, "Homero Maggio", 1500, "img/muestra-bb.png");
const producto4 = new Producto(4, "Remera rafa", 1500, "img/muestra-fa.png");
const producto5 = new Producto(5, "almohadon Rocklets", 1300, "img/Rocklets.png");
const producto6 = new Producto(6, "taza Signos", 900, "img/tazaSignos1.jpg" );
const producto7 = new Producto(7, "taza Signos 2", 900, "img/tazaSignos2.jpg");
const producto8 = new Producto(8, "taza Spiderman", 750, "img/tazaSpiderman.png");
const producto9 = new Producto(9, "taza Marvel", 750, "img/tazaMarvel.png");

let arrayCatalogo = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
    arrayCatalogo.forEach(Producto  => {
        const card = document.createElement("div");
        card.classList.add( "col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML =  `
                          <div class="img1">
                          <img src="${Producto.img}"  class="imgProductos" alt="${Producto.nombre}">
                          <div>
                          <h5 class="card-title text-center">${Producto.nombre}</h5>
                          <p class="text-center">$${Producto.precio}</p>
                          <button class="btn btn-primary pComprar" id= boton${Producto.id}>Comprar</button>
    
          </div>
       </div>`
        
        contenedorProductos.appendChild(card);

        const boton = document.getElementById( `boton${Producto.id}`);
            boton.addEventListener("click",() => {
            agregarAlCarrito(Producto.id)
        })

        
    })
}

const agregarAlCarrito = (id) => {
    const  productoEnCarrito = carrito.find (Producto => Producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        const producto = arrayCatalogo.find(Producto => Producto.id === id);
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

const verCarrito = document.getElementById("verCarrito");

const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));

})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(Producto => {
        const card = document.createElement("div");
        card.classList.add( "col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML =  `
                          <div class="img1 btn">
                          <img src="${Producto.img}"  class="imgProductos" alt="${Producto.nombre}">
                          <div >
                          <h5 class="card-title ">${Producto.nombre}</h5>
                          <p>${Producto.precio}</p>
                          <p>${Producto.cantidad}</p>
                          <button class="btn btn-primary" id= eliminar${Producto.id}>eliminar producto</button>
    
          </div>
       </div>`

       contenedorCarrito.appendChild(card);
       
       let eliminar = document.getElementById(`eliminar${Producto.id}`);
    eliminar.addEventListener("click", () => {
        eliminarProducto (Producto.id);
        calcularTotal();
        localStorage.setItem("carrito", JSON.stringify(carrito));

})
    })

    
}

function eliminarProducto(id) {
    const producto = carrito.find(Producto => Producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);

mostrarCarrito();
calcularTotal();
} 
   
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
eliminarTodoelcarrito();
localStorage.setItem("carrito", JSON.stringify(carrito));

})
 
const eliminarTodoelcarrito = () => {
    carrito = [];
    mostrarCarrito();
    calcularTotal();
localStorage.clear();
    }
const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(Producto =>{
        totalCompra += Producto.precio * Producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
    
}



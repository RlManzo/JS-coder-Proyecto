
class Producto{
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
    }

}

const producto1 = new Producto(1, "Remera Lisa (Talle unico M)" , 1500, "img/muestra-jaa.png");
const producto2 = new Producto(2, "Remera Dignidad  (Talle unico M", 1500, "img/muestra-j10.png");
const producto3 = new Producto(3, "Homero Maggio (Talle unico M)", 1500, "img/muestra-bb.png");
const producto4 = new Producto(4, "Remera rafa (Talle unico M)", 1500, "img/muestra-fa.png");
const producto5 = new Producto(5, "Almohadon Rocklets", 1300, "img/Cabsha.png");
const producto6 = new Producto(6, "Almohadon Cabsha", 1300, "img/Rocklets.png");
const producto7 = new Producto(7, "Taza Signos (ceramica)", 900, "img/tazaSignos1.jpg" );
const producto8 = new Producto(8, "Taza Signos 2 (ceramica)", 900, "img/tazaSignos2.jpg");
const producto9 = new Producto(9, "Taza Spiderman", 750, "img/tazaSpiderman.png");
const producto10 = new Producto(10, "Taza Marvel (polimero)", 750, "img/tazaMarvel.png");
const producto11 = new Producto(11, "Jarro termico Frida", 900, "img/mockup-de-jarro-termico.jpg");
const producto12 = new Producto(12, "Set de mate", 2000, "img/set-de-mate-pack-05-hecho-con-amor.jpg");
const producto13 = new Producto(13, "Set de mate 2", 2000, "img/set-de-mate-pack-17-rosas.jpg");
const producto14 = new Producto(14, "Set de mate 3", 2000, "img/mockup-de-set-de-mate-de-polimero1-64314dcf4e07e67f2616265628234898-480-0.jpg");
const producto15 = new Producto(15, "Taza Campeones 1(ceramica)", 900, "img/mk1.jpg");
const producto16 = new Producto(16, "Taza Campeones (ceramica)", 900, "img/mk11.jpg");




let arrayCatalogo = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16];

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
                          <img src="${Producto.img}" class="imgProductos" alt="${Producto.nombre}">
                          <div>
                          <h5 class="card-title text-center">${Producto.nombre}</h5>
                          <p class="text-center h6">$${Producto.precio}</p>
                          <button class="btn btn-primary pComprar" id= boton${Producto.id}>Comprar</button>
    
          </div>
       </div>`
        
        contenedorProductos.appendChild(card);

        const boton = document.getElementById( `boton${Producto.id}`);
            boton.addEventListener("click",() => {
            agregarAlCarrito(Producto.id)
            Toastify({
                text: "Agregaste el producto!",
                gravity: "bottom",
                style: {
                    background: "linear-gradient(247deg, rgba(37,177,86,0.6727065826330532) 0%, rgba(44,205,14,1) 100%)",
                    
                }
            }).showToast();
        })

        
    })
} 


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(Producto => Producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else {
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
                          <div class="btn cardImgModal">
                          <img src="${Producto.img}"  class="imgProductos" alt="${Producto.nombre}">
                          <div >
                          <h5 class="card-title ">${Producto.nombre}</h5>
                          <p class= "h6">$${Producto.precio}</p>
                          <p>${Producto.cantidad}</p>
                          <button class="btn btn-primary" id= eliminar${Producto.id}>Eliminar producto</button>
    
          </div>
       </div>`

contenedorCarrito.appendChild(card);
       
let eliminar = document.getElementById(`eliminar${Producto.id}`);
eliminar.addEventListener("click", () => {
        eliminarProducto (Producto.id);
       Swal.fire({
        title: "Eliminaste el producto!",
        text: "¡Podes volver a comprar!",
        icon: "success",
        button: "OK",

    });

        
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
Swal.fire({
    title: "Eliminaste los productos!",
    text: "¡Podes volver a comprar!",
    icon: "warning",
    button: "OK",

});
localStorage.setItem("carrito", JSON.stringify(carrito));
})

const finalizarCompra = document.getElementById("finalizarCompra")

finalizarCompra.addEventListener("click", () => {
    carritoVacioModal();
})

const carritoVacioModal = () => {
        Swal.fire({
            title: "Gracias por tu compra!",
            text: "seras redirigido",
            icon: "success",
            button: "Ok",
       });
    
    
};

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

/* Buscador de productos */

const buscador = document.getElementById("buscador");
const resultado = document.getElementById("resultado");
const busqueda = document.getElementById("busqueda");
        
const filtrar = () => {
           resultado.innerHTML = '';
           const texto = buscador.value.toLowerCase();
             for ( let producto of arrayCatalogo ){
                let nombre = producto.nombre.toLowerCase();
                   
                if ( nombre.indexOf(texto) !== -1){
                    resultado.innerHTML += `
                    
                    <li class="listStyle">
                        <img src=${producto.img} class="imgBuscador" alt="..."<h5 class="textoBuscador" >${producto.nombre}</h5>
                        <p></p></li>
                        <button class="btn btn-primary pComprar pComprarBuscador" id= botton${producto.id}>Comprar</button>    
                    `
                    busqueda.style.opacity = 1;
                  
                    const botton = document.getElementById(`botton${producto.id}`);
                    botton.addEventListener("click", () => {
                        agregarAlCarrito(producto.id);
                        
                    } )
                  
                 }
                   
    
               
               if( resultado.innerHTML == '' ){
                 resultado.innerHTML = `<li>Producto no encontrado</li>`;
            }
            const cerrarBusqueda = document.getElementById("cerrarBusqueda")
            cerrarBusqueda.addEventListener("click", () =>{
                busqueda.style.opacity = 0;
            })
            };
            
        };
    
buscador.addEventListener("keyup", filtrar)
  
 /* "FETCH para agregar productos a la seccion de "Ofertas"*/        
       
const carrousel = "json/productos.json";
const acordion = document.getElementById("acordionOfertas")     
        fetch(carrousel)
        .then(respuesta => respuesta.json())
        .then(datos => {
         datos.forEach(productos =>{
            const card = document.createElement("div");
            card.classList.add( "col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML =  `
                              <div class="imgDescuento">
                              <img src="${productos.img}" class="imgProductos" alt="${productos.nombre}">
                              <div>
                              <h5 class="card-title text-center">${productos.nombre}</h5>
                              <p class="text-center h6">Descuento 10%: $${productos.precio}</p>
                              <button class="btn btn-primary pComprar" id= buton${productos.id}>Comprar</button>

</div>
</div>
         `
acordion.appendChild(card);
const buton = document.getElementById(`buton${productos.id}`);
buton.addEventListener("click", () =>{
    agregamosAlCarrito(productos.id);
    Toastify({
        text: "Agregaste el producto!",
        gravity: "bottom",
        style: {
            background: "linear-gradient(247deg, rgba(37,177,86,0.6727065826330532) 0%, rgba(44,205,14,1) 100%)",
            
        }
    }).showToast();


});
 
const agregamosAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(productos => productos.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else {
        const producto = datos.find(productos => productos.id === id);
        carrito.push(productos);
        localStorage.setItem("carrito", JSON.stringify(carrito));    
    }
    calcularTotal();
} 

        }); 
    }).catch(error => console.log(error))
    .finally(() =>{
        console.log("proceso finalizado");
    })
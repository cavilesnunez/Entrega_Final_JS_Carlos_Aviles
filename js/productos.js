// const productos = [
//     {
//         id: 1,
//         foto: "https://kbd.news/pic/2022/107/1805.jpg",
//         nombre: "42Azalia",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 1500
//     },
//     {
//         id: 2,
//         foto: "https://kbd.news/pic/2022/71/1334.jpg",
//         nombre: "Banime40",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 1850
//     },
//     {
//         id: 3,
//         foto: "https://kbd.news/pic/2022/92/1604.jpg",
//         nombre: "Beyblock20",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 1350
//     },
//     {
//         id: 4,
//         foto: "https://kbd.news/pic/2022/107/1804.jpg",
//         nombre: "Ffkb with led ring",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 2100
//     },
//     {
//         id: 5,
//         foto: "https://kbd.news/pic/2022/81/1467.jpg",
//         nombre: "Freaku4x",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 1950
//     },
//     {
//         id: 6,
//         foto: "https://kbd.news/pic/2022/91/1592.jpg",
//         nombre: "Keezy boost40",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 2300
//     },
//     {
//         id: 7,
//         foto: "https://kbd.news/pic/2022/103/1740.jpg",
//         nombre: "Kunai",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 1740
//     }
//     ,
//     {
//         id: 8,
//         foto: "https://kbd.news/pic/2023/119/1968.jpg",
//         nombre: "Dilemma v2",
//         descripcion: "Teclado mecánico personalizado, kit con electrónica.",
//         cantidad: 1,
//         precio: 3550
//     }
// ];

let carrito = []

const contenedor = document.querySelector('#contenedor')

const carritoContenedor = document.querySelector('#carritoContenedor')

const vaciarCarrito = document.querySelector('#vaciarCarrito')

const precioTotal = document.querySelector('#precioTotal')

const activarFuncion = document.querySelector("#activarFuncion");

const procesarCompra = document.querySelector("#procesarCompra");

const totalProceso = document.querySelector("#totalProceso");

const formulario = document.querySelector('#procesar-pago')


if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

if(formulario){
    formulario.addEventListener('submit', enviarPedido)
}



//Guardamos en localStorage
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(activarFuncion){
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
}
})




if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
        carrito.length = [];
        mostrarCarrito();
    });
}




if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: "¡Tu carrito está vacio!",
                text: "Agrega un teclado para comprar",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            location.href = "finalizaCompra.html";
        }
    });
}


//JSON
let productos;
obtenerJSON();

//JSON
async function obtenerJSON(){
    const URLJSON = '/productos.json';
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    productos = data;
    //ya tengo los productos, entonces llamo a renderizarlos
    renderizarProductos()
}

function renderizarProductos(){
    for(const producto of productos){
        contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${producto.foto}" class="card-img-top mt-2" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: ${producto.precio}</p>
            <p class="card-text">Descripción: ${producto.descripcion}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>

            <button onclick="agregarProducto(${producto.id})" class="btn btn-primary">Agregar al carrito</button>
        </div>
    </div>
    `;
    }

}

function agregarProducto(id) {

    const existe = carrito.some(prod => prod.id === id)


    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++
            }
        })
    } else {

        const item = productos.find((prod) => prod.id === id)
        carrito.push(item)
        console.log(carrito)
    }



    mostrarCarrito()
};






const mostrarCarrito = () => {
    const modalBody = document.querySelector(' .modal .modal-body')
    //seleccionamos el nodo modalBody

    if (modalBody) {
        modalBody.innerHTML = ''
        carrito.forEach((prod) => {
            const { id, foto, nombre, descripcion, precio, cantidad } = prod
            modalBody.innerHTML += `
        <div class="modal-contenedor">
        
        <div>
        <img class="img-fluid foto-carro"  src="${foto}"/>
        </div>



        <div>
        <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad: ${cantidad}</p>
        
        <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar producto</button>

        </div>
        
        </div>
        
        
        
        `;
        });
    }


    if (carrito.length === 0) {
        modalBody.innerHTML = `
            <p class="text-center text-primary">Vacio</p>`
    }




    carritoContenedor.textContent = carrito.length


    if (precioTotal) {
        precioTotal.innerText = carrito.reduce(
            (acc, prod) => acc + prod.cantidad * prod.precio,
            0
        );
    }


    guardarStorage();

}




function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}




function eliminarProducto(id) {

    const tecladoId = id;
    carrito = carrito.filter((teclado) => teclado.id !== tecladoId)
    console.log(carrito)
    mostrarCarrito();
}



function procesarPedido() {
    carrito.forEach((prod) => {
        const listaCompra = document.querySelector("#lista-compra tbody");
        const { id, nombre, precio, foto, cantidad } = prod;
        if (listaCompra) {
            const row = document.createElement("tr");
            row.innerHTML += `
                <td>
                <img src="${foto}" class="img-fluid foto-carro" alt="...">
                </td>
                <td>${nombre}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${precio * cantidad}</td>
                `;
            listaCompra.appendChild(row);
        }
    });



    totalProceso.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,0);
}


function enviarPedido(e){
    e.preventDefault();
    const cliente = document.querySelector('#cliente').value
    const correo = document.querySelector('#correo').value




    if (correo === '' || cliente === '') {
        Swal.fire({
            title: "Datos incompletos",
            text: "Capture su nombre y correo",
            icon: "error",
            confirmButtonText: "Aceptar",
        })

    } else {
        Swal.fire({
            title: 'Confirmas que tus datos son correctos?',
            showCancelButton: 'Cancelar',
            confirmButtonText: 'Enviar',

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Tu informacion y pedido han sido enviados, en breve nos pondremos en contacto contigo.', '', 'success')

            }

        })

        localStorage.clear()

    }

    
}














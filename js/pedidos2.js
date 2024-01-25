

let productos = [{
    id: 1,
    name: `Milanesas de pollo`,
    price: 5.00,
    image: './img/producto-milanesa-pollo.jpg'
},
{
    id: 2,
    name: `Milanesas de soja simples o rellenas`,
    price: 3.00,
    image: './img/producto-mila-soja.jpg'
},
{
    id: 3,
    name: `Hamburguesas de pollo`,
    price: 4.00,
    image: './img/producto-hamburguesa.jpg'
},
{
    id: 4,
    name: `Bastoncitos de pollo / Aros de cebolla`,
    price: 5.00,
    image: './img/producto-chips.jpg'
},
{
    id: 5,
    name: `Pata muslo`,
    price: 3.50,
    image: './img/portada.jpg'
},
{
    id: 6,
    name: `Pollo entero`,
    price: 2.50,
    image: './img/Polloentero.jpg'
},
{
    id: 7,
    name: `Alitas de pollo`,
    price: 1.50,
    image: './img/Alitaspollo.jpg'
},
{
    id: 8,
    name: `Pechugas de pollo`,
    price: 4.50,
    image: './img/Pechugaspollo.jpg'
}
]
 let carrito = localStorage.getItem("carrito") == null ? [] : JSON.parse(localStorage.getItem("carrito"))
localStorage.getItem("carrito") != null ? mostrarCarrito() : console.log("No hay productos en el carrito");

function listarProductos() {
    const container = document.getElementById('productContainer')
    let html = ''

    productos.forEach(producto => {
        html += `<div class="cardProducto">
        <img src="${producto.image}" alt="${producto.name}"
            class="tamanioImagenPedidos" />
        <p class="tituloCard">
            ${producto.name}
        </p>
        <p>
            U$D ${producto.price}
        </p>
        <button class="botonCarrito" onclick='agregarAlCarrito("${producto.id}", "${producto.name}")'>
            Agregar al carrito
        </button>
    </div>`
    })
    container.innerHTML = html

}




listarProductos()

function agregarAlCarrito(id, nombreProducto) {
    let resultado = productos.find(producto => producto.id == id)
    resultado == null ? console.error('Producto no encontrado') : resultado.unidades = resultado.unidades ? resultado.unidades + 1 : 1;
    let productoEnCarrito = carrito.find(item => item.id === resultado.id);
    if (productoEnCarrito) {

        productoEnCarrito.unidades = resultado.unidades;
    } else {
        carrito.push(resultado)

    //     $.toast.success(, 'Carrito de compras');    }
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarrito()
    Toastify({

        text: `¡${nombreProducto} se ha agregado al carrito!`,
        
        duration: 3000
        
        }).showToast();
    }



function eliminarProducto(id) {
    let resultado = carrito.findIndex(producto => producto.id == id)
    resultado === -1 ? console.error('Producto no encontrado') : carrito.splice(resultado, 1)
    console.log(carrito);
    localStorage.setItem("carrito",JSON.stringify(carrito))
    mostrarCarrito()

}

function mostrarCarrito() {
    let container = document.getElementById(`listadoCarrito`)
    let html = ''
    let total = 0
    let unidades = 0

    carrito.forEach(producto => {
        unidades += producto.unidades;
        html += `                
        <tr>
        <td><img src="${producto.image}" alt="${producto.name}" width="32px" height="32px"></td>
        <td>${producto.name}</td>
        <td>U$D ${producto.price}</td>
        <td>${producto.unidades} Unidades</td>
        <td><button class="eliminar" onclick='eliminarProducto("${producto.id}")'>Eliminar</button></td>
    </tr>`

    total += producto.price * producto.unidades;
    })
    html += `                
    <tr>
    <td></td>
    <td></td>
    <td>Total: </td>
    <td>U$D ${total.toFixed(2)}</td>
</tr>`   



container.innerHTML = html
}

document.getElementById('name').addEventListener("blur", validarFormulario)
document.getElementById('address').addEventListener("blur", validarFormulario)
document.getElementById('tel').addEventListener("blur", validarFormulario)

function validarFormulario () {
    if(document.getElementById("name").value != "" &&
    document.getElementById("address").value != "" &&
    document.getElementById("tel").value != "" ) {

        document.getElementById("completarBtn").disabled = false
    } else {
        document.getElementById("completarBtn").disabled = true

    }
}

document.addEventListener('DOMContentLoaded', () => {

const completarBtn = document.querySelector('#completarBtn');

completarBtn.addEventListener("click", (evento) => {
    Swal.fire({
        title: 'Confirma para finalizar el pedido y proceder a forma de pago',
        text: 'Quiere continuar?',
        timer:20000,
        timerProgressBar: true,
        confirmButtonColor: "green",
        confirmButtonText: 'Si',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red",
        imageUrl: "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_1280.jpg",
        imageWidth: 400
    }).then((respuesta) => {
        if (respuesta.isConfirmed) {
            Swal.fire({
                title: `Gracias por tu compra :)
                Te esperamos nuevamente`,
                imageUrl: "https://images.pexels.com/photos/6294198/pexels-photo-6294198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                imageWidth: 200,
            })
                .then((respuesta) => {
                    if (respuesta.isConfirmed) {
                        enviarCompra();
                        localStorage.removeItem("carrito");
                        carrito = [];
                        mostrarCarrito();
                        document.getElementById('formulario').reset();
                    }
                    })
        }
        if (respuesta.isDismissed) {
            Swal.fire({
                title: `Has cancelado la compra :(
                    Vuelve pronto!`,
                imageUrl: "https://images.pexels.com/photos/6898855/pexels-photo-6898855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                imageWidth: 200
            })
        }
    })})
});

// document.getElementById('completarBtn').addEventListener("click", (evento) => {
//     evento.preventDefault();
//     enviarCompra()
//     localStorage.removeItem("carrito")
//     carrito = []
//     mostrarCarrito()
//     document.getElementById('formulario').reset()
// })
function enviarCompra() {
    let mensaje = `¡Hola Granja Elfi!%0ASoy ${document.getElementById("name").value} y me gustaría hacerte este pedido:%0A%0A`
    let totalCarrito = 0
    carrito.forEach(producto => {
        mensaje += `Producto: *${producto.name}* %0APrecio unitario: $${producto.price}%0ACantidad: ${producto.unidades}%0A%0A`
        totalCarrito += producto.price * producto.unidades;
    });

    mensaje += `%0A*Total de la compra: $${totalCarrito.toFixed(2)}*%0A%0AMis datos son:%0ATeléfono:  ${document.getElementById("tel").value}%0ADirección: ${document.getElementById("address").value}%0A¡Muchas gracias!`

    window.open(`https://api.whatsapp.com/send?phone=610493314100&text=${mensaje}`)
}
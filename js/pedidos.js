let costoEnvio = 0
let direccion = ""
let envio = ""
let metodoPago = ""
let carrito = []
let productos = [
    { id: 1, nombre: 'Milanesas de pollo x kg', precio: 300, categoria: 'Pollo' },
    { id: 2, nombre: 'Pechugas de pollo x kg', precio: 200, categoria: 'Pollo' },
    { id: 3, nombre: 'Milanesas de soja x kg', precio: 100, categoria: 'Vegetariano' },
    { id: 4, nombre: 'Bastoncitos de lentejas x kg', precio: 50, categoria: 'Vegetariano' },
];



function preguntarNombre() {
    let nombre = prompt('Bienvenido a Granja Elfi, ingresá tu nombre por favor.')
    mostrarMensaje(`Hola ${nombre}, en que podemos ayudarte?`)
}

function mostrarProductos() {
    let texto = ``
    productos.forEach(producto => {
        texto += `${producto.id} - ${producto.nombre} - precio: ${producto.precio} - Categoria: ${producto.categoria} \n`
    });
    alert(texto)
}

function mostrarProductosPorCategoria() {
    let categoria
    let texto = `Los productos de la categoría seleccionada son:\n`
    do {
        categoria = prompt(`Escribe el nombre de la categoria:
    Pollo
    Vegetariano`).toLowerCase()
    } while (categoria != `pollo` && categoria != `vegetariano`);
    let resultadoCategoria = productos.filter((producto) => producto.categoria.toLowerCase() == categoria)
    resultadoCategoria.forEach(producto => {
        texto += `${producto.nombre} Precio $${producto.precio}\n`
    });
    alert(texto)
}

function mostrarMenu() {
    let opcion = prompt(`Elija una función del menu. Ingrese el numero
    1) Ver productos
    2) Ver productos por categoria
    3) Agregar productos al carrito
    4) Ver carrito
    5) Elegir método de envío
    6) Pagar
    7) Salir`)

    switch (parseInt(opcion)) {
        case 1:
            mostrarProductos()
            volverAlMenu()
            break;

        case 2:
            mostrarProductosPorCategoria()
            volverAlMenu()
            break;

        case 3:
            agregarAlCarrito()
            mostrarMenu()
            break

        case 4:
            verCarrito()
            mostrarMenu()
            break

        case 5:
            metodoEnvio()
            mostrarMenu()
            break

        case 6:
            pagar()
            break

        case 7:
            mostrarMensaje('Gracias por su visita')
            break

        default:
            if (isNaN(opcion)) {
                mostrarMensaje('Ha ingresado un caracter. Por favor, solo ingrese numeros')
            } else {
                mostrarMensaje('Ha ingresado un numero invalido. Ingrese un numero entre 1 y 7')
            }
            mostrarMenu()
            break;
    }

}

function mostrarMensaje(texto1, texto2 = '') {
    alert(`${texto1} ${texto2}`)
}

function volverAlMenu() {
    let valor = confirm('Desea volver al menu principal?')
    if (valor) {
        mostrarMenu()
    } else {
        mostrarMensaje('Gracias por su visita')
    }
}

function agregarAlCarrito() {

    let cant
    let opcion
    let encontrado

    do {
        mostrarProductos()
        opcion = parseInt(prompt(`Ingrese el numero del producto que quiere comprar.`))
        encontrado = productos.find((producto) => producto.id == opcion);
    } while (encontrado == undefined);
    cant = pedirCantidad()
    carrito.push({ ...encontrado, cantidad: cant })
}

function pedirCantidad() {

    let numero = parseInt(prompt('Elija la cantidad deseada'))
    return numero
}

function verCarrito() {
    let total = 0
    let unidades = 0
    let texto = `El carrito contiene estos productos: \n`
    if (carrito.length == 0) {
        mostrarMensaje(`No hay ningún producto agregado en el carrito`)
    }
    else {
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad
            unidades += producto.cantidad
            texto += `Nombre: ${producto.nombre} Cantidad:${producto.cantidad} Precio:${producto.precio} \n`
        });
        texto += `
        Total unidades: ${unidades}
        Total a pagar: $${total}
        `
        alert(texto)
    }
}

function metodoEnvio() {
    let metodo = prompt(`Escriba TA para Take Away o DE para Delivery`).toUpperCase()
    if (metodo == "TA") {
        envio = "Take Away"
        mostrarMensaje(`Seleccionaste satisfactoriamente Take Away`)
    }
    else if (metodo == "DE") {
        envio = "Delivery"
        mostrarMensaje(`Seleccionaste satisfactoriamente Delivery`)
        direccion = prompt(`Ingrese su dirección`)
        mostrarMensaje(`Muchas gracias!`)
    }
    else {
        mostrarMensaje(`Seleccionaste un metodo invalido, asegurate de escribir TA para Take Away o DE para Delivery`)
        metodoEnvio()
    }
}

function pagar() {
    alert(`Tu pedido está casi listo! Por favor asegurate que todos los datos sean correctos:`)
    verCarrito()
    let confirmacion = confirm(`El metodo de envio seleccionado es ${envio}
La direccion ingresada es ${direccion}
Por si o por no, estos datos son correctos?`)
    if (confirmacion) {
        let metodo = parseInt(prompt(`selecciona el metodo de pago
1. Tarjeta de crédito
2. Efectivo`))
        if (metodo == 1) {
            metodoPago = "Tarjeta de crédito"
            alert(`Seleccionaste satisfactoriamente Tarjeta de crédito`)
        }
        else if (metodo == 2) {
            metodoPago = "Efectivo"
            alert(`Seleccionaste satisfactoriamente Efectivo`)
        }
        else {
            mostrarMensaje(`Seleccione un numero valido`)
            pagar()
        }
    }
    mostrarMensaje(`Muchas gracias por tu compra`)
    volverAlMenu()
}

preguntarNombre()
mostrarMenu()
let total = 0
let unidades = 0
let costoEnvio = 0
let direccion = ""
let envio = ""
let metodoPago = ""


function preguntarNombre() {
    let nombre = prompt('Ingresá tu nombre')
    mostrarMensaje('Bienvenido/a nuestra tienda',nombre)
}

function mostrarMenu() {
    let opcion = prompt(`Elija una función del menu. Ingrese el numero
    1) Ver productos
    2) Agregar productos al carrito
    3) Ver carrito
    4) Elegir método de envío
    5) Pagar
    6) Salir`)

    switch (parseInt(opcion)) {
        case 1:
            mostrarMensaje('1) Pollo $200\n2) Pechuga $400')
            volverAlMenu()
            break;

        case 2:
            agregarAlCarrito()
            mostrarMenu()
            break

        case 3:
            verCarrito()
            mostrarMenu()
            break

        case 4:
            metodoEnvio()
            mostrarMenu()
            break

        case 5:
            pagar()
            break

        case 6:
            mostrarMensaje('Gracias por su visita')
            break

        default:
            if (isNaN(opcion)) {
                mostrarMensaje('Ha ingresado un caracter. Por favor, solo ingrese numeros')
            } else {
                mostrarMensaje('Ha ingresado un numero invalido. Ingrese un numero entre 1 y 6')
            }
            mostrarMenu()
            break;
    }

}

function mostrarMensaje(texto1, texto2='') {
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

    do {
        mostrarMensaje('1) Pollo $200\n2) Pechuga $400')        
        opcion = parseInt(prompt(`Ingrese el numero del producto que quiere comprar.`))
    } while (isNaN(opcion) || opcion == '');

    // Validar que el usuario ingrese un número

    switch (opcion) {
        case 1:
            cant = pedirCantidad()
            total += cant * 200
            unidades += cant
            // unidades = + unidades + cant
            break;

        case 2:
            cant = pedirCantidad()
            total += cant * 400
            unidades += cant
            break;

        default:
            mostrarMensaje('Opcion invalida')
            agregarAlCarrito()
            break;
    }
    let seguir = confirm('Desea seguir agregando productos al carrito?')
    if (seguir == true) {
        agregarAlCarrito()
    }
}

function pedirCantidad() {

    let numero = parseInt(prompt('Elija la cantidad deseada'))
    return numero
}

function verCarrito() {
    if (total == 0 && unidades == 0) {
        mostrarMensaje(`No hay ningún producto agregado en el carrito`)
    }
    else {
        mostrarMensaje(`El carrito tiene ${unidades} unidades.
El total de la compra es $ ${total}`)
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
    let confirmacion = confirm(`Tu pedido está casi listo! Por favor asegurate que todos los datos sean correctos:
El carrito tiene ${unidades} unidades
El total de la compra es $ ${total}
El metodo de envio seleccionado es ${envio}
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
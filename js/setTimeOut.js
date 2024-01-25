// console.log("Inicio de proceso");

// const mensaje = () => {
//     console.log("primer mensaje asincronico");
// }

// setTimeout (mensaje, 3000);

// setTimeout(() => {
//     console.log("segundo proceso asincronico");
// }, 5000);

// console.log("fin del proceso");

// console.log("call Stack");

// console.log("inicio del proceso");
// const dos = () => {
//     console.log("dos");
// }

// const uno = () => {
//     console.log("uno");

//     dos();

//     console.log("Tres");
// };

// uno();

// console.log("Fin del proceso"); 

// setInterval (() => {
//     console.log("intervalo");
// },1000)

// let contador = 0;

// let interval = setInterval(() => {
//     contador++
//     console.log(`contado: ${contador}`);
// }, 1000000)

// new Promise ((resolve, reject) => {});

// const eventofuturo = (estado) => {
//     return new Promise ((resolve, reject) => {
//     setTimeout(() => {
//                     if (estado) {
//             resolve("Promesa resuelta")
//         } else {
//             reject("Promesa rechazada")
//         }
//     });
//     }, 1000);

// }

// console.log(eventofuturo(true));
// console.log(eventofuturo(false));
// console.log("");
// console.log("");

// const usuarios = [
//     {
//         id:1,
//         nombre: "Juan",
//     },
//     {
//         id:2,
//         nombre: "Maria",
//     },    
//     {
//         id:3,
//         nombre: "Pedro",
//     },
// ];

// const buscarUsuarioPorId = (id) => {
//     const usuario = usuarios.find(usuario => usuario.id === id);

//     return new Promise((resolve, reject) => {
//         if (usuario) {
//             resolve(usuario)
//         } else {
//             reject(`No se encontro el usuario con el id ${id}`)
//         }
//     })
// }

// // buscarUsuarioPorId(2)
// //     .then(respuesta => {
// //         console.log(respuesta);
// //     })
// //     .catch(error => console.log(`Error: ${error}`))
// //     .finally(() => {
// //         console.log("fin del proceso");
// //     })

// const buscarUsuarios = () => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(usuarios);
//             },2000);
//         })
//     }

// let listaUsuarios = document.querySelector("#listaUsuarios");

// const mostrarUsuarios = (usuarios) => {
//     listaUsuarios.innerText = "";
//     usuarios.forEach(usuario => {
//         let nombreUsuario = document.createElement("p");
//         nombreUsuario.innerText = usuario.nombre;
//         listaUsuarios.append(nombreUsuario);
//     });
// }

// buscarUsuarios()
// .then(respuesta => mostrarUsuarios(respuesta));

// console.log(fetch("https://jsonplaceholder.typicode.com/posts"));

// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(resp => resp.json())
//     .then(data => console.log(data))

//     //Consumiendo la api de Rick and Morty

//     fetch("https://rickandmortyapi.com/api/character")
//         .then(resp => resp.json())
//         .then((data)=> {
//             console.log(data)
//             mostrarPersonajes(data.results)
//         });

//     let contenedor = document.querySelector("#contenedor");

//     const mostrarPersonajes = (personajes) => {
//         personajes.forEach(personajes => {
//             let div = document.createElement("div");
//             div.className = "d-flex flex-column border border-1 rounded-2 p-2 w-50 m-1";
//             div.innerHTML = `
//             <p>Nombre: ${personajes.name} </p>
//             <img class= "w-25" src=${personajes.image}>
//             <p>Genero: ${personajes.gender} </p>
//             `
//             contenedor.appendChild(div);
//         });
//     }

// let products = []

// fetch("/public/data/products.json")
//     .then(resp => resp.json())
//     .then(data => {
//         products = [...data];
//         console.log(products);
//     })

// const obtenerProductos = async () => {
//     const resp = await fetch("public/data/products.json");
//     const data = await resp.json();
//     products = [...data];
//     console.log(products);
// }
// obtenerProductos()
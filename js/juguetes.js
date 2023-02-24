var arr;
var dataForJuguetes = [];
var optionSelect = "";
var buscadorTexto = "";



async function getDataforJuguetes() {

    let myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
    });
    fetch('https://mindy-render-api.onrender.com/api/products/', {myHeaders}).then(resp => {
        resp.header('Access-Control-Allow-Origin', "*");
        resp.header('Access-Control-Allow-Headers', "*");

        console.log(resp)
        // if (resp.ok) {
        //     return resp.json();
        // }
        // throw new Error('Something went wrong');
    })
        .then(json => {
            arr = json.response.filter(producto => producto.nombre).filter(producto => producto.tipo === "Juguete")
            dataForJuguetes.push(...arr);
            displayCards(dataForJuguetes)
            filters()

            console.log(json)

        })

}



getDataforJuguetes();

function displayCards(arr) {
    var enCarrito = [];
    if (JSON.parse(localStorage.getItem("carrito"))) {
        enCarrito = JSON.parse(localStorage.getItem("carrito"));
    }

    var boton;
    let template = "";
    arr.forEach(producto => {

        if (enCarrito.includes(producto._id)) {
            boton = 1;
        } else {
            boton = 2;
        }
        template += `<div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="texto">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            </div>
            <div class="d-flex justify-content-evenly align-items-center">
                <h4 class="card-title">$${producto.precio}</h4>
                <div class="comprar">
                ${boton === 1 ? `<button id="cart-btn-${producto._id}" onclick="addToCart('${producto._id}')" class="btn btn-success">Añadido <i class="bi bi-cart-check-fill"></i></button>` : `<button id="cart-btn-${producto._id}" onclick="addToCart('${producto._id}')" class="btn comprar-btn">Comprar <i class="bi bi-cart-plus"></i></button>`}
                </div>
            </div>
            ${producto.stock < 5 ? `<p style="color:red" class="stock text-center mt-3"> ¡Ultimas unidades! </p>` : ``}
        </div>
    </div>`

    })

    let botonFav
    if (enCarrito.length > 0) {
        botonFav = `Añadido <i class="bi bi-cart-check-fill"></i>`;

    } else {
        botonFav = `Comprar <i class="bi bi-cart-plus"></i>`;


    }

    document.querySelector("#juguetes-box").innerHTML = template;

}


var select = document.querySelector("select");
select.addEventListener("change", (e) => {
    optionSelect = e.target.value;
    ordernarPrecio(e.target.value)
})

var searchInput = document.querySelector(".search");
searchInput.addEventListener("keyup", () => {
    buscadorTexto = searchInput.value;
    filters()
})

function filters() {


    if (optionSelect !== "" && buscadorTexto !== "") {
        let filtrado = dataForJuguetes.filter(producto => producto.nombre.toLowerCase().includes(buscadorTexto.toLowerCase().trim()));
        if (filtrado.length > 0) {
            displayCards(filtrado)
        } else {
            document.querySelector("#juguetes-box").innerHTML = `No hay coincidencias.`;
        }


    } else if (optionSelect === "" && buscadorTexto !== "") {
        let filtrado = dataForJuguetes.filter(producto => producto.nombre.toLowerCase().includes(buscadorTexto.toLowerCase().trim()));
        if (filtrado.length > 0) {
            displayCards(filtrado)
        } else {
            document.querySelector("#juguetes-box").innerHTML = `No hay coincidencias.`;
        }
    } else {
        displayCards(dataForJuguetes)
    }
}

function ordernarPrecio(valor) {

    if (valor == "Mayor precio") {
        //ordenados de mayor a menor precio
        let mayorPrecio = dataForJuguetes.sort((a, b) => b.precio - a.precio)
        displayCards(mayorPrecio);
        filters()
    } else if (valor == "Menor precio") {
        let menorPrecio = dataForJuguetes.sort((a, b) => a.precio - b.precio)
        displayCards(menorPrecio);
        filters()
    } else {
        displayCards(dataForJuguetes);
    }
}



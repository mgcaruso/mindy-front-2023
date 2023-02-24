
var agregado = JSON.parse(localStorage.getItem("carrito"));
var carritoBox = document.querySelector("#carrito");
var dataForCarrito = [];


async function getDataforCarrito(){
    fetch('https://apipetshop.herokuapp.com/api/articulos')
    .then( resp => resp.json())
    .then( json => {
        arr = json.response.filter( producto => producto.nombre)
        dataForCarrito.push(...arr);
        
        var template  =""; 
        let templateTotal = "";
        var totalDeCompra = 0;
        if(agregado){
            //imprimir los articulos
            let result = dataForCarrito.filter( producto => agregado.includes(producto._id) )
            result.forEach( enCarrito => {
                template += `<div class="card mb-3" style="min-width: 540px;" >
                <div class="g-0 d-flex px-4">
                    <div class="col-4">
                        <img style="max-width: 6rem" src="${enCarrito.imagen}" class="img-fluid rounded-start" alt="${enCarrito.nombre}">
                    </div>
                    <div class="col-6 d-flex align-items-center justify-content-center text-center">
                        <h6 class="card-title mb-0">${enCarrito.nombre}</h6>
                
                    </div>
                    <div class="col-2 d-flex text-end align-items-center justify-content-center">
                        <h5 class="card-title mb-0">$${enCarrito.precio}</h5>
                    </div>
                </div>
            </div>`
                totalDeCompra += enCarrito.precio;
                templateTotal = `<div class="card mb-3" style="min-width: 540px; background-color:#402E32; color:white">
                <div class="g-0 d-flex px-4">
                    <div class="col-md-8 d-flex align-items-center w-100">
                        <div class="card-body d-flex justify-content-between align-items-center">
                        <button id="vaciar" class="btn btn-danger carrito-btn">Vaciar carrito</button>
                        <button id="pagar" class="btn btn-success carrito-btn">Pagar</button>
                        <h6 class="card-title mb-0">Total a pagar:</h6>
                        <h5 class="card-title mb-0">$${totalDeCompra}</h5>
                        </div>
                    </div>
                </div>
            </div>`
            })

        }else{
            template = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="g-0 d-flex flex-column p-5 d-flex justify-content-center text-center">
                    <h4>No hay productos en el carrito</h4>
                    <h5>Añade productos a la lista:</h5>
                    <a style="color:#402E32; font-weight: bold" class="nav-link p-3" href="/juguetes.html">Juguetes</a>
                    <a style="color:#402E32; font-weight: bold" class="nav-link p-3" href="/farmacia.html">Farmacia</a>
                </div>
            </div>`
        }


        document.addEventListener("click", (e)=>{
            if(e.target.id === "vaciar"){
                localStorage.clear()
                carritoBox.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="g-0 d-flex flex-column p-5 d-flex justify-content-center text-center">
                        <h4>No hay productos en el carrito</h4>
                        <h5>Añade productos a la lista:</h5>
                        <a style="color:#402E32; font-weight: bold"  class="nav-link p-3" href="/juguetes.html">Juguetes</a>
                        <a style="color:#402E32; font-weight: bold"  class="nav-link p-3" href="/farmacia.html">Farmacia</a>
                    </div>
                </div>`
                cantidadProductos.innerHTML = `<i class="fs-4 bi bi-cart"></i>`
            }
            if(e.target.id === "pagar"){
                window.location = `https://www.mercadolibre.com/jms/mla/lgz/msl/login/H4sIAAAAAAAEAzWNwWrDMBBE_2XOsg2FHKpjf0Rs5bUjKnmFdlUlhPx7MUmPw8x780CWPR3B7pXhwbeaU0wGh5rJNmklpBUepcJBk_E7Zjon1KiwcVP4xynaef3iTdqp2igrw4G6XcOWZcC_vuCQNPDNuB2Uw-Dv38Rn-0_sAo-rWVW_LGOMuXCLtEqlXeYoZaa20L2vtDTW2lmNdFLJPSY5WKeSptj5MAofl88Lng4bqQVrFH_grXV-_gFxqUKF9wAAAA/user`
            }
        })
        carritoBox.innerHTML = template + templateTotal;
    })
}

getDataforCarrito()

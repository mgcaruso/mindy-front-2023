let cantidadProductos = document.querySelector("span.cantidad");
let enStorage = JSON.parse(localStorage.getItem("carrito"));


if(enStorage){
    cantidadProductos.innerHTML = `<i class="fs-4 bi bi-cart-fill"></i><sup class="fs-6">${enStorage.length}</sup>`
}else{
    cantidadProductos.innerHTML = `<i class="fs-4 bi bi-cart"></i>`
}

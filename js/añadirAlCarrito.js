var enCarrito = [];

function addToCart(id){
    // var carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    if(JSON.parse(localStorage.getItem("carrito"))){
        enCarrito = JSON.parse(localStorage.getItem("carrito"));
        
    }
    if(enCarrito.indexOf(id) !== -1){
        //sacar del carrito
        enCarrito.splice(enCarrito.indexOf(id),1);
        document.getElementById(`cart-btn-${id}`).innerHTML = `Comprar <i class="bi bi-cart-plus"></i>`
        document.getElementById(`cart-btn-${id}`).style.backgroundColor = `#402E32` 
        document.getElementById(`cart-btn-${id}`).style.color = `white` 
        document.getElementById(`cart-btn-${id}`).border = `1px solid #402E32` 
    }else{
        //meter en carrito
        enCarrito.push(id);
        document.getElementById(`cart-btn-${id}`).innerHTML = `Añadido <i class="bi bi-cart-check-fill"></i>`
        document.getElementById(`cart-btn-${id}`).style.backgroundColor = `#198754`
        document.getElementById(`cart-btn-${id}`).style.color = `white` 
        document.getElementById(`cart-btn-${id}`).style.border = `1px solid #198754`
    }

    var stringified = JSON.stringify(enCarrito);
    localStorage.setItem("carrito", stringified);

    if(JSON.parse(localStorage.getItem("carrito"))){
        cantidadProductos.innerHTML = `<i class="fs-4 bi bi-cart-fill"></i><sup class="fs-6">${enCarrito.length}</sup>`
    }else{
        cantidadProductos.innerHTML = `<i class="fs-4 bi bi-cart"></i>`
    }
}


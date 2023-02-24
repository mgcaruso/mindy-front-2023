////CAPTURAMOS EL BOTON SUBMIT Y LE AGREGAMOS UN ESCUCHADOR DE EVENTOS////

var form = document.querySelector(".form");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  var clickeo = event.target;

  if (clickeo[0].value) {
    resetform.reset(),
      swal(
        "¡Gracias por escribirnos!",
        "Los datos fueron enviados correctamene",
        "success"
      );
  } else {
    swal(
      "Necesitas completar el formulario",
      "Completa los campos por favor.",
      "error"
    );
  }
});

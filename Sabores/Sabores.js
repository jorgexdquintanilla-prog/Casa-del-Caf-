/* =======================================================
   BUSCADOR DE RECETAS
======================================================= */
const buscador = document.getElementById("buscar");
const botonBuscar = document.getElementById("boton-buscar");
const recetas = document.querySelectorAll(".receta");

function buscarRecetas(){
    const texto = buscador.value.toLowerCase().trim();

    recetas.forEach(function(receta){
        const contenido = receta.textContent.toLowerCase();

        if(contenido.includes(texto)){
            receta.style.display = "grid";
        }else{
            receta.style.display = "none";
        }
    });
}

botonBuscar.addEventListener("click", buscarRecetas);
buscador.addEventListener("input", buscarRecetas);

buscador.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        buscarRecetas();
    }
});

/* =======================================================
   MENÚ LATERAL
======================================================= */
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function abrirSidebar(){
  sidebar.classList.add("open");
  menuToggle.classList.add("open");
}

function cerrarSidebar(){
  sidebar.classList.remove("open");
  menuToggle.classList.remove("open");
}

menuToggle.addEventListener("click", function(){
  if (sidebar.classList.contains("open")) {
    cerrarSidebar();
  } else {
    abrirSidebar();
  }
});

/* =======================================================
   ANIMACIÓN DEL LOGO (protegida: si el contenedor o el
   archivo .json no existen, no rompe el resto del script)
======================================================= */
const contenedorAnimacion = document.getElementById("coffee-animation");
if (contenedorAnimacion && typeof lottie !== "undefined"){
  lottie.loadAnimation({
    container: contenedorAnimacion,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "Assets/coffeecup.json"
  });
}

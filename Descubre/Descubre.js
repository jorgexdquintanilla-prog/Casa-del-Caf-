// ==========================================
// MENÚ LATERAL
// ==========================================

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

    if(sidebar.classList.contains("open")){

        cerrarSidebar();

    }else{

        abrirSidebar();

    }

});


// ==========================================
// ANIMACIÓN DEL LOGO (protegida: si el
// contenedor o el .json no existen, no rompe
// el resto del script)
// ==========================================

const contenedorAnimacion = document.getElementById("coffee-animation");

if (contenedorAnimacion && typeof lottie !== "undefined"){
    lottie.loadAnimation({
        container: contenedorAnimacion,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "../Assets/coffeecup.json"
    });
}


// ==========================================
// BOTONES "DESCUBRIR"
// ==========================================

const botonesDescubrir = document.querySelectorAll(
    ".opcion button"
);


botonesDescubrir.forEach(function(boton){

    boton.addEventListener("click", function(){

        const destino = boton.dataset.destino;

        const seccion = document.getElementById(destino);


        seccion.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    });

});


// ==========================================
// VIAJE DEL GRANO
// ==========================================

const etapas = document.querySelectorAll(".etapa");

const descripcionEtapa =
    document.getElementById("descripcion-etapa");


etapas.forEach(function(etapa){

    etapa.addEventListener("mouseenter", function(){

        mostrarEtapa(etapa);

    });


    etapa.addEventListener("click", function(){

        mostrarEtapa(etapa);

    });

});


function mostrarEtapa(etapa){

    etapas.forEach(function(elemento){

        elemento.classList.remove("activa");

    });


    etapa.classList.add("activa");


    const texto =
        etapa.getAttribute("data-texto");


    descripcionEtapa.style.opacity = "0";


    setTimeout(function(){

        descripcionEtapa.textContent = texto;

        descripcionEtapa.style.opacity = "1";

    }, 150);

}


// ==========================================
// DATOS CURIOSOS
// ==========================================

const datosCuriosos = [

    "Lo que llamamos “grano de café” en realidad es la semilla que se encuentra dentro del fruto.",

    "El fruto del café suele conocerse como cereza debido a su forma y a su color cuando madura.",

    "Antes de tostarse, los granos de café tienen normalmente un tono verde.",

    "El nivel de tostado puede modificar la intensidad, el aroma y las características que percibimos en una taza.",

    "La molienda debe adaptarse al método utilizado para preparar el café.",

    "La temperatura del agua también puede influir en la forma en que se extraen los sabores del café.",

    "Dos cafés preparados de manera diferente pueden tener sabores muy distintos aunque provengan del mismo grano."

];


const datoCurioso =
    document.getElementById("dato-curioso");

const siguienteDato =
    document.getElementById("siguiente-dato");


let indiceDato = 0;


siguienteDato.addEventListener("click", function(){

    indiceDato++;


    if(indiceDato >= datosCuriosos.length){

        indiceDato = 0;

    }


    datoCurioso.style.opacity = "0";


    setTimeout(function(){

        datoCurioso.textContent =
            datosCuriosos[indiceDato];

        datoCurioso.style.opacity = "1";

    }, 180);

});


// ==========================================
// CERRAR MENÚ AL PRESIONAR ESC
// ==========================================

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        cerrarSidebar();

    }

});
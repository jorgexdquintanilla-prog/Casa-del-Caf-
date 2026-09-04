// ==========================================
// MENÚ LATERAL
// ==========================================

const sidebar =
    document.getElementById("sidebar");

const menuToggle =
    document.getElementById("menu-toggle");


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
// CERRAR MENÚ CON ESC
// ==========================================

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        cerrarSidebar();

    }

});



// ==========================================
// DATOS DE CADA RITUAL
// ==========================================

const rituales = {


    manana: {

        icono: "☀️",

        subtitulo: "COMIENZA EL DÍA",

        titulo: "Un comienzo tranquilo",

        ambiente:
            "Luz natural · Música tranquila",

        cafe:
            "Intenso y aromático",

        acompanamiento:
            "Desayuno ligero o unos minutos de silencio",

        tiempo:
            "5 — 10 minutos"

    },


    tarde: {

        icono: "🌧️",

        subtitulo: "TARDE TRANQUILA",

        titulo: "Una pausa entre el día",

        ambiente:
            "Luz cálida · Música suave · Sin prisa",

        cafe:
            "Suave y aromático",

        acompanamiento:
            "Un libro, algo dulce o una conversación",

        tiempo:
            "10 — 15 minutos"

    },


    noche: {

        icono: "🌙",

        subtitulo: "ÚLTIMA PAUSA",

        titulo: "Baja un poco el ritmo",

        ambiente:
            "Luz tenue · Silencio · Un lugar cómodo",

        cafe:
            "Suave o descafeinado",

        acompanamiento:
            "Música tranquila o simplemente descansar",

        tiempo:
            "10 minutos"

    }

};



// ==========================================
// ELEMENTOS
// ==========================================

const botonesMomento =
    document.querySelectorAll(".momento");


const ritualCard =
    document.getElementById("ritual-card");


const ritualIcono =
    document.getElementById("ritual-icono");


const ritualSubtitulo =
    document.getElementById("ritual-subtitulo");


const ritualTitulo =
    document.getElementById("ritual-titulo");


const ritualAmbiente =
    document.getElementById("ritual-ambiente");


const ritualCafe =
    document.getElementById("ritual-cafe");


const ritualAcompanamiento =
    document.getElementById("ritual-acompanar");


const ritualTiempo =
    document.getElementById("ritual-tiempo");



// ==========================================
// CAMBIAR RITUAL
// ==========================================

botonesMomento.forEach(function(boton){

    boton.addEventListener("click", function(){

        const momento =
            boton.dataset.momento;


        const ritual =
            rituales[momento];


        // Quitamos activo de todos

        botonesMomento.forEach(function(elemento){

            elemento.classList.remove("activo");

        });


        // Activamos el seleccionado

        boton.classList.add("activo");


        // Pequeña animación

        ritualCard.style.opacity = "0";

        ritualCard.style.transform =
            "translateY(10px)";


        setTimeout(function(){

            ritualIcono.textContent =
                ritual.icono;


            ritualSubtitulo.textContent =
                ritual.subtitulo;


            ritualTitulo.textContent =
                ritual.titulo;


            ritualAmbiente.textContent =
                ritual.ambiente;


            ritualCafe.textContent =
                ritual.cafe;


            ritualAcompanamiento.textContent =
                ritual.acompanamiento;


            ritualTiempo.textContent =
                ritual.tiempo;


            ritualCard.style.opacity = "1";

            ritualCard.style.transform =
                "translateY(0)";


        }, 180);

    });

});

// ==========================================
// BUSCADOR DEL HEADER
// ==========================================

const ritualSearch = document.getElementById("ritual-search");

if (ritualSearch) {
    ritualSearch.addEventListener("keydown", function(event) {

        if (event.key !== "Enter") return;

        const texto = ritualSearch.value.toLowerCase().trim();

        if (!texto) return;

        const zonas = document.querySelectorAll(
            ".intro, .paso, .tu-ritual, .pausa, .final"
        );

        let encontrado = null;

        zonas.forEach(function(zona) {

            if (encontrado) return;

            if (zona.textContent.toLowerCase().includes(texto)) {
                encontrado = zona;
            }

        });

        if (encontrado) {

            encontrado.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            encontrado.classList.add("resultado-busqueda");

            setTimeout(function() {
                encontrado.classList.remove("resultado-busqueda");
            }, 1200);

        }

    });
}

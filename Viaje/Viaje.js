// =========================
// MENÚ LATERAL
// =========================
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

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        cerrarSidebar();
    }
});


// =========================
// ETAPAS DEL VIAJE
// =========================
const etapas = {
    finca: {
        icono: "🌱",
        codigo: "ETAPA 01",
        titulo: "La finca",
        texto: "Todo comienza en tierras donde la altura, el clima y el suelo ayudan a definir el carácter del café.",
        meta1: "Altura · clima · suelo",
        meta2: "Origen del sabor"
    },

    cosecha: {
        icono: "🫘",
        codigo: "ETAPA 02",
        titulo: "La cosecha",
        texto: "Las cerezas maduras se recolectan cuando alcanzan su punto ideal. La selección influye directamente en la calidad final.",
        meta1: "Selección · madurez",
        meta2: "Cereza del café"
    },

    beneficiado: {
        icono: "💧",
        codigo: "ETAPA 03",
        titulo: "El beneficiado",
        texto: "Aquí se separa la pulpa del grano y comienza uno de los procesos que más puede transformar el perfil del café.",
        meta1: "Lavado · natural · honey",
        meta2: "Transformación"
    },

    secado: {
        icono: "☀️",
        codigo: "ETAPA 04",
        titulo: "El secado",
        texto: "El grano reduce lentamente su humedad al sol o mediante sistemas controlados antes de continuar su recorrido.",
        meta1: "Tiempo · humedad",
        meta2: "Estabilidad del grano"
    },

    tostado: {
        icono: "🔥",
        codigo: "ETAPA 05",
        titulo: "El tostado",
        texto: "El calor desarrolla aromas, dulzor y cuerpo. Un cambio de minutos puede transformar completamente la taza.",
        meta1: "Claro · medio · oscuro",
        meta2: "Desarrollo de aromas"
    },

    transporte: {
        icono: "🚚",
        codigo: "ETAPA 06",
        titulo: "El transporte",
        texto: "Después del procesamiento, el café se mueve entre productores, tostadores, tiendas y cafeterías hasta acercarse a su destino.",
        meta1: "Origen → destino",
        meta2: "Conservación"
    },

    taza: {
        icono: "☕",
        codigo: "ETAPA 07",
        titulo: "La taza",
        texto: "La última etapa sucede frente a ti: moler, preparar y servir. Todo el recorrido finalmente se convierte en aroma y sabor.",
        meta1: "Moler · preparar · servir",
        meta2: "Final del viaje"
    }
};

const routeButtons = document.querySelectorAll(".route-step");
const routeCard = document.getElementById("route-card");
const routeIcon = document.getElementById("route-icon");
const routeCode = document.getElementById("route-code");
const routeTitle = document.getElementById("route-title");
const routeText = document.getElementById("route-text");
const routeMeta1 = document.getElementById("route-meta-1");
const routeMeta2 = document.getElementById("route-meta-2");

routeButtons.forEach(function(boton){
    boton.addEventListener("click", function(){
        const etapa = etapas[boton.dataset.etapa];

        routeButtons.forEach(function(item){
            item.classList.remove("active");
        });

        boton.classList.add("active");

        routeCard.style.opacity = "0";
        routeCard.style.transform = "translateY(10px)";

        setTimeout(function(){
            routeIcon.textContent = etapa.icono;
            routeCode.textContent = etapa.codigo;
            routeTitle.textContent = etapa.titulo;
            routeText.textContent = etapa.texto;
            routeMeta1.textContent = etapa.meta1;
            routeMeta2.textContent = etapa.meta2;

            routeCard.style.opacity = "1";
            routeCard.style.transform = "translateY(0)";
        }, 160);
    });
});


// =========================
// ORÍGENES
// =========================
const origenes = {
    salvador: {
        bandera: "🇸🇻",
        etiqueta: "EL SALVADOR",
        titulo: "Montañas, volcanes y tradición",
        texto: "En El Salvador, muchas fincas se encuentran en zonas de altura y regiones volcánicas, donde el café forma parte de una larga tradición agrícola.",
        perfil: "Dulce · balanceado",
        notas: "Chocolate · caramelo · fruta"
    },

    guatemala: {
        bandera: "🇬🇹",
        etiqueta: "GUATEMALA",
        titulo: "Altura y carácter",
        texto: "Guatemala cuenta con regiones cafeteras de gran altura y climas variados, lo que permite encontrar perfiles intensos y aromáticos.",
        perfil: "Complejo · intenso",
        notas: "Chocolate · cítricos · especias"
    },

    colombia: {
        bandera: "🇨🇴",
        etiqueta: "COLOMBIA",
        titulo: "Equilibrio reconocido",
        texto: "Colombia posee numerosas regiones productoras y una gran diversidad de condiciones que producen cafés equilibrados y aromáticos.",
        perfil: "Balanceado · limpio",
        notas: "Caramelo · frutas · cítricos"
    },

    brasil: {
        bandera: "🇧🇷",
        etiqueta: "BRASIL",
        titulo: "Dulzor y cuerpo",
        texto: "Brasil es uno de los grandes productores de café y destaca por perfiles con cuerpo, dulzor y sabores clásicos.",
        perfil: "Dulce · cuerpo alto",
        notas: "Cacao · nueces · caramelo"
    }
};

const originButtons = document.querySelectorAll(".origin");
const originCard = document.getElementById("origin-card");
const originFlag = document.getElementById("origin-flag");
const originLabel = document.getElementById("origin-label");
const originTitle = document.getElementById("origin-title");
const originText = document.getElementById("origin-text");
const originProfile = document.getElementById("origin-profile");
const originNotes = document.getElementById("origin-notes");

originButtons.forEach(function(boton){
    boton.addEventListener("click", function(){
        const origen = origenes[boton.dataset.origin];

        originButtons.forEach(function(item){
            item.classList.remove("active");
        });

        boton.classList.add("active");

        originCard.style.opacity = "0";
        originCard.style.transform = "translateY(10px)";

        setTimeout(function(){
            originFlag.textContent = origen.bandera;
            originLabel.textContent = origen.etiqueta;
            originTitle.textContent = origen.titulo;
            originText.textContent = origen.texto;
            originProfile.textContent = origen.perfil;
            originNotes.textContent = origen.notas;

            originCard.style.opacity = "1";
            originCard.style.transform = "translateY(0)";
        }, 160);
    });
});


// =========================
// BUSCADOR DEL HEADER
// =========================
const viajeSearch = document.getElementById("viaje-search");

viajeSearch.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;

    const texto = viajeSearch.value.toLowerCase().trim();
    if(!texto) return;

    const zonas = document.querySelectorAll(
        ".hero, .route-section, .origins-section, .quote-section, .final"
    );

    let encontrada = null;

    zonas.forEach(function(zona){
        if(encontrada) return;

        if(zona.textContent.toLowerCase().includes(texto)){
            encontrada = zona;
        }
    });

    if(encontrada){
        encontrada.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        encontrada.classList.add("resultado-busqueda");

        setTimeout(function(){
            encontrada.classList.remove("resultado-busqueda");
        }, 1200);
    }
});

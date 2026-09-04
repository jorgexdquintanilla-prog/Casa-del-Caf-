// =========================
// MENÚ LATERAL
// =========================
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function cerrarSidebar(){
    sidebar.classList.remove("open");
    menuToggle.classList.remove("open");
}

menuToggle.addEventListener("click", function(){
    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("open");
});

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        cerrarSidebar();
    }
});


// =========================
// RUEDA DE AROMAS
// =========================
const aromas = {
    chocolate: {
        kicker: "CHOCOLATE",
        title: "Cálido, dulce y fácil de reconocer",
        description: "Algunas tazas recuerdan al cacao, chocolate oscuro o cocoa. No significa que alguien le echó chocolate al café, maje.",
        notes: "Cacao · cocoa · chocolate oscuro",
        feel: "Cálida · dulce · profunda",
        where: "Tuestes medios y perfiles balanceados",
        joke: "“Este café huele como para acompañarlo con semita y desaparecer 20 minutos.”"
    },

    frutal: {
        kicker: "FRUTAL",
        title: "Fresco, brillante y con vida",
        description: "Puede recordar a frutos rojos, manzana, durazno o frutas tropicales. Entre más compares, más fácil se vuelve reconocerlos.",
        notes: "Cereza · frutos rojos · fruta madura",
        feel: "Brillante · jugosa · fresca",
        where: "Cafés de altura y algunos procesos naturales",
        joke: "“Tiene más energía que vos cuando dicen que mañana no hay clases.”"
    },

    floral: {
        kicker: "FLORAL",
        title: "Suave, delicado y bien elegante",
        description: "Algunos cafés tienen aromas que recuerdan a flores como jazmín o azahar. Sí, el café se puede poner fino sin avisar.",
        notes: "Jazmín · flores blancas · azahar",
        feel: "Ligera · limpia · delicada",
        where: "Tuestes claros y cafés aromáticos",
        joke: "“Elegante el café. Uno tomándolo en vaso plástico y él oliendo a flores.”"
    },

    nueces: {
        kicker: "NUECES",
        title: "Tostado, reconfortante y familiar",
        description: "Puede recordar a almendras, manías o nueces. No, no le echaron manías al café, así puede oler naturalmente.",
        notes: "Almendra · manía · nuez tostada",
        feel: "Tostada · suave · redonda",
        where: "Tuestes medios y perfiles clásicos",
        joke: "“Si te recuerda a manías, vas bien. Si te recuerda a pupusas... revisemos esa taza.”"
    },

    especias: {
        kicker: "ESPECIAS",
        title: "Profundo, cálido y curioso",
        description: "Canela, clavo y otras sensaciones especiadas pueden aparecer en determinados perfiles y tostados.",
        notes: "Canela · clavo · especias dulces",
        feel: "Cálida · intensa · aromática",
        where: "Perfiles complejos y tostados desarrollados",
        joke: "“Huele a que alguien se tomó en serio eso de ponerle personalidad al café.”"
    },

    caramelo: {
        kicker: "CARAMELO",
        title: "Dulce sin necesidad de azúcar",
        description: "El café puede recordar naturalmente al caramelo, panela o azúcar tostada gracias a los compuestos que se desarrollan durante el tostado.",
        notes: "Caramelo · panela · azúcar tostada",
        feel: "Dulce · redonda · suave",
        where: "Tuestes medios y cafés balanceados",
        joke: "“Si te recuerda al dulce de panela, vas por buen camino, maje.”"
    }
};

const aromaButtons = document.querySelectorAll(".aroma-chip");
const aromaCard = document.getElementById("aroma-card");

aromaButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const aroma = aromas[button.dataset.aroma];

        aromaButtons.forEach(function(item){
            item.classList.remove("active");
        });
        button.classList.add("active");

        aromaCard.style.opacity = "0";
        aromaCard.style.transform = "translateY(8px)";

        setTimeout(function(){
            document.getElementById("aroma-kicker").textContent = aroma.kicker;
            document.getElementById("aroma-title").textContent = aroma.title;
            document.getElementById("aroma-description").textContent = aroma.description;
            document.getElementById("aroma-notes").textContent = aroma.notes;
            document.getElementById("aroma-feel").textContent = aroma.feel;
            document.getElementById("aroma-where").textContent = aroma.where;
            document.getElementById("aroma-joke").textContent = aroma.joke;

            aromaCard.style.opacity = "1";
            aromaCard.style.transform = "translateY(0)";
        }, 150);
    });
});


// =========================
// TARJETAS MISTERIOSAS
// =========================
document.querySelectorAll(".mystery-card").forEach(function(card){
    card.addEventListener("click", function(){
        card.classList.toggle("revealed");
    });
});


// =========================
// DATOS RANDOM
// =========================
const datosRandom = [
    {
        title: "Café + pan francés = combo que nunca falla.",
        text: "No es ciencia, pero tampoco necesitamos discutirlo demasiado."
    },
    {
        title: "Oler café no arregla tus problemas.",
        text: "Pero mínimo los enfrentás despierto. Algo es algo."
    },
    {
        title: "“Notas de nuez” no significa que le echaron manías.",
        text: "Son aromas naturales que pueden aparecer por el origen, proceso y tostado."
    },
    {
        title: "La acidez no siempre significa café feo.",
        text: "A veces es una sensación brillante y frutal. No le hagás la cruz de una vez 😭."
    },
    {
        title: "Tu nariz también se cansa.",
        text: "Después de oler muchas cosas seguidas, puede costar distinguir aromas. Dale descanso, cipote."
    },
    {
        title: "El café elegante también se toma en taza desportillada.",
        text: "La experiencia sensorial no necesita ponerse presumida."
    }
];

let randomIndex = 0;

document.getElementById("random-btn").addEventListener("click", function(){
    randomIndex = (randomIndex + 1) % datosRandom.length;

    document.getElementById("random-title").textContent = datosRandom[randomIndex].title;
    document.getElementById("random-text").textContent = datosRandom[randomIndex].text;
});


// =========================
// BUSCADOR
// =========================
const aromaSearch = document.getElementById("aroma-search");

aromaSearch.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;

    const texto = aromaSearch.value.toLowerCase().trim();
    if(!texto) return;

    const zonas = document.querySelectorAll(
        ".hero, .wheel-section, .training-section, .thoughts-section, .random-section, .final"
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

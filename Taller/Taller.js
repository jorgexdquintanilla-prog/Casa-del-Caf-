// =========================
// MENÚ
// =========================
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", function(){
    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("open");
});

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        sidebar.classList.remove("open");
        menuToggle.classList.remove("open");
    }
});


// =========================
// CONTROLES
// =========================
const molienda = document.getElementById("molienda");
const cafe = document.getElementById("cafe");
const agua = document.getElementById("agua");
const temperatura = document.getElementById("temperatura");
const tiempo = document.getElementById("tiempo");

const moliendaValue = document.getElementById("molienda-value");
const cafeValue = document.getElementById("cafe-value");
const aguaValue = document.getElementById("agua-value");
const tempValue = document.getElementById("temp-value");
const tiempoValue = document.getElementById("tiempo-value");

const moliendaNombres = {
    1: "Muy fina",
    2: "Fina",
    3: "Media",
    4: "Media gruesa",
    5: "Gruesa"
};

function actualizarControles(){
    moliendaValue.textContent = moliendaNombres[molienda.value];
    cafeValue.textContent = cafe.value;
    aguaValue.textContent = agua.value;
    tempValue.textContent = temperatura.value;
    tiempoValue.textContent = tiempo.value;
}

[molienda, cafe, agua, temperatura, tiempo].forEach(function(control){
    control.addEventListener("input", actualizarControles);
});


// =========================
// PREPARAR CAFÉ
// =========================
const brewButton = document.getElementById("brew-button");
const brewMachine = document.getElementById("brew-machine");
const machineStatus = document.getElementById("machine-status");
const gaugeFill = document.getElementById("gauge-fill");
const coffeeLiquid = document.getElementById("coffee-liquid");
const cup = document.getElementById("cup");

function clamp(valor, min, max){
    return Math.max(min, Math.min(max, valor));
}

function cercania(valor, ideal, rango){
    return clamp(100 - (Math.abs(valor - ideal) / rango) * 100, 0, 100);
}

function calcularCafe(){
    const m = Number(molienda.value);
    const c = Number(cafe.value);
    const a = Number(agua.value);
    const t = Number(temperatura.value);
    const s = Number(tiempo.value);

    const ratio = a / c;

    // Valores ideales aproximados para una preparación equilibrada de filtro.
    const scoreMolienda = cercania(m, 3, 2);
    const scoreRatio = cercania(ratio, 16, 8);
    const scoreTemp = cercania(t, 93, 10);
    const scoreTime = cercania(s, 180, 120);

    const balance = Math.round(
        scoreMolienda * .25 +
        scoreRatio * .35 +
        scoreTemp * .20 +
        scoreTime * .20
    );

    const intensity = Math.round(clamp(
        55 + ((c - 18) * 3.2) - ((a - 280) * .08) + ((3 - m) * 7),
        8, 100
    ));

    const sweetness = Math.round(clamp(
        balance * .72 + scoreTemp * .15 + scoreTime * .13,
        5, 100
    ));

    const acidity = Math.round(clamp(
        48 + (93 - t) * 2.1 + (3 - m) * 7 - ((s - 180) * .08),
        5, 100
    ));

    return {
        balance,
        intensity,
        sweetness,
        acidity,
        ratio
    };
}

function mostrarResultado(resultado){
    const title = document.getElementById("result-title");
    const comment = document.getElementById("result-comment");
    const rank = document.getElementById("rank");

    let titulo = "";
    let comentario = "";
    let rango = "";

    if(resultado.balance >= 90){
        titulo = "WHE... ESTO SÍ SALIÓ BUENO.";
        comentario = "Balanceado, limpio y con buena proporción. Mirá vos, la máquina ya te respeta.";
        rango = "☕ MAESTRO CAFETERO";
    }else if(resultado.balance >= 78){
        titulo = "SOSPECHOSAMENTE DECENTE.";
        comentario = "No sabemos si fue talento o suerte, pero esa taza se puede presumir sin pena.";
        rango = "😎 BARISTA DE CONFIANZA";
    }else if(resultado.balance >= 62){
        titulo = "SE DEJA TOMAR.";
        comentario = "No es una obra maestra, pero con pan francés entra tranquilo. Hay futuro.";
        rango = "👌 CAFÉ HONRADO";
    }else if(resultado.balance >= 45){
        titulo = "WHE... TENEMOS QUE HABLAR.";
        comentario = "Algo se fue de paseo entre la molienda, el agua y el tiempo. No está perdido, pero tampoco lo subás a Instagram.";
        rango = "😬 APRENDIZ EN PELIGRO";
    }else{
        titulo = "ATENTADO CONTRA EL CAFÉ.";
        comentario = "Eso ya no es una preparación, es evidencia. Cerrá el taller antes de que llegue la policía cafetera 😭.";
        rango = "🚨 CRIMEN CAFETERO";
    }

    title.textContent = titulo;
    comment.textContent = comentario;
    rank.textContent = rango;

    const datos = [
        ["meter-intensity", "score-intensity", resultado.intensity],
        ["meter-sweetness", "score-sweetness", resultado.sweetness],
        ["meter-acidity", "score-acidity", resultado.acidity],
        ["meter-balance", "score-balance", resultado.balance]
    ];

    datos.forEach(function(item){
        document.getElementById(item[0]).style.width = item[2] + "%";
        document.getElementById(item[1]).textContent = item[2];
    });

    revisarRecetaSecreta();
}

brewButton.addEventListener("click", function(){
    brewButton.disabled = true;
    brewMachine.classList.remove("done");
    brewMachine.classList.add("brewing");
    machineStatus.textContent = "PREPARANDO";
    gaugeFill.style.width = "0%";
    coffeeLiquid.style.height = "0";

    let progreso = 0;

    const animacion = setInterval(function(){
        progreso += 4;
        gaugeFill.style.width = progreso + "%";

        if(progreso >= 100){
            clearInterval(animacion);

            brewMachine.classList.remove("brewing");
            brewMachine.classList.add("done");
            machineStatus.textContent = "LISTO";
            coffeeLiquid.style.height = "72%";

            const resultado = calcularCafe();
            mostrarResultado(resultado);

            document.getElementById("resultado").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            setTimeout(function(){
                brewButton.disabled = false;
            }, 500);
        }
    }, 85);
});


// =========================
// RECETA SECRETA
// =========================
function revisarRecetaSecreta(){
    const m = Number(molienda.value);
    const c = Number(cafe.value);
    const a = Number(agua.value);
    const t = Number(temperatura.value);
    const s = Number(tiempo.value);

    const cerca =
        Math.abs(m - 3) <= 0 &&
        Math.abs(c - 18) <= 1 &&
        Math.abs(a - 290) <= 20 &&
        Math.abs(t - 93) <= 1 &&
        Math.abs(s - 180) <= 20;

    if(cerca){
        document.getElementById("secret-title").textContent = "LA TAZA DE LA CASA";
        document.getElementById("secret-text").textContent =
            "18 g de café, molienda media, cerca de 290 ml de agua, 93 °C y alrededor de 3 minutos. Balance primero, maje.";
        document.getElementById("secret-lock").textContent = "🔓☕";
    }
}


// =========================
// MINIJUEGO DE TIEMPO
// =========================
const timingButton = document.getElementById("timing-button");
const timingMarker = document.getElementById("timing-marker");
const timingMessage = document.getElementById("timing-message");

let jugando = false;
let position = 0;
let direction = 1;
let timer = null;

function iniciarTiming(){
    jugando = true;
    timingButton.textContent = "DETENER";
    timingMessage.textContent = "¡Dale pues! Que no se te vaya.";
    position = 0;
    direction = 1;

    timer = setInterval(function(){
        position += 1.35 * direction;

        if(position >= 99){
            position = 99;
            direction = -1;
        }

        if(position <= 0){
            position = 0;
            direction = 1;
        }

        timingMarker.style.left = `calc(${position}% - 4px)`;
    }, 16);
}

function detenerTiming(){
    clearInterval(timer);
    jugando = false;
    timingButton.textContent = "INTENTAR OTRA VEZ";

    const distancia = Math.abs(position - 50);

    if(distancia <= 5){
        timingMessage.textContent = "🔥 PERFECTO. Esa mano ya parece de barista, whe.";
    }else if(distancia <= 10){
        timingMessage.textContent = "😎 Bastante bien. La taza sobrevivió y hasta quedó bonita.";
    }else if(distancia <= 18){
        timingMessage.textContent = "👌 Cerca. No fue crimen, pero tampoco milagro.";
    }else{
        timingMessage.textContent = "😭 WHE. La zona ideal estaba en el centro, no en otro departamento.";
    }
}

timingButton.addEventListener("click", function(){
    if(!jugando){
        iniciarTiming();
    }else{
        detenerTiming();
    }
});


// =========================
// BUSCADOR
// =========================
const tallerSearch = document.getElementById("taller-search");

tallerSearch.addEventListener("keydown", function(event){
    if(event.key !== "Enter") return;

    const texto = tallerSearch.value.toLowerCase().trim();
    if(!texto) return;

    const zonas = document.querySelectorAll(
        ".hero, .lab-section, .result-section, .timing-section, .secret-section, .final"
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
            behavior:"smooth",
            block:"center"
        });

        encontrada.classList.add("resultado-busqueda");

        setTimeout(function(){
            encontrada.classList.remove("resultado-busqueda");
        },1200);
    }
});

actualizarControles();

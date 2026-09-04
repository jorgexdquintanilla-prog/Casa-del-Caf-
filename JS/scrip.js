const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const stars = Array.from({length: 140}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height * 0.6,
  r: Math.random() * 1.4 + 0.3,
  phase: Math.random() * Math.PI * 2,
  speed: 0.01 + Math.random() * 0.02
}));

function draw(t){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const s of stars){
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(s.phase + t * s.speed));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(233,228,207,${twinkle})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// ---------- PANEL LATERAL DESLIZANTE ----------

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function abrirSidebar(){
  sidebar.classList.add("open");
  menuToggle.classList.add("open");
}

function cerrarSidebar(){
  sidebar.classList.remove("open");
  menuToggle.classList.remove("open");
  menuMasSiExiste();
}

// cierra también el submenú "Más" al cerrar el panel principal
function menuMasSiExiste(){
  const menu = document.getElementById("more-menu");
  if (menu) menu.classList.remove("mostrar");
}

menuToggle.addEventListener("click", function(){
  if (sidebar.classList.contains("open")) {
    cerrarSidebar();
  } else {
    abrirSidebar();
  }
});

// ---------- MENÚ MÁS ----------

const botonMas = document.getElementById("boton-mas");
const menuMas = document.getElementById("more-menu");

if (botonMas && menuMas){
  botonMas.addEventListener("click", function() {
    menuMas.classList.toggle("mostrar");
  });
}

lottie.loadAnimation({
    container: document.getElementById("coffee-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "Assets/coffeecup.json"
});

// =========================================================
// INICIO MEJORADO · INTERACCIONES
// =========================================================

// Cerrar sidebar con Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar?.classList.contains("open")) {
    cerrarSidebar();
  }
});

// Buscador rápido
const siteSearch = document.getElementById("site-search");
const searchResults = document.getElementById("search-results");

const searchPages = [
  { name: "Descubre el café", keywords: "cafe variedades origen aprender descubre", url: "Descubre/Descubre.html" },
  { name: "Sabores", keywords: "sabores notas chocolate frutas dulce acidez", url: "Sabores/Sabores.html" },
  { name: "Ritual y preparación", keywords: "ritual preparar metodo v60 prensa espresso agua molienda", url: "Ritual/Ritual.html" },
  { name: "Viaje del grano", keywords: "viaje cultivo cosecha proceso finca secado", url: "Viaje/Viaje.html" },
  { name: "Aroma", keywords: "aroma olor floral cacao citrico", url: "Aroma/Aroma.html" },
  { name: "Taller", keywords: "taller practica preparar receta simulador", url: "Taller/Taller.html" },
  { name: "Historias", keywords: "historias productores cultura salvador", url: "Historia/Historias.html" },
  { name: "Nosotros", keywords: "nosotros contacto ubicacion reseñas", url: "Nosotros/Nosotros.html" }
];

if (siteSearch && searchResults) {
  siteSearch.addEventListener("input", () => {
    const q = siteSearch.value.trim().toLowerCase();

    if (!q) {
      searchResults.classList.remove("show");
      searchResults.innerHTML = "";
      return;
    }

    const matches = searchPages.filter(item =>
      `${item.name} ${item.keywords}`.toLowerCase().includes(q)
    ).slice(0, 5);

    searchResults.innerHTML = matches.length
      ? matches.map(item => `<a href="${item.url}">${item.name}</a>`).join("")
      : `<a href="Descubre/Descubre.html">No encontré eso. Explorar todo →</a>`;

    searchResults.classList.add("show");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".searchbar")) {
      searchResults.classList.remove("show");
    }
  });
}

// Botón "Sorpréndeme"
const randomCoffeeBtn = document.getElementById("random-coffee-btn");
const heroFact = document.getElementById("hero-fact");

const coffeeFacts = [
  "Un tueste claro suele conservar más notas florales y frutales.",
  "La molienda más fina aumenta la velocidad con la que el agua extrae el café.",
  "El Pacamara es una variedad muy asociada al café salvadoreño.",
  "El proceso natural seca el café con la fruta alrededor del grano.",
  "Cambiar la temperatura del agua puede cambiar la percepción de dulzor y amargor.",
  "El café recién molido libera aromas que se pierden poco a poco después de moler."
];

if (randomCoffeeBtn && heroFact) {
  randomCoffeeBtn.addEventListener("click", () => {
    const fact = coffeeFacts[Math.floor(Math.random() * coffeeFacts.length)];
    heroFact.querySelector("b").textContent = fact;
    heroFact.animate(
      [{ transform: "translateY(4px)", opacity: .3 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 280 }
    );
  });
}

// Botones que hacen scroll
document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

// Laboratorio de tueste
const roastRange = document.getElementById("roast-range");
const roastLabel = document.getElementById("roast-label");
const roastAroma = document.getElementById("roast-aroma");
const roastAcidity = document.getElementById("roast-acidity");
const roastBody = document.getElementById("roast-body");
const roastMethod = document.getElementById("roast-method");
const beanShapes = document.querySelectorAll(".bean-shape");

const roastProfiles = {
  1: {
    label: "Tueste claro",
    aroma: "Floral, cítrico y frutal",
    acidity: "Alta y brillante",
    body: "Ligero",
    method: "V60 · Chemex · Aeropress",
    color: "#9b6338"
  },
  2: {
    label: "Tueste medio",
    aroma: "Caramelo y cacao",
    acidity: "Equilibrada",
    body: "Medio",
    method: "V60 · Prensa · Espresso suave",
    color: "#6e4225"
  },
  3: {
    label: "Tueste oscuro",
    aroma: "Cacao intenso y especias",
    acidity: "Baja",
    body: "Alto",
    method: "Espresso · Moka · Leche",
    color: "#392117"
  }
};

function updateRoast() {
  if (!roastRange) return;
  const profile = roastProfiles[roastRange.value];

  roastLabel.textContent = profile.label;
  roastAroma.textContent = profile.aroma;
  roastAcidity.textContent = profile.acidity;
  roastBody.textContent = profile.body;
  roastMethod.textContent = profile.method;

  beanShapes.forEach(bean => bean.style.background = profile.color);
}

roastRange?.addEventListener("input", updateRoast);
updateRoast();

// Viaje interactivo
const journeySteps = document.querySelectorAll(".journey-step");
const journeyTitle = document.getElementById("journey-title");
const journeyText = document.getElementById("journey-text");

journeySteps.forEach(step => {
  step.addEventListener("click", () => {
    journeySteps.forEach(item => item.classList.remove("active"));
    step.classList.add("active");
    journeyTitle.textContent = step.dataset.title;
    journeyText.textContent = step.dataset.text;
  });
});

// Calculadora de café
const cupsRange = document.getElementById("cups-range");
const cupsValue = document.getElementById("cups-value");
const coffeeGrams = document.getElementById("coffee-grams");
const waterMl = document.getElementById("water-ml");
const brewTime = document.getElementById("brew-time");

function updateBrewTool() {
  if (!cupsRange) return;

  const cups = Number(cupsRange.value);
  const water = cups * 250;
  const coffee = Math.round(water / 16.7);

  cupsValue.textContent = cups;
  coffeeGrams.textContent = `${coffee} g`;
  waterMl.textContent = `${water} ml`;
  brewTime.textContent = cups <= 2 ? "3–4 min" : cups <= 4 ? "4–5 min" : "5–6 min";
}

cupsRange?.addEventListener("input", updateBrewTool);
updateBrewTool();

// Quiz de perfil
const quizResult = document.getElementById("quiz-result");
const quizProfiles = {
  frutal: "Empieza por tuestes claros y visita Sabores o Aroma. Busca notas cítricas, florales y frutales.",
  dulce: "Te puede gustar un tueste medio. Busca notas de miel, caramelo, panela o cacao suave.",
  intenso: "Prueba perfiles medios-oscuros u oscuros y métodos como moka o espresso."
};

document.querySelectorAll(".quiz-options button").forEach(button => {
  button.addEventListener("click", () => {
    if (quizResult) quizResult.textContent = quizProfiles[button.dataset.profile];
  });
});

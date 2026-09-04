/* =========================================================
   CASA DEL CAFÉ · NOSOTROS
========================================================= */


/* =========================================================
   MENÚ LATERAL
========================================================= */

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function abrirSidebar() {
  sidebar.classList.add("open");
  menuToggle.classList.add("open");
}

function cerrarSidebar() {
  sidebar.classList.remove("open");
  menuToggle.classList.remove("open");
}

menuToggle.addEventListener("click", function () {

  if (sidebar.classList.contains("open")) {
    cerrarSidebar();
  } else {
    abrirSidebar();
  }

});

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    cerrarSidebar();
  }

});


/* =========================================================
   TOAST
========================================================= */

const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 1900);

}


/* =========================================================
   BUSCADOR
========================================================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", function (event) {

  if (event.key !== "Enter") {
    return;
  }

  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    showToast("Escribe algo para buscar ☕");
    return;
  }

  const routes = {
    "sabores":"../Sabores/Sabores.html",
    "sabor":"../Sabores/Sabores.html",

    "ritual":"../Ritual/Ritual.html",

    "viaje":"../Viaje/Viaje.html",
    "origen":"../Viaje/Viaje.html",

    "aroma":"../Aroma/Aroma.html",
    "aromas":"../Aroma/Aroma.html",

    "taller":"../Taller/Taller.html",

    "historia":"../Historia/Historias.html",
    "historias":"../Historia/Historias.html",

    "descubre":"../Descubre/Descubre.html",

    "nosotros":"Nosotros.html"
  };

  const found = Object.keys(routes).find(function (word) {
    return value.includes(word);
  });

  if (found) {
    location.href = routes[found];
  } else {
    showToast("No encontré esa sección todavía 👀");
  }

});


/* =========================================================
   RESEÑAS
========================================================= */

const reviewForm = document.getElementById("reviewForm");

const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");

const starSelector = document.getElementById("starSelector");
const starButtons = starSelector.querySelectorAll("button");

const reviewList = document.getElementById("reviewList");
const emptyReview = document.getElementById("emptyReview");

const averageRating = document.getElementById("averageRating");
const averageStars = document.getElementById("averageStars");
const reviewCount = document.getElementById("reviewCount");

let selectedRating = 5;


/* CAMBIAR ESTRELLAS */

function pintarEstrellas(value) {

  starButtons.forEach(function (button) {

    const rating = Number(button.dataset.value);

    button.classList.toggle("active", rating <= value);

  });

}

pintarEstrellas(selectedRating);


starButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    selectedRating = Number(button.dataset.value);

    pintarEstrellas(selectedRating);

  });

});


/* CARGAR RESEÑAS */

function cargarReseñas() {

  const saved = localStorage.getItem("casaDelCafeReviews");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }

}


function guardarReseñas(reviews) {

  localStorage.setItem(
    "casaDelCafeReviews",
    JSON.stringify(reviews)
  );

}


/* ESCAPAR TEXTO PARA EVITAR HTML INYECTADO */

function escaparHTML(texto) {

  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* DIBUJAR RESEÑAS */

function renderReseñas() {

  const reviews = cargarReseñas();

  reviewList.innerHTML = "";


  if (reviews.length === 0) {

    reviewList.innerHTML = `
      <article class="empty-review" id="emptyReview">
        <span>☕</span>

        <p>
          Todavía no hay reseñas guardadas.
          Puedes ser la primera persona en dejar una.
        </p>
      </article>
    `;

    averageRating.textContent = "5.0";
    averageStars.textContent = "★★★★★";
    reviewCount.textContent = "0 opiniones";

    return;
  }


  let ratingTotal = 0;


  reviews
    .slice()
    .reverse()
    .forEach(function (review) {

      ratingTotal += review.rating;

      const card = document.createElement("article");

      card.className = "review-card";

      const initial =
        review.name.trim().charAt(0).toUpperCase() || "?";

      const stars =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);

      card.innerHTML = `
        <header>

          <div class="review-author">

            <div class="review-avatar">
              ${escaparHTML(initial)}
            </div>

            <div>
              <b>${escaparHTML(review.name)}</b>
              <small>${escaparHTML(review.date)}</small>
            </div>

          </div>

          <span class="review-stars">
            ${stars}
          </span>

        </header>

        <p>
          ${escaparHTML(review.text)}
        </p>

        <button
          class="delete-review"
          data-id="${review.id}"
        >
          ELIMINAR
        </button>
      `;

      reviewList.appendChild(card);

    });


  const average = ratingTotal / reviews.length;

  averageRating.textContent = average.toFixed(1);

  const rounded = Math.round(average);

  averageStars.textContent =
    "★".repeat(rounded) +
    "☆".repeat(5 - rounded);

  reviewCount.textContent =
    `${reviews.length} ${reviews.length === 1 ? "opinión" : "opiniones"}`;


  /* BOTONES ELIMINAR */

  document.querySelectorAll(".delete-review").forEach(function (button) {

    button.addEventListener("click", function () {

      const id = Number(button.dataset.id);

      const currentReviews = cargarReseñas();

      const newReviews = currentReviews.filter(function (review) {
        return review.id !== id;
      });

      guardarReseñas(newReviews);

      renderReseñas();

      showToast("Reseña eliminada");

    });

  });

}


/* PUBLICAR RESEÑA */

reviewForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const name = reviewName.value.trim();
  const text = reviewText.value.trim();

  if (!name || !text) {
    showToast("Completa tu nombre y tu opinión");
    return;
  }


  const reviews = cargarReseñas();


  const date = new Date().toLocaleDateString(
    "es-SV",
    {
      day:"2-digit",
      month:"2-digit",
      year:"numeric"
    }
  );


  reviews.push({

    id:Date.now(),

    name:name,

    text:text,

    rating:selectedRating,

    date:date

  });


  guardarReseñas(reviews);


  reviewForm.reset();

  selectedRating = 5;

  pintarEstrellas(selectedRating);

  renderReseñas();

  showToast("¡Gracias por compartir tu opinión! ☕");

});


renderReseñas();

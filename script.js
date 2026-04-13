document.addEventListener("DOMContentLoaded", () => {

  // FOOTER
  const year = document.getElementById("year");
  year.textContent = `© ${new Date().getFullYear()} Hotel City Posadas`;

  // MENU HAMBURGUESA
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // ANIMACIONES SCROLL
  const elements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));

  // cerrar menú al hacer click
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // NAVBAR SCROLL
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

/* SOLO imágenes clickeables */
const images = document.querySelectorAll(
  ".gallery-grid img, .reception img, .room-slide"
);

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src; // 👈 usa la imagen correcta
  });
});

/* cerrar */
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

/* cerrar clic afuera */
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

  // HERO SLIDER
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function changeSlide() {
  slides[currentSlide].classList.remove("active");

  currentSlide = (currentSlide + 1) % slides.length;

  slides[currentSlide].classList.add("active");
}

// cambia cada 4 segundos
setInterval(changeSlide, 4000);

});

// CARRUSEL HABITACIONES
const roomSliders = document.querySelectorAll(".room-slider");

roomSliders.forEach(slider => {
  const slides = slider.querySelectorAll(".room-slide");
  const next = slider.querySelector(".room-next");
  const prev = slider.querySelector(".room-prev");

  let index = 0;

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });
});



window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.style.padding = window.scrollY > 50 ? "20px 40px" : "40px 60px";
});
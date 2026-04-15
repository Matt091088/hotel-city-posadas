document.addEventListener("DOMContentLoaded", () => {

  // ===== FOOTER =====
  const year = document.getElementById("year");
  if (year) {
    year.textContent = `© ${new Date().getFullYear()} Hotel City Posadas`;
  }

  // ===== MENU HAMBURGUESA =====
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== ANIMACIONES SCROLL =====
  const elements = document.querySelectorAll(".hidden");

  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }

  // ===== CERRAR MENU =====
  const links = document.querySelectorAll(".nav-links a");

  if (links.length > 0 && navLinks) {
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // ===== NAVBAR SCROLL =====
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");

  const images = document.querySelectorAll(
    ".gallery-grid img, .reception img, .room-slide"
  );

  if (images.length > 0 && lightbox && lightboxImg) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
      });
    });
  }

  if (closeBtn && lightbox) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  if (lightbox && lightboxImg) {
    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
      }
    });
  }

  // ===== HERO SLIDER =====
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    function changeSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    setInterval(changeSlide, 4000);
  }

  // ===== FORMULARIO =====
  const form = document.getElementById("reservaForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre")?.value || "";
      const telefono = document.getElementById("telefono")?.value || "";
      const habitacion = document.getElementById("habitacion")?.value || "";

      function formatearFecha(fecha) {
        if (!fecha) return "";
        const [year, month, day] = fecha.split("-");
        return `${day}/${month}/${year}`;
      }

      const entradaRaw = document.getElementById("entrada")?.value;
      const salidaRaw = document.getElementById("salida")?.value;

      if (entradaRaw && salidaRaw && salidaRaw <= entradaRaw) {
        alert("La fecha de salida debe ser posterior a la de entrada");
        return;
      }

      const entrada = formatearFecha(entradaRaw);
      const salida = formatearFecha(salidaRaw);

      const mensaje = `Hola, quisiera consultar disponibilidad:%0A
Nombre: ${nombre}%0A
Teléfono: ${telefono}%0A
Habitación: ${habitacion}%0A
Ingreso: ${entrada}%0A
Salida: ${salida}`;

      const url = `https://wa.me/543765293012?text=${mensaje}`;

      window.open(url, "_blank");
    });

    // BLOQUEAR FECHAS PASADAS
    const hoy = new Date().toISOString().split("T")[0];
    const entradaInput = document.getElementById("entrada");
    const salidaInput = document.getElementById("salida");

    if (entradaInput) entradaInput.setAttribute("min", hoy);
    if (salidaInput) salidaInput.setAttribute("min", hoy);
  }

});

// ===== CARRUSEL HABITACIONES =====
const roomSliders = document.querySelectorAll(".room-slider");

if (roomSliders.length > 0) {
  roomSliders.forEach(slider => {
    const slides = slider.querySelectorAll(".room-slide");
    const next = slider.querySelector(".room-next");
    const prev = slider.querySelector(".room-prev");

    let index = 0;

    function showSlide(i) {
      slides.forEach(s => s.classList.remove("active"));
      slides[i].classList.add("active");
    }

    if (next) {
      next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        showSlide(index);
      });
    }

    if (prev) {
      prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
      });
    }
  });
}

// ===== HEADER RESIZE =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    header.style.padding = window.scrollY > 50 ? "20px 40px" : "40px 60px";
  }
});
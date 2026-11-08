const header = document.querySelector(".site-header");

const menu = document.querySelector(".nav");

const menuButton = document.querySelector(".menu-toggle");

const glow = document.querySelector(".cursor-glow");

const heroVisual = document.querySelector(".hero-visual");

const year = document.getElementById("year");

/* AÑO */

if (year) {
  year.textContent = new Date().getFullYear();
}

/* HEADER AL HACER SCROLL */

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",

    window.scrollY > 25
  );
});

/* MENÚ MOBILE */

if (menu && menuButton) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");

    menuButton.classList.toggle("active", open);

    document.body.classList.toggle("menu-open", open);

    menuButton.setAttribute(
      "aria-expanded",

      open ? "true" : "false"
    );
  });
}

/* CERRAR MENÚ */

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!menu || !menuButton) {
      return;
    }

    menu.classList.remove("open");

    menuButton.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
      "aria-expanded",

      "false"
    );
  });
});

/* REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.1,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

/* CURSOR */

window.addEventListener("pointermove", (event) => {
  if (!glow) {
    return;
  }

  glow.style.left = `${event.clientX}px`;

  glow.style.top = `${event.clientY}px`;
});

/* MOVIMIENTO DEL HERO */

window.addEventListener("mousemove", (event) => {
  if (!heroVisual || window.innerWidth < 900) {
    return;
  }

  const x = event.clientX / window.innerWidth - 0.5;

  const y = event.clientY / window.innerHeight - 0.5;

  heroVisual.style.transform = `
        translate(
          ${x * 9}px,
          ${y * 9}px
        )
      `;
});

document.addEventListener("mouseleave", () => {
  if (!heroVisual) {
    return;
  }

  heroVisual.style.transform = "translate(0, 0)";
});

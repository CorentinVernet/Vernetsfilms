function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  html.setAttribute("data-theme", current === "light" ? "dark" : "light");
  console.log("Thème basculé");
}

function loadLyrics(filename) {
  fetch(`assets/lyrics/${filename}`)
    .then((response) => {
      if (!response.ok) throw new Error("Fichier introuvable");
      return response.text();
    })
    .then((text) => {
      const display = document.getElementById("lyricsDisplay");
      if (display) {
        display.textContent = text;
      } else {
        console.error("Élément lyricsDisplay manquant !");
      }
    })
    .catch((err) => {
      const display = document.getElementById("lyricsDisplay");
      if (display) {
        display.textContent = "Erreur de chargement des paroles.";
      }
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));

  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

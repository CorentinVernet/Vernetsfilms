function displaySong(baseName) {
  const lyricsPath = `assets/lyrics/${baseName}.txt`;
  const audioPath = `assets/audio/${baseName}.mp3`;
  const downloadLink = lyricsPath;

  fetch(lyricsPath)
    .then((response) => {
      if (!response.ok) throw new Error("Fichier non trouvé");
      return response.text();
    })
    .then((text) => {
      const container = document.getElementById("songContainer");
      if (!container) return;

      container.innerHTML = `
        <h2>${formatTitle(baseName)}</h2>
        <audio controls class="custom-audio" src="${audioPath}"></audio>
        <pre>${text}</pre>
        <a href="${downloadLink}" download class="download-btn">📥 Télécharger les paroles</a>
      `;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("songContainer").innerHTML =
        "<p>Erreur lors du chargement des paroles.</p>";
    });
}

function displayDownloadButton(url, text = "Télécharger la chanson") {
  const existing = document.querySelector(".download-container");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.className = "download-container";

  const button = document.createElement("a");
  button.className = "download-btn";
  button.href = url;
  button.textContent = text;
  button.download = "";

  container.appendChild(button);
  document.getElementById("songContainer").appendChild(container);
}

function formatTitle(fileName) {
  return fileName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

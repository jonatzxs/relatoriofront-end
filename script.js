// script.js - Lógica interativa para o site Nippon X
// Implementa funcionalidades de tema, busca, filtros, modais, admin e animações

// Base de dados simulada (substitua por API ou banco de dados real)
let articles = [
  {
    id: 1,
    title: "Demon Slayer — Arco da Vila dos Ferreiros",
    synopsis: "Tanjiro e os caçadores enfrentam novos desafios na Vila dos Ferreiros — batalhas intensas e revelações sobre as técnicas dos ferreiros.",
    cover: "destaque.jpg",
    premiere: "2025",
    genres: ["Ação", "Fantasia"],
    studio: "Ufotable",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/VIDEO_ID_1",
    characters: ["Tanjiro", "Nezuko"],
    featured: true,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen — Temporada 3",
    synopsis: "Yuji Itadori enfrenta novas maldições enquanto segredos do passado são revelados.",
    cover: "jujutsu.jpg",
    premiere: "2026",
    genres: ["Ação", "Sobrenatural"],
    studio: "MAPPA",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/VIDEO_ID_2",
    characters: ["Yuji", "Megumi"],
    featured: false,
  },
];

// Estado global
let currentPage = 1;
const articlesPerPage = 6;
let filteredArticles = [...articles];

// Elementos do DOM
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const filterGenre = document.getElementById("filterGenre");
const filterStudio = document.getElementById("filterStudio");
const showFeaturedOnly = document.getElementById("showFeaturedOnly");
const grid = document.getElementById("grid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");
const abrirTrailerBtn = document.getElementById("abrirTrailerBtn");
const fecharTrailerBtn = document.getElementById("fecharTrailerBtn");
const destaqueTrailer = document.getElementById("destaqueTrailer");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const openInNewBtn = document.getElementById("openInNewBtn");
const adminBtn = document.getElementById("adminBtn");
const adminModal = document.getElementById("adminModal");
const adminClose = document.getElementById("adminClose");
const adminLoginBox = document.getElementById("adminLoginBox");
const adminForm = document.getElementById("adminForm");
const adminPassword = document.getElementById("adminPassword");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminCancelLogin = document.getElementById("adminCancelLogin");
const adminSaveBtn = document.getElementById("adminSaveBtn");
const adminClearBtn = document.getElementById("adminClearBtn");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const toasts = document.getElementById("toasts");

// Função para exibir toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toasts.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Inicializar tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}
themeToggle.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Inicializar filtros de gênero e estúdio
function initFilters() {
  const genres = [...new Set(articles.flatMap((a) => a.genres))];
  const studios = [...new Set(articles.map((a) => a.studio))];
  filterGenre.innerHTML = `<option value="all">Todos</option>` + genres.map((g) => `<option value="${g}">${g}</option>`).join("");
  filterStudio.innerHTML = `<option value="all">Todos</option>` + studios.map((s) => `<option value="${s}">${s}</option>`).join("");
}

// Renderizar artigos no grid
function renderArticles() {
  const start = (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const articlesToShow = filteredArticles.slice(0, end);

  grid.innerHTML = articlesToShow
    .map(
      (article) => `
        <article class="card ${article.featured ? "featured" : ""}">
          <div class="card-cover" style="background-image: url('${article.cover}')" role="img" aria-label="Capa de ${article.title}"></div>
          <div class="card-body">
            <h3>${article.title}</h3>
            <p>${article.synopsis.substring(0, 100)}...</p>
            <div class="meta">
              <strong>Estúdio:</strong> ${article.studio}<br>
              <strong>Estreia:</strong> ${article.premiere}<br>
              <strong>Gêneros:</strong> ${article.genres.join(", ")}
            </div>
            <button class="btn primary open-trailer" data-trailer="${article.trailer}">Ver trailer</button>
          </div>
        </article>
      `
    )
    .join("");

  loadMoreBtn.style.display = end >= filteredArticles.length ? "none" : "block";

  // Adicionar eventos aos botões de trailer
  document.querySelectorAll(".open-trailer").forEach((btn) => {
    btn.addEventListener("click", () => {
      const trailerUrl = btn.dataset.trailer;
      modalBody.innerHTML = `
        <iframe src="${trailerUrl}" title="Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
      modal.hidden = false;
      copyLinkBtn.dataset.url = trailerUrl;
      openInNewBtn.dataset.url = trailerUrl;
    });
  });
}

// Filtrar e ordenar artigos
function updateArticles() {
  let result = [...articles];

  // Busca
  const query = searchInput.value.toLowerCase();
  if (query) {
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.synopsis.toLowerCase().includes(query) ||
        a.characters.some((c) => c.toLowerCase().includes(query))
    );
  }

  // Filtros
  const genre = filterGenre.value;
  if (genre !== "all") {
    result = result.filter((a) => a.genres.includes(genre));
  }
  const studio = filterStudio.value;
  if (studio !== "all") {
    result = result.filter((a) => a.studio === studio);
  }
  if (showFeaturedOnly.checked) {
    result = result.filter((a) => a.featured);
  }

  // Ordenação
  const sort = sortSelect.value;
  result.sort((a, b) => {
    if (sort === "newest") return b.premiere - a.premiere;
    if (sort === "oldest") return a.premiere - b.premiere;
    if (sort === "title_az") return a.title.localeCompare(b.title);
    if (sort === "title_za") return b.title.localeCompare(a.title);
    return 0;
  });

  filteredArticles = result;
  currentPage = 1;
  renderArticles();
}

// Carregar mais artigos
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  renderArticles();
});

// Voltar ao topo
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Controle do trailer de destaque
abrirTrailerBtn.addEventListener("click", () => {
  destaqueTrailer.hidden = false;
  const iframe = destaqueTrailer.querySelector("iframe");
  iframe.src = articles.find((a) => a.featured)?.trailer || "";
});
fecharTrailerBtn.addEventListener("click", () => {
  destaqueTrailer.hidden = true;
  const iframe = destaqueTrailer.querySelector("iframe");
  iframe.src = "";
});

// Controle do modal genérico
modalClose.addEventListener("click", () => {
  modal.hidden = true;
  modalBody.innerHTML = "";
});
copyLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(copyLinkBtn.dataset.url);
  showToast("Link copiado!");
});
openInNewBtn.addEventListener("click", () => {
  window.open(openInNewBtn.dataset.url, "_blank");
});

// Controle do painel administrativo
adminBtn.addEventListener("click", () => {
  adminModal.hidden = false;
});
adminClose.addEventListener("click", () => {
  adminModal.hidden = true;
});
adminCancelLogin.addEventListener("click", () => {
  adminModal.hidden = true;
});
adminLoginBtn.addEventListener("click", () => {
  if (adminPassword.value === "admin123") { // Senha fixa para exemplo (substitua por autenticação real)
    adminLoginBox.hidden = true;
    adminForm.hidden = false;
    showToast("Login bem-sucedido!");
  } else {
    showToast("Senha incorreta!");
  }
});
adminClearBtn.addEventListener("click", () => {
  adminForm.reset();
});
adminLogoutBtn.addEventListener("click", () => {
  adminLoginBox.hidden = false;
  adminForm.hidden = true;
  adminPassword.value = "";
  adminModal.hidden = true;
  showToast("Logout realizado!");
});
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newArticle = {
    id: articles.length + 1,
    title: document.getElementById("adminTitleField").value,
    synopsis: document.getElementById("adminSynopsis").value,
    cover: document.getElementById("adminCover").value,
    premiere: document.getElementById("adminPremiere").value,
    genres: document.getElementById("adminGenres").value.split(",").map((g) => g.trim()),
    studio: document.getElementById("adminStudio").value,
    where: document.getElementById("adminWhere").value,
    trailer: document.getElementById("adminTrailer").value,
    characters: document.getElementById("adminCharacters").value.split(",").map((c) => c.trim()),
    featured: document.getElementById("adminFeatured").checked,
  };
  articles.push(newArticle);
  initFilters();
  updateArticles();
  adminForm.reset();
  adminModal.hidden = true;
  showToast("Artigo salvo com sucesso!");
});

// Animações de revelação
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      el.classList.add("visible");
    }
  });
}

// Inicialização
initTheme();
initFilters();
updateArticles();
window.addEventListener("scroll", revealOnScroll);

// Eventos de filtros
searchInput.addEventListener("input", updateArticles);
sortSelect.addEventListener("change", updateArticles);
filterGenre.addEventListener("change", updateArticles);
filterStudio.addEventListener("change", updateArticles);
showFeaturedOnly.addEventListener("change", updateArticles);
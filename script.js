// script.js - Lógica interativa para o site Nippon X
// Implementa funcionalidades de tema, busca, filtros, modais, admin e animações

// Base de dados simulada (substitua por API ou banco de dados real)
let articles = [
  {
    id: 1,
    title: "Jujutsu Kaisen Temporada 3",
    synopsis: "A temporada adapta o arco \"The Culling Game\", onde Yuji Itadori e outros feiticeiros participam de um jogo mortal de extermínio para sobreviver e desvendar conspirações.",
    cover: "https://cdn.shopify.com/s/files/1/0689/6061/6685/files/20250901_jjkS3_poster.jpg?v=1756708446",
    premiere: "Janeiro de 2026",
    genres: ["Ação", "Sobrenatural", "Shonen"],
    studio: "MAPPA",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/OZrfF6F4vmg",
    characters: ["Yuji Itadori", "Megumi Fushiguro", "Yuta Okkotsu"],
    featured: true,
  },
  {
    id: 2,
    title: "Frieren: Beyond Journey's End Temporada 2",
    synopsis: "A elfa maga Frieren continua sua jornada pós-derrota do Rei Demônio — refletindo sobre o tempo, a perda e novas aventuras com companheiros humanos.",
    cover: "https://a.storyblok.com/f/178900/1528x2160/9c32d48ef2/frieren-beyond-journeys-end-season-2-key-visual.jpg/m/filters:quality(95)format(webp)",
    premiere: "16 de janeiro de 2026",
    genres: ["Fantasia", "Aventura", "Drama"],
    studio: "Madhouse",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/zRwXbbySVJk",
    characters: ["Frieren", "Fern", "Stark", "Himmel"],
    featured: false,
  },
  {
    id: 3,
    title: "Hell's Paradise: Jigokuraku Temporada 2",
    synopsis: "Gabimaru e os criminosos prosseguem na ilha misteriosa em busca do elixir da imortalidade — enfrentando horrores sobrenaturais e traições.",
    cover: "https://static0.srcdn.com/wordpress/wp-content/uploads/2023/05/hell-s-paradise-anime-poster.jpg?q=49&fit=contain&w=480&dpr=2",
    premiere: "Janeiro de 2026",
    genres: ["Ação", "Fantasia Sombria", "Seinen"],
    studio: "MAPPA",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/GPgyVaRWFFM",
    characters: ["Gabimaru", "Sagiri", "Yuzuriha", "Shion"],
    featured: false,
  },
  {
    id: 4,
    title: "Bleach: Thousand-Year Blood War - Cour 4 (Final)",
    synopsis: "O capítulo final da guerra milenar entre shinigamis e quincies — com Ichigo Kurosaki liderando a batalha épica contra Yhwach.",
    cover: "https://preview.redd.it/new-key-visual-for-bleach-thousand-year-blood-war-part-4-v0-1pjofbgofyaf1.jpeg?width=640&crop=smart&auto=webp&s=1c77ca00af2d2ca19b1b072958ae34e6473b5666",
    premiere: "2026 (provável outono)",
    genres: ["Ação", "Sobrenatural", "Shonen"],
    studio: "Studio Pierrot",
    where: "Crunchyroll (baseado em temporadas anteriores)",
    trailer: "https://www.youtube.com/embed/HL3eTEn0KXE",
    characters: ["Ichigo Kurosaki", "Rukia Kuchiki", "Renji Abarai", "Byakuya Kuchiki"],
    featured: false,
  },
  {
    id: 5,
    title: "Oshi no Ko Temporada 3",
    synopsis: "Continua a saga de vingança e fama no mundo das idols — com Aqua e Ruby desvendando mistérios familiares e escândalos da indústria.",
    cover: "https://static.wikia.nocookie.net/oshi_no_ko/images/1/17/Season_3_Key_Visual.png/revision/latest?cb=20241006115333",
    premiere: "Janeiro de 2026",
    genres: ["Drama", "Mistério", "Sobrenatural"],
    studio: "Doga Kobo",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/Em8z7UUoEMU",
    characters: ["Aqua", "Ruby", "Ai Hoshino", "Kana Arima"],
    featured: false,
  },
  {
    id: 6,
    title: "Mushoku Tensei: Jobless Reincarnation Temporada 3",
    synopsis: "Rudeus Greyrat avança em sua vida reencarnada — lidando com crescimento pessoal, magia e relacionamentos em um mundo de fantasia.",
    cover: "https://static.wikia.nocookie.net/dublagem/images/e/e4/Mushoku_Tensei-_Jobless_ReincarnatioN.jpg/revision/latest?cb=20210810171227&path-prefix=pt-br",
    premiere: "Abril de 2026",
    genres: ["Fantasia", "Aventura", "Isekai"],
    studio: "Studio Bind",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/O0j2BglbQD0",
    characters: ["Rudeus Greyrat", "Sylphiette", "Eris Boreas Greyrat"],
    featured: false,
  },
  {
    id: 7,
    title: "Fire Force Temporada 3 - Parte 2 (Final)",
    synopsis: "Shinra e a Brigada de Incêndio concluem a luta contra os infernais e o culto do Evangelista — revelando segredos sobre o mundo.",
    cover: "https://a.storyblok.com/f/178900/1000x1500/187c57b286/fire-force-season-3-base-assets-2x3.png/m/filters:quality(95)format(webp)",
    premiere: "Janeiro de 2026",
    genres: ["Ação", "Ficção Científica", "Shonen"],
    studio: "David Production",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/LJDS9ZVCsys",
    characters: ["Shinra Kusakabe", "Arthur Boyle", "Iris", "Tamaki Kotatsu"],
    featured: false,
  },
  {
    id: 8,
    title: "Black Clover Continuação (Temporada 5 ou Temporada 2)",
    synopsis: "Asta e os Cavaleiros Mágicos enfrentam ameaças no Reino de Spade — explorando origens demoníacas e batalhas mágicas intensas.",
    cover: "https://a.storyblok.com/f/178900/750x1111/b9e1c2f9a7/a0055b1a7454869c56e92d633a6388b61670405134_main.jpg/m/filters:quality(95)format(webp)",
    premiere: "2026 (sem data confirmada)",
    genres: ["Ação", "Fantasia", "Shonen"],
    studio: "Studio Pierrot",
    where: "Crunchyroll",
    trailer: "https://www.youtube.com/embed/7bb0It1iFaw",
    characters: ["Asta", "Yuno", "Noelle Silva", "Yami Sukehiro"],
    featured: false,
  },
  {
    id: 9,
    title: "JoJo's Bizarre Adventure: Steel Ball Run",
    synopsis: "Em um universo alternativo, Johnny Joestar e Gyro Zeppeli competem em uma corrida de cavalos pelos EUA — usando Stands em uma caçada por relíquias sagradas.",
    cover: "https://a.storyblok.com/f/178900/708x1000/5b30d41128/steel-ball-run-jojo-s-bizarre-adventure-teaser-visual.jpg/m/filters:quality(95)format(webp)",
    premiere: "2026 (possivelmente março)",
    genres: ["Ação", "Aventura", "Sobrenatural"],
    studio: "David Production",
    where: "Netflix",
    trailer: "https://www.youtube.com/embed/UIwBcXV29aA",
    characters: ["Johnny Joestar", "Gyro Zeppeli", "Diego Brando"],
    featured: false,
  },
  {
    id: 10,
    title: "Fate/Strange Fake",
    synopsis: "Uma Guerra do Santo Graal falsa nos EUA envolve Servos e Mestres em batalhas caóticas — questionando o que é real ou falso no universo Fate.",
    cover: "https://m.media-amazon.com/images/M/MV5BMzIyZDNmMmUtMGZkNC00MTJjLTlmYzUtODllYWM5NDQ4YTJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    premiere: "3 de janeiro de 2026",
    genres: ["Ação", "Fantasia", "Sobrenatural"],
    studio: "A-1 Pictures",
    where: "Crunchyroll (seguindo Fate series)",
    trailer: "https://www.youtube.com/embed/D3ZU1CqKIdM",
    characters: ["Ayaka Sajyou", "Sigma", "Flat Escardos"],
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

// Renderizar destaque dinamicamente
function renderDestaque() {
  const featured = articles.find((a) => a.featured);
  if (featured) {
    document.getElementById("destaqueTitle").textContent = featured.title;
    document.getElementById("destaqueSynopsis").textContent = featured.synopsis;
    const destaqueCover = document.getElementById("destaqueCover");
    destaqueCover.style.backgroundImage = `url('${featured.cover}')`;
    destaqueCover.setAttribute("aria-label", `Capa de ${featured.title}`);
    const metaUl = document.querySelector(".destaque-meta");
    metaUl.innerHTML = `
      <li><strong>Estúdio:</strong> ${featured.studio}</li>
      <li><strong>Data de estreia:</strong> ${featured.premiere}</li>
      <li><strong>Plataforma:</strong> ${featured.where}</li>
      <li><strong>Gêneros:</strong> ${featured.genres.join(", ")}</li>
    `;
    const iframe = destaqueTrailer.querySelector("iframe");
    iframe.title = `Trailer ${featured.title}`;
  } else {
    // Caso não haja destaque, esconder seção ou mostrar mensagem
    document.getElementById("destaque").hidden = true;
  }
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

// Função para parsear datas de premiere
function getPremiereDate(str) {
  const lowerStr = str.toLowerCase();
  const monthMap = {
    'janeiro': 0,
    'fevereiro': 1,
    'março': 2,
    'abril': 3,
    'maio': 4,
    'junho': 5,
    'julho': 6,
    'agosto': 7,
    'setembro': 8,
    'outubro': 9,
    'novembro': 10,
    'dezembro': 11,
  };
  let year = 2026;
  let month = 0;
  let day = 1;

  const yearMatch = lowerStr.match(/(\d{4})/);
  if (yearMatch) year = parseInt(yearMatch[1]);

  const monthKey = Object.keys(monthMap).find(m => lowerStr.includes(m));
  if (monthKey) month = monthMap[monthKey];

  if (lowerStr.includes('outono')) month = 8; // Setembro aproximado
  if (lowerStr.includes('sem data confirmada')) month = 0;
  if (lowerStr.includes('possivelmente março')) month = 2;

  const dayMatch = lowerStr.match(/(\d+) de/);
  if (dayMatch) day = parseInt(dayMatch[1]);

  return new Date(year, month, day).getTime();
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
    if (sort === "newest") return getPremiereDate(b.premiere) - getPremiereDate(a.premiere);
    if (sort === "oldest") return getPremiereDate(a.premiere) - getPremiereDate(b.premiere);
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
  const featured = articles.find((a) => a.featured);
  if (featured) {
    iframe.src = featured.trailer;
  }
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
  articles.forEach((a) => (a.featured = false)); // Garante apenas um destaque
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
  renderDestaque();
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
renderDestaque();
updateArticles();
window.addEventListener("scroll", revealOnScroll);

// Eventos de filtros
searchInput.addEventListener("input", updateArticles);
sortSelect.addEventListener("change", updateArticles);
filterGenre.addEventListener("change", updateArticles);
filterStudio.addEventListener("change", updateArticles);
showFeaturedOnly.addEventListener("change", updateArticles);
// Menu hambúrguer
const menuBtn = document.getElementById("menu-btn");
const menu = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("aberto");
});

// Validação de formulário
const form = document.getElementById("form-contato");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    msg.textContent = "Por favor, preencha todos os campos.";
    msg.style.color = "red";
  } else {
    msg.textContent = "Mensagem enviada com sucesso!";
    msg.style.color = "green";
    form.reset();
  }
});

// Botão voltar ao topo
const topoBtn = document.getElementById("topo-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    topoBtn.style.display = "block";
  } else {
    topoBtn.style.display = "none";
  }
});

topoBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// Referencias principais da tela de login e dos modais auxiliares.
const cadastrar = document.getElementById("btn-cadastro");
const entrar = document.getElementById("btn-login");
const usuario = document.getElementById("usuario");
const senha = document.getElementById("senha");
const msgErroUsuario = document.getElementById("digite-usuario");
const msgSenhaErr = document.getElementById("digite-senha");
const popUp = document.getElementById("abrir");
const form = document.getElementById("cadastro");
const btnFechar = document.getElementById("fechar-btn");
const email = document.getElementById("email");
const senhaReg = document.getElementById("senhaReg");
const registrar = document.getElementById("registrar");
const paragrafoEmail = document.getElementById("paragrafo-email");
const paragrafoSenha = document.getElementById("paragrafo-senha");
const abrirJanRec = document.getElementById("aberto");
const formRec = document.getElementById("recuperar");
const btnFecharRec = document.getElementById("recuperar-fecharbtn");
const inputRecuperar = document.getElementById("email-recuperar");
const btnRecuperar = document.getElementById("btn-enviar");
const linkRec = document.getElementById("link-recuperar");
const formLogin = document.getElementById("login");
const paragrafoRec = document.getElementById("paragrafo-recuperar");
// Lista local temporaria usada para validar login e cadastro antes de existir backend.
const loginArr = [{ usuario: "admin", senha: "1234" }];

// Valida os campos do login, confere usuario e senha e redireciona para o inventario.
function login(event) {
  event.preventDefault();
  const valorUsuario = usuario.value.trim();
  const valorSenha = senha.value.trim();

  msgErroUsuario.textContent = "";
  msgSenhaErr.textContent = "";

  let temErr = false;

  if (valorUsuario === "") {
    msgErroUsuario.textContent = "digite email ou usuario";
    temErr = true;
  }

  if (valorSenha === "") {
    msgSenhaErr.textContent = "digite a senha";
    temErr = true;
  }

  if (temErr) return;

  const usuarioEncontrado = loginArr.find((item) => item.usuario === valorUsuario);

  if (!usuarioEncontrado) {
    msgErroUsuario.textContent = "usuario nao encontrado";
    return;
  }

  if (valorSenha !== usuarioEncontrado.senha) {
    msgSenhaErr.textContent = "senha incorreta";
    return;
  }

  window.location.href = "../pagina-inventario/inventario.html";
}

formLogin.addEventListener("submit", login);

// Abre o popup de cadastro sem enviar o formulario de login.
function abrirPopup(event) {
  event.preventDefault();
  popUp.classList.add("aberto");
}

cadastrar.addEventListener("click", abrirPopup);

// Fecha o popup de cadastro.
function fecharPopUp() {
  popUp.classList.remove("aberto");
}

btnFechar.addEventListener("click", fecharPopUp);

// Fecha o popup quando o clique acontece no fundo escuro.
function fecharFundo(event) {
  if (event.target === popUp) {
    popUp.classList.remove("aberto");
  }
}

popUp.addEventListener("click", fecharFundo);

// Valida os dados de cadastro e adiciona o novo usuario na lista local.
function cadastrarUsuario(event) {
  event.preventDefault();

  const valorEmail = email.value.trim();
  const valorSenha = senhaReg.value.trim();

  paragrafoEmail.textContent = "";
  paragrafoSenha.textContent = "";

  if (valorEmail === "") {
    paragrafoEmail.textContent = "digite um e-mail";
    return;
  }

  if (valorSenha === "") {
    paragrafoSenha.textContent = "digite uma senha";
    return;
  }

  if (!valorEmail.includes("@") || !valorEmail.includes(".")) {
    paragrafoEmail.textContent = "e-mail invalido";
    return;
  }

  if (valorSenha.length < 8) {
    paragrafoSenha.textContent = "senha precisa minimo 8 caracteres";
    return;
  }

  const temMaiuscula = /[A-Z]/.test(valorSenha);
  const temEspecial = /[^a-zA-Z0-9]/.test(valorSenha);

  if (!temMaiuscula || !temEspecial) {
    paragrafoSenha.textContent =
      "senha precisa de pelo menos 1 maiuscula e 1 caractere especial (@, &, !, etc)";
    return;
  }

  for (let i = 0; i < loginArr.length; i += 1) {
    if (valorEmail.toLowerCase() === loginArr[i].usuario.toLowerCase()) {
      paragrafoEmail.textContent = "este email ja existe";
      return;
    }
  }

  loginArr.push({ usuario: valorEmail, senha: valorSenha });
  email.value = "";
  senhaReg.value = "";
  popUp.classList.remove("aberto");
}

form.addEventListener("submit", cadastrarUsuario);

// Abre o modal usado para recuperar senha.
function abrirRec(event) {
  event.preventDefault();
  abrirJanRec.classList.add("abrir");
}

linkRec.addEventListener("click", abrirRec);

// Fecha o modal de recuperar senha pelo botao X.
function fecharRec() {
  abrirJanRec.classList.remove("abrir");
}

btnFecharRec.addEventListener("click", fecharRec);

// Fecha o modal de recuperar senha quando o clique acontece no fundo.
function fecharRecFun(event) {
  if (event.target === abrirJanRec) {
    abrirJanRec.classList.remove("abrir");
  }
}

abrirJanRec.addEventListener("click", fecharRecFun);

// Valida o email informado para recuperar senha e fecha o modal se estiver correto.
function recuperarSenha(event) {
  event.preventDefault();
  const valorInputRec = inputRecuperar.value.trim();

  paragrafoRec.textContent = "";

  if (valorInputRec === "") {
    paragrafoRec.textContent = "insira um email";
    return;
  }

  if (!valorInputRec.includes("@") || !valorInputRec.includes(".")) {
    paragrafoRec.textContent = "insira um email valido";
    return;
  }

  abrirJanRec.classList.remove("abrir");
}

formRec.addEventListener("submit", recuperarSenha);

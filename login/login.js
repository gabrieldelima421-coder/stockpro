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
const etapaRedefinir = document.getElementById("etapa-redefinir");
const inputCodigoRecuperar = document.getElementById("codigo-recuperar");
const inputNovaSenhaRecuperar = document.getElementById("nova-senha-recuperar");
const paragrafoCodigoRecuperar = document.getElementById(
  "paragrafo-codigo-recuperar"
);
const paragrafoNovaSenhaRecuperar = document.getElementById(
  "paragrafo-nova-senha-recuperar"
);
const btnRedefinirSenha = document.getElementById("btn-redefinir-senha");
const linkRec = document.getElementById("link-recuperar");
const formLogin = document.getElementById("login");
const paragrafoRec = document.getElementById("paragrafo-recuperar");
const USUARIOS_KEY = "stockpro_usuarios";
const RECUPERACOES_KEY = "stockpro_recuperacoes_senha";
const SESSAO_KEY = "stockpro_usuario";
const MINUTOS_EXPIRACAO_RECUPERACAO = 15;
let emailRecuperacaoAtual = "";

function texto(valor) {
  return String(valor ?? "").trim();
}

function normalizarEmail(valor) {
  return texto(valor).toLowerCase();
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function senhaValida(valor) {
  return valor.length >= 8 && /[A-Z]/.test(valor) && /[^a-zA-Z0-9]/.test(valor);
}

function lerLista(chave) {
  try {
    const lista = JSON.parse(localStorage.getItem(chave) || "[]");
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    return [];
  }
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

function getUsuarios() {
  return lerLista(USUARIOS_KEY);
}

function salvarUsuarios(usuarios) {
  salvarLista(USUARIOS_KEY, usuarios);
}

function getRecuperacoes() {
  return lerLista(RECUPERACOES_KEY);
}

function salvarRecuperacoes(recuperacoes) {
  salvarLista(RECUPERACOES_KEY, recuperacoes);
}

function acharUsuarioPorEmail(emailInformado) {
  const emailNormalizado = normalizarEmail(emailInformado);
  return getUsuarios().find((item) => item.email === emailNormalizado) || null;
}

function gerarId(prefixo) {
  const aleatorio = Math.random().toString(36).slice(2, 10);
  return prefixo + "-" + Date.now() + "-" + aleatorio;
}

function gerarCodigoRecuperacao() {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

function salvarCodigoRecuperacao(emailInformado, codigo) {
  const emailNormalizado = normalizarEmail(emailInformado);
  const recuperacoes = getRecuperacoes().filter(
    (item) => item.email !== emailNormalizado
  );

  recuperacoes.push({
    email: emailNormalizado,
    codigo,
    expiraEm: Date.now() + MINUTOS_EXPIRACAO_RECUPERACAO * 60 * 1000,
  });

  salvarRecuperacoes(recuperacoes);
}

function getCodigoRecuperacao(emailInformado) {
  const emailNormalizado = normalizarEmail(emailInformado);
  return (
    getRecuperacoes().find((item) => item.email === emailNormalizado) || null
  );
}

function removerCodigoRecuperacao(emailInformado) {
  const emailNormalizado = normalizarEmail(emailInformado);
  salvarRecuperacoes(
    getRecuperacoes().filter((item) => item.email !== emailNormalizado)
  );
}

function login(event) {
  event.preventDefault();
  const valorUsuario = normalizarEmail(usuario.value);
  const valorSenha = senha.value;

  msgErroUsuario.textContent = "";
  msgSenhaErr.textContent = "";

  let temErr = false;

  if (valorUsuario === "") {
    msgErroUsuario.textContent = "digite email ou usuario";
    temErr = true;
  }

  if (valorSenha.trim() === "") {
    msgSenhaErr.textContent = "digite a senha";
    temErr = true;
  }

  if (temErr) return;

  const usuarioEncontrado = acharUsuarioPorEmail(valorUsuario);

  if (!usuarioEncontrado) {
    msgErroUsuario.textContent = "usuario nao encontrado";
    return;
  }

  if (usuarioEncontrado.senha !== valorSenha) {
    msgSenhaErr.textContent = "senha incorreta";
    return;
  }

  sessionStorage.setItem(
    SESSAO_KEY,
    JSON.stringify({
      id: usuarioEncontrado.id,
      email: usuarioEncontrado.email,
    })
  );
  window.location.href = "../pagina-inventario/inventario.html";
}

formLogin.addEventListener("submit", login);

function abrirPopup(event) {
  event.preventDefault();
  popUp.classList.add("aberto");
}

cadastrar.addEventListener("click", abrirPopup);

function fecharPopUp() {
  popUp.classList.remove("aberto");
}

btnFechar.addEventListener("click", fecharPopUp);

function fecharFundo(event) {
  if (event.target === popUp) {
    popUp.classList.remove("aberto");
  }
}

popUp.addEventListener("click", fecharFundo);

function cadastrarUsuario(event) {
  event.preventDefault();

  const valorEmail = normalizarEmail(email.value);
  const valorSenha = senhaReg.value;

  paragrafoEmail.textContent = "";
  paragrafoSenha.textContent = "";

  if (valorEmail === "") {
    paragrafoEmail.textContent = "digite um e-mail";
    return;
  }

  if (valorSenha.trim() === "") {
    paragrafoSenha.textContent = "digite uma senha";
    return;
  }

  if (!emailValido(valorEmail)) {
    paragrafoEmail.textContent = "e-mail invalido";
    return;
  }

  if (valorSenha.length < 8) {
    paragrafoSenha.textContent = "senha precisa minimo 8 caracteres";
    return;
  }

  if (!senhaValida(valorSenha)) {
    paragrafoSenha.textContent =
      "senha precisa de pelo menos 1 maiuscula e 1 caractere especial (@, &, !, etc)";
    return;
  }

  const usuarios = getUsuarios();

  if (usuarios.some((item) => item.email === valorEmail)) {
    paragrafoEmail.textContent = "este email ja existe";
    return;
  }

  usuarios.push({
    id: gerarId("usuario"),
    email: valorEmail,
    senha: valorSenha,
  });
  salvarUsuarios(usuarios);

  email.value = "";
  senhaReg.value = "";
  usuario.value = valorEmail;
  senha.value = "";
  popUp.classList.remove("aberto");
}

form.addEventListener("submit", cadastrarUsuario);

function limparMensagensRecuperacao() {
  paragrafoRec.textContent = "";
  paragrafoCodigoRecuperar.textContent = "";
  paragrafoNovaSenhaRecuperar.textContent = "";
}

function resetarFormularioRecuperacao() {
  emailRecuperacaoAtual = "";
  inputRecuperar.value = "";
  inputCodigoRecuperar.value = "";
  inputNovaSenhaRecuperar.value = "";
  etapaRedefinir.hidden = true;
  btnRedefinirSenha.hidden = true;
  btnRedefinirSenha.disabled = false;
  btnRecuperar.disabled = false;
  btnRecuperar.textContent = "Enviar codigo";
  limparMensagensRecuperacao();
}

function abrirEtapaRedefinicao(emailRecuperacao) {
  emailRecuperacaoAtual = emailRecuperacao;
  etapaRedefinir.hidden = false;
  btnRedefinirSenha.hidden = false;
  btnRecuperar.textContent = "Reenviar codigo";
}

function abrirRec(event) {
  event.preventDefault();
  resetarFormularioRecuperacao();
  abrirJanRec.classList.add("abrir");
}

linkRec.addEventListener("click", abrirRec);

function fecharRec() {
  resetarFormularioRecuperacao();
  abrirJanRec.classList.remove("abrir");
}

btnFecharRec.addEventListener("click", fecharRec);

function fecharRecFun(event) {
  if (event.target === abrirJanRec) {
    fecharRec();
  }
}

abrirJanRec.addEventListener("click", fecharRecFun);

function solicitarCodigoRecuperacao() {
  const valorInputRec = normalizarEmail(inputRecuperar.value);

  limparMensagensRecuperacao();

  if (valorInputRec === "") {
    paragrafoRec.textContent = "insira um email";
    return;
  }

  if (!emailValido(valorInputRec)) {
    paragrafoRec.textContent = "insira um email valido";
    return;
  }

  const usuarioEncontrado = acharUsuarioPorEmail(valorInputRec);

  if (!usuarioEncontrado) {
    paragrafoRec.textContent = "usuario nao encontrado";
    return;
  }

  const codigo = gerarCodigoRecuperacao();
  salvarCodigoRecuperacao(valorInputRec, codigo);
  abrirEtapaRedefinicao(valorInputRec);
  paragrafoRec.textContent =
    "Codigo de recuperacao gerado. Codigo para teste: " + codigo;
  inputCodigoRecuperar.focus();
}

btnRecuperar.addEventListener("click", solicitarCodigoRecuperacao);

function recuperarSenha(event) {
  event.preventDefault();

  const valorInputRec = normalizarEmail(inputRecuperar.value);
  const valorCodigo = inputCodigoRecuperar.value.trim();
  const valorNovaSenha = inputNovaSenhaRecuperar.value;

  limparMensagensRecuperacao();

  if (valorInputRec === "") {
    paragrafoRec.textContent = "insira um email";
    return;
  }

  if (!emailValido(valorInputRec)) {
    paragrafoRec.textContent = "insira um email valido";
    return;
  }

  if (valorCodigo === "") {
    paragrafoCodigoRecuperar.textContent = "insira o codigo de recuperacao";
    return;
  }

  if (valorNovaSenha.trim() === "") {
    paragrafoNovaSenhaRecuperar.textContent = "digite uma nova senha";
    return;
  }

  if (!senhaValida(valorNovaSenha)) {
    paragrafoNovaSenhaRecuperar.textContent =
      "senha precisa de pelo menos 1 maiuscula e 1 caractere especial (@, &, !, etc)";
    return;
  }

  const recuperacao = getCodigoRecuperacao(valorInputRec);

  if (
    !recuperacao ||
    recuperacao.codigo !== valorCodigo ||
    Number(recuperacao.expiraEm) <= Date.now()
  ) {
    paragrafoCodigoRecuperar.textContent = "codigo invalido ou expirado";
    return;
  }

  const usuarios = getUsuarios();
  const indiceUsuario = usuarios.findIndex((item) => item.email === valorInputRec);

  if (indiceUsuario < 0) {
    paragrafoRec.textContent = "usuario nao encontrado";
    return;
  }

  usuarios[indiceUsuario] = {
    ...usuarios[indiceUsuario],
    senha: valorNovaSenha,
  };
  salvarUsuarios(usuarios);
  removerCodigoRecuperacao(valorInputRec);

  usuario.value = emailRecuperacaoAtual || valorInputRec;
  senha.value = "";
  msgErroUsuario.textContent = "Senha redefinida com sucesso. Faca login novamente.";
  msgSenhaErr.textContent = "";
  fecharRec();
}

formRec.addEventListener("submit", recuperarSenha);

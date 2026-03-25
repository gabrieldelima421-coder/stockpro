"use strict";

// ============================================================================
// 1) ELEMENTOS DO HTML
// ============================================================================

// ------------------------------
// BOTÕES PRINCIPAIS (menu)
// ------------------------------
const btnCategoria = document.getElementById("categoria");
const registrar = document.getElementById("registro");
const editar = document.getElementById("editar");
const ordens = document.getElementById("ordens");

// ------------------------------
// ÁREA "INVENTÁRIO" (filtro + busca + tabela)
// ------------------------------
const pesquisar = document.getElementById("buscar");
const paragrafoErrBusca = document.getElementById("paragrafo_busca");

const tabela = document.getElementById("tabela-produtos");
const corpoTabela = document.getElementById("corpo-tabela");

const filtroOpcoes = document.getElementById("filtro-opcoes");
const btnAplicarFiltro = document.getElementById("aplicar_filtro");
const btnLimparFiltro = document.getElementById("limpar_filtro");
const btnRecarregarLista = document.getElementById("recarregar_lista");

// ------------------------------
// CATEGORIAS
// ------------------------------
const abrirPopUpCategoria = document.getElementById("popup-categorias");
const btnFecharCategoria = document.getElementById("btn-fechar-categorias");
const inputCategoria = document.getElementById("nova-categoria");
const selcionarCategoria = document.getElementById("select_categoria");
const listaCategorias = document.getElementById("lista-categorias");
const paragrafoErroCate = document.getElementById("erro_categoria");
const formCategorias = document.getElementById("form-categorias");
const btnSalvarCategoria = document.getElementById("adicionar-categoria");
const btnEditarCategoria = document.getElementById("editar-categorias");
const textoEdCat = document.getElementById("texto-ed-cat");
const btnExcluirCat = document.getElementById("excluir-cat");

// ------------------------------
// POP-UP "REGISTRAR PRODUTO"
// ------------------------------
const popup = document.getElementById("popup");
const botaoFecharPopUp = document.getElementById("btn-fechar");

const form = document.getElementById("formulario");
const codigo = document.getElementById("codigo");
const nome = document.getElementById("nome-produto");
const quantidade = document.getElementById("quantidade");
const paragrafoErroRegistro = document.getElementById("erro-registro");

// Ponto de reposição
const ES = document.getElementById("ES");
const consumo = document.getElementById("consumo");
const prazoEntrega = document.getElementById("prazo-entrega");

// ------------------------------
// POP-UP "EDITAR PRODUTO"
// ------------------------------
const popUpEditar = document.getElementById("popup-editar");
const btnFecharEditar = document.getElementById("btn-fechar-editar");

const formEditar = document.getElementById("form-editar");
const encontrarPro = document.getElementById("encontrar");
const btnPesquisarNoEditar = document.getElementById("btn_pesquisa_editar");
const paragrafoInputEditar = document.getElementById("paragrafo_input_editar");

const divBtn = document.getElementById("botoes-lista");
const btnAdicionarCat = document.getElementById("adicionar_categoria");
const editarPro = document.getElementById("editar_produto");
const removerPro = document.getElementById("remover_produtos");

const listaProd = document.getElementById("mostrar-lista");

// ------------------------------
// POP-UP "ORDENS"
// ------------------------------
const abrirPainelOrdens = document.getElementById("popup_ordens");
const btnFecharOrdem = document.getElementById("btnFechar_ordens");

const procurarOrdens = document.getElementById("buscar_ordens");
const paragrafoErroBuscar = document.getElementById("paragrafo_buscar_ordens");

const atualizarTabelaOrdens = document.getElementById("todas_ordens");
const btnCompraEntrada = document.getElementById("compra_entrada");
const btnSaidaVenda = document.getElementById("saida_venda");

const tabelaOrdens = document.getElementById("tabela_ordens");
const tabelaCorpoOrdens = document.getElementById("corpo_tabela_ordens");

// ------------------------------
// MODAL "COMPRA/ENTRADA"
// ------------------------------
const popUpRegistroOrdens = document.getElementById(
  "popup_compra_entrada_saida_venda",
);
const btnFecharOrdem2 = document.getElementById("btnFechar_ordem2");
const formOrdemE = document.getElementById("form-ordem-entrada");
const produtoFornecedor = document.getElementById("produto_fornecedor");
const fornecedor = document.getElementById("fornecedor");
const inserirOredemEntrada = document.getElementById("inserir_ordemComEnt");
const btnSalvarEntrada = document.getElementById("salvar_ordemComEnt");
const produtoNomeEntrada = document.getElementById("nome_produto_entrada");

const paragrafoCodigoProduto = document.getElementById(
  "paragrafo_codigo_produto",
);
const paragrafoFornecedor = document.getElementById("paragrafo_fornecedor");
const paragrafoCompraQuantidade = document.getElementById(
  "paragrafo_compra_quantidade",
);
const paragrafoNomeProdutoEntrada = document.getElementById(
  "paragrafo_nome_produto_entrada",
);

// ------------------------------
// MODAL "SAÍDA/VENDA"
// ------------------------------
const popupSaida = document.getElementById("popup_saida_venda");
const btnFecharOrdem3 = document.getElementById("btnFechar_ordem3");
const formOrdemS = document.getElementById("form-ordem-saida");
const produtoCliente = document.getElementById("produto_cliente");
const cliente = document.getElementById("cliente");
const inserirOredemSaida = document.getElementById("inserir_ordemComSai");
const btnSalvarSaida = document.getElementById("salvar_ordemComSai");
const produtoNomeSaida = document.getElementById("nome_produto_saida");

const paragrafoNomeProdutoSaida = document.getElementById(
  "paragrafo_nome_produto_saida",
);
const paragrafoCodigoProdutoSaida = document.getElementById(
  "paragrafo_codigo_produto_saida",
);
const paragrafoCliente = document.getElementById("paragrafo_cliente");
const paragrafoSaidaQuantidade = document.getElementById(
  "paragrafo_saida_quantidade",
);

// ------------------------------
// MODAL EDITAR ORDENS
// ------------------------------
const popUpEditarOrdem = document.getElementById("editar_ordem");
const pesquisarEditarOrdem = document.getElementById("pesquisar_editar_ordem");
const btnEditarOrdens = document.getElementById("btn_editar_ordem");
const btnFecharEditarOrdem = document.getElementById("btn_fechar_editar_ordem");
const formPesquisarOrdemEditar = document.getElementById(
  "formulario_pesquisa_editar_ordem",
);
const paragrafoErroEditar = document.getElementById("pesquisar_ordem");
const listaEditarOrdens = document.getElementById("lista_editar_ordens");
const btnPesquisarOrdem = document.getElementById("btn_buscar_ordens_editar");
const btnRemoverOrdem = document.getElementById("remover_ordem");
const btnCarregarListaEditar = document.getElementById("carregar_ordens");
const btnEditarOrdemEditar = document.getElementById("editar_ordem_editar");
const formEditarOrdem = document.getElementById("form_editar_ordem");
const abrirModalEditarOrdem = document.getElementById("editar_ordem_dentro");
const inputEditarCodigo = document.getElementById("editar_codigo_produto");
const inputEditarProduto = document.getElementById("editar_nome_produto");
const inputEditarFornecedor = document.getElementById("editar_fornecedor");
const inputEditarCliente = document.getElementById("editar_cliente");
const inputEditarEntrada = document.getElementById("editar_entrada");
const inputEditarSaida = document.getElementById("editar_saida");
const paraagrafoErro1 = document.getElementById("erro1");
const paraagrafoErro2 = document.getElementById("erro2");
const paraagrafoErro3 = document.getElementById("erro3");
const paraagrafoErro4 = document.getElementById("erro4");
const paraagrafoErro5 = document.getElementById("erro5");
const paraagrafoErro6 = document.getElementById("erro6");
const btnSalvarEditarOrdem = document.getElementById("salvar_editar_ordem");
const btnFecharEditarOrdemDentro = document.getElementById(
  "btn_fechar_editar_ordem_dentro",
);
let marcarTudoBtn = document.getElementById("marcar_tudo");

// ============================================================================
// 2) DADOS / ESTADO
// ============================================================================
let produtos = [];
const categorias = [];
const arrayOrdens = [];

let ordemSelecionadaIndex = null;

// estado da edição de categorias
let modoEdicaoCategoria = false;
let modoExclusaoCategoria = false;
let categoriaSelecionada = null;
let botaoCategoriaSelecionada = null;

// ============================================================================
// 3) HELPERS GERAIS
// ============================================================================
function abrirModal(element) {
  element.classList.add("aberto");
}

function fecharModal(element) {
  element.classList.remove("aberto");
}

function fecharFora(event, modal) {
  if (event.target === modal) {
    fecharModal(modal);
  }
}

function normalizarCodigo(valor) {
  return String(valor ?? "")
    .trim()
    .toLowerCase();
}

function acharProdutoPorCodigo(cod) {
  const codNorm = normalizarCodigo(cod);

  for (let i = 0; i < produtos.length; i++) {
    if (normalizarCodigo(produtos[i].codigo) === codNorm) {
      return { produto: produtos[i], index: i };
    }
  }

  return null;
}

function calcularPontoReposicao(estoqueSeg, consMedio, prazo) {
  const es = Number(estoqueSeg);
  const c = Number(consMedio);
  const p = Number(prazo);

  if (!Number.isFinite(es) || es < 0) return "-";
  if (!Number.isFinite(c) || c < 0) return "-";
  if (!Number.isFinite(p) || p < 0) return "-";

  return es + c * p;
}

// FUNÇAO HELPER PARA FAZER NOVA TABELA SE PASSAR DE 20 ITENS REGISTRADOS

function mostrarBtn(btn, arr) {
if (arr.length > 20) {
btn.hidden = false
}
}

function novaTabela(e) {
const area = e.currentTarget.dataset.area

}



// ============================================================================
// 4) RENDER PRODUTOS / ORDENS
// ============================================================================
function renderProdutos(lista) {
  corpoTabela.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const p = lista[i];
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.codigo}</td>
      <td>${p.nome}</td>
      <td>${p.quantidade}</td>
      <td>${p.pontoReposicao ?? "-"}</td>
    `;

    const qtd = Number(p.quantidade);
    const pr = Number(p.pontoReposicao);

    if (Number.isFinite(qtd) && Number.isFinite(pr) && qtd < pr) {
      tr.children[2].classList.add("negativo");
    } else {
      tr.children[2].classList.remove("negativo");
    }

    corpoTabela.appendChild(tr);
  }
}

function renderOrdens(lista) {
  tabelaCorpoOrdens.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const o = lista[i];
    const tr = document.createElement("tr");

    const fornecedorTxt = o.tipo === "entrada" ? o.pessoa : "";
    const entradaTxt = o.tipo === "entrada" ? o.quantidade : "";
    const clienteTxt = o.tipo === "saida" ? o.pessoa : "";
    const saidaTxt = o.tipo === "saida" ? o.quantidade : "";

    tr.innerHTML = `
      <td>${o.codigoProduto ?? ""}</td>
      <td>${o.produto ?? ""}</td>
      <td>${fornecedorTxt}</td>
      <td>${entradaTxt}</td>
      <td>${clienteTxt}</td>
      <td>${saidaTxt}</td>
    `;

    tabelaCorpoOrdens.appendChild(tr);
  }
}

// ============================================================================
// 5) CATEGORIAS
// ============================================================================
function filtrarPorCategoria(categ) {
  const categNorm = String(categ ?? "")
    .trim()
    .toLowerCase();

  const resultados = produtos.filter((p) => {
    return (
      String(p.categoria ?? "")
        .trim()
        .toLowerCase() === categNorm
    );
  });

  renderProdutos(resultados);
}

function abrirModalCategorias() {
  abrirModal(abrirPopUpCategoria);
}

function fecharModalCategorias() {
  fecharModal(abrirPopUpCategoria);
}

function aplicarEstiloBaseCategoria(botao) {
  botao.style.cssText = `
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 100px;
    background-color: rgba(4, 77, 234, 0.7);
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    border: none;
    cursor: pointer;
    text-shadow: none;
  `;
}

function aplicarEstiloCategoriaSelecionada(botao) {
  botao.style.backgroundColor = "rgb(12, 44, 130)";
  botao.style.outline = "2px solid rgb(255, 208, 0)";
  botao.style.transform = "scale(1.03)";
}

function limparSelecaoCategoria() {
  if (botaoCategoriaSelecionada) {
    aplicarEstiloBaseCategoria(botaoCategoriaSelecionada);
  }

  categoriaSelecionada = null;
  botaoCategoriaSelecionada = null;
  textoEdCat.innerHTML = "";
}

function renderPainelEditarCategoria() {
  if (modoExclusaoCategoria) {
    textoEdCat.innerHTML = `
      <p>Selecione uma ou mais categorias abaixo para excluir.</p>
      <button id="select-todas-cat" type="button">Selecionar tudo</button>
      <button id="limpar-selecao-cat" type="button">Limpar selecao</button>
      <button id="confirmar-excluir-cat" type="button">Excluir selecionadas</button>
    `;

    const selecionarTudo = document.getElementById("select-todas-cat");
    const limparSelecao = document.getElementById("limpar-selecao-cat");
    const confirmarExclusao = document.getElementById("confirmar-excluir-cat");

    selecionarTudo.addEventListener("click", () => {
      const checkboxes = listaCategorias.querySelectorAll(
        'input[type="checkbox"]',
      );

      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
      }
    });

    limparSelecao.addEventListener("click", () => {
      const checkboxes = listaCategorias.querySelectorAll(
        'input[type="checkbox"]',
      );

      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    });

    confirmarExclusao.addEventListener("click", excluirCategoriasSelecionadas);
    return;
  }

  if (!modoEdicaoCategoria) {
    textoEdCat.innerHTML = "";
    return;
  }

  if (!categoriaSelecionada) {
    textoEdCat.innerHTML = `<p>Selecione uma categoria abaixo para renomear.</p>`;
    return;
  }

  textoEdCat.innerHTML = `
    <p>Categoria selecionada: <strong>${categoriaSelecionada}</strong></p>
    <input id="input-renomear-categoria" type="text" placeholder="Novo nome da categoria" autocomplete="off">
    <button id="btn-salvar-renomear-categoria" type="button">Renomear</button>
    <button id="btn-cancelar-renomear-categoria" type="button">Cancelar</button>
  `;

  const inputRenomear = document.getElementById("input-renomear-categoria");
  const btnSalvarRenomear = document.getElementById(
    "btn-salvar-renomear-categoria",
  );
  const btnCancelarRenomear = document.getElementById(
    "btn-cancelar-renomear-categoria",
  );

  inputRenomear.focus();

  btnSalvarRenomear.addEventListener("click", renomearCategoriaSelecionada);

  btnCancelarRenomear.addEventListener("click", () => {
    limparSelecaoCategoria();
    renderPainelEditarCategoria();
    renderizarCategorias();
  });

  inputRenomear.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    renomearCategoriaSelecionada();
  });
}

function renderizarCategorias() {
  listaCategorias.innerHTML = "";
  selcionarCategoria.innerHTML = `<option value="" selected disabled>Selecione uma categoria</option>`;

  if (categorias.length === 0) {
    modoEdicaoCategoria = false;
    modoExclusaoCategoria = false;
    categoriaSelecionada = null;
    botaoCategoriaSelecionada = null;
    btnEditarCategoria.textContent = "Editar";
    btnExcluirCat.textContent = "Excluir Categoria";
  }

  btnEditarCategoria.hidden = categorias.length === 0;
  btnExcluirCat.hidden = categorias.length === 0;

  botaoCategoriaSelecionada = null;

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];

    if (modoExclusaoCategoria) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");

     label.style.cssText = `
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 6px 0;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
  `;

  input.type = "checkbox";
  input.dataset.categoria = categoria.id;
  input.style.cursor = "pointer";

  span.textContent = categoria.id.toUpperCase();
  span.style.cssText = `
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    border-radius: 100px;
    background-color: rgba(4, 77, 234, 0.7);
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-shadow: none;
  `;

  label.appendChild(input);
  label.appendChild(span);
  listaCategorias.appendChild(label);
}
  else {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = categoria.id;
      button.dataset.categoria = categoria.id;

      aplicarEstiloBaseCategoria(button);

      if (modoEdicaoCategoria && categoriaSelecionada === categoria.id) {
        aplicarEstiloCategoriaSelecionada(button);
        botaoCategoriaSelecionada = button;
      }

      listaCategorias.appendChild(button);
    }

    const option = document.createElement("option");
    option.value = categoria.id;
    option.textContent = categoria.id;
    selcionarCategoria.appendChild(option);
  }
}

function adicionarCategoria() {
  const valorCategoria = inputCategoria.value.trim().toLowerCase();

  paragrafoErroCate.textContent = "";

  if (valorCategoria === "") {
    paragrafoErroCate.textContent = "Insira uma categoria válida.";
    return;
  }

  if (categorias.some((cat) => cat.id === valorCategoria)) {
    paragrafoErroCate.textContent = "Essa categoria já existe.";
    return;
  }

  categorias.push({ id: valorCategoria });
  inputCategoria.value = "";

  renderizarCategorias();
}

function selecionarCategoriaParaEditar(botao) {
  const nomeCategoria = botao.dataset.categoria;

  if (botaoCategoriaSelecionada) {
    aplicarEstiloBaseCategoria(botaoCategoriaSelecionada);
  }

  categoriaSelecionada = nomeCategoria;
  botaoCategoriaSelecionada = botao;

  aplicarEstiloCategoriaSelecionada(botao);
  renderPainelEditarCategoria();
}

function editarCat(event) {
  event.preventDefault();

  if (modoExclusaoCategoria) {
    modoExclusaoCategoria = false;
    btnExcluirCat.textContent = "Excluir Categoria";
  }

  modoEdicaoCategoria = !modoEdicaoCategoria;
  btnEditarCategoria.textContent = modoEdicaoCategoria
    ? "Fechar edição"
    : "Editar";

  paragrafoErroCate.textContent = "";

  if (!modoEdicaoCategoria) {
    limparSelecaoCategoria();
  }

  renderizarCategorias();
  renderPainelEditarCategoria();
}

function renomearCategoriaSelecionada() {
  paragrafoErroCate.textContent = "";

  if (!categoriaSelecionada) {
    paragrafoErroCate.textContent = "Selecione uma categoria primeiro.";
    return;
  }

  const inputRenomear = document.getElementById("input-renomear-categoria");
  if (!inputRenomear) return;

  const novoNome = inputRenomear.value.trim().toLowerCase();

  if (novoNome === "") {
    paragrafoErroCate.textContent = "Digite um novo nome válido.";
    return;
  }

  if (novoNome === categoriaSelecionada) {
    paragrafoErroCate.textContent = "Digite um nome diferente do atual.";
    return;
  }

  if (categorias.some((cat) => cat.id === novoNome)) {
    paragrafoErroCate.textContent = "Essa categoria já existe.";
    return;
  }

  const indiceCategoria = categorias.findIndex(
    (cat) => cat.id === categoriaSelecionada,
  );

  if (indiceCategoria === -1) {
    paragrafoErroCate.textContent = "Categoria não encontrada.";
    return;
  }

  const nomeAntigo = categorias[indiceCategoria].id;
  categorias[indiceCategoria].id = novoNome;

  for (let i = 0; i < produtos.length; i++) {
    const categoriaProduto = String(produtos[i].categoria ?? "")
      .trim()
      .toLowerCase();

    if (categoriaProduto === nomeAntigo) {
      produtos[i].categoria = novoNome;
    }
  }

  categoriaSelecionada = novoNome;

  renderizarCategorias();
  renderPainelEditarCategoria();
  renderProdutos(produtos);

  paragrafoErroCate.textContent = "Categoria renomeada com sucesso.";
}

// EXCLUIR CATEGORIA ==========================================================
//funçao abrir modo ediçao
function abrirEdEx(event) {
  event.preventDefault();

  paragrafoErroCate.textContent = "";

  if (modoEdicaoCategoria) {
    modoEdicaoCategoria = false;
    btnEditarCategoria.textContent = "Editar";
    limparSelecaoCategoria();
  }

  modoExclusaoCategoria = !modoExclusaoCategoria;
  btnExcluirCat.textContent = modoExclusaoCategoria
    ? "Fechar exclusao"
    : "Excluir Categoria";

  renderizarCategorias();
  renderPainelEditarCategoria();
}


//funçao exlcuir
function excluirCat(id) {
 
  const removCat = categorias.findIndex((categoria) => {
    return categoria.id === id;
  });

  if (removCat === -1) {
    return false;
  }

  for (let i = 0; i < produtos.length; i++) {
    const categoriaProduto = String(produtos[i].categoria ?? "")
      .trim()
      .toLowerCase();

    if (categoriaProduto === id) {
      produtos[i].categoria = "";
    }
  }

  categorias.splice(removCat, 1);
  return true;
}

function excluirCategoriasSelecionadas() {
  const marcadas = listaCategorias.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  if (marcadas.length === 0) {
    paragrafoErroCate.textContent =
      "Selecione pelo menos 1 categoria para excluir.";
    return;
  }

  paragrafoErroCate.textContent = "";

  let removidas = 0;

  for (let i = 0; i < marcadas.length; i++) {
    const idCategoria = String(marcadas[i].dataset.categoria ?? "")
      .trim()
      .toLowerCase();

    if (excluirCat(idCategoria)) {
      removidas++;
    }
  }

  limparSelecaoCategoria();
  renderizarCategorias();
  renderPainelEditarCategoria();
  renderProdutos(produtos);

  if (removidas === 0) {
    paragrafoErroCate.textContent = "Nenhuma categoria foi removida.";
    return;
  }

  paragrafoErroCate.textContent = `${removidas} categoria(s) removida(s) com sucesso.`;
}



// eventos das categorias
btnCategoria.addEventListener("click", abrirModalCategorias);
btnFecharCategoria.addEventListener("click", fecharModalCategorias);

formCategorias.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarCategoria();
});

btnEditarCategoria.addEventListener("click", editarCat);
btnExcluirCat.addEventListener("click", abrirEdEx);

listaCategorias.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (modoExclusaoCategoria) {
    return;
  }

  if (modoEdicaoCategoria) {
    selecionarCategoriaParaEditar(btn);
    return;
  }

  filtrarPorCategoria(btn.textContent);
  fecharModalCategorias();
});

// ============================================================================
// 6) REGISTRAR PRODUTO
// ============================================================================
registrar.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(popup);
  form.reset();
  paragrafoErroRegistro.textContent = "";
  codigo.focus();
});

botaoFecharPopUp.addEventListener("click", () => fecharModal(popup));
popup.addEventListener("click", (e) => fecharFora(e, popup));

function adicionarLinha(event) {
  event.preventDefault();

  const valorCodigo = codigo.value.trim();
  const valorNome = nome.value.trim();
  const qtdStr = quantidade.value.trim();
  const valorQuantidade = Number(qtdStr);
  const categoriaValor = String(selcionarCategoria.value ?? "")
    .trim()
    .toLowerCase();

  paragrafoErroRegistro.textContent = "";

  if (valorCodigo === "" || valorNome === "" || qtdStr === "") {
    paragrafoErroRegistro.textContent =
      "Preencha codigo, nome e quantidade para salvar o produto.";
    return;
  }

  if (!Number.isInteger(valorQuantidade) || valorQuantidade < 0) {
    paragrafoErroRegistro.textContent =
      "A quantidade precisa ser um numero inteiro maior ou igual a zero.";
    return;
  }

  if (acharProdutoPorCodigo(valorCodigo)) {
    paragrafoErroRegistro.textContent =
      "Ja existe um produto cadastrado com esse codigo.";
    return;
  }

  const valorPontoReposicao = calcularPontoReposicao(
    ES.value.trim(),
    consumo.value.trim(),
    prazoEntrega.value.trim(),
  );

  produtos.push({
    codigo: valorCodigo,
    nome: valorNome,
    quantidade: valorQuantidade,
    pontoReposicao: valorPontoReposicao,
    categoria: categoriaValor,
  });

  renderProdutos(produtos);

  form.reset();
  paragrafoErroRegistro.textContent = "";
  fecharModal(popup);
}
form.addEventListener("submit", adicionarLinha);

// ============================================================================
// 7) BUSCA E FILTRO DO INVENTÁRIO
// ============================================================================
function procurarProduto() {
  const valorPesquisar = pesquisar.value.trim().toLowerCase();

  if (valorPesquisar === "") {
    paragrafoErrBusca.textContent = "Por favor, insira um termo de pesquisa.";
    return;
  }

  paragrafoErrBusca.textContent = "";

  const resultados = produtos.filter((produto) => {
    const cod = String(produto.codigo ?? "").toLowerCase();
    const nom = String(produto.nome ?? "").toLowerCase();
    const qtd = Number(produto.quantidade);

    return (
      cod.includes(valorPesquisar) ||
      nom.includes(valorPesquisar) ||
      (Number.isFinite(Number(valorPesquisar)) &&
        qtd === Number(valorPesquisar))
    );
  });

  if (resultados.length === 0) {
    paragrafoErrBusca.textContent =
      "Nenhum produto encontrado para o termo pesquisado.";
    return;
  }

  renderProdutos(resultados);
}

pesquisar.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  procurarProduto();
});

btnRecarregarLista.addEventListener("click", () => {
  paragrafoErrBusca.textContent = "";
  pesquisar.value = "";
  renderProdutos(produtos);
});

function filtroInventario() {
  const valorFiltro = filtroOpcoes.value;

  if (!valorFiltro) return;

  if (
    valorFiltro === "reposicao_negativo" ||
    valorFiltro === "reposicao_positivo"
  ) {
    const resultados = produtos.filter((p) => {
      const qtd = Number(p.quantidade);
      const pr = Number(p.pontoReposicao);

      if (!Number.isFinite(qtd) || !Number.isFinite(pr)) return false;
      if (valorFiltro === "reposicao_negativo") return qtd < pr;
      if (valorFiltro === "reposicao_positivo") return qtd >= pr;

      return true;
    });

    renderProdutos(resultados);
    return;
  }

  const listaOrdenada = [...produtos];

  if (valorFiltro === "codigo_az") {
    listaOrdenada.sort((a, b) =>
      String(a.codigo).localeCompare(String(b.codigo)),
    );
  } else if (valorFiltro === "codigo_za") {
    listaOrdenada.sort((a, b) =>
      String(b.codigo).localeCompare(String(a.codigo)),
    );
  } else if (valorFiltro === "produto_az") {
    listaOrdenada.sort((a, b) => String(a.nome).localeCompare(String(b.nome)));
  } else if (valorFiltro === "produto_za") {
    listaOrdenada.sort((a, b) => String(b.nome).localeCompare(String(a.nome)));
  } else if (valorFiltro === "quantidade_crescente") {
    listaOrdenada.sort((a, b) => Number(a.quantidade) - Number(b.quantidade));
  } else if (valorFiltro === "quantidade_decrescente") {
    listaOrdenada.sort((a, b) => Number(b.quantidade) - Number(a.quantidade));
  }

  renderProdutos(listaOrdenada);
}

btnAplicarFiltro.addEventListener("click", filtroInventario);

btnLimparFiltro.addEventListener("click", () => {
  filtroOpcoes.value = "";
  renderProdutos(produtos);
});

// ============================================================================
// 8) POP-UP EDITAR PRODUTO
// ============================================================================
editar.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(popUpEditar);
});

btnFecharEditar.addEventListener("click", () => fecharModal(popUpEditar));
popUpEditar.addEventListener("click", (e) => fecharFora(e, popUpEditar));

formEditar.addEventListener("submit", (e) => e.preventDefault());

function encontrarProdutoEditar() {
  const valorEncontrarPro = encontrarPro.value.trim().toLowerCase();

  if (valorEncontrarPro === "") {
    paragrafoInputEditar.textContent =
      "Por favor, insira um termo de pesquisa.";
    return;
  }

  paragrafoInputEditar.textContent = "";
  listaProd.innerHTML = "";
  listaProd.classList.remove("aberto");
  divBtn.classList.remove("aberto");

  let encontrou = false;

  for (let i = 0; i < produtos.length; i++) {
    const cod = String(produtos[i].codigo ?? "").toLowerCase();
    const nom = String(produtos[i].nome ?? "").toLowerCase();

    if (valorEncontrarPro === cod || valorEncontrarPro === nom) {
      encontrou = true;

      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");

      span.style.cssText =
        "font-family: Arial, Helvetica, sans-serif; margin-left: 5px; font-weight: 400;";

      input.type = "checkbox";
      span.textContent =
        valorEncontrarPro === cod ? produtos[i].codigo : produtos[i].nome;

      label.appendChild(input);
      label.appendChild(span);
      listaProd.appendChild(label);
    }
  }

  if (encontrou) {
    listaProd.classList.add("aberto");
    divBtn.classList.add("aberto");
  } else {
    paragrafoInputEditar.textContent = "Produto não encontrado.";
  }
}

encontrarPro.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  encontrarProdutoEditar();
});

btnPesquisarNoEditar.addEventListener("click", (event) => {
  event.preventDefault();
  encontrarProdutoEditar();
});

// ============================================================================
// 9) POP-UP ORDENS + MODAIS ENTRADA / SAÍDA
// ============================================================================
ordens.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(abrirPainelOrdens);
});

btnFecharOrdem.addEventListener("click", () => fecharModal(abrirPainelOrdens));
abrirPainelOrdens.addEventListener("click", (e) =>
  fecharFora(e, abrirPainelOrdens),
);

btnCompraEntrada.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(popUpRegistroOrdens);
});

btnFecharOrdem2.addEventListener("click", () =>
  fecharModal(popUpRegistroOrdens),
);
popUpRegistroOrdens.addEventListener("click", (e) =>
  fecharFora(e, popUpRegistroOrdens),
);

btnSaidaVenda.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(popupSaida);
});

btnFecharOrdem3.addEventListener("click", () => fecharModal(popupSaida));
popupSaida.addEventListener("click", (e) => fecharFora(e, popupSaida));

// ============================================================================
// 10) INVENTÁRIO: atualizar por ENTRADA / SAÍDA
// ============================================================================
function atualizarInventarioComOrdemEntrada(codigoProduto, quantidadeEntrada) {
  const qtdNum = Number(quantidadeEntrada);
  if (!Number.isFinite(qtdNum) || qtdNum <= 0) return false;

  const achado = acharProdutoPorCodigo(codigoProduto);
  if (!achado) return false;

  achado.produto.quantidade = Number(achado.produto.quantidade) || 0;
  achado.produto.quantidade += qtdNum;

  renderProdutos(produtos);
  return true;
}

function atualizarInventarioComOrdemSaida(codigoProduto, quantidadeSaida) {
  const qtdNum = Number(quantidadeSaida);
  if (!Number.isFinite(qtdNum) || qtdNum <= 0) return false;

  const achado = acharProdutoPorCodigo(codigoProduto);
  if (!achado) return false;

  achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

  if (achado.produto.quantidade - qtdNum < 0) return false;

  achado.produto.quantidade -= qtdNum;

  renderProdutos(produtos);
  return true;
}

// ============================================================================
// 11) ORDENS: ENTRADA / COMPRA
// ============================================================================
function adicionarOrdemEntrada(event) {
  event.preventDefault();

  const valorProdutoEntrada = produtoNomeEntrada.value.trim();
  const valorProdutoFornecedor = produtoFornecedor.value.trim();
  const valorFornecedor = fornecedor.value.trim();

  const qtdStr = inserirOredemEntrada.value.trim();
  const qtd = Number(qtdStr);

  paragrafoCodigoProduto.textContent = "";
  paragrafoNomeProdutoEntrada.textContent = "";
  paragrafoFornecedor.textContent = "";
  paragrafoCompraQuantidade.textContent = "";

  if (valorProdutoFornecedor === "") {
    paragrafoCodigoProduto.textContent =
      "Por favor, insira o código do produto.";
    return;
  }

  if (valorProdutoEntrada === "") {
    paragrafoNomeProdutoEntrada.textContent =
      "Por favor, insira o nome do produto.";
    return;
  }

  if (valorFornecedor === "") {
    paragrafoFornecedor.textContent = "Por favor, insira o fornecedor.";
    return;
  }

  if (!Number.isInteger(qtd) || qtd <= 0) {
    paragrafoCompraQuantidade.textContent =
      "Quantidade inválida. Use um inteiro maior que 0.";
    return;
  }

  if (!acharProdutoPorCodigo(valorProdutoFornecedor)) {
    paragrafoCodigoProduto.textContent =
      "Esse código não existe no inventário. Registre o produto primeiro.";
    return;
  }

  const ok = atualizarInventarioComOrdemEntrada(valorProdutoFornecedor, qtd);
  if (!ok) {
    paragrafoCompraQuantidade.textContent =
      "Não foi possível atualizar o inventário.";
    return;
  }

  arrayOrdens.push({
    codigoProduto: valorProdutoFornecedor,
    produto: valorProdutoEntrada,
    tipo: "entrada",
    pessoa: valorFornecedor,
    quantidade: qtd,
  });

  renderOrdens(arrayOrdens);

  formOrdemE.reset();
  fecharModal(popUpRegistroOrdens);
}
formOrdemE.addEventListener("submit", adicionarOrdemEntrada);

// ============================================================================
// 12) ORDENS: SAÍDA / VENDA
// ============================================================================
function adicionarOrdemSaida(event) {
  event.preventDefault();

  const valorProdutoSaida = produtoNomeSaida.value.trim();
  const valorProdutoCliente = produtoCliente.value.trim();
  const valorCliente = cliente.value.trim();

  const qtdStr = inserirOredemSaida.value.trim();
  const qtd = Number(qtdStr);

  paragrafoCodigoProdutoSaida.textContent = "";
  paragrafoNomeProdutoSaida.textContent = "";
  paragrafoCliente.textContent = "";
  paragrafoSaidaQuantidade.textContent = "";

  if (valorProdutoCliente === "") {
    paragrafoCodigoProdutoSaida.textContent =
      "Por favor, insira o código do produto.";
    return;
  }

  if (valorProdutoSaida === "") {
    paragrafoNomeProdutoSaida.textContent =
      "Por favor, insira o nome do produto.";
    return;
  }

  if (valorCliente === "") {
    paragrafoCliente.textContent = "Por favor, insira o cliente.";
    return;
  }

  if (!Number.isInteger(qtd) || qtd <= 0) {
    paragrafoSaidaQuantidade.textContent =
      "Quantidade inválida. Use um inteiro maior que 0.";
    return;
  }

  if (!acharProdutoPorCodigo(valorProdutoCliente)) {
    paragrafoCodigoProdutoSaida.textContent =
      "Esse código não existe no inventário. Registre o produto primeiro.";
    return;
  }

  const ok = atualizarInventarioComOrdemSaida(valorProdutoCliente, qtd);
  if (!ok) {
    paragrafoSaidaQuantidade.textContent =
      "Estoque insuficiente ou não foi possível atualizar.";
    return;
  }

  arrayOrdens.push({
    codigoProduto: valorProdutoCliente,
    produto: valorProdutoSaida,
    tipo: "saida",
    pessoa: valorCliente,
    quantidade: qtd,
  });

  renderOrdens(arrayOrdens);

  formOrdemS.reset();
  fecharModal(popupSaida);
}
formOrdemS.addEventListener("submit", adicionarOrdemSaida);

// ============================================================================
// 13) ORDENS: LISTAR TUDO + PESQUISAR
// ============================================================================
function mostrarTudo(event) {
  event.preventDefault();
  paragrafoErroBuscar.textContent = "";
  renderOrdens(arrayOrdens);
}
atualizarTabelaOrdens.addEventListener("click", mostrarTudo);

function pesquisarOrdens() {
  const valor = procurarOrdens.value.trim().toLowerCase();

  if (valor === "") {
    paragrafoErroBuscar.textContent = "Por favor, insira um termo de pesquisa.";
    return;
  }

  paragrafoErroBuscar.textContent = "";

  const resultados = arrayOrdens.filter((o) => {
    const cod = String(o.codigoProduto ?? "").toLowerCase();
    const prod = String(o.produto ?? "").toLowerCase();
    const pes = String(o.pessoa ?? "").toLowerCase();
    return cod.includes(valor) || prod.includes(valor) || pes.includes(valor);
  });

  if (resultados.length === 0) {
    paragrafoErroBuscar.textContent =
      "Nenhuma ordem encontrada para o termo pesquisado.";
    tabelaCorpoOrdens.innerHTML = "";
    return;
  }

  renderOrdens(resultados);
}

procurarOrdens.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  pesquisarOrdens();
});

// ============================================================================
// 14) ORDENS: EDITAR (abrir/fechar) + pesquisa
// ============================================================================
btnEditarOrdens.addEventListener("click", (e) => {
  e.preventDefault();
  abrirModal(popUpEditarOrdem);
});

btnFecharEditarOrdem.addEventListener("click", () =>
  fecharModal(popUpEditarOrdem),
);
popUpEditarOrdem.addEventListener("click", (e) =>
  fecharFora(e, popUpEditarOrdem),
);

function pesquisarOrdemEditar() {
  const valorPesquisa = pesquisarEditarOrdem.value.trim().toLowerCase();

  if (valorPesquisa === "") {
    paragrafoErroEditar.textContent = "Digite um termo para pesquisar.";
    listaEditarOrdens.innerHTML = "";
    ordemSelecionadaIndex = null;
    btnEditarOrdemEditar.hidden = true;
    return;
  }

  paragrafoErroEditar.textContent = "";

  const resultados = arrayOrdens
    .map((ordem, idx) => ({ ordem, idx }))
    .filter(({ ordem }) => {
      const codi = String(ordem.codigoProduto ?? "").toLowerCase();
      const prod = String(ordem.produto ?? "").toLowerCase();
      const nome = String(ordem.pessoa ?? "").toLowerCase();

      return (
        codi.includes(valorPesquisa) ||
        prod.includes(valorPesquisa) ||
        nome.includes(valorPesquisa)
      );
    });

  listaEditarOrdens.innerHTML = "";
  ordemSelecionadaIndex = null;
  btnEditarOrdemEditar.hidden = true;

  if (resultados.length === 0) {
    paragrafoErroEditar.textContent = "Nenhuma ordem encontrada.";
    return;
  }

  resultados.forEach(({ ordem, idx }) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");

    input.type = "checkbox";
    input.dataset.index = idx;

    span.style.cssText =
      "font-family: Arial, Helvetica, sans-serif; margin-left: 5px; font-weight: 400;";

    span.textContent = `${ordem.codigoProduto} - ${ordem.produto} | ${ordem.tipo} | ${ordem.pessoa} | qtd: ${ordem.quantidade}`;

    label.appendChild(input);
    label.appendChild(span);

    listaEditarOrdens.appendChild(label);
    listaEditarOrdens.appendChild(document.createElement("br"));
  });
}

formPesquisarOrdemEditar.addEventListener("submit", (e) => {
  e.preventDefault();
  pesquisarOrdemEditar();
});

pesquisarEditarOrdem.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  pesquisarOrdemEditar();
});

// ============================================================================
// 15) EXIBIR LISTA COMPLETA DE ORDENS
// ============================================================================
function exibirLista() {
  paragrafoErroEditar.textContent = "";
  listaEditarOrdens.innerHTML = "";

  for (let i = 0; i < arrayOrdens.length; i++) {
    const lista = arrayOrdens[i];
    const criarLabel = document.createElement("label");
    const criarInput = document.createElement("input");
    const criarSpan = document.createElement("span");

    criarInput.type = "checkbox";
    criarInput.dataset.index = i;

    criarSpan.style.cssText =
      "font-family: Arial, Helvetica, sans-serif; margin-left: 5px; font-weight: 400;";

    criarSpan.textContent = `${lista.codigoProduto} - ${lista.produto} | ${lista.tipo} | ${lista.pessoa} | qtd: ${lista.quantidade}`;

    criarLabel.appendChild(criarInput);
    criarLabel.appendChild(criarSpan);

    listaEditarOrdens.appendChild(criarLabel);
    listaEditarOrdens.appendChild(document.createElement("br"));
  }

  ordemSelecionadaIndex = null;
  btnEditarOrdemEditar.hidden = true;
  marcarTudoBtn.hidden = false;
}

btnCarregarListaEditar.addEventListener("click", exibirLista);

// ============================================================================
// 16) REMOVER ORDEM + ESTORNO NO ESTOQUE
// ============================================================================
function removerOrdem() {
  const marcados = listaEditarOrdens.querySelectorAll(
    'input[type="checkbox"]:checked',
  );

  if (marcados.length === 0) {
    paragrafoErroEditar.textContent =
      "Selecione pelo menos 1 ordem para remover.";
    return;
  }

  paragrafoErroEditar.textContent = "";

  const indice = [];
  for (let i = 0; i < marcados.length; i++) {
    const ind = Number(marcados[i].dataset.index);
    if (Number.isFinite(ind)) indice.push(ind);
  }

  if (indice.length === 0) {
    paragrafoErroEditar.textContent = "Seleção inválida.";
    return;
  }

  indice.sort((a, b) => b - a);

  let puladas = 0;

  for (let i = 0; i < indice.length; i++) {
    const idx = indice[i];
    if (idx < 0 || idx >= arrayOrdens.length) {
      puladas++;
      continue;
    }

    const ordem = arrayOrdens[idx];
    const tipo = String(ordem.tipo ?? "").toLowerCase();
    const cod = ordem.codigoProduto;
    const qtd = Number(ordem.quantidade);

    if (!cod || !Number.isFinite(qtd) || qtd <= 0) {
      puladas++;
      continue;
    }

    const achado = acharProdutoPorCodigo(cod);
    if (!achado) {
      puladas++;
      continue;
    }

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

    if (tipo === "saida") {
      achado.produto.quantidade += qtd;
    } else if (tipo === "entrada") {
      if (achado.produto.quantidade - qtd < 0) {
        puladas++;
        continue;
      }
      achado.produto.quantidade -= qtd;
    } else {
      puladas++;
      continue;
    }

    arrayOrdens.splice(idx, 1);
  }

  renderProdutos(produtos);
  renderOrdens(arrayOrdens);
  exibirLista();

  if (puladas > 0) {
    paragrafoErroEditar.textContent = `Algumas ordens não puderam ser removidas (${puladas}).`;
  }
}

btnRemoverOrdem.addEventListener("click", removerOrdem);

// ============================================================================
// 17) BOTÃO EDITAR ORDEM: só aparece com 1 checkbox marcado
// ============================================================================
btnEditarOrdemEditar.hidden = true;

function atualizarVisibilidade() {
  const marcados = listaEditarOrdens.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  const qtd = marcados.length;

  btnEditarOrdemEditar.hidden = qtd !== 1;

  if (qtd === 1) {
    paragrafoErroEditar.textContent = "";
    ordemSelecionadaIndex = Number(marcados[0].dataset.index);
  } else {
    ordemSelecionadaIndex = null;
  }
}

listaEditarOrdens.addEventListener("change", (e) => {
  if (e.target && e.target.matches('input[type="checkbox"]')) {
    atualizarVisibilidade();
  }
});

btnEditarOrdemEditar.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !Number.isFinite(ordemSelecionadaIndex) ||
    ordemSelecionadaIndex < 0 ||
    ordemSelecionadaIndex >= arrayOrdens.length
  ) {
    paragrafoErroEditar.textContent = "Selecione 1 ordem válida para editar.";
    return;
  }

  abrirModal(abrirModalEditarOrdem);
});

btnFecharEditarOrdemDentro.addEventListener("click", () => {
  fecharModal(abrirModalEditarOrdem);
});

// ============================================================================
// 18) ESTORNAR / APLICAR ORDEM NO ESTOQUE
// ============================================================================
function estornarOrdemNoEstoque(ordem) {
  const tipo = String(ordem.tipo ?? "").toLowerCase();
  const cod = ordem.codigoProduto;
  const qtd = Number(ordem.quantidade);

  if (!cod || !Number.isFinite(qtd) || qtd <= 0) return false;

  const achado = acharProdutoPorCodigo(cod);
  if (!achado) return false;

  achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

  if (tipo === "saida") {
    achado.produto.quantidade += qtd;
    return true;
  }

  if (tipo === "entrada") {
    if (achado.produto.quantidade - qtd < 0) return false;
    achado.produto.quantidade -= qtd;
    return true;
  }

  return false;
}

function aplicarOrdemNoEstoque(ordem) {
  const tipo = String(ordem.tipo ?? "").toLowerCase();
  const cod = ordem.codigoProduto;
  const qtd = Number(ordem.quantidade);

  if (!cod || !Number.isFinite(qtd) || qtd <= 0) return false;

  const achado = acharProdutoPorCodigo(cod);
  if (!achado) return false;

  achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

  if (tipo === "entrada") {
    achado.produto.quantidade += qtd;
    return true;
  }

  if (tipo === "saida") {
    if (achado.produto.quantidade - qtd < 0) return false;
    achado.produto.quantidade -= qtd;
    return true;
  }

  return false;
}

// ============================================================================
// 19) SALVAR EDIÇÃO DE ORDEM
// ============================================================================
function salvarOrdemEditada() {
  const codigoRaw = inputEditarCodigo.value.trim();
  const produtoRaw = inputEditarProduto.value.trim();
  const fornecedorRaw = inputEditarFornecedor.value.trim();
  const clienteRaw = inputEditarCliente.value.trim();

  const valorEntrada = Number(inputEditarEntrada.value);
  const valorSaida = Number(inputEditarSaida.value);

  paraagrafoErro1.textContent = "";
  paraagrafoErro2.textContent = "";
  paraagrafoErro3.textContent = "";
  paraagrafoErro4.textContent = "";
  paraagrafoErro5.textContent = "";
  paraagrafoErro6.textContent = "";
  paragrafoErroEditar.textContent = "";

  if (!codigoRaw) {
    paraagrafoErro1.textContent = "Por favor, insira o código do produto.";
    return;
  }

  if (!produtoRaw) {
    paraagrafoErro2.textContent = "Por favor, insira o nome do produto.";
    return;
  }

  const numEntInvalido = !Number.isFinite(valorEntrada);
  const numSaiInvalido = !Number.isFinite(valorSaida);

  if (numEntInvalido || numSaiInvalido) {
    paraagrafoErro5.textContent =
      "Por favor, insira uma quantidade válida para entrada ou saída.";
    return;
  }

  const entradaOk = valorEntrada > 0;
  const saidaOk = valorSaida > 0;

  if (!entradaOk && !saidaOk) {
    paraagrafoErro6.textContent =
      "A quantidade de entrada ou saída deve ser maior que zero.";
    return;
  }

  if (entradaOk && saidaOk) {
    paraagrafoErro6.textContent = "Só é permitido entrada ou saída, não ambos.";
    return;
  }

  if (entradaOk && !fornecedorRaw) {
    paraagrafoErro3.textContent =
      "Por favor, insira o fornecedor para a entrada.";
    return;
  }

  if (saidaOk && !clienteRaw) {
    paraagrafoErro4.textContent = "Por favor, insira o cliente para a saída.";
    return;
  }

  if (
    !Number.isFinite(ordemSelecionadaIndex) ||
    ordemSelecionadaIndex < 0 ||
    ordemSelecionadaIndex >= arrayOrdens.length
  ) {
    paragrafoErroEditar.textContent = "Selecione 1 ordem válida para editar.";
    return;
  }

  const ordemAntiga = arrayOrdens[ordemSelecionadaIndex];

  const tipoNovo = entradaOk ? "entrada" : "saida";
  const pessoaNova = entradaOk ? fornecedorRaw : clienteRaw;
  const qtdNova = entradaOk ? Number(valorEntrada) : Number(valorSaida);

  const ordemNova = {
    codigoProduto: codigoRaw,
    produto: produtoRaw,
    tipo: tipoNovo,
    pessoa: pessoaNova,
    quantidade: qtdNova,
  };

  const estornoOk = estornarOrdemNoEstoque(ordemAntiga);
  if (!estornoOk) {
    paragrafoErroEditar.textContent =
      "Não foi possível estornar a ordem antiga no estoque (ficaria negativo ou produto não existe).";
    return;
  }

  const aplicarOk = aplicarOrdemNoEstoque(ordemNova);
  if (!aplicarOk) {
    aplicarOrdemNoEstoque(ordemAntiga);
    paragrafoErroEditar.textContent =
      "Não foi possível aplicar a nova ordem (estoque insuficiente ou produto não existe).";
    return;
  }

  arrayOrdens[ordemSelecionadaIndex] = ordemNova;

  renderProdutos(produtos);
  renderOrdens(arrayOrdens);
  exibirLista();
  fecharModal(abrirModalEditarOrdem);
}

btnSalvarEditarOrdem.addEventListener("click", (e) => {
  e.preventDefault();
  salvarOrdemEditada();
});

// ============================================================================
// 20) MARCAR / DESMARCAR TUDO
// ============================================================================
function marcarTudo() {
  const checkboxes = listaEditarOrdens.querySelectorAll(
    'input[type="checkbox"]',
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });

  atualizarVisibilidade();

  const criarBtnDesmarcar = document.createElement("button");
  criarBtnDesmarcar.textContent = "Desmarcar Tudo";
  criarBtnDesmarcar.style.cssText =
    "margin-left: 10px; padding: 5px 10px; cursor: pointer;";
  criarBtnDesmarcar.addEventListener("click", desmarcarTudo);

  marcarTudoBtn.parentNode.replaceChild(criarBtnDesmarcar, marcarTudoBtn);
  marcarTudoBtn = criarBtnDesmarcar;
}

function desmarcarTudo() {
  const checkboxes = listaEditarOrdens.querySelectorAll(
    'input[type="checkbox"]',
  );

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  atualizarVisibilidade();

  const criarBtnMarcar = document.createElement("button");
  criarBtnMarcar.textContent = "Marcar Tudo";
  criarBtnMarcar.style.cssText =
    "margin-left: 10px; padding: 5px 10px; cursor: pointer;";
  criarBtnMarcar.addEventListener("click", marcarTudo);

  marcarTudoBtn.parentNode.replaceChild(criarBtnMarcar, marcarTudoBtn);
  marcarTudoBtn = criarBtnMarcar;
}

marcarTudoBtn.addEventListener("click", marcarTudo);

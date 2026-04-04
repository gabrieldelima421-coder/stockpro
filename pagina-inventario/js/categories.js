"use strict";

(function initializeCategories(app) {
  function limparPainelCategoria() {
    app.dom.textoEdCat.replaceChildren();
  }

  function criarBotaoPainelCategoria({ id, texto }) {
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.textContent = texto;
    return button;
  }

  // Filtra a lista principal de produtos mostrando apenas os itens da categoria clicada.
  function filtrarPorCategoria(categoria) {
    const categoriaNormalizada = String(categoria ?? "").trim().toLowerCase();
    const resultados = app.state.produtos.filter((produto) => {
      return (
        String(produto.categoria ?? "").trim().toLowerCase() ===
        categoriaNormalizada
      );
    });

    app.state.paginacaoInventario.setDados(resultados);
  }

  // Abre o modal de categorias a partir do menu principal.
  function abrirModalCategorias() {
    app.modal.abrirModal(app.dom.abrirPopUpCategoria);
  }

  // Fecha o modal de categorias.
  function fecharModalCategorias() {
    app.modal.fecharModal(app.dom.abrirPopUpCategoria);
  }

  // Limpa a selecao visual e o estado interno da categoria em edicao.
  function limparSelecaoCategoria() {
    if (app.state.botaoCategoriaSelecionada) {
      app.render.aplicarEstiloBaseCategoria(app.state.botaoCategoriaSelecionada);
    }

    app.state.categoriaSelecionada = null;
    app.state.botaoCategoriaSelecionada = null;
    limparPainelCategoria();
  }

  // Monta o painel auxiliar que muda conforme o modo atual: editar, excluir ou neutro.
  function renderPainelEditarCategoria() {
    limparPainelCategoria();

    if (app.state.modoExclusaoCategoria) {
      const descricao = document.createElement("p");
      const selecionarTudo = criarBotaoPainelCategoria({
        id: "select-todas-cat",
        texto: "Selecionar tudo",
      });
      const limparSelecao = criarBotaoPainelCategoria({
        id: "limpar-selecao-cat",
        texto: "Limpar selecao",
      });
      const confirmarExclusao = criarBotaoPainelCategoria({
        id: "confirmar-excluir-cat",
        texto: "Excluir selecionadas",
      });

      descricao.textContent =
        "Selecione uma ou mais categorias abaixo para excluir.";
      app.dom.textoEdCat.append(
        descricao,
        selecionarTudo,
        limparSelecao,
        confirmarExclusao
      );

      selecionarTudo.addEventListener("click", () => {
        const checkboxes = app.dom.listaCategorias.querySelectorAll(
          'input[type="checkbox"]'
        );

        for (let i = 0; i < checkboxes.length; i += 1) {
          checkboxes[i].checked = true;
        }
      });

      limparSelecao.addEventListener("click", () => {
        const checkboxes = app.dom.listaCategorias.querySelectorAll(
          'input[type="checkbox"]'
        );

        for (let i = 0; i < checkboxes.length; i += 1) {
          checkboxes[i].checked = false;
        }
      });

      confirmarExclusao.addEventListener("click", excluirCategoriasSelecionadas);
      return;
    }

    if (!app.state.modoEdicaoCategoria) {
      return;
    }

    if (!app.state.categoriaSelecionada) {
      const descricao = document.createElement("p");
      descricao.textContent = "Selecione uma categoria abaixo para renomear.";
      app.dom.textoEdCat.appendChild(descricao);
      return;
    }

    const descricao = document.createElement("p");
    const destaque = document.createElement("strong");
    const inputRenomear = document.createElement("input");
    const btnSalvarRenomear = criarBotaoPainelCategoria({
      id: "btn-salvar-renomear-categoria",
      texto: "Renomear",
    });
    const btnCancelarRenomear = criarBotaoPainelCategoria({
      id: "btn-cancelar-renomear-categoria",
      texto: "Cancelar",
    });

    destaque.textContent = app.state.categoriaSelecionada;
    descricao.append("Categoria selecionada: ", destaque);
    inputRenomear.id = "input-renomear-categoria";
    inputRenomear.type = "text";
    inputRenomear.placeholder = "Novo nome da categoria";
    inputRenomear.autocomplete = "off";

    app.dom.textoEdCat.append(
      descricao,
      inputRenomear,
      btnSalvarRenomear,
      btnCancelarRenomear
    );

    inputRenomear.focus();
    btnSalvarRenomear.addEventListener("click", renomearCategoriaSelecionada);
    btnCancelarRenomear.addEventListener("click", () => {
      limparSelecaoCategoria();
      renderPainelEditarCategoria();
      app.state.paginacaoCategorias.setDados(app.state.categorias);
    });
    inputRenomear.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      renomearCategoriaSelecionada();
    });
  }

  // Valida e adiciona uma nova categoria ao estado principal da aplicacao.
  function adicionarCategoria() {
    const valorCategoria = app.dom.inputCategoria.value.trim().toLowerCase();
    app.dom.paragrafoErroCate.textContent = "";

    if (valorCategoria === "") {
      app.dom.paragrafoErroCate.textContent = "Insira uma categoria valida.";
      return;
    }

    if (app.state.categorias.some((categoria) => categoria.id === valorCategoria)) {
      app.dom.paragrafoErroCate.textContent = "Essa categoria ja existe.";
      return;
    }

    app.state.categorias.push({ id: valorCategoria });
    app.dom.inputCategoria.value = "";
    app.state.paginacaoCategorias.setDados(app.state.categorias);
    renderPainelEditarCategoria();
  }

  // Marca uma categoria como alvo da renomeacao e atualiza o destaque visual.
  function selecionarCategoriaParaEditar(botao) {
    const nomeCategoria = botao.dataset.categoria;

    if (app.state.botaoCategoriaSelecionada) {
      app.render.aplicarEstiloBaseCategoria(app.state.botaoCategoriaSelecionada);
    }

    app.state.categoriaSelecionada = nomeCategoria;
    app.state.botaoCategoriaSelecionada = botao;
    app.render.aplicarEstiloCategoriaSelecionada(botao);
    renderPainelEditarCategoria();
  }

  // Alterna o painel entre modo normal e modo de edicao de categorias.
  function editarCat(event) {
    event.preventDefault();

    if (app.state.modoExclusaoCategoria) {
      app.state.modoExclusaoCategoria = false;
      app.dom.btnExcluirCat.textContent = "Excluir Categoria";
    }

    app.state.modoEdicaoCategoria = !app.state.modoEdicaoCategoria;
    app.dom.btnEditarCategoria.textContent = app.state.modoEdicaoCategoria
      ? "Fechar edicao"
      : "Editar";
    app.dom.paragrafoErroCate.textContent = "";

    if (!app.state.modoEdicaoCategoria) {
      limparSelecaoCategoria();
    }

    app.state.paginacaoCategorias.setDados(app.state.categorias);
    renderPainelEditarCategoria();
  }

  // Renomeia a categoria selecionada e sincroniza os produtos que usam essa categoria.
  function renomearCategoriaSelecionada() {
    app.dom.paragrafoErroCate.textContent = "";

    if (!app.state.categoriaSelecionada) {
      app.dom.paragrafoErroCate.textContent =
        "Selecione uma categoria primeiro.";
      return;
    }

    const inputRenomear = document.getElementById("input-renomear-categoria");
    if (!inputRenomear) return;

    const novoNome = inputRenomear.value.trim().toLowerCase();

    if (novoNome === "") {
      app.dom.paragrafoErroCate.textContent = "Digite um novo nome valido.";
      return;
    }

    if (novoNome === app.state.categoriaSelecionada) {
      app.dom.paragrafoErroCate.textContent =
        "Digite um nome diferente do atual.";
      return;
    }

    if (app.state.categorias.some((categoria) => categoria.id === novoNome)) {
      app.dom.paragrafoErroCate.textContent = "Essa categoria ja existe.";
      return;
    }

    const indiceCategoria = app.state.categorias.findIndex((categoria) => {
      return categoria.id === app.state.categoriaSelecionada;
    });

    if (indiceCategoria === -1) {
      app.dom.paragrafoErroCate.textContent = "Categoria nao encontrada.";
      return;
    }

    const nomeAntigo = app.state.categorias[indiceCategoria].id;
    app.state.categorias[indiceCategoria].id = novoNome;

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      const categoriaProduto = String(
        app.state.produtos[i].categoria ?? ""
      ).trim().toLowerCase();

      if (categoriaProduto === nomeAntigo) {
        app.state.produtos[i].categoria = novoNome;
      }
    }

    app.state.categoriaSelecionada = novoNome;
    app.state.paginacaoCategorias.setDados(app.state.categorias);
    renderPainelEditarCategoria();
    app.state.paginacaoInventario.setDados(app.state.produtos);
    app.dom.paragrafoErroCate.textContent =
      "Categoria renomeada com sucesso.";
  }

  // Alterna o painel para o modo de exclusao em lote de categorias.
  function abrirEdEx(event) {
    event.preventDefault();
    app.dom.paragrafoErroCate.textContent = "";

    if (app.state.modoEdicaoCategoria) {
      app.state.modoEdicaoCategoria = false;
      app.dom.btnEditarCategoria.textContent = "Editar";
      limparSelecaoCategoria();
    }

    app.state.modoExclusaoCategoria = !app.state.modoExclusaoCategoria;
    app.dom.btnExcluirCat.textContent = app.state.modoExclusaoCategoria
      ? "Fechar exclusao"
      : "Excluir Categoria";

    app.state.paginacaoCategorias.setDados(app.state.categorias);
    renderPainelEditarCategoria();
  }

  // Remove uma categoria especifica e limpa essa categoria dos produtos vinculados.
  function excluirCat(id) {
    const indiceCategoria = app.state.categorias.findIndex((categoria) => {
      return categoria.id === id;
    });

    if (indiceCategoria === -1) {
      return false;
    }

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      const categoriaProduto = String(
        app.state.produtos[i].categoria ?? ""
      ).trim().toLowerCase();

      if (categoriaProduto === id) {
        app.state.produtos[i].categoria = "";
      }
    }

    app.state.categorias.splice(indiceCategoria, 1);
    return true;
  }

  // Remove todas as categorias marcadas no modo de exclusao em lote.
  function excluirCategoriasSelecionadas() {
    const marcadas = app.dom.listaCategorias.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (marcadas.length === 0) {
      app.dom.paragrafoErroCate.textContent =
        "Selecione pelo menos 1 categoria para excluir.";
      return;
    }

    app.dom.paragrafoErroCate.textContent = "";
    let removidas = 0;

    for (let i = 0; i < marcadas.length; i += 1) {
      const idCategoria = String(marcadas[i].dataset.categoria ?? "")
        .trim()
        .toLowerCase();

      if (excluirCat(idCategoria)) {
        removidas += 1;
      }
    }

    limparSelecaoCategoria();
    app.state.paginacaoCategorias.setDados(app.state.categorias);
    renderPainelEditarCategoria();
    app.state.paginacaoInventario.setDados(app.state.produtos);

    if (removidas === 0) {
      app.dom.paragrafoErroCate.textContent = "Nenhuma categoria foi removida.";
      return;
    }

    app.dom.paragrafoErroCate.textContent =
      removidas + " categoria(s) removida(s) com sucesso.";
  }

  // Liga todos os eventos do modulo de categorias ao DOM.
  function bindEvents() {
    app.dom.btnCategoria.addEventListener("click", abrirModalCategorias);
    app.dom.btnFecharCategoria.addEventListener("click", fecharModalCategorias);
    app.dom.abrirPopUpCategoria.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.abrirPopUpCategoria);
    });
    app.dom.formCategorias.addEventListener("submit", (event) => {
      event.preventDefault();
      adicionarCategoria();
    });
    app.dom.btnEditarCategoria.addEventListener("click", editarCat);
    app.dom.btnExcluirCat.addEventListener("click", abrirEdEx);
    app.dom.listaCategorias.addEventListener("click", (event) => {
      const botao = event.target.closest("button");
      if (!botao) return;

      if (app.state.modoExclusaoCategoria) {
        return;
      }

      if (app.state.modoEdicaoCategoria) {
        selecionarCategoriaParaEditar(botao);
        return;
      }

      filtrarPorCategoria(botao.textContent);
      fecharModalCategorias();
    });
  }

  app.categories = {
    bindEvents,
    filtrarPorCategoria,
    renderPainelEditarCategoria,
    limparSelecaoCategoria,
  };
})(window.StockPro = window.StockPro || {});

"use strict";

(function initializeCategories(app) {
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

  function abrirModalCategorias() {
    app.modal.abrirModal(app.dom.abrirPopUpCategoria);
  }

  function fecharModalCategorias() {
    app.modal.fecharModal(app.dom.abrirPopUpCategoria);
  }

  function limparSelecaoCategoria() {
    if (app.state.botaoCategoriaSelecionada) {
      app.render.aplicarEstiloBaseCategoria(app.state.botaoCategoriaSelecionada);
    }

    app.state.categoriaSelecionada = null;
    app.state.botaoCategoriaSelecionada = null;
    app.dom.textoEdCat.innerHTML = "";
  }

  function renderPainelEditarCategoria() {
    if (app.state.modoExclusaoCategoria) {
      app.dom.textoEdCat.innerHTML = `
        <p>Selecione uma ou mais categorias abaixo para excluir.</p>
        <button id="select-todas-cat" type="button">Selecionar tudo</button>
        <button id="limpar-selecao-cat" type="button">Limpar selecao</button>
        <button id="confirmar-excluir-cat" type="button">Excluir selecionadas</button>
      `;

      const selecionarTudo = document.getElementById("select-todas-cat");
      const limparSelecao = document.getElementById("limpar-selecao-cat");
      const confirmarExclusao = document.getElementById(
        "confirmar-excluir-cat"
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
      app.dom.textoEdCat.innerHTML = "";
      return;
    }

    if (!app.state.categoriaSelecionada) {
      app.dom.textoEdCat.innerHTML =
        "<p>Selecione uma categoria abaixo para renomear.</p>";
      return;
    }

    app.dom.textoEdCat.innerHTML = `
      <p>Categoria selecionada: <strong>${app.state.categoriaSelecionada}</strong></p>
      <input id="input-renomear-categoria" type="text" placeholder="Novo nome da categoria" autocomplete="off">
      <button id="btn-salvar-renomear-categoria" type="button">Renomear</button>
      <button id="btn-cancelar-renomear-categoria" type="button">Cancelar</button>
    `;

    const inputRenomear = document.getElementById("input-renomear-categoria");
    const btnSalvarRenomear = document.getElementById(
      "btn-salvar-renomear-categoria"
    );
    const btnCancelarRenomear = document.getElementById(
      "btn-cancelar-renomear-categoria"
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

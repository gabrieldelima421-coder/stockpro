"use strict";

(function initializeRender(app) {
  // Renderiza as linhas da tabela principal com os produtos visiveis na pagina atual.
  function renderProdutos(lista) {
    app.dom.corpoTabela.innerHTML = "";

    for (let i = 0; i < lista.length; i += 1) {
      const produto = lista[i];
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.pontoReposicao ?? "-"}</td>
      `;

      const qtd = Number(produto.quantidade);
      const pr = Number(produto.pontoReposicao);

      if (Number.isFinite(qtd) && Number.isFinite(pr) && qtd < pr) {
        tr.children[2].classList.add("negativo");
      } else {
        tr.children[2].classList.remove("negativo");
      }

      app.dom.corpoTabela.appendChild(tr);
    }
  }

  // Renderiza a tabela de ordens separando visualmente entrada e saida nas colunas corretas.
  function renderOrdens(lista) {
    app.dom.tabelaCorpoOrdens.innerHTML = "";

    for (let i = 0; i < lista.length; i += 1) {
      const ordem = lista[i];
      const tr = document.createElement("tr");
      const fornecedorTxt = ordem.tipo === "entrada" ? ordem.pessoa : "";
      const entradaTxt = ordem.tipo === "entrada" ? ordem.quantidade : "";
      const clienteTxt = ordem.tipo === "saida" ? ordem.pessoa : "";
      const saidaTxt = ordem.tipo === "saida" ? ordem.quantidade : "";

      tr.innerHTML = `
        <td>${ordem.codigoProduto ?? ""}</td>
        <td>${ordem.produto ?? ""}</td>
        <td>${fornecedorTxt}</td>
        <td>${entradaTxt}</td>
        <td>${clienteTxt}</td>
        <td>${saidaTxt}</td>
      `;

      app.dom.tabelaCorpoOrdens.appendChild(tr);
    }
  }

  // Atualiza o select de categorias dentro do formulario de cadastro de produto.
  function renderSelectCategorias() {
    app.dom.selcionarCategoria.innerHTML =
      '<option value="" selected disabled>Selecione uma categoria</option>';

    for (let i = 0; i < app.state.categorias.length; i += 1) {
      const option = document.createElement("option");
      option.value = app.state.categorias[i].id;
      option.textContent = app.state.categorias[i].id;
      app.dom.selcionarCategoria.appendChild(option);
    }
  }

  // Aplica o estilo padrao nos botoes de categoria renderizados na lista.
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

  // Destaca a categoria escolhida quando o painel entra em modo de edicao.
  function aplicarEstiloCategoriaSelecionada(botao) {
    botao.style.backgroundColor = "rgb(12, 44, 130)";
    botao.style.outline = "2px solid rgb(255, 208, 0)";
    botao.style.transform = "scale(1.03)";
  }

  // Renderiza as categorias da pagina atual, alternando entre botoes normais e checkboxes de exclusao.
  function renderCategoriasPagina(listaPagina) {
    app.dom.listaCategorias.innerHTML = "";

    if (app.state.categorias.length === 0) {
      app.state.modoEdicaoCategoria = false;
      app.state.modoExclusaoCategoria = false;
      app.state.categoriaSelecionada = null;
      app.state.botaoCategoriaSelecionada = null;
      app.dom.btnEditarCategoria.textContent = "Editar";
      app.dom.btnExcluirCat.textContent = "Excluir Categoria";
    }

    app.dom.btnEditarCategoria.hidden = app.state.categorias.length === 0;
    app.dom.btnExcluirCat.hidden = app.state.categorias.length === 0;
    app.state.botaoCategoriaSelecionada = null;

    for (let i = 0; i < listaPagina.length; i += 1) {
      const categoria = listaPagina[i];

      if (app.state.modoExclusaoCategoria) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");

        label.className = "categoria-exclusao-item";
        input.type = "checkbox";
        input.dataset.categoria = categoria.id;
        input.className = "categoria-exclusao-checkbox";
        span.textContent = categoria.id.toUpperCase();
        span.className = "categoria-chip";
        label.appendChild(input);
        label.appendChild(span);
        app.dom.listaCategorias.appendChild(label);
      } else {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = categoria.id;
        button.dataset.categoria = categoria.id;
        aplicarEstiloBaseCategoria(button);

        if (
          app.state.modoEdicaoCategoria &&
          app.state.categoriaSelecionada === categoria.id
        ) {
          aplicarEstiloCategoriaSelecionada(button);
          app.state.botaoCategoriaSelecionada = button;
        }

        app.dom.listaCategorias.appendChild(button);
      }
    }
  }

  app.render = {
    renderProdutos,
    renderOrdens,
    renderSelectCategorias,
    aplicarEstiloBaseCategoria,
    aplicarEstiloCategoriaSelecionada,
    renderCategoriasPagina,
  };
})(window.StockPro = window.StockPro || {});

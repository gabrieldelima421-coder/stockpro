"use strict";

(function initializeMain(app) {
  function configurarPaginacoes() {
    app.state.paginacaoInventario = app.pagination.criarPaginacao({
      listaInicial: app.state.produtos,
      limite: app.pagination.LIMITE_ITENS_POR_PAGINA,
      render(listaPagina) {
        app.render.renderProdutos(listaPagina);
      },
      botoes: {
        inicio: app.dom.btnInicio,
        voltar: app.dom.btnVoltar,
        proximo: app.dom.btnProximaPagina,
        ultimo: app.dom.btnUltimo,
      },
    });

    app.state.paginacaoOrdens = app.pagination.criarPaginacao({
      listaInicial: app.state.arrayOrdens,
      limite: app.pagination.LIMITE_ITENS_POR_PAGINA,
      render(listaPagina) {
        app.render.renderOrdens(listaPagina);
      },
      botoes: {
        inicio: app.dom.btnInicioPagOrdem,
        voltar: app.dom.btnVoltarPagOrdem,
        proximo: app.dom.btnProximaPaginaOrdem,
        ultimo: app.dom.btnUltimaPagOrdem,
      },
    });

    app.state.paginacaoCategorias = app.pagination.criarPaginacao({
      listaInicial: app.state.categorias,
      limite: app.pagination.LIMITE_ITENS_POR_PAGINA,
      render(listaPagina) {
        app.render.renderSelectCategorias();
        app.render.renderCategoriasPagina(listaPagina);
      },
      botoes: {
        inicio: app.dom.btnInicioCategorias,
        voltar: app.dom.btnVoltarCategorias,
        proximo: app.dom.btnProximaCategorias,
        ultimo: app.dom.btnUltimoCategorias,
      },
    });
  }

  function iniciarAplicacao() {
    configurarPaginacoes();
    app.reorder.configurarCamposConsumo();
    app.categories.bindEvents();
    app.inventory.bindEvents();
    app.orders.bindEvents();
    app.categories.renderPainelEditarCategoria();
  }

  iniciarAplicacao();
})(window.StockPro = window.StockPro || {});

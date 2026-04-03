"use strict";

(function initializeState(app) {
  app.state = {
    produtos: [],
    categorias: [],
    arrayOrdens: [],
    ordemSelecionadaIndex: null,
    modoEdicaoCategoria: false,
    modoExclusaoCategoria: false,
    categoriaSelecionada: null,
    botaoCategoriaSelecionada: null,
    paginacaoInventario: null,
    paginacaoOrdens: null,
    paginacaoCategorias: null,
  };
})(window.StockPro = window.StockPro || {});

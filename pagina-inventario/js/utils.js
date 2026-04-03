"use strict";

(function initializeUtils(app) {
  function normalizarCodigo(valor) {
    return String(valor ?? "").trim().toLowerCase();
  }

  function acharProdutoPorCodigo(cod) {
    const codNorm = normalizarCodigo(cod);

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      if (normalizarCodigo(app.state.produtos[i].codigo) === codNorm) {
        return { produto: app.state.produtos[i], index: i };
      }
    }

    return null;
  }

  function arredondarPontoReposicao(valor) {
    return Math.ceil(valor);
  }

  app.utils = {
    normalizarCodigo,
    acharProdutoPorCodigo,
    arredondarPontoReposicao,
  };
})(window.StockPro = window.StockPro || {});

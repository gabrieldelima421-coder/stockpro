"use strict";

(function initializeUtils(app) {
  // Padroniza codigos para comparacoes sem diferenca entre maiusculas, minusculas ou espacos.
  function normalizarCodigo(valor) {
    return String(valor ?? "").trim().toLowerCase();
  }

  // Procura um produto pelo codigo e devolve tanto o objeto quanto a posicao dele no array.
  function acharProdutoPorCodigo(cod) {
    const codNorm = normalizarCodigo(cod);

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      if (normalizarCodigo(app.state.produtos[i].codigo) === codNorm) {
        return { produto: app.state.produtos[i], index: i };
      }
    }

    return null;
  }

  // Arredonda o ponto de reposicao sempre para cima para evitar falta de estoque.
  function arredondarPontoReposicao(valor) {
    return Math.ceil(valor);
  }

  app.utils = {
    normalizarCodigo,
    acharProdutoPorCodigo,
    arredondarPontoReposicao,
  };
})(window.StockPro = window.StockPro || {});

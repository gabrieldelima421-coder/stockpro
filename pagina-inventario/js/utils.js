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

  function acharProdutoPorId(id) {
    const idNormalizado = String(id ?? "").trim();

    if (idNormalizado === "") return null;

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      if (String(app.state.produtos[i].id ?? "").trim() === idNormalizado) {
        return { produto: app.state.produtos[i], index: i };
      }
    }

    return null;
  }

  function acharProdutoPorCodigoENome(codigo, nome) {
    const codigoNormalizado = normalizarCodigo(codigo);
    const nomeNormalizado = normalizarCodigo(nome);

    for (let i = 0; i < app.state.produtos.length; i += 1) {
      const produto = app.state.produtos[i];

      if (
        normalizarCodigo(produto.codigo) === codigoNormalizado &&
        normalizarCodigo(produto.nome) === nomeNormalizado
      ) {
        return { produto, index: i };
      }
    }

    return null;
  }

  function acharProdutoDaOrdem(ordem) {
    if (ordem?.produtoId) {
      const porId = acharProdutoPorId(ordem.produtoId);
      if (porId) return porId;
    }

    const porCodigoENome = acharProdutoPorCodigoENome(
      ordem?.codigoProduto,
      ordem?.produto
    );

    if (porCodigoENome) return porCodigoENome;

    return acharProdutoPorCodigo(ordem?.codigoProduto);
  }

  // Arredonda o ponto de reposicao sempre para cima para evitar falta de estoque.
  function arredondarPontoReposicao(valor) {
    return Math.ceil(valor);
  }

  app.utils = {
    normalizarCodigo,
    acharProdutoPorCodigo,
    acharProdutoPorId,
    acharProdutoPorCodigoENome,
    acharProdutoDaOrdem,
    arredondarPontoReposicao,
  };
})(window.StockPro = window.StockPro || {});

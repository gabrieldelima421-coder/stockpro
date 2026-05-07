"use strict";

(function initializeStorage(app) {
  const STORAGE_KEY = "stockpro_estado";
  let ultimoErro = "";

  function gerarId(prefixo) {
    const aleatorio = Math.random().toString(36).slice(2, 10);
    return prefixo + "-" + Date.now() + "-" + aleatorio;
  }

  function normalizarCodigo(valor) {
    return String(valor ?? "").trim().toLowerCase();
  }

  function normalizarProdutos(produtos) {
    const ids = new Set();
    const normalizados = [];
    const lista = Array.isArray(produtos) ? produtos : [];

    for (let i = 0; i < lista.length; i += 1) {
      const produto = lista[i] || {};
      const codigo = String(produto.codigo ?? "").trim();

      if (codigo === "") continue;

      let id = String(produto.id ?? "").trim();

      if (id === "" || ids.has(id)) {
        id = gerarId("produto");
      }

      ids.add(id);
      normalizados.push({
        ...produto,
        id,
        codigo,
        nome: String(produto.nome ?? "").trim(),
        quantidade: Number(produto.quantidade) || 0,
        pontoReposicao: produto.pontoReposicao ?? "-",
        categoria: String(produto.categoria ?? "").trim().toLowerCase(),
      });
    }

    return normalizados;
  }

  function normalizarCategorias(categorias) {
    const ids = new Set();
    const normalizadas = [];
    const lista = Array.isArray(categorias) ? categorias : [];

    for (let i = 0; i < lista.length; i += 1) {
      const categoria = lista[i] || {};
      const id = String(categoria.id ?? "").trim().toLowerCase();

      if (id === "" || ids.has(id)) continue;

      ids.add(id);
      normalizadas.push({ ...categoria, id });
    }

    return normalizadas;
  }

  function normalizarOrdens(ordens, produtos) {
    const lista = Array.isArray(ordens) ? ordens : [];

    return lista.map((ordem) => {
      ordem = ordem || {};
      const produtoPorId = produtos.find((item) => item.id === ordem.produtoId);
      const produtoPorCodigoENome = produtos.find((item) => {
        return (
          normalizarCodigo(item.codigo) === normalizarCodigo(ordem.codigoProduto) &&
          normalizarCodigo(item.nome) === normalizarCodigo(ordem.produto)
        );
      });
      const produtoPorCodigo = produtos.find((item) => {
        return normalizarCodigo(item.codigo) === normalizarCodigo(ordem.codigoProduto);
      });
      const produto = produtoPorId || produtoPorCodigoENome || produtoPorCodigo;

      return {
        ...ordem,
        id: ordem.id || gerarId("ordem"),
        produtoId: produto?.id || ordem.produtoId || "",
        codigoProduto: produto?.codigo ?? String(ordem.codigoProduto ?? "").trim(),
        produto: produto?.nome ?? String(ordem.produto ?? "").trim(),
        tipo: String(ordem.tipo ?? "").trim().toLowerCase(),
        pessoa: String(ordem.pessoa ?? "").trim(),
        quantidade: Number(ordem.quantidade) || 0,
        data: String(ordem.data ?? "").trim(),
      };
    });
  }

  function estadoVazio() {
    return {
      produtos: [],
      categorias: [],
      ordens: [],
    };
  }

  function lerEstado() {
    const texto = localStorage.getItem(STORAGE_KEY);

    if (!texto) return estadoVazio();

    const estado = JSON.parse(texto);
    const produtos = normalizarProdutos(estado.produtos);

    return {
      produtos,
      categorias: normalizarCategorias(estado.categorias),
      ordens: normalizarOrdens(estado.ordens, produtos),
    };
  }

  function escreverEstado(estado) {
    const produtos = normalizarProdutos(estado.produtos);
    const estadoNormalizado = {
      produtos,
      categorias: normalizarCategorias(estado.categorias),
      ordens: normalizarOrdens(estado.ordens, produtos),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoNormalizado));
    return estadoNormalizado;
  }

  function registrarErro(error, mensagem) {
    ultimoErro = mensagem;

    if (window.console && typeof window.console.error === "function") {
      window.console.error(error);
    }
  }

  async function carregarEstado() {
    try {
      ultimoErro = "";
      const estado = lerEstado();

      app.state.produtos = estado.produtos;
      app.state.categorias = estado.categorias;
      app.state.arrayOrdens = estado.ordens;
    } catch (error) {
      app.state.produtos = [];
      app.state.categorias = [];
      app.state.arrayOrdens = [];
      registrarErro(
        error,
        "Nao foi possivel carregar os dados salvos no navegador."
      );
    }
  }

  function salvarTudo() {
    try {
      ultimoErro = "";
      escreverEstado({
        produtos: app.state.produtos,
        categorias: app.state.categorias,
        ordens: app.state.arrayOrdens,
      });
    } catch (error) {
      registrarErro(error, "Nao foi possivel salvar os dados no navegador.");
    }
  }

  function salvarProdutos() {
    salvarTudo();
  }

  function salvarCategorias() {
    salvarTudo();
  }

  function salvarOrdens() {
    salvarTudo();
  }

  app.storage = {
    carregarEstado,
    salvarProdutos,
    salvarCategorias,
    salvarOrdens,
    salvarTudo,
    gerarId,
    getUltimoErro() {
      return ultimoErro;
    },
  };
})(window.StockPro = window.StockPro || {});

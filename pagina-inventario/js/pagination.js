"use strict";

(function initializePagination(app) {
  const LIMITE_ITENS_POR_PAGINA = 20;

  function criarPaginacao({ listaInicial = [], limite = 20, render, botoes }) {
    let lista = Array.isArray(listaInicial) ? [...listaInicial] : [];
    let paginaAtual = 1;

    function getTotalPaginas() {
      return Math.max(1, Math.ceil(lista.length / limite));
    }

    function getItensPaginaAtual() {
      const inicio = (paginaAtual - 1) * limite;
      const fim = inicio + limite;
      return lista.slice(inicio, fim);
    }

    function atualizarBotoes() {
      const totalPaginas = getTotalPaginas();
      const temMaisDeUmaPagina = totalPaginas > 1;

      if (botoes.inicio) {
        botoes.inicio.hidden = !temMaisDeUmaPagina || paginaAtual === 1;
      }

      if (botoes.voltar) {
        botoes.voltar.hidden = !temMaisDeUmaPagina || paginaAtual === 1;
      }

      if (botoes.proximo) {
        botoes.proximo.hidden =
          !temMaisDeUmaPagina || paginaAtual === totalPaginas;
      }

      if (botoes.ultimo) {
        botoes.ultimo.hidden =
          !temMaisDeUmaPagina || paginaAtual === totalPaginas;
      }
    }

    function renderizar() {
      const totalPaginas = getTotalPaginas();

      if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
      }

      render(getItensPaginaAtual(), {
        paginaAtual,
        totalPaginas,
        totalItens: lista.length,
        limite,
      });

      atualizarBotoes();
    }

    function setDados(novaLista) {
      lista = Array.isArray(novaLista) ? [...novaLista] : [];
      paginaAtual = 1;
      renderizar();
    }

    function proxima() {
      if (paginaAtual < getTotalPaginas()) {
        paginaAtual += 1;
        renderizar();
      }
    }

    function voltar() {
      if (paginaAtual > 1) {
        paginaAtual -= 1;
        renderizar();
      }
    }

    function irParaInicio() {
      paginaAtual = 1;
      renderizar();
    }

    function irParaUltima() {
      paginaAtual = getTotalPaginas();
      renderizar();
    }

    if (botoes.inicio) {
      botoes.inicio.addEventListener("click", irParaInicio);
    }

    if (botoes.voltar) {
      botoes.voltar.addEventListener("click", voltar);
    }

    if (botoes.proximo) {
      botoes.proximo.addEventListener("click", proxima);
    }

    if (botoes.ultimo) {
      botoes.ultimo.addEventListener("click", irParaUltima);
    }

    renderizar();

    return {
      setDados,
      renderizar,
      proxima,
      voltar,
      irParaInicio,
      irParaUltima,
      getListaAtual() {
        return [...lista];
      },
      getPaginaAtual() {
        return paginaAtual;
      },
    };
  }

  app.pagination = {
    LIMITE_ITENS_POR_PAGINA,
    criarPaginacao,
  };
})(window.StockPro = window.StockPro || {});

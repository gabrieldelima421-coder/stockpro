"use strict";

(function initializePagination(app) {
  const LIMITE_ITENS_POR_PAGINA = 20;

  // Cria uma paginacao reutilizavel para qualquer lista que precise renderizar por paginas.
  function criarPaginacao({ listaInicial = [], limite = 20, render, botoes }) {
    let lista = Array.isArray(listaInicial) ? [...listaInicial] : [];
    let paginaAtual = 1;

    // Calcula quantas paginas existem com base na quantidade de itens atual.
    function getTotalPaginas() {
      return Math.max(1, Math.ceil(lista.length / limite));
    }

    // Recorta apenas os itens que pertencem a pagina atual.
    function getItensPaginaAtual() {
      const inicio = (paginaAtual - 1) * limite;
      const fim = inicio + limite;
      return lista.slice(inicio, fim);
    }

    // Exibe ou oculta os botoes de navegacao conforme a pagina atual.
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

    // Chama a renderizacao da pagina atual e sincroniza a navegacao visual.
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

    // Substitui a lista inteira da paginacao e reinicia na primeira pagina.
    function setDados(novaLista) {
      lista = Array.isArray(novaLista) ? [...novaLista] : [];
      paginaAtual = 1;
      renderizar();
    }

    // Avanca uma pagina quando ainda existe proxima pagina.
    function proxima() {
      if (paginaAtual < getTotalPaginas()) {
        paginaAtual += 1;
        renderizar();
      }
    }

    // Volta uma pagina quando ainda nao estamos no inicio.
    function voltar() {
      if (paginaAtual > 1) {
        paginaAtual -= 1;
        renderizar();
      }
    }

    // Leva a visualizacao para a primeira pagina da lista.
    function irParaInicio() {
      paginaAtual = 1;
      renderizar();
    }

    // Leva a visualizacao para a ultima pagina disponivel.
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

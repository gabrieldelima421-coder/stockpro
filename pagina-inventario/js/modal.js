"use strict";

(function initializeModal(app) {
  // Abre qualquer modal adicionando a classe usada pelo CSS.
  function abrirModal(element) {
    element.classList.add("aberto");
  }

  // Fecha qualquer modal removendo a classe usada pelo CSS.
  function fecharModal(element) {
    element.classList.remove("aberto");
  }

  // Fecha o modal quando o clique acontece no fundo e nao no conteudo interno.
  function fecharFora(event, modal) {
    if (event.target === modal) {
      fecharModal(modal);
    }
  }

  app.modal = {
    abrirModal,
    fecharModal,
    fecharFora,
  };
})(window.StockPro = window.StockPro || {});

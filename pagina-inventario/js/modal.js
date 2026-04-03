"use strict";

(function initializeModal(app) {
  function abrirModal(element) {
    element.classList.add("aberto");
  }

  function fecharModal(element) {
    element.classList.remove("aberto");
  }

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

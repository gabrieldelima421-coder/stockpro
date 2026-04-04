"use strict";

(function initializeReorder(app) {
  // Calcula o ponto de reposicao com base em estoque de seguranca, consumo diario e prazo de entrega.
  function calcularPontoReposicao(estoqueSeg, consMedio, prazo) {
    const es = Number(estoqueSeg);
    const consumo = Number(consMedio);
    const prazoDias = Number(prazo);

    if (!Number.isFinite(es) || es < 0) return "-";
    if (!Number.isFinite(consumo) || consumo < 0) return "-";
    if (!Number.isFinite(prazoDias) || prazoDias < 0) return "-";

    return app.utils.arredondarPontoReposicao(es + consumo * prazoDias);
  }

  // Calcula o ponto de reposicao quando o consumo informado eh mensal e precisa ser convertido para diario.
  function calcularPontoReposicaoMensal(
    estoqueSeg,
    consMedioMensal,
    prazoDias
  ) {
    const es = Number(estoqueSeg);
    const consumoMensal = Number(consMedioMensal);
    const prazo = Number(prazoDias);

    if (!Number.isFinite(es) || es < 0) return "-";
    if (!Number.isFinite(consumoMensal) || consumoMensal < 0) return "-";
    if (!Number.isFinite(prazo) || prazo < 0) return "-";

    return app.utils.arredondarPontoReposicao(es + (consumoMensal / 30) * prazo);
  }

  // Decide qual formula usar de acordo com o tipo de consumo preenchido no formulario.
  function calcularPontoReposicaoPorConsumo(
    estoqueSeg,
    consumoMensal,
    consumoDiario,
    prazoDias
  ) {
    const mensalPreenchido = String(consumoMensal ?? "").trim() !== "";
    const diarioPreenchido = String(consumoDiario ?? "").trim() !== "";

    if (mensalPreenchido && diarioPreenchido) {
      return { erro: "Informe apenas um tipo de consumo: mensal ou diario." };
    }

    if (!mensalPreenchido && !diarioPreenchido) {
      return {
        erro: "Informe o consumo medio mensal ou o consumo medio diario.",
      };
    }

    const valor = mensalPreenchido
      ? calcularPontoReposicaoMensal(estoqueSeg, consumoMensal, prazoDias)
      : calcularPontoReposicao(estoqueSeg, consumoDiario, prazoDias);

    if (valor === "-") {
      return {
        erro:
          "Preencha estoque de seguranca, prazo de entrega e o consumo escolhido com valores validos.",
      };
    }

    return { valor };
  }

  // Verifica se algum dos campos do calculo foi preenchido antes de tentar calcular o ponto de reposicao.
  function algumCampoPontoReposicaoFoiPreenchido() {
    return [
      app.dom.ES.value,
      app.dom.consumoMes.value,
      app.dom.consumo.value,
      app.dom.prazoEntrega.value,
    ].some((campo) => String(campo ?? "").trim() !== "");
  }

  // Mantem os campos de consumo mensal e diario mutuamente exclusivos para evitar calculo ambigo.
  function configurarCamposConsumo() {
    if (!app.dom.consumoMes || !app.dom.consumo) return;

    app.dom.consumoMes.addEventListener("input", () => {
      if (app.dom.consumoMes.value.trim() !== "") {
        app.dom.consumo.value = "";
      }
    });

    app.dom.consumo.addEventListener("input", () => {
      if (app.dom.consumo.value.trim() !== "") {
        app.dom.consumoMes.value = "";
      }
    });
  }

  app.reorder = {
    calcularPontoReposicao,
    calcularPontoReposicaoMensal,
    calcularPontoReposicaoPorConsumo,
    algumCampoPontoReposicaoFoiPreenchido,
    configurarCamposConsumo,
  };
})(window.StockPro = window.StockPro || {});

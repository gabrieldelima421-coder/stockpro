"use strict";

(function initializeInventory(app) {
  function atualizarInventarioComOrdemEntrada(codigoProduto, quantidadeEntrada) {
    const qtd = Number(quantidadeEntrada);

    if (!Number.isFinite(qtd) || qtd <= 0) return false;

    const achado = app.utils.acharProdutoPorCodigo(codigoProduto);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;
    achado.produto.quantidade += qtd;
    app.state.paginacaoInventario.setDados(app.state.produtos);
    return true;
  }

  function atualizarInventarioComOrdemSaida(codigoProduto, quantidadeSaida) {
    const qtd = Number(quantidadeSaida);

    if (!Number.isFinite(qtd) || qtd <= 0) return false;

    const achado = app.utils.acharProdutoPorCodigo(codigoProduto);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

    if (achado.produto.quantidade - qtd < 0) {
      return false;
    }

    achado.produto.quantidade -= qtd;
    app.state.paginacaoInventario.setDados(app.state.produtos);
    return true;
  }

  function abrirModalRegistro(event) {
    event.preventDefault();
    app.modal.abrirModal(app.dom.popup);
    app.dom.form.reset();
    app.dom.paragrafoErroRegistro.textContent = "";
    app.dom.codigo.focus();
  }

  function adicionarLinha(event) {
    event.preventDefault();

    const valorCodigo = app.dom.codigo.value.trim();
    const valorNome = app.dom.nome.value.trim();
    const quantidadeTexto = app.dom.quantidade.value.trim();
    const valorQuantidade = Number(quantidadeTexto);
    const categoriaValor = String(app.dom.selcionarCategoria.value ?? "")
      .trim()
      .toLowerCase();

    app.dom.paragrafoErroRegistro.textContent = "";

    if (valorCodigo === "" || valorNome === "" || quantidadeTexto === "") {
      app.dom.paragrafoErroRegistro.textContent =
        "Preencha codigo, nome e quantidade para salvar o produto.";
      return;
    }

    if (!Number.isInteger(valorQuantidade) || valorQuantidade < 0) {
      app.dom.paragrafoErroRegistro.textContent =
        "A quantidade precisa ser um numero inteiro maior ou igual a zero.";
      return;
    }

    if (app.utils.acharProdutoPorCodigo(valorCodigo)) {
      app.dom.paragrafoErroRegistro.textContent =
        "Ja existe um produto cadastrado com esse codigo.";
      return;
    }

    let valorPontoReposicao = "-";

    if (app.reorder.algumCampoPontoReposicaoFoiPreenchido()) {
      const resultado = app.reorder.calcularPontoReposicaoPorConsumo(
        app.dom.ES.value.trim(),
        app.dom.consumoMes.value.trim(),
        app.dom.consumo.value.trim(),
        app.dom.prazoEntrega.value.trim()
      );

      if (resultado.erro) {
        app.dom.paragrafoErroRegistro.textContent = resultado.erro;
        return;
      }

      valorPontoReposicao = resultado.valor;
    }

    app.state.produtos.push({
      codigo: valorCodigo,
      nome: valorNome,
      quantidade: valorQuantidade,
      pontoReposicao: valorPontoReposicao,
      categoria: categoriaValor,
    });

    app.state.paginacaoInventario.setDados(app.state.produtos);
    app.dom.form.reset();
    app.dom.paragrafoErroRegistro.textContent = "";
    app.modal.fecharModal(app.dom.popup);
  }

  function procurarProduto() {
    const valorPesquisar = app.dom.pesquisar.value.trim().toLowerCase();

    if (valorPesquisar === "") {
      app.dom.paragrafoErrBusca.textContent =
        "Por favor, insira um termo de pesquisa.";
      return;
    }

    app.dom.paragrafoErrBusca.textContent = "";

    const resultados = app.state.produtos.filter((produto) => {
      const codigo = String(produto.codigo ?? "").toLowerCase();
      const nome = String(produto.nome ?? "").toLowerCase();
      const quantidade = Number(produto.quantidade);

      return (
        codigo.includes(valorPesquisar) ||
        nome.includes(valorPesquisar) ||
        (Number.isFinite(Number(valorPesquisar)) &&
          quantidade === Number(valorPesquisar))
      );
    });

    if (resultados.length === 0) {
      app.dom.paragrafoErrBusca.textContent =
        "Nenhum produto encontrado para o termo pesquisado.";
      return;
    }

    app.state.paginacaoInventario.setDados(resultados);
  }

  function recarregarLista() {
    app.dom.paragrafoErrBusca.textContent = "";
    app.dom.pesquisar.value = "";
    app.state.paginacaoInventario.setDados(app.state.produtos);
  }

  function filtroInventario() {
    const valorFiltro = app.dom.filtroOpcoes.value;
    if (!valorFiltro) return;

    if (
      valorFiltro === "reposicao_negativo" ||
      valorFiltro === "reposicao_positivo"
    ) {
      const resultados = app.state.produtos.filter((produto) => {
        const qtd = Number(produto.quantidade);
        const pr = Number(produto.pontoReposicao);

        if (!Number.isFinite(qtd) || !Number.isFinite(pr)) return false;
        if (valorFiltro === "reposicao_negativo") return qtd < pr;
        if (valorFiltro === "reposicao_positivo") return qtd >= pr;
        return true;
      });

      app.state.paginacaoInventario.setDados(resultados);
      return;
    }

    const listaOrdenada = [...app.state.produtos];

    if (valorFiltro === "codigo_az") {
      listaOrdenada.sort((a, b) =>
        String(a.codigo).localeCompare(String(b.codigo))
      );
    } else if (valorFiltro === "codigo_za") {
      listaOrdenada.sort((a, b) =>
        String(b.codigo).localeCompare(String(a.codigo))
      );
    } else if (valorFiltro === "produto_az") {
      listaOrdenada.sort((a, b) => String(a.nome).localeCompare(String(b.nome)));
    } else if (valorFiltro === "produto_za") {
      listaOrdenada.sort((a, b) => String(b.nome).localeCompare(String(a.nome)));
    } else if (valorFiltro === "quantidade_crescente") {
      listaOrdenada.sort((a, b) => Number(a.quantidade) - Number(b.quantidade));
    } else if (valorFiltro === "quantidade_decrescente") {
      listaOrdenada.sort((a, b) => Number(b.quantidade) - Number(a.quantidade));
    }

    app.state.paginacaoInventario.setDados(listaOrdenada);
  }

  function atualizarVisibilidadeBotoesFiltro() {
    const mostrar = Boolean(app.dom.filtroOpcoes.value);
    app.dom.btnAplicarFiltro.hidden = !mostrar;
    app.dom.btnLimparFiltro.hidden = !mostrar;
  }

  function bindEvents() {
    app.dom.registrar.addEventListener("click", abrirModalRegistro);
    app.dom.botaoFecharPopUp.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.popup);
    });
    app.dom.popup.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popup);
    });
    app.dom.form.addEventListener("submit", adicionarLinha);
    app.dom.pesquisar.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      procurarProduto();
    });
    app.dom.btnRecarregarLista.addEventListener("click", recarregarLista);
    app.dom.btnAplicarFiltro.addEventListener("click", filtroInventario);
    app.dom.btnLimparFiltro.addEventListener("click", () => {
      app.dom.filtroOpcoes.value = "";
      app.state.paginacaoInventario.setDados(app.state.produtos);
      atualizarVisibilidadeBotoesFiltro();
    });
    app.dom.filtroOpcoes.addEventListener(
      "change",
      atualizarVisibilidadeBotoesFiltro
    );

    atualizarVisibilidadeBotoesFiltro();
  }

  app.inventory = {
    bindEvents,
    atualizarVisibilidadeBotoesFiltro,
    atualizarInventarioComOrdemEntrada,
    atualizarInventarioComOrdemSaida,
  };
})(window.StockPro = window.StockPro || {});

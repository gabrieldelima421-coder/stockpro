"use strict";

(function initializeOrders(app) {
  function renderListaEditarOrdens(itens) {
    app.dom.listaEditarOrdens.innerHTML = "";

    for (let i = 0; i < itens.length; i += 1) {
      const item = itens[i];
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");

      input.type = "checkbox";
      input.dataset.index = item.idx;
      span.style.cssText =
        "font-family: Arial, Helvetica, sans-serif; margin-left: 5px; font-weight: 400;";
      span.textContent =
        item.ordem.codigoProduto +
        " - " +
        item.ordem.produto +
        " | " +
        item.ordem.tipo +
        " | " +
        item.ordem.pessoa +
        " | qtd: " +
        item.ordem.quantidade;

      label.appendChild(input);
      label.appendChild(span);
      app.dom.listaEditarOrdens.appendChild(label);
      app.dom.listaEditarOrdens.appendChild(document.createElement("br"));
    }

    app.state.ordemSelecionadaIndex = null;
    app.dom.btnEditarOrdemEditar.hidden = true;
    sincronizarBotaoMarcarTudo();
  }

  function sincronizarBotaoMarcarTudo() {
    const checkboxes = app.dom.listaEditarOrdens.querySelectorAll(
      'input[type="checkbox"]'
    );
    const marcados = app.dom.listaEditarOrdens.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (checkboxes.length === 0) {
      app.dom.marcarTudoBtn.hidden = true;
      app.dom.marcarTudoBtn.textContent = "Marcar Tudo";
      return;
    }

    app.dom.marcarTudoBtn.hidden = false;
    app.dom.marcarTudoBtn.textContent =
      marcados.length === checkboxes.length ? "Desmarcar Tudo" : "Marcar Tudo";
  }

  function atualizarVisibilidade() {
    const marcados = app.dom.listaEditarOrdens.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const quantidadeMarcados = marcados.length;

    app.dom.btnEditarOrdemEditar.hidden = quantidadeMarcados !== 1;

    if (quantidadeMarcados === 1) {
      app.dom.paragrafoErroEditar.textContent = "";
      app.state.ordemSelecionadaIndex = Number(marcados[0].dataset.index);
    } else {
      app.state.ordemSelecionadaIndex = null;
    }

    sincronizarBotaoMarcarTudo();
  }

  function limparErrosEntrada() {
    app.dom.paragrafoCodigoProduto.textContent = "";
    app.dom.paragrafoNomeProdutoEntrada.textContent = "";
    app.dom.paragrafoFornecedor.textContent = "";
    app.dom.paragrafoCompraQuantidade.textContent = "";
  }

  function limparErrosSaida() {
    app.dom.paragrafoCodigoProdutoSaida.textContent = "";
    app.dom.paragrafoNomeProdutoSaida.textContent = "";
    app.dom.paragrafoCliente.textContent = "";
    app.dom.paragrafoSaidaQuantidade.textContent = "";
  }

  function limparErrosEdicaoInterna() {
    app.dom.paraagrafoErro1.textContent = "";
    app.dom.paraagrafoErro2.textContent = "";
    app.dom.paraagrafoErro3.textContent = "";
    app.dom.paraagrafoErro4.textContent = "";
    app.dom.paraagrafoErro5.textContent = "";
    app.dom.paraagrafoErro6.textContent = "";
  }

  function adicionarOrdemEntrada(event) {
    event.preventDefault();

    const valorProdutoEntrada = app.dom.produtoNomeEntrada.value.trim();
    const valorProdutoFornecedor = app.dom.produtoFornecedor.value.trim();
    const valorFornecedor = app.dom.fornecedor.value.trim();
    const quantidadeTexto = app.dom.inserirOredemEntrada.value.trim();
    const quantidade = Number(quantidadeTexto);

    limparErrosEntrada();

    if (valorProdutoFornecedor === "") {
      app.dom.paragrafoCodigoProduto.textContent =
        "Por favor, insira o codigo do produto.";
      return;
    }

    if (valorProdutoEntrada === "") {
      app.dom.paragrafoNomeProdutoEntrada.textContent =
        "Por favor, insira o nome do produto.";
      return;
    }

    if (valorFornecedor === "") {
      app.dom.paragrafoFornecedor.textContent =
        "Por favor, insira o fornecedor.";
      return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      app.dom.paragrafoCompraQuantidade.textContent =
        "Quantidade invalida. Use um inteiro maior que 0.";
      return;
    }

    if (!app.utils.acharProdutoPorCodigo(valorProdutoFornecedor)) {
      app.dom.paragrafoCodigoProduto.textContent =
        "Esse codigo nao existe no inventario. Registre o produto primeiro.";
      return;
    }

    const atualizou = app.inventory.atualizarInventarioComOrdemEntrada(
      valorProdutoFornecedor,
      quantidade
    );

    if (!atualizou) {
      app.dom.paragrafoCompraQuantidade.textContent =
        "Nao foi possivel atualizar o inventario.";
      return;
    }

    app.state.arrayOrdens.push({
      codigoProduto: valorProdutoFornecedor,
      produto: valorProdutoEntrada,
      tipo: "entrada",
      pessoa: valorFornecedor,
      quantidade,
    });

    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.dom.formOrdemE.reset();
    app.modal.fecharModal(app.dom.popUpRegistroOrdens);
  }

  function adicionarOrdemSaida(event) {
    event.preventDefault();

    const valorProdutoSaida = app.dom.produtoNomeSaida.value.trim();
    const valorProdutoCliente = app.dom.produtoCliente.value.trim();
    const valorCliente = app.dom.cliente.value.trim();
    const quantidadeTexto = app.dom.inserirOredemSaida.value.trim();
    const quantidade = Number(quantidadeTexto);

    limparErrosSaida();

    if (valorProdutoCliente === "") {
      app.dom.paragrafoCodigoProdutoSaida.textContent =
        "Por favor, insira o codigo do produto.";
      return;
    }

    if (valorProdutoSaida === "") {
      app.dom.paragrafoNomeProdutoSaida.textContent =
        "Por favor, insira o nome do produto.";
      return;
    }

    if (valorCliente === "") {
      app.dom.paragrafoCliente.textContent = "Por favor, insira o cliente.";
      return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      app.dom.paragrafoSaidaQuantidade.textContent =
        "Quantidade invalida. Use um inteiro maior que 0.";
      return;
    }

    if (!app.utils.acharProdutoPorCodigo(valorProdutoCliente)) {
      app.dom.paragrafoCodigoProdutoSaida.textContent =
        "Esse codigo nao existe no inventario. Registre o produto primeiro.";
      return;
    }

    const atualizou = app.inventory.atualizarInventarioComOrdemSaida(
      valorProdutoCliente,
      quantidade
    );

    if (!atualizou) {
      app.dom.paragrafoSaidaQuantidade.textContent =
        "Estoque insuficiente ou nao foi possivel atualizar.";
      return;
    }

    app.state.arrayOrdens.push({
      codigoProduto: valorProdutoCliente,
      produto: valorProdutoSaida,
      tipo: "saida",
      pessoa: valorCliente,
      quantidade,
    });

    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.dom.formOrdemS.reset();
    app.modal.fecharModal(app.dom.popupSaida);
  }

  function mostrarTudo(event) {
    event.preventDefault();
    app.dom.paragrafoErroBuscar.textContent = "";
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
  }

  function pesquisarOrdens() {
    const valor = app.dom.procurarOrdens.value.trim().toLowerCase();

    if (valor === "") {
      app.dom.paragrafoErroBuscar.textContent =
        "Por favor, insira um termo de pesquisa.";
      return;
    }

    app.dom.paragrafoErroBuscar.textContent = "";

    const resultados = app.state.arrayOrdens.filter((ordem) => {
      const codigo = String(ordem.codigoProduto ?? "").toLowerCase();
      const produto = String(ordem.produto ?? "").toLowerCase();
      const pessoa = String(ordem.pessoa ?? "").toLowerCase();
      return (
        codigo.includes(valor) ||
        produto.includes(valor) ||
        pessoa.includes(valor)
      );
    });

    if (resultados.length === 0) {
      app.dom.paragrafoErroBuscar.textContent =
        "Nenhuma ordem encontrada para o termo pesquisado.";
      app.dom.tabelaCorpoOrdens.innerHTML = "";
      return;
    }

    app.state.paginacaoOrdens.setDados(resultados);
  }

  function pesquisarOrdemEditar() {
    const valorPesquisa = app.dom.pesquisarEditarOrdem.value.trim().toLowerCase();

    if (valorPesquisa === "") {
      app.dom.paragrafoErroEditar.textContent = "Digite um termo para pesquisar.";
      app.dom.listaEditarOrdens.innerHTML = "";
      app.state.ordemSelecionadaIndex = null;
      app.dom.btnEditarOrdemEditar.hidden = true;
      sincronizarBotaoMarcarTudo();
      return;
    }

    app.dom.paragrafoErroEditar.textContent = "";

    const resultados = app.state.arrayOrdens
      .map((ordem, idx) => ({ ordem, idx }))
      .filter((item) => {
        const codigo = String(item.ordem.codigoProduto ?? "").toLowerCase();
        const produto = String(item.ordem.produto ?? "").toLowerCase();
        const pessoa = String(item.ordem.pessoa ?? "").toLowerCase();

        return (
          codigo.includes(valorPesquisa) ||
          produto.includes(valorPesquisa) ||
          pessoa.includes(valorPesquisa)
        );
      });

    if (resultados.length === 0) {
      app.dom.listaEditarOrdens.innerHTML = "";
      app.state.ordemSelecionadaIndex = null;
      app.dom.btnEditarOrdemEditar.hidden = true;
      app.dom.paragrafoErroEditar.textContent = "Nenhuma ordem encontrada.";
      sincronizarBotaoMarcarTudo();
      return;
    }

    renderListaEditarOrdens(resultados);
  }

  function exibirLista() {
    app.dom.paragrafoErroEditar.textContent = "";
    renderListaEditarOrdens(
      app.state.arrayOrdens.map((ordem, idx) => ({ ordem, idx }))
    );
  }

  function removerOrdem() {
    const marcados = app.dom.listaEditarOrdens.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    if (marcados.length === 0) {
      app.dom.paragrafoErroEditar.textContent =
        "Selecione pelo menos 1 ordem para remover.";
      return;
    }

    app.dom.paragrafoErroEditar.textContent = "";
    const indices = [];

    for (let i = 0; i < marcados.length; i += 1) {
      const indice = Number(marcados[i].dataset.index);
      if (Number.isFinite(indice)) {
        indices.push(indice);
      }
    }

    if (indices.length === 0) {
      app.dom.paragrafoErroEditar.textContent = "Selecao invalida.";
      return;
    }

    indices.sort((a, b) => b - a);
    let puladas = 0;

    for (let i = 0; i < indices.length; i += 1) {
      const idx = indices[i];

      if (idx < 0 || idx >= app.state.arrayOrdens.length) {
        puladas += 1;
        continue;
      }

      const ordem = app.state.arrayOrdens[idx];
      const tipo = String(ordem.tipo ?? "").toLowerCase();
      const codigo = ordem.codigoProduto;
      const quantidade = Number(ordem.quantidade);

      if (!codigo || !Number.isFinite(quantidade) || quantidade <= 0) {
        puladas += 1;
        continue;
      }

      const achado = app.utils.acharProdutoPorCodigo(codigo);
      if (!achado) {
        puladas += 1;
        continue;
      }

      achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

      if (tipo === "saida") {
        achado.produto.quantidade += quantidade;
      } else if (tipo === "entrada") {
        if (achado.produto.quantidade - quantidade < 0) {
          puladas += 1;
          continue;
        }

        achado.produto.quantidade -= quantidade;
      } else {
        puladas += 1;
        continue;
      }

      app.state.arrayOrdens.splice(idx, 1);
    }

    app.state.paginacaoInventario.setDados(app.state.produtos);
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    exibirLista();

    if (puladas > 0) {
      app.dom.paragrafoErroEditar.textContent =
        "Algumas ordens nao puderam ser removidas (" + puladas + ").";
    }
  }

  function abrirEdicaoDaOrdem(event) {
    event.preventDefault();

    if (
      !Number.isFinite(app.state.ordemSelecionadaIndex) ||
      app.state.ordemSelecionadaIndex < 0 ||
      app.state.ordemSelecionadaIndex >= app.state.arrayOrdens.length
    ) {
      app.dom.paragrafoErroEditar.textContent =
        "Selecione 1 ordem valida para editar.";
      return;
    }

    const ordem = app.state.arrayOrdens[app.state.ordemSelecionadaIndex];
    app.dom.inputEditarCodigo.value = ordem.codigoProduto ?? "";
    app.dom.inputEditarProduto.value = ordem.produto ?? "";
    app.dom.inputEditarFornecedor.value =
      ordem.tipo === "entrada" ? ordem.pessoa ?? "" : "";
    app.dom.inputEditarCliente.value =
      ordem.tipo === "saida" ? ordem.pessoa ?? "" : "";
    app.dom.inputEditarEntrada.value =
      ordem.tipo === "entrada" ? ordem.quantidade ?? "" : "";
    app.dom.inputEditarSaida.value =
      ordem.tipo === "saida" ? ordem.quantidade ?? "" : "";
    limparErrosEdicaoInterna();
    app.modal.abrirModal(app.dom.abrirModalEditarOrdem);
  }

  function estornarOrdemNoEstoque(ordem) {
    const tipo = String(ordem.tipo ?? "").toLowerCase();
    const codigo = ordem.codigoProduto;
    const quantidade = Number(ordem.quantidade);

    if (!codigo || !Number.isFinite(quantidade) || quantidade <= 0) {
      return false;
    }

    const achado = app.utils.acharProdutoPorCodigo(codigo);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

    if (tipo === "saida") {
      achado.produto.quantidade += quantidade;
      return true;
    }

    if (tipo === "entrada") {
      if (achado.produto.quantidade - quantidade < 0) {
        return false;
      }

      achado.produto.quantidade -= quantidade;
      return true;
    }

    return false;
  }

  function aplicarOrdemNoEstoque(ordem) {
    const tipo = String(ordem.tipo ?? "").toLowerCase();
    const codigo = ordem.codigoProduto;
    const quantidade = Number(ordem.quantidade);

    if (!codigo || !Number.isFinite(quantidade) || quantidade <= 0) {
      return false;
    }

    const achado = app.utils.acharProdutoPorCodigo(codigo);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

    if (tipo === "entrada") {
      achado.produto.quantidade += quantidade;
      return true;
    }

    if (tipo === "saida") {
      if (achado.produto.quantidade - quantidade < 0) {
        return false;
      }

      achado.produto.quantidade -= quantidade;
      return true;
    }

    return false;
  }

  function salvarOrdemEditada() {
    const codigo = app.dom.inputEditarCodigo.value.trim();
    const produto = app.dom.inputEditarProduto.value.trim();
    const fornecedor = app.dom.inputEditarFornecedor.value.trim();
    const cliente = app.dom.inputEditarCliente.value.trim();
    const valorEntrada = Number(app.dom.inputEditarEntrada.value);
    const valorSaida = Number(app.dom.inputEditarSaida.value);

    limparErrosEdicaoInterna();
    app.dom.paragrafoErroEditar.textContent = "";

    if (!codigo) {
      app.dom.paraagrafoErro1.textContent =
        "Por favor, insira o codigo do produto.";
      return;
    }

    if (!produto) {
      app.dom.paraagrafoErro2.textContent =
        "Por favor, insira o nome do produto.";
      return;
    }

    if (!Number.isFinite(valorEntrada) || !Number.isFinite(valorSaida)) {
      app.dom.paraagrafoErro5.textContent =
        "Por favor, insira uma quantidade valida para entrada ou saida.";
      return;
    }

    const entradaOk = valorEntrada > 0;
    const saidaOk = valorSaida > 0;

    if (!entradaOk && !saidaOk) {
      app.dom.paraagrafoErro6.textContent =
        "A quantidade de entrada ou saida deve ser maior que zero.";
      return;
    }

    if (entradaOk && saidaOk) {
      app.dom.paraagrafoErro6.textContent =
        "So e permitido entrada ou saida, nao ambos.";
      return;
    }

    if (entradaOk && !fornecedor) {
      app.dom.paraagrafoErro3.textContent =
        "Por favor, insira o fornecedor para a entrada.";
      return;
    }

    if (saidaOk && !cliente) {
      app.dom.paraagrafoErro4.textContent =
        "Por favor, insira o cliente para a saida.";
      return;
    }

    if (
      !Number.isFinite(app.state.ordemSelecionadaIndex) ||
      app.state.ordemSelecionadaIndex < 0 ||
      app.state.ordemSelecionadaIndex >= app.state.arrayOrdens.length
    ) {
      app.dom.paragrafoErroEditar.textContent =
        "Selecione 1 ordem valida para editar.";
      return;
    }

    const ordemAntiga = app.state.arrayOrdens[app.state.ordemSelecionadaIndex];
    const ordemNova = {
      codigoProduto: codigo,
      produto,
      tipo: entradaOk ? "entrada" : "saida",
      pessoa: entradaOk ? fornecedor : cliente,
      quantidade: entradaOk ? Number(valorEntrada) : Number(valorSaida),
    };

    if (!estornarOrdemNoEstoque(ordemAntiga)) {
      app.dom.paragrafoErroEditar.textContent =
        "Nao foi possivel estornar a ordem antiga no estoque.";
      return;
    }

    if (!aplicarOrdemNoEstoque(ordemNova)) {
      aplicarOrdemNoEstoque(ordemAntiga);
      app.dom.paragrafoErroEditar.textContent =
        "Nao foi possivel aplicar a nova ordem.";
      return;
    }

    app.state.arrayOrdens[app.state.ordemSelecionadaIndex] = ordemNova;
    app.state.paginacaoInventario.setDados(app.state.produtos);
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    exibirLista();
    app.modal.fecharModal(app.dom.abrirModalEditarOrdem);
  }

  function alternarMarcarTudo() {
    const checkboxes = app.dom.listaEditarOrdens.querySelectorAll(
      'input[type="checkbox"]'
    );

    if (checkboxes.length === 0) {
      sincronizarBotaoMarcarTudo();
      return;
    }

    const todosMarcados = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked = !todosMarcados;
    });

    atualizarVisibilidade();
  }

  function bindEvents() {
    app.dom.ordens.addEventListener("click", (event) => {
      event.preventDefault();
      app.modal.abrirModal(app.dom.abrirPainelOrdens);
    });
    app.dom.btnFecharOrdem.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.abrirPainelOrdens);
    });
    app.dom.abrirPainelOrdens.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.abrirPainelOrdens);
    });
    app.dom.btnCompraEntrada.addEventListener("click", (event) => {
      event.preventDefault();
      app.modal.abrirModal(app.dom.popUpRegistroOrdens);
    });
    app.dom.btnFecharOrdem2.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.popUpRegistroOrdens);
    });
    app.dom.popUpRegistroOrdens.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popUpRegistroOrdens);
    });
    app.dom.btnSaidaVenda.addEventListener("click", (event) => {
      event.preventDefault();
      app.modal.abrirModal(app.dom.popupSaida);
    });
    app.dom.btnFecharOrdem3.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.popupSaida);
    });
    app.dom.popupSaida.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popupSaida);
    });
    app.dom.formOrdemE.addEventListener("submit", adicionarOrdemEntrada);
    app.dom.formOrdemS.addEventListener("submit", adicionarOrdemSaida);
    app.dom.atualizarTabelaOrdens.addEventListener("click", mostrarTudo);
    app.dom.procurarOrdens.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      pesquisarOrdens();
    });
    app.dom.btnEditarOrdens.addEventListener("click", (event) => {
      event.preventDefault();
      app.modal.abrirModal(app.dom.popUpEditarOrdem);
    });
    app.dom.btnFecharEditarOrdem.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.popUpEditarOrdem);
    });
    app.dom.popUpEditarOrdem.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popUpEditarOrdem);
    });
    app.dom.formPesquisarOrdemEditar.addEventListener("submit", (event) => {
      event.preventDefault();
      pesquisarOrdemEditar();
    });
    app.dom.pesquisarEditarOrdem.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      pesquisarOrdemEditar();
    });
    app.dom.btnCarregarListaEditar.addEventListener("click", exibirLista);
    app.dom.btnRemoverOrdem.addEventListener("click", removerOrdem);
    app.dom.listaEditarOrdens.addEventListener("change", (event) => {
      if (event.target && event.target.matches('input[type="checkbox"]')) {
        atualizarVisibilidade();
      }
    });
    app.dom.btnEditarOrdemEditar.addEventListener("click", abrirEdicaoDaOrdem);
    app.dom.btnFecharEditarOrdemDentro.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.abrirModalEditarOrdem);
    });
    app.dom.btnSalvarEditarOrdem.addEventListener("click", (event) => {
      event.preventDefault();
      salvarOrdemEditada();
    });
    app.dom.marcarTudoBtn.addEventListener("click", alternarMarcarTudo);

    app.dom.btnEditarOrdemEditar.hidden = true;
    app.dom.marcarTudoBtn.hidden = true;
    app.dom.marcarTudoBtn.textContent = "Marcar Tudo";
  }

  app.orders = {
    bindEvents,
    exibirLista,
  };
})(window.StockPro = window.StockPro || {});

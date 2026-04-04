"use strict";

(function initializeInventory(app) {
  let registroSelecionadoIndex = null;

  // Soma uma entrada ao estoque do produto encontrado pelo codigo.
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

  // Desconta uma saida do estoque do produto encontrado pelo codigo.
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

  // Abre o modal do registro principal e prepara o formulario para um novo cadastro.
  function abrirModalRegistro(event) {
    event.preventDefault();
    app.modal.abrirModal(app.dom.popup);
    app.dom.form.reset();
    app.dom.paragrafoErroRegistro.textContent = "";
    app.dom.codigo.focus();
  }

  // Abre o modal de editar registro no mesmo padrao visual do cadastro principal.
  function abrirModalEditarRegistro(event) {
    event.preventDefault();
    limparModalEditarRegistro();
    app.modal.abrirModal(app.dom.popupEdtRegistro);
    app.dom.procurarRegistro.focus();
  }

  // Fecha o modal de editar registro e limpa o estado temporario da busca.
  function fecharModalEditarRegistro() {
    app.modal.fecharModal(app.dom.popupEdtRegistro);
    limparModalEditarRegistro();
  }

  // Limpa os campos do painel interno usado para salvar a edicao do registro.
  function limparFormularioEditarRegistro() {
    app.dom.inputNovoCodRegistro.value = "";
    app.dom.inputNovoNomeRegistro.value = "";
    app.dom.inputNovaQtdRegistro.value = "";
    app.dom.inputNovoPtRepRegistro.value = "";
    app.dom.inputNovoConsumoMesRegistro.value = "";
    app.dom.inputNovoConsumoDiarioRegistro.value = "";
    app.dom.inputNovoPrazoEntregaRegistro.value = "";
    app.dom.erroSalvarEdtRegistro.textContent = "";
  }

  // Atualiza o destaque visual do item selecionado na lista de resultados da busca.
  function atualizarSelecaoListaEditarRegistro() {
    const botoes = app.dom.listaEdtRegistro.querySelectorAll(".lista-edt-item");

    for (let i = 0; i < botoes.length; i += 1) {
      const botao = botoes[i];
      const selecionado = Number(botao.dataset.index) === registroSelecionadoIndex;
      botao.classList.toggle("selecionado", selecionado);
      botao.setAttribute("aria-pressed", selecionado ? "true" : "false");
    }
  }

  // Esconde o painel interno de edicao e zera o item atualmente selecionado.
  function ocultarPainelEditarRegistro() {
    registroSelecionadoIndex = null;
    app.dom.painelEdtRegistro.hidden = true;
    limparFormularioEditarRegistro();
    atualizarSelecaoListaEditarRegistro();
  }

  // Limpa todo o estado visual do modal de editar registro.
  function limparModalEditarRegistro() {
    app.dom.procurarRegistro.value = "";
    app.dom.errBuscaReg.textContent = "";
    app.dom.listaEdtRegistro.innerHTML = "";
    ocultarPainelEditarRegistro();
  }

  // Monta a lista de produtos encontrados na busca de editar registro.
  function renderListaEditarRegistro(itens) {
    app.dom.listaEdtRegistro.innerHTML = "";

    for (let i = 0; i < itens.length; i += 1) {
      const item = itens[i];
      const botao = document.createElement("button");

      botao.type = "button";
      botao.className = "lista-edt-item";
      botao.dataset.index = String(item.idx);
      botao.textContent =
        item.produto.codigo +
        " - " +
        item.produto.nome +
        " | qtd: " +
        item.produto.quantidade +
        " | PR: " +
        (item.produto.pontoReposicao ?? "-");

      app.dom.listaEdtRegistro.appendChild(botao);
    }

    atualizarSelecaoListaEditarRegistro();
  }

  // Preenche o painel interno com os dados do produto escolhido na lista.
  function preencherFormularioEditarRegistro(produto) {
    app.dom.inputNovoCodRegistro.value = produto.codigo ?? "";
    app.dom.inputNovoNomeRegistro.value = produto.nome ?? "";
    app.dom.inputNovaQtdRegistro.value = produto.quantidade ?? "";
    app.dom.inputNovoPtRepRegistro.value = "";
    app.dom.inputNovoConsumoMesRegistro.value = "";
    app.dom.inputNovoConsumoDiarioRegistro.value = "";
    app.dom.inputNovoPrazoEntregaRegistro.value = "";
    app.dom.erroSalvarEdtRegistro.textContent = "";
  }

  // Abre o painel interno quando o usuario clica em um item da lista encontrada.
  function abrirPainelEditarRegistro(index) {
    if (
      !Number.isFinite(index) ||
      index < 0 ||
      index >= app.state.produtos.length
    ) {
      app.dom.errBuscaReg.textContent = "Selecione um produto valido para editar.";
      ocultarPainelEditarRegistro();
      return;
    }

    registroSelecionadoIndex = index;
    app.dom.errBuscaReg.textContent = "";
    preencherFormularioEditarRegistro(app.state.produtos[index]);
    app.dom.painelEdtRegistro.hidden = false;
    atualizarSelecaoListaEditarRegistro();
    app.dom.inputNovoCodRegistro.focus();
  }

  // Procura produtos pelo codigo ou nome e lista os resultados no painel de edicao.
  function pesquisarEditarRegistro() {
    const valorPesquisa = app.dom.procurarRegistro.value.trim().toLowerCase();

    app.dom.errBuscaReg.textContent = "";
    ocultarPainelEditarRegistro();

    if (valorPesquisa === "") {
      app.dom.listaEdtRegistro.innerHTML = "";
      app.dom.errBuscaReg.textContent = "Digite um termo para pesquisar.";
      return;
    }

    const resultados = app.state.produtos
      .map((produto, idx) => ({ produto, idx }))
      .filter((item) => {
        const codigo = String(item.produto.codigo ?? "").toLowerCase();
        const nome = String(item.produto.nome ?? "").toLowerCase();

        return (
          codigo.includes(valorPesquisa) ||
          nome.includes(valorPesquisa)
        );
      });

    if (resultados.length === 0) {
      app.dom.listaEdtRegistro.innerHTML = "";
      app.dom.errBuscaReg.textContent =
        "Nenhum produto encontrado para a pesquisa.";
      return;
    }

    renderListaEditarRegistro(resultados);
  }

  // Diz se o usuario informou algum campo da conta do ponto de reposicao na edicao.
  function algumCampoPontoReposicaoEdicaoFoiPreenchido() {
    return [
      app.dom.inputNovoPtRepRegistro.value,
      app.dom.inputNovoConsumoMesRegistro.value,
      app.dom.inputNovoConsumoDiarioRegistro.value,
      app.dom.inputNovoPrazoEntregaRegistro.value,
    ].some((campo) => String(campo ?? "").trim() !== "");
  }

  // Mantem os campos de consumo mensal e diario da edicao mutuamente exclusivos.
  function configurarCamposConsumoEdicao() {
    app.dom.inputNovoConsumoMesRegistro.addEventListener("input", () => {
      if (app.dom.inputNovoConsumoMesRegistro.value.trim() !== "") {
        app.dom.inputNovoConsumoDiarioRegistro.value = "";
      }
    });

    app.dom.inputNovoConsumoDiarioRegistro.addEventListener("input", () => {
      if (app.dom.inputNovoConsumoDiarioRegistro.value.trim() !== "") {
        app.dom.inputNovoConsumoMesRegistro.value = "";
      }
    });
  }

  // Sincroniza as ordens antigas com o novo codigo e nome do produto editado.
  function sincronizarOrdensComProdutoEditado(codigoAnterior, produtoAtualizado) {
    const codigoAnteriorNormalizado = app.utils.normalizarCodigo(codigoAnterior);

    for (let i = 0; i < app.state.arrayOrdens.length; i += 1) {
      const ordem = app.state.arrayOrdens[i];

      if (
        app.utils.normalizarCodigo(ordem.codigoProduto) ===
        codigoAnteriorNormalizado
      ) {
        ordem.codigoProduto = produtoAtualizado.codigo;
        ordem.produto = produtoAtualizado.nome;
      }
    }
  }

  // Remove todas as ordens que ainda apontam para o produto excluido.
  function removerOrdensDoProduto(codigoProduto) {
    const codigoNormalizado = app.utils.normalizarCodigo(codigoProduto);

    app.state.arrayOrdens = app.state.arrayOrdens.filter((ordem) => {
      return (
        app.utils.normalizarCodigo(ordem.codigoProduto) !== codigoNormalizado
      );
    });
  }

  // Exclui o produto selecionado e remove as ordens vinculadas para manter a base consistente.
  function excluirRegistroSelecionado() {
    app.dom.errBuscaReg.textContent = "";
    app.dom.erroSalvarEdtRegistro.textContent = "";

    if (
      !Number.isFinite(registroSelecionadoIndex) ||
      registroSelecionadoIndex < 0 ||
      registroSelecionadoIndex >= app.state.produtos.length
    ) {
      app.dom.errBuscaReg.textContent =
        "Selecione um produto da lista antes de excluir.";
      return;
    }

    const produtoRemovido = app.state.produtos[registroSelecionadoIndex];
    const confirmouExclusao = window.confirm(
      'Excluir o produto "' +
        String(produtoRemovido.nome ?? "") +
        '" (codigo ' +
        String(produtoRemovido.codigo ?? "") +
        ")? Essa acao tambem remove as ordens vinculadas."
    );

    if (!confirmouExclusao) {
      return;
    }

    app.state.produtos.splice(registroSelecionadoIndex, 1);
    removerOrdensDoProduto(produtoRemovido.codigo);
    app.state.paginacaoInventario.setDados(app.state.produtos);

    if (app.state.paginacaoOrdens) {
      app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    }

    fecharModalEditarRegistro();
  }

  // Salva a substituicao do registro antigo pelo novo registro preenchido no painel.
  function salvarEdicaoRegistro() {
    app.dom.erroSalvarEdtRegistro.textContent = "";

    if (
      !Number.isFinite(registroSelecionadoIndex) ||
      registroSelecionadoIndex < 0 ||
      registroSelecionadoIndex >= app.state.produtos.length
    ) {
      app.dom.erroSalvarEdtRegistro.textContent =
        "Selecione um produto da lista antes de salvar.";
      return;
    }

    const produtoAnterior = app.state.produtos[registroSelecionadoIndex];
    const novoCodigo = app.dom.inputNovoCodRegistro.value.trim();
    const novoNome = app.dom.inputNovoNomeRegistro.value.trim();
    const quantidadeTexto = app.dom.inputNovaQtdRegistro.value.trim();
    const novaQuantidade = Number(quantidadeTexto);

    if (novoCodigo === "" || novoNome === "" || quantidadeTexto === "") {
      app.dom.erroSalvarEdtRegistro.textContent =
        "Preencha codigo, nome e quantidade para salvar.";
      return;
    }

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
      app.dom.erroSalvarEdtRegistro.textContent =
        "A quantidade precisa ser um numero inteiro maior ou igual a zero.";
      return;
    }

    const produtoComMesmoCodigo = app.utils.acharProdutoPorCodigo(novoCodigo);
    if (
      produtoComMesmoCodigo &&
      produtoComMesmoCodigo.index !== registroSelecionadoIndex
    ) {
      app.dom.erroSalvarEdtRegistro.textContent =
        "Ja existe outro produto cadastrado com esse codigo.";
      return;
    }

    let novoPontoReposicao = produtoAnterior.pontoReposicao ?? "-";

    if (algumCampoPontoReposicaoEdicaoFoiPreenchido()) {
      const resultado = app.reorder.calcularPontoReposicaoPorConsumo(
        app.dom.inputNovoPtRepRegistro.value.trim(),
        app.dom.inputNovoConsumoMesRegistro.value.trim(),
        app.dom.inputNovoConsumoDiarioRegistro.value.trim(),
        app.dom.inputNovoPrazoEntregaRegistro.value.trim()
      );

      if (resultado.erro) {
        app.dom.erroSalvarEdtRegistro.textContent = resultado.erro;
        return;
      }

      novoPontoReposicao = resultado.valor;
    }

    const codigoAnterior = produtoAnterior.codigo;
    const produtoAtualizado = {
      ...produtoAnterior,
      codigo: novoCodigo,
      nome: novoNome,
      quantidade: novaQuantidade,
      pontoReposicao: novoPontoReposicao,
    };

    app.state.produtos[registroSelecionadoIndex] = produtoAtualizado;
    sincronizarOrdensComProdutoEditado(codigoAnterior, produtoAtualizado);
    app.state.paginacaoInventario.setDados(app.state.produtos);

    if (app.state.paginacaoOrdens) {
      app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    }

    fecharModalEditarRegistro();
  }

  // Valida os campos do formulario principal e adiciona um novo produto ao inventario.
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

  // Busca produtos por codigo, nome ou quantidade digitada no campo principal de pesquisa.
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

  // Restaura a lista completa do inventario e limpa a busca atual.
  function recarregarLista() {
    app.dom.paragrafoErrBusca.textContent = "";
    app.dom.pesquisar.value = "";
    app.state.paginacaoInventario.setDados(app.state.produtos);
  }

  // Aplica o filtro ou a ordenacao escolhida no select da tela principal.
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

  // Mostra ou esconde os botoes de filtro conforme o select principal recebe valor.
  function atualizarVisibilidadeBotoesFiltro() {
    const mostrar = Boolean(app.dom.filtroOpcoes.value);
    app.dom.btnAplicarFiltro.hidden = !mostrar;
    app.dom.btnLimparFiltro.hidden = !mostrar;
  }

  // Liga os eventos do cadastro principal, da busca e dos filtros do inventario.
  function bindEvents() {
    app.dom.registrar.addEventListener("click", abrirModalRegistro);
    app.dom.botaoFecharPopUp.addEventListener("click", () => {
      app.modal.fecharModal(app.dom.popup);
    });
    app.dom.popup.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popup);
    });
    app.dom.btnEdtRegistro.addEventListener("click", abrirModalEditarRegistro);
    app.dom.btnFecharPopUpEdtRegistro.addEventListener(
      "click",
      fecharModalEditarRegistro
    );
    app.dom.popupEdtRegistro.addEventListener("click", (event) => {
      app.modal.fecharFora(event, app.dom.popupEdtRegistro);
    });
    app.dom.procurarRegistro.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      pesquisarEditarRegistro();
    });
    app.dom.procurarRegistro.addEventListener("input", () => {
      app.dom.errBuscaReg.textContent = "";
      app.dom.erroSalvarEdtRegistro.textContent = "";
      app.dom.listaEdtRegistro.innerHTML = "";
      ocultarPainelEditarRegistro();
    });
    app.dom.listaEdtRegistro.addEventListener("click", (event) => {
      const botao = event.target.closest(".lista-edt-item");
      if (!botao) return;
      abrirPainelEditarRegistro(Number(botao.dataset.index));
    });
    app.dom.btnExcRegistro.addEventListener("click", excluirRegistroSelecionado);
    app.dom.btnSalvarEdtRegistro.addEventListener("click", salvarEdicaoRegistro);
    app.dom.painelEdtRegistro.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      salvarEdicaoRegistro();
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
    configurarCamposConsumoEdicao();
  }

  app.inventory = {
    bindEvents,
    atualizarVisibilidadeBotoesFiltro,
    atualizarInventarioComOrdemEntrada,
    atualizarInventarioComOrdemSaida,
  };

  // Prepara a busca do fluxo de editar registro principal pelo codigo ou nome do produto.
  // ! criar funçao para editar o resgistro dos produtos
  // ? criar ediçao para codigo, nome, quantidade, ponto reposiçao
  //*====================================================================
  
  })
(window.StockPro = window.StockPro || {});

"use strict";

(function initializeOrders(app) {
  const LIMITE_ORDENS_EDICAO = 20;
  let listaEditarOrdensAtual = [];
  let paginaEditarOrdensAtual = 1;

  // Renderiza a lista de ordens usada no fluxo de editar e remover registros de ordem.
  function renderListaEditarOrdens(itens) {
    app.dom.listaEditarOrdens.innerHTML = "";

    for (let i = 0; i < itens.length; i += 1) {
      const item = itens[i];
      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");

      label.className = "ordem-editar-item";
      input.type = "checkbox";
      input.dataset.index = item.idx;
      span.className = "ordem-editar-texto";
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
    }

    app.state.ordemSelecionadaIndex = null;
    app.dom.btnEditarOrdemEditar.hidden = true;
    sincronizarBotaoMarcarTudo();
  }

  function getTotalPaginasEditarOrdens() {
    return Math.max(
      1,
      Math.ceil(listaEditarOrdensAtual.length / LIMITE_ORDENS_EDICAO)
    );
  }

  function atualizarBotoesPaginacaoEditarOrdens() {
    const totalPaginas = getTotalPaginasEditarOrdens();
    const temMaisDeUmaPagina = totalPaginas > 1;

    app.dom.btnInicioEditarOrdens.hidden =
      !temMaisDeUmaPagina || paginaEditarOrdensAtual === 1;
    app.dom.btnVoltarEditarOrdens.hidden =
      !temMaisDeUmaPagina || paginaEditarOrdensAtual === 1;
    app.dom.btnProximaEditarOrdens.hidden =
      !temMaisDeUmaPagina || paginaEditarOrdensAtual === totalPaginas;
    app.dom.btnUltimoEditarOrdens.hidden =
      !temMaisDeUmaPagina || paginaEditarOrdensAtual === totalPaginas;
  }

  function renderizarPaginaEditarOrdens() {
    const totalPaginas = getTotalPaginasEditarOrdens();

    if (paginaEditarOrdensAtual > totalPaginas) {
      paginaEditarOrdensAtual = totalPaginas;
    }

    const inicio = (paginaEditarOrdensAtual - 1) * LIMITE_ORDENS_EDICAO;
    const fim = inicio + LIMITE_ORDENS_EDICAO;
    renderListaEditarOrdens(listaEditarOrdensAtual.slice(inicio, fim));
    atualizarBotoesPaginacaoEditarOrdens();
  }

  function setListaEditarOrdens(itens) {
    listaEditarOrdensAtual = Array.isArray(itens) ? [...itens] : [];
    paginaEditarOrdensAtual = 1;
    renderizarPaginaEditarOrdens();
  }

  function limparListaEditarOrdens() {
    setListaEditarOrdens([]);
  }

  // Ajusta o botao de marcar tudo conforme a quantidade de checkboxes selecionados.
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

  // Controla quando o botao de editar deve aparecer e qual ordem esta selecionada.
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

  // Limpa as mensagens de erro do formulario de entrada.
  function limparErrosEntrada() {
    app.dom.paragrafoCodigoProduto.textContent = "";
    app.dom.paragrafoNomeProdutoEntrada.textContent = "";
    app.dom.paragrafoFornecedorEntrada.textContent = "";
    app.dom.paragrafoQuantidadeEntrada.textContent = "";
    app.dom.paragrafoErroDataCompra.textContent = "";
  }

  // Limpa as mensagens de erro do formulario de saida.
  function limparErrosSaida() {
    app.dom.paragrafoCodigoProdutoSaida.textContent = "";
    app.dom.paragrafoNomeProdutoSaida.textContent = "";
    app.dom.paragrafoClienteSaida.textContent = "";
    app.dom.paragrafoQuantidadeSaida.textContent = "";
    app.dom.paragrafoErroDataSaida.textContent = "";
  }

  // Limpa as mensagens de erro exibidas dentro do modal de editar ordem.
  function limparErrosEdicaoInterna() {
    app.dom.paraagrafoErro1.textContent = "";
    app.dom.paraagrafoErro2.textContent = "";
    app.dom.paraagrafoErro3.textContent = "";
    app.dom.paraagrafoErro4.textContent = "";
    app.dom.paraagrafoErro5.textContent = "";
    app.dom.paraagrafoErro6.textContent = "";
    app.dom.paragrafoErroDataEdicao.textContent = "";
  }

  // Confere se existe um produto com a combinacao de codigo e nome informada.
  function validarProdutoRegistrado(codigoInformado, nomeInformado) {
    const produtoComCodigo = app.utils.acharProdutoPorCodigo(codigoInformado);

    if (!produtoComCodigo) {
      return {
        valido: false,
        erro: "codigo_inexistente",
        produto: null,
      };
    }

    const produtoComCodigoENome = app.utils.acharProdutoPorCodigoENome(
      codigoInformado,
      nomeInformado
    );

    if (!produtoComCodigoENome) {
      return {
        valido: false,
        erro: "nome_nao_confere",
        produto: produtoComCodigo.produto,
      };
    }

    return {
      valido: true,
      erro: "",
      produto: produtoComCodigoENome.produto,
    };
  }

  function limparSugestoes(container) {
    if (!container) return;
    container.innerHTML = "";
    container.hidden = true;
  }

  function limparTodasSugestoesOrdens() {
    limparSugestoes(app.dom.listaSugestoes1);
    limparSugestoes(app.dom.listaSugestoes2);
    limparSugestoes(app.dom.listaSugestoes3);
    limparSugestoes(app.dom.listaSugestoes4);
  }

  function preencherCodigoProdutoEntrada(produto) {
    app.dom.codigoProdutoEntrada.value = String(produto.codigo ?? "");
    app.dom.nomeProdutoEntrada.value = String(produto.nome ?? "");
    limparSugestoes(app.dom.listaSugestoes1);
    limparSugestoes(app.dom.listaSugestoes2);
  }

  function preencherNomeProdutoEntrada(produto) {
    app.dom.nomeProdutoEntrada.value = String(produto.nome ?? "");
    app.dom.codigoProdutoEntrada.value = String(produto.codigo ?? "");
    limparSugestoes(app.dom.listaSugestoes1);
    limparSugestoes(app.dom.listaSugestoes2);
  }

  function preencherCodigoProdutoSaida(produto) {
    app.dom.codigoProdutoSaida.value = String(produto.codigo ?? "");
    app.dom.nomeProdutoSaida.value = String(produto.nome ?? "");
    limparSugestoes(app.dom.listaSugestoes3);
    limparSugestoes(app.dom.listaSugestoes4);
  }

  function preencherNomeProdutoSaida(produto) {
    app.dom.nomeProdutoSaida.value = String(produto.nome ?? "");
    app.dom.codigoProdutoSaida.value = String(produto.codigo ?? "");
    limparSugestoes(app.dom.listaSugestoes3);
    limparSugestoes(app.dom.listaSugestoes4);
  }

  function criarItemSugestaoProduto(texto, aoSelecionar) {
    const botao = document.createElement("button");
    const conteudo = document.createElement("span");

    botao.type = "button";
    botao.className = "item-sugestao-produto";
    conteudo.className = "item-sugestao-texto";
    conteudo.textContent = texto;

    botao.addEventListener("mousedown", (event) => {
      event.preventDefault();
      aoSelecionar();
    });

    botao.append(conteudo);
    return botao;
  }

  function renderizarSugestoesProduto(
    container,
    produtos,
    obterTexto,
    aoSelecionar
  ) {
    limparSugestoes(container);

    if (!container) return;

    if (produtos.length === 0) {
      const vazio = document.createElement("div");
      vazio.className = "item-sugestao-vazia";
      vazio.textContent =
        app.state.produtos.length === 0
          ? "Nenhum produto cadastrado."
          : "Nenhum produto encontrado.";
      container.appendChild(vazio);
      container.hidden = false;
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < produtos.length; i += 1) {
      const produto = produtos[i];
      fragment.appendChild(
        criarItemSugestaoProduto(obterTexto(produto), () => aoSelecionar(produto))
      );
    }

    container.appendChild(fragment);
    container.hidden = false;
  }

  function filtrarProdutosPorCodigo(produtos, valorBusca) {
    const busca = valorBusca.toLowerCase().trim();

    return produtos.filter((p) => {
      const cod = String(p.codigo ?? "").toLowerCase().trim();

      return cod.startsWith(busca);
    });
  }

  function obterTextoCodigoENome(produto) {
    return (
      String(produto.codigo ?? "") +
      " - " +
      String(produto.nome ?? "")
    );
  }

  function atualizarSugestoesCodigoEntrada() {
    const produtos = app.state.produtos;
    const codigoProdutoEntrada = app.dom.codigoProdutoEntrada.value.trim();

    limparSugestoes(app.dom.listaSugestoes2);
    if (!codigoProdutoEntrada) {
      limparSugestoes(app.dom.listaSugestoes1);
      return;
    }

    const autoCompleteCod = filtrarProdutosPorCodigo(
      produtos,
      codigoProdutoEntrada
    );

    renderizarSugestoesProduto(
      app.dom.listaSugestoes1,
      autoCompleteCod,
      obterTextoCodigoENome,
      preencherCodigoProdutoEntrada
    );
  }

  function atualizarSugestoesNomeEntrada() {
    const produtos = app.state.produtos;
    const nomeProdutoEntrada = app.dom.nomeProdutoEntrada.value.trim();

    limparSugestoes(app.dom.listaSugestoes1);
    if (!nomeProdutoEntrada) {
      limparSugestoes(app.dom.listaSugestoes2);
      return;
    }

    const autoCompleteNome = produtos.filter((p) =>
      String(p.nome ?? "").toLowerCase().trim().startsWith(
        nomeProdutoEntrada.toLowerCase().trim()
      )
    );

    renderizarSugestoesProduto(
      app.dom.listaSugestoes2,
      autoCompleteNome,
      obterTextoCodigoENome,
      preencherNomeProdutoEntrada
    );
  }

  function atualizarSugestoesCodigoSaida() {
    const produtos = app.state.produtos;
    const codigoProdutoSaida = app.dom.codigoProdutoSaida.value.trim();

    limparSugestoes(app.dom.listaSugestoes4);
    if (!codigoProdutoSaida) {
      limparSugestoes(app.dom.listaSugestoes3);
      return;
    }

    const autoCompleteCod = filtrarProdutosPorCodigo(produtos, codigoProdutoSaida);

    renderizarSugestoesProduto(
      app.dom.listaSugestoes3,
      autoCompleteCod,
      obterTextoCodigoENome,
      preencherCodigoProdutoSaida
    );
  }

  function atualizarSugestoesNomeSaida() {
    const produtos = app.state.produtos;
    const nomeProdutoSaida = app.dom.nomeProdutoSaida.value.trim();

    limparSugestoes(app.dom.listaSugestoes3);
    if (!nomeProdutoSaida) {
      limparSugestoes(app.dom.listaSugestoes4);
      return;
    }

    const autoCompleteNome = produtos.filter((p) =>
      String(p.nome ?? "").toLowerCase().trim().startsWith(
        nomeProdutoSaida.toLowerCase().trim()
      )
    );

    renderizarSugestoesProduto(
      app.dom.listaSugestoes4,
      autoCompleteNome,
      obterTextoCodigoENome,
      preencherNomeProdutoSaida
    );
  }

  function registrarFechamentoPorBlur(input, container) {
    input.addEventListener("blur", () => {
      window.setTimeout(() => {
        if (container.contains(document.activeElement)) return;
        limparSugestoes(container);
      }, 120);
    });
  }

  function acharProdutoParaMovimento(produtoReferencia) {
    if (produtoReferencia && typeof produtoReferencia === "object") {
      if (produtoReferencia.id) {
        const produtoPorId = app.utils.acharProdutoPorId(produtoReferencia.id);
        if (produtoPorId) return produtoPorId;
      }

      const produtoPorCodigoENome = app.utils.acharProdutoPorCodigoENome(
        produtoReferencia.codigo,
        produtoReferencia.nome
      );

      if (produtoPorCodigoENome) return produtoPorCodigoENome;

      return app.utils.acharProdutoPorCodigo(produtoReferencia.codigo);
    }

    return app.utils.acharProdutoPorCodigo(produtoReferencia);
  }

  function sincronizarInventario() {
    if (app.state.paginacaoInventario) {
      app.state.paginacaoInventario.setDados(app.state.produtos);
    }
  }

  function atualizarInventarioComOrdemEntrada(produtoReferencia, quantidadeEntrada) {
    const qtd = Number(quantidadeEntrada);

    if (!Number.isFinite(qtd) || qtd <= 0) return false;

    const achado = acharProdutoParaMovimento(produtoReferencia);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;
    achado.produto.quantidade += qtd;
    sincronizarInventario();
    app.storage.salvarProdutos();
    return true;
  }

  function atualizarInventarioComOrdemSaida(produtoReferencia, quantidadeSaida) {
    const qtd = Number(quantidadeSaida);

    if (!Number.isFinite(qtd) || qtd <= 0) return false;

    const achado = acharProdutoParaMovimento(produtoReferencia);
    if (!achado) return false;

    achado.produto.quantidade = Number(achado.produto.quantidade) || 0;

    if (achado.produto.quantidade - qtd < 0) {
      return false;
    }

    achado.produto.quantidade -= qtd;
    sincronizarInventario();
    app.storage.salvarProdutos();
    return true;
  }

  // Valida e registra uma ordem de entrada, atualizando o estoque do produto.
  function adicionarOrdemEntrada(event) {
    event.preventDefault();

    const nomeProdutoEntrada = app.dom.nomeProdutoEntrada.value.trim();
    const codigoProdutoEntrada = app.dom.codigoProdutoEntrada.value.trim();
    const fornecedorEntrada = app.dom.fornecedorEntrada.value.trim();
    const quantidadeTextoEntrada = app.dom.quantidadeEntrada.value.trim();
    const quantidadeEntrada = Number(quantidadeTextoEntrada);
    const dataCompra = app.dom.dataCompra.value;

    limparErrosEntrada();

    if (codigoProdutoEntrada === "") {
      app.dom.paragrafoCodigoProduto.textContent =
        "Por favor, insira o codigo do produto.";
      return;
    }

    if (nomeProdutoEntrada === "") {
      app.dom.paragrafoNomeProdutoEntrada.textContent =
        "Por favor, insira o nome do produto.";
      return;
    }

    if (fornecedorEntrada === "") {
      app.dom.paragrafoFornecedorEntrada.textContent =
        "Por favor, insira o fornecedor.";
      return;
    }

    if (dataCompra === "") {
      app.dom.paragrafoErroDataCompra.textContent =
        "insira uma data de compra";
      return;
    }

    if (!Number.isInteger(quantidadeEntrada) || quantidadeEntrada <= 0) {
      app.dom.paragrafoQuantidadeEntrada.textContent =
        "Quantidade invalida. Use um inteiro maior que 0.";
      return;
    }

    const validacaoProdutoEntrada = validarProdutoRegistrado(
      codigoProdutoEntrada,
      nomeProdutoEntrada
    );

    if (validacaoProdutoEntrada.erro === "codigo_inexistente") {
      app.dom.paragrafoCodigoProduto.textContent =
        "Esse codigo nao existe no inventario. Registre o produto primeiro.";
      return;
    }

    if (validacaoProdutoEntrada.erro === "nome_nao_confere") {
      app.dom.paragrafoNomeProdutoEntrada.textContent =
        'O nome informado nao corresponde ao codigo cadastrado.';
      return;
    }

    const atualizou = atualizarInventarioComOrdemEntrada(
      validacaoProdutoEntrada.produto,
      quantidadeEntrada
    );

    if (!atualizou) {
      app.dom.paragrafoQuantidadeEntrada.textContent =
        "Nao foi possivel atualizar o inventario.";
      return;
    }

    app.state.arrayOrdens.push({
      id: app.storage.gerarId("ordem"),
      produtoId: validacaoProdutoEntrada.produto.id,
      codigoProduto: validacaoProdutoEntrada.produto.codigo,
      produto: validacaoProdutoEntrada.produto.nome,
      tipo: "entrada",
      pessoa: fornecedorEntrada,
      quantidade: quantidadeEntrada,
      data: dataCompra
    });

    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.storage.salvarOrdens();
    app.dom.formOrdemE.reset();
    limparSugestoes(app.dom.listaSugestoes1);
    limparSugestoes(app.dom.listaSugestoes2);
    app.modal.fecharModal(app.dom.popUpRegistroOrdens);
  }

  // Valida e registra uma ordem de saida, descontando a quantidade do estoque.
  function adicionarOrdemSaida(event) {
    event.preventDefault();

    const nomeProdutoSaida = app.dom.nomeProdutoSaida.value.trim();
    const codigoProdutoSaida = app.dom.codigoProdutoSaida.value.trim();
    const clienteSaida = app.dom.clienteSaida.value.trim();
    const quantidadeTextoSaida = app.dom.quantidadeSaida.value.trim();
    const quantidadeSaida = Number(quantidadeTextoSaida);
    const dataSaida = app.dom.dataSaida.value;
    limparErrosSaida();

    if (codigoProdutoSaida === "") {
      app.dom.paragrafoCodigoProdutoSaida.textContent =
        "Por favor, insira o codigo do produto.";
      return;
    }

    if (nomeProdutoSaida === "") {
      app.dom.paragrafoNomeProdutoSaida.textContent =
        "Por favor, insira o nome do produto.";
      return;
    }

    if (clienteSaida === "") {
      app.dom.paragrafoClienteSaida.textContent = "Por favor, insira o cliente.";
      return;
    }

    if (dataSaida === "") {
      app.dom.paragrafoErroDataSaida.textContent =
        "insira uma data de venda";
      return;
    }

    if (!Number.isInteger(quantidadeSaida) || quantidadeSaida <= 0) {
      app.dom.paragrafoQuantidadeSaida.textContent =
        "Quantidade invalida. Use um inteiro maior que 0.";
      return;
    }

    const validacaoProdutoSaida = validarProdutoRegistrado(
      codigoProdutoSaida,
      nomeProdutoSaida
    );

    if (validacaoProdutoSaida.erro === "codigo_inexistente") {
      app.dom.paragrafoCodigoProdutoSaida.textContent =
        "Esse codigo nao existe no inventario. Registre o produto primeiro.";
      return;
    }

    if (validacaoProdutoSaida.erro === "nome_nao_confere") {
      app.dom.paragrafoNomeProdutoSaida.textContent =
        "O nome informado nao corresponde ao codigo cadastrado.";
      return;
    }

    const atualizou = atualizarInventarioComOrdemSaida(
      validacaoProdutoSaida.produto,
      quantidadeSaida
    );

    if (!atualizou) {
      app.dom.paragrafoQuantidadeSaida.textContent =
        "Estoque insuficiente ou nao foi possivel atualizar.";
      return;
    }

    app.state.arrayOrdens.push({
      id: app.storage.gerarId("ordem"),
      produtoId: validacaoProdutoSaida.produto.id,
      codigoProduto: validacaoProdutoSaida.produto.codigo,
      produto: validacaoProdutoSaida.produto.nome,
      tipo: "saida",
      pessoa: clienteSaida,
      quantidade: quantidadeSaida,
      data: dataSaida
    });

    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.storage.salvarOrdens();
    app.dom.formOrdemS.reset();
    limparSugestoes(app.dom.listaSugestoes3);
    limparSugestoes(app.dom.listaSugestoes4);
    app.modal.fecharModal(app.dom.popupSaida);
  }

  // Restaura a tabela principal de ordens com todos os registros existentes.
  function mostrarTudo(event) {
    event.preventDefault();
    app.dom.paragrafoErroBuscar.textContent = "";
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
  }

  // Filtra a tabela principal de ordens pelo texto digitado no campo de busca.
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
      app.state.paginacaoOrdens.setDados([]);
      return;
    }

    app.state.paginacaoOrdens.setDados(resultados);
  }

  // Busca ordens para o fluxo de edicao e monta a lista com checkboxes.
  function pesquisarOrdemEditar() {
    const valorPesquisa = app.dom.pesquisarEditarOrdem.value.trim().toLowerCase();

    if (valorPesquisa === "") {
      app.dom.paragrafoErroEditar.textContent = "Digite um termo para pesquisar.";
      limparListaEditarOrdens();
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
      app.dom.paragrafoErroEditar.textContent = "Nenhuma ordem encontrada.";
      limparListaEditarOrdens();
      return;
    }

    setListaEditarOrdens(resultados);
  }

  // Carrega todas as ordens atuais na lista de edicao sem aplicar filtro.
  function exibirLista() {
    app.dom.paragrafoErroEditar.textContent = "";
    setListaEditarOrdens(
      app.state.arrayOrdens.map((ordem, idx) => ({ ordem, idx }))
    );
  }

  // Remove as ordens marcadas e faz o estorno correspondente no estoque dos produtos.
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

      const achado = app.utils.acharProdutoDaOrdem(ordem);
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

    sincronizarInventario();
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.storage.salvarProdutos();
    app.storage.salvarOrdens();
    exibirLista();

    if (puladas > 0) {
      app.dom.paragrafoErroEditar.textContent =
        "Algumas ordens nao puderam ser removidas (" + puladas + ").";
    }
  }

  // Abre o modal interno preenchendo os campos com os dados da ordem escolhida.
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
    app.dom.inputEditarData.value = ordem.data ?? "";
    limparErrosEdicaoInterna();
    app.modal.abrirModal(app.dom.abrirModalEditarOrdem);
  }

  // Desfaz o efeito de uma ordem antiga no estoque antes de aplicar a edicao.
  function estornarOrdemNoEstoque(ordem) {
    const tipo = String(ordem.tipo ?? "").toLowerCase();
    const codigo = ordem.codigoProduto;
    const quantidade = Number(ordem.quantidade);

    if (!codigo || !Number.isFinite(quantidade) || quantidade <= 0) {
      return false;
    }

    const achado = app.utils.acharProdutoDaOrdem(ordem);
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

  // Aplica uma ordem no estoque usando as regras do tipo entrada ou saida.
  function aplicarOrdemNoEstoque(ordem) {
    const tipo = String(ordem.tipo ?? "").toLowerCase();
    const codigo = ordem.codigoProduto;
    const quantidade = Number(ordem.quantidade);

    if (!codigo || !Number.isFinite(quantidade) || quantidade <= 0) {
      return false;
    }

    const achado = app.utils.acharProdutoDaOrdem(ordem);
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

  // Valida a edicao da ordem, estorna a ordem antiga e aplica os novos dados no estoque.
  function salvarOrdemEditada() {
    const codigo = app.dom.inputEditarCodigo.value.trim();
    const produto = app.dom.inputEditarProduto.value.trim();
    const fornecedor = app.dom.inputEditarFornecedor.value.trim();
    const cliente = app.dom.inputEditarCliente.value.trim();
    const valorEntrada = Number(app.dom.inputEditarEntrada.value);
    const valorSaida = Number(app.dom.inputEditarSaida.value);
    const data = app.dom.inputEditarData.value;

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

    if (data === "") {
      app.dom.paragrafoErroDataEdicao.textContent =
        "Por favor, insira a data da ordem.";
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
    const validacaoProduto = validarProdutoRegistrado(codigo, produto);

    if (validacaoProduto.erro === "codigo_inexistente") {
      app.dom.paraagrafoErro1.textContent =
        "Esse codigo nao existe no inventario.";
      return;
    }

    if (validacaoProduto.erro === "nome_nao_confere") {
      app.dom.paraagrafoErro2.textContent =
        "O nome informado nao corresponde ao codigo cadastrado.";
      return;
    }

    const ordemNova = {
      ...ordemAntiga,
      id: ordemAntiga.id || app.storage.gerarId("ordem"),
      produtoId: validacaoProduto.produto.id,
      codigoProduto: validacaoProduto.produto.codigo,
      produto: validacaoProduto.produto.nome,
      tipo: entradaOk ? "entrada" : "saida",
      pessoa: entradaOk ? fornecedor : cliente,
      quantidade: entradaOk ? Number(valorEntrada) : Number(valorSaida),
      data,
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
    sincronizarInventario();
    app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
    app.storage.salvarProdutos();
    app.storage.salvarOrdens();
    exibirLista();
    app.modal.fecharModal(app.dom.abrirModalEditarOrdem);
  }

  // Marca ou desmarca todas as ordens da lista de edicao.
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

  // Liga todos os eventos do modulo de ordens, dos modais e da lista de edicao.
  function bindEvents() {
    if (app.dom.ordens && app.dom.abrirPainelOrdens) {
      app.dom.ordens.addEventListener("click", (event) => {
        event.preventDefault();
        app.modal.abrirModal(app.dom.abrirPainelOrdens);
      });
    }

    if (app.dom.btnFecharOrdem && app.dom.abrirPainelOrdens) {
      app.dom.btnFecharOrdem.addEventListener("click", () => {
        app.modal.fecharModal(app.dom.abrirPainelOrdens);
      });
      app.dom.abrirPainelOrdens.addEventListener("click", (event) => {
        app.modal.fecharFora(event, app.dom.abrirPainelOrdens);
      });
    }

    app.dom.btnCompraEntrada.addEventListener("click", (event) => {
      event.preventDefault();
      limparSugestoes(app.dom.listaSugestoes1);
      limparSugestoes(app.dom.listaSugestoes2);
      app.modal.abrirModal(app.dom.popUpRegistroOrdens);
    });
    app.dom.btnFecharOrdem2.addEventListener("click", () => {
      limparSugestoes(app.dom.listaSugestoes1);
      limparSugestoes(app.dom.listaSugestoes2);
      app.modal.fecharModal(app.dom.popUpRegistroOrdens);
    });
    app.dom.popUpRegistroOrdens.addEventListener("click", (event) => {
      if (event.target === app.dom.popUpRegistroOrdens) {
        limparSugestoes(app.dom.listaSugestoes1);
        limparSugestoes(app.dom.listaSugestoes2);
      }
      app.modal.fecharFora(event, app.dom.popUpRegistroOrdens);
    });
    app.dom.btnSaidaVenda.addEventListener("click", (event) => {
      event.preventDefault();
      limparSugestoes(app.dom.listaSugestoes3);
      limparSugestoes(app.dom.listaSugestoes4);
      app.modal.abrirModal(app.dom.popupSaida);
    });
    app.dom.btnFecharOrdem3.addEventListener("click", () => {
      limparSugestoes(app.dom.listaSugestoes3);
      limparSugestoes(app.dom.listaSugestoes4);
      app.modal.fecharModal(app.dom.popupSaida);
    });
    app.dom.popupSaida.addEventListener("click", (event) => {
      if (event.target === app.dom.popupSaida) {
        limparSugestoes(app.dom.listaSugestoes3);
        limparSugestoes(app.dom.listaSugestoes4);
      }
      app.modal.fecharFora(event, app.dom.popupSaida);
    });
    app.dom.codigoProdutoEntrada.addEventListener("input", atualizarSugestoesCodigoEntrada);
    app.dom.codigoProdutoEntrada.addEventListener("focus", atualizarSugestoesCodigoEntrada);
    app.dom.nomeProdutoEntrada.addEventListener("input", atualizarSugestoesNomeEntrada);
    app.dom.nomeProdutoEntrada.addEventListener("focus", atualizarSugestoesNomeEntrada);
    app.dom.codigoProdutoSaida.addEventListener("input", atualizarSugestoesCodigoSaida);
    app.dom.codigoProdutoSaida.addEventListener("focus", atualizarSugestoesCodigoSaida);
    app.dom.nomeProdutoSaida.addEventListener("input", atualizarSugestoesNomeSaida);
    app.dom.nomeProdutoSaida.addEventListener("focus", atualizarSugestoesNomeSaida);
    registrarFechamentoPorBlur(app.dom.codigoProdutoEntrada, app.dom.listaSugestoes1);
    registrarFechamentoPorBlur(app.dom.nomeProdutoEntrada, app.dom.listaSugestoes2);
    registrarFechamentoPorBlur(app.dom.codigoProdutoSaida, app.dom.listaSugestoes3);
    registrarFechamentoPorBlur(app.dom.nomeProdutoSaida, app.dom.listaSugestoes4);
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
    app.dom.formEditarOrdem.addEventListener("submit", (event) => {
      event.preventDefault();
      salvarOrdemEditada();
    });
    app.dom.pesquisarEditarOrdem.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      pesquisarOrdemEditar();
    });
    app.dom.btnCarregarListaEditar.addEventListener("click", exibirLista);
    app.dom.btnRemoverOrdem.addEventListener("click", removerOrdem);
    app.dom.btnInicioEditarOrdens.addEventListener("click", () => {
      paginaEditarOrdensAtual = 1;
      renderizarPaginaEditarOrdens();
    });
    app.dom.btnVoltarEditarOrdens.addEventListener("click", () => {
      if (paginaEditarOrdensAtual > 1) {
        paginaEditarOrdensAtual -= 1;
        renderizarPaginaEditarOrdens();
      }
    });
    app.dom.btnProximaEditarOrdens.addEventListener("click", () => {
      if (paginaEditarOrdensAtual < getTotalPaginasEditarOrdens()) {
        paginaEditarOrdensAtual += 1;
        renderizarPaginaEditarOrdens();
      }
    });
    app.dom.btnUltimoEditarOrdens.addEventListener("click", () => {
      paginaEditarOrdensAtual = getTotalPaginasEditarOrdens();
      renderizarPaginaEditarOrdens();
    });
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
    app.dom.btnAplicarFiltroOrdem.addEventListener("click", filtrarOrdens);
    app.dom.btnLimparFiltroOrdem.addEventListener("click", () => {
      app.dom.filtroOrdem.value = "";
      app.dom.paragrafoErroBuscar.textContent = "";
      app.state.paginacaoOrdens.setDados(app.state.arrayOrdens);
      atualizarVisibilidadeBotoesFiltroOrdem();
    });
    app.dom.filtroOrdem.addEventListener(
      "change",
      atualizarVisibilidadeBotoesFiltroOrdem
    );

    app.dom.btnEditarOrdemEditar.hidden = true;
    app.dom.marcarTudoBtn.hidden = true;
    app.dom.marcarTudoBtn.textContent = "Marcar Tudo";
    atualizarBotoesPaginacaoEditarOrdens();
    limparTodasSugestoesOrdens();

    atualizarVisibilidadeBotoesFiltroOrdem();
  }

  // Mostra ou esconde os botoes de filtro conforme o select de ordens recebe valor.
  function atualizarVisibilidadeBotoesFiltroOrdem() {
    const mostrar = Boolean(app.dom.filtroOrdem.value);
    app.dom.btnAplicarFiltroOrdem.hidden = !mostrar;
    app.dom.btnLimparFiltroOrdem.hidden = !mostrar;
  }

  // Aplica o filtro ou a ordenacao escolhida no painel de ordens.
  function filtrarOrdens() {
    const valorFiltro = app.dom.filtroOrdem.value;
    if (!valorFiltro) return;

    app.dom.paragrafoErroBuscar.textContent = "";

    const compararTexto = (a, b) =>
      String(a ?? "").localeCompare(String(b ?? ""), "pt-BR", {
        sensitivity: "base",
      });
    const compararNumero = (a, b) => Number(a ?? 0) - Number(b ?? 0);

    let resultados = [...app.state.arrayOrdens];

    if (valorFiltro === "cliente_az") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "saida")
        .sort((a, b) => compararTexto(a.pessoa, b.pessoa));
    } else if (valorFiltro === "cliente_za") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "saida")
        .sort((a, b) => compararTexto(b.pessoa, a.pessoa));
    } else if (valorFiltro === "fornecedor_az") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "entrada")
        .sort((a, b) => compararTexto(a.pessoa, b.pessoa));
    } else if (valorFiltro === "fornecedor_za") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "entrada")
        .sort((a, b) => compararTexto(b.pessoa, a.pessoa));
    } else if (valorFiltro === "codigo_az_ordem") {
      resultados.sort((a, b) => compararTexto(a.codigoProduto, b.codigoProduto));
    } else if (valorFiltro === "codigo_za_ordem") {
      resultados.sort((a, b) => compararTexto(b.codigoProduto, a.codigoProduto));
    } else if (valorFiltro === "produto_az_ordem") {
      resultados.sort((a, b) => compararTexto(a.produto, b.produto));
    } else if (valorFiltro === "produto_za_ordem") {
      resultados.sort((a, b) => compararTexto(b.produto, a.produto));
    } else if (valorFiltro === "quantidade_crescente_ordem-ent") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "entrada")
        .sort((a, b) => compararNumero(a.quantidade, b.quantidade));
    } else if (valorFiltro === "quantidade_decrescente_ordem-ent") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "entrada")
        .sort((a, b) => compararNumero(b.quantidade, a.quantidade));
    } else if (valorFiltro === "quantidade_crescente_ordem-sai") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "saida")
        .sort((a, b) => compararNumero(a.quantidade, b.quantidade));
    } else if (valorFiltro === "quantidade_decrescente_ordem-sai") {
      resultados = resultados
        .filter((ordem) => ordem.tipo === "saida")
        .sort((a, b) => compararNumero(b.quantidade, a.quantidade));
    }

    if (resultados.length === 0) {
      app.dom.paragrafoErroBuscar.textContent =
        "Nenhuma ordem encontrada para o filtro selecionado.";
    }

    app.state.paginacaoOrdens.setDados(resultados);
  }

  app.orders = {
    bindEvents,
    exibirLista,
  };
})(window.StockPro = window.StockPro || {});

(function initializeOrdersPage(app) {
  function configurarPaginacaoOrdens() {
    app.state.paginacaoOrdens = app.pagination.criarPaginacao({
      listaInicial: app.state.arrayOrdens,
      limite: app.pagination.LIMITE_ITENS_POR_PAGINA,
      render(listaPagina) {
        app.render.renderOrdens(listaPagina);
      },
      botoes: {
        inicio: app.dom.btnInicioPagOrdem,
        voltar: app.dom.btnVoltarPagOrdem,
        proximo: app.dom.btnProximaPaginaOrdem,
        ultimo: app.dom.btnUltimaPagOrdem,
      },
    });
  }

  function configurarBotaoPesquisaOrdens() {
    const botoesPesquisa = document.querySelectorAll(".btnPesquisar");

    for (let i = 0; i < botoesPesquisa.length; i += 1) {
      botoesPesquisa[i].addEventListener("click", (event) => {
        event.preventDefault();
        app.dom.procurarOrdens.focus();
        app.dom.procurarOrdens.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            bubbles: true,
            cancelable: true,
          })
        );
      });
    }
  }

  async function iniciarPaginaOrdens() {
    await app.storage.carregarEstado();
    configurarPaginacaoOrdens();
    app.orders.bindEvents();
    configurarBotaoPesquisaOrdens();

    const erroStorage = app.storage.getUltimoErro();
    if (erroStorage) {
      app.dom.paragrafoErroBuscar.textContent = erroStorage;
    }
  }

  iniciarPaginaOrdens();
})(window.StockPro = window.StockPro || {});

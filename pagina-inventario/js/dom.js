"use strict";

(function initializeDom(app) {
  app.dom = {
    // Botoes principais do topo do inventario.
    btnCategoria: document.getElementById("categoria"), // Botao que abre o painel de categorias.
    registrar: document.getElementById("registro"), // Botao que abre o formulario principal de cadastro.
    ordens: document.getElementById("ordens"), // Botao que abre o painel de ordens.

    // Controles da listagem principal de produtos.
    pesquisar: document.getElementById("buscar"), // Campo de busca do inventario.
    paragrafoErrBusca: document.getElementById("paragrafo_busca"), // Area que mostra erros da busca principal.
    tabela: document.getElementById("tabela-produtos"), // Tabela inteira onde os produtos sao exibidos.
    corpoTabela: document.getElementById("corpo-tabela"), // Corpo da tabela onde as linhas de produto sao montadas.
    filtroOpcoes: document.getElementById("filtro-opcoes"), // Select com os tipos de filtro e ordenacao.
    btnAplicarFiltro: document.getElementById("aplicar_filtro"), // Botao que confirma o filtro escolhido.
    btnLimparFiltro: document.getElementById("limpar_filtro"), // Botao que remove o filtro aplicado.
    btnRecarregarLista: document.getElementById("recarregar_lista"), // Botao que restaura a lista completa de produtos.
    btnInicio: document.getElementById("inicio-inventario"), // Botao para ir para a primeira pagina do inventario.
    btnVoltar: document.getElementById("voltar-inventario"), // Botao para voltar uma pagina no inventario.
    btnProximaPagina: document.getElementById("proximo-inventario"), // Botao para avancar uma pagina no inventario.
    btnUltimo: document.getElementById("ultimo-inventario"), // Botao para ir para a ultima pagina do inventario.

    // Modal e controles de categorias.
    abrirPopUpCategoria: document.getElementById("popup-categorias"), // Container externo do modal de categorias.
    btnFecharCategoria: document.getElementById("btn-fechar-categorias"), // Botao que fecha o modal de categorias.
    inputCategoria: document.getElementById("nova-categoria"), // Campo para cadastrar uma nova categoria.
    selcionarCategoria: document.getElementById("select_categoria"), // Select usado no cadastro de produto para associar categoria.
    listaCategorias: document.getElementById("lista-categorias"), // Area onde as categorias sao renderizadas.
    paragrafoErroCate: document.getElementById("erro_categoria"), // Area de erro e feedback do modulo de categorias.
    formCategorias: document.getElementById("form-categorias"), // Formulario de criacao de categoria.
    btnSalvarCategoria: document.getElementById("adicionar-categoria"), // Botao que salva uma categoria nova.
    btnEditarCategoria: document.getElementById("editar-categorias"), // Botao que alterna o modo de edicao de categorias.
    textoEdCat: document.getElementById("texto-ed-cat"), // Painel auxiliar que mostra acoes de editar ou excluir categorias.
    btnExcluirCat: document.getElementById("excluir-cat"), // Botao que alterna o modo de exclusao de categorias.
    btnInicioCategorias: document.getElementById("inicio-categorias"), // Botao para a primeira pagina da lista de categorias.
    btnVoltarCategorias: document.getElementById("voltar-categorias"), // Botao para voltar pagina nas categorias.
    btnProximaCategorias: document.getElementById("proximo-categorias"), // Botao para avancar pagina nas categorias.
    btnUltimoCategorias: document.getElementById("ultimo-categorias"), // Botao para a ultima pagina da lista de categorias.

    // Modal e formulario do registro principal de produtos.
    popup: document.getElementById("popup"), // Container externo do modal de cadastro de produto.
    botaoFecharPopUp: document.getElementById("btn-fechar"), // Botao que fecha o modal de cadastro.
    form: document.getElementById("formulario"), // Formulario principal de cadastro do produto.
    codigo: document.getElementById("codigo"), // Campo do codigo do produto.
    nome: document.getElementById("nome-produto"), // Campo do nome do produto.
    quantidade: document.getElementById("quantidade"), // Campo da quantidade inicial em estoque.
    paragrafoErroRegistro: document.getElementById("erro-registro"), // Area que mostra erros de validacao do cadastro.
    ES: document.getElementById("ES"), // Campo do estoque de seguranca usado no ponto de reposicao.
    consumoMes: document.getElementById("consumo-mes"), // Campo do consumo medio mensal.
    consumo: document.getElementById("consumo"), // Campo do consumo medio diario.
    prazoEntrega: document.getElementById("prazo-entrega"), // Campo do prazo de entrega em dias.
    btnEdtRegistro: document.getElementById("editar-re"), // Botao do fluxo de editar registro principal.
    btnExcRegistro: document.getElementById("excluir-reg"), // Botao do fluxo de excluir registro principal.
    procurarRegistro: document.getElementById("procurar-edit"), // Campo de busca do fluxo de editar registro principal.
    errBuscaReg: document.getElementById("errBuscaEdtReg"), // Area de erro da busca usada para editar o registro principal.
    popupEdtRegistro: document.getElementById("popup-edt-reg"), // Container externo do modal de editar registro.
    btnFecharPopUpEdtRegistro: document.getElementById("btn-fechar-edt-reg"), // Botao que fecha o modal de editar registro.
    listaEdtRegistro: document.getElementById("lista-edt"), // Lista clicavel com os produtos encontrados na busca de edicao.
    painelEdtRegistro: document.getElementById("edt-reg"), // Painel interno onde os dados do produto selecionado sao alterados.
    inputNovoCodRegistro: document.getElementById("novo-cod"), // Campo do novo codigo do produto em edicao.
    inputNovoNomeRegistro: document.getElementById("novo-nome"), // Campo do novo nome do produto em edicao.
    inputNovaQtdRegistro: document.getElementById("nova-qtd"), // Campo da nova quantidade do produto em edicao.
    inputNovoPtRepRegistro: document.getElementById("novo-pt-rep"), // Campo do estoque de seguranca usado na nova conta de ponto de reposicao.
    inputNovoConsumoMesRegistro: document.getElementById("novo-consumo-mes"), // Campo do consumo medio mensal na edicao.
    inputNovoConsumoDiarioRegistro: document.getElementById("novo-consumo-diario"), // Campo do consumo medio diario na edicao.
    inputNovoPrazoEntregaRegistro: document.getElementById("novo-prazo-entrega"), // Campo do prazo de entrega na edicao.
    erroSalvarEdtRegistro: document.getElementById("erro-salvar-edt-reg"), // Area de erro do painel interno de editar registro.
    btnSalvarEdtRegistro: document.getElementById("salvar-edt-reg"), // Botao que salva a substituicao do registro antigo pelo novo.

    // Painel principal de ordens.
    abrirPainelOrdens: document.getElementById("popup_ordens"), // Container externo do painel de ordens.
    btnFecharOrdem: document.getElementById("btnFechar_ordens"), // Botao que fecha o painel de ordens.
    procurarOrdens: document.getElementById("buscar_ordens"), // Campo de busca da tabela de ordens.
    paragrafoErroBuscar: document.getElementById("paragrafo_buscar_ordens"), // Area de erro da busca de ordens.
    atualizarTabelaOrdens: document.getElementById("todas_ordens"), // Botao que restaura a listagem completa de ordens.
    btnCompraEntrada: document.getElementById("compra_entrada"), // Botao que abre o modal de ordem de entrada.
    btnSaidaVenda: document.getElementById("saida_venda"), // Botao que abre o modal de ordem de saida.
    tabelaOrdens: document.getElementById("tabela_ordens"), // Tabela principal de ordens.
    tabelaCorpoOrdens: document.getElementById("corpo_tabela_ordens"), // Corpo da tabela onde as ordens sao desenhadas.
    btnInicioPagOrdem: document.getElementById("inicio-ordens"), // Botao para a primeira pagina das ordens.
    btnVoltarPagOrdem: document.getElementById("voltar-ordens"), // Botao para voltar uma pagina nas ordens.
    btnProximaPaginaOrdem: document.getElementById("proximo-ordens"), // Botao para avancar uma pagina nas ordens.
    btnUltimaPagOrdem: document.getElementById("ultimo-ordens"), // Botao para a ultima pagina da lista de ordens.
    filtroOrdem: document.getElementById("filtro-opcoes-ordem"), // Select com os tipos de filtro e ordenacao das ordens.
    btnAplicarFiltroOrdem: document.getElementById("aplicar_filtro_ordem"), // Botao que confirma o filtro escolhido nas ordens.
    btnLimparFiltroOrdem: document.getElementById("limpar_filtro_ordem"), // Botao que remove o filtro aplicado nas ordens.
    
    // Modal de ordem de entrada.
    popUpRegistroOrdens: document.getElementById(
      "popup_compra_entrada_saida_venda"
    ), // Container externo do modal de compra ou entrada.
    btnFecharOrdem2: document.getElementById("btnFechar_ordem2"), // Botao que fecha o modal de entrada.
    formOrdemE: document.getElementById("form-ordem-entrada"), // Formulario de cadastro de ordem de entrada.
    codigoProdutoEntrada: document.getElementById("produto_fornecedor"), // Campo do codigo do produto na ordem de entrada.
    listaSugestoes1: document.getElementById("listaSugestoes1"), // Lista de sugestoes abaixo do codigo na ordem de entrada.
    fornecedorEntrada: document.getElementById("fornecedor"), // Campo do fornecedor da ordem de entrada.
    quantidadeEntrada: document.getElementById("inserir_ordemComEnt"), // Campo da quantidade de entrada.
    dataCompra: document.getElementById("data-compra"), // Campo da data da ordem de entrada.
    btnSalvarEntrada: document.getElementById("salvar_ordemComEnt"), // Botao que salva a ordem de entrada.
    nomeProdutoEntrada: document.getElementById("nome_produto_entrada"), // Campo do nome do produto na ordem de entrada.
    listaSugestoes2: document.getElementById("listaSugestoes2"), // Lista de sugestoes abaixo do nome do produto na ordem de entrada.
    paragrafoCodigoProduto: document.getElementById("paragrafo_codigo_produto"), // Area de erro para o codigo no modal de entrada.
    paragrafoFornecedorEntrada: document.getElementById("paragrafo_fornecedor"), // Area de erro para o fornecedor no modal de entrada.
    paragrafoQuantidadeEntrada: document.getElementById(
      "paragrafo_compra_quantidade"
    ), // Area de erro para a quantidade da ordem de entrada.
    paragrafoErroDataCompra: document.getElementById("erro-data"), // Area de erro para a data da ordem de entrada.
    paragrafoNomeProdutoEntrada: document.getElementById(
      "paragrafo_nome_produto_entrada"
    ), // Area de erro para o nome do produto na ordem de entrada.

    // Modal de ordem de saida.
    popupSaida: document.getElementById("popup_saida_venda"), // Container externo do modal de saida ou venda.
    btnFecharOrdem3: document.getElementById("btnFechar_ordem3"), // Botao que fecha o modal de saida.
    formOrdemS: document.getElementById("form-ordem-saida"), // Formulario de cadastro de ordem de saida.
    codigoProdutoSaida: document.getElementById("produto_cliente"), // Campo do codigo do produto na ordem de saida.
    listaSugestoes3: document.getElementById("listaSugestoes3"), // Lista de sugestoes abaixo do codigo na ordem de saida.
    clienteSaida: document.getElementById("cliente"), // Campo do cliente da ordem de saida.
    quantidadeSaida: document.getElementById("inserir_ordemComSai"), // Campo da quantidade de saida.
    dataSaida: document.getElementById("data-saida"), // Campo da data da ordem de saida.
    btnSalvarSaida: document.getElementById("salvar_ordemComSai"), // Botao que salva a ordem de saida.
    nomeProdutoSaida: document.getElementById("nome_produto_saida"), // Campo do nome do produto na ordem de saida.
    listaSugestoes4: document.getElementById("listaSugestoes4"), // Lista de sugestoes abaixo do nome do produto na ordem de saida.
    paragrafoNomeProdutoSaida: document.getElementById(
      "paragrafo_nome_produto_saida"
    ), // Area de erro para o nome do produto na ordem de saida.
    paragrafoCodigoProdutoSaida: document.getElementById(
      "paragrafo_codigo_produto_saida"
    ), // Area de erro para o codigo do produto na ordem de saida.
    paragrafoClienteSaida: document.getElementById("paragrafo_cliente"), // Area de erro para o cliente no modal de saida.
    paragrafoQuantidadeSaida: document.getElementById(
      "paragrafo_saida_quantidade"
    ), // Area de erro para a quantidade na ordem de saida.
    paragrafoErroDataSaida: document.getElementById("erro-data-saida"), // Area de erro para a data da ordem de saida.

    // Painel de busca e edicao de ordens.
    popUpEditarOrdem: document.getElementById("editar_ordem"), // Container externo do painel de editar ordens.
    pesquisarEditarOrdem: document.getElementById("pesquisar_editar_ordem"), // Campo de busca para localizar ordens a editar.
    btnEditarOrdens: document.getElementById("btn_editar_ordem"), // Botao que abre o painel de editar ordens.
    btnFecharEditarOrdem: document.getElementById("btn_fechar_editar_ordem"), // Botao que fecha o painel de editar ordens.
    formPesquisarOrdemEditar: document.getElementById(
      "formulario_pesquisa_editar_ordem"
    ), // Formulario que encapsula a busca de ordens para editar.
    paragrafoErroEditar: document.getElementById("pesquisar_ordem"), // Area de erro geral do fluxo de editar ordens.
    listaEditarOrdens: document.getElementById("lista_editar_ordens"), // Lista onde as ordens encontradas sao montadas com checkbox.
    btnPesquisarOrdem: document.getElementById("btn_buscar_ordens_editar"), // Botao que confirma a busca de ordens.
    btnRemoverOrdem: document.getElementById("remover_ordem"), // Botao que remove as ordens marcadas.
    btnCarregarListaEditar: document.getElementById("carregar_ordens"), // Botao que carrega a lista completa de ordens para edicao.
    btnEditarOrdemEditar: document.getElementById("editar_ordem_editar"), // Botao que abre a ordem selecionada para edicao.
    formEditarOrdem: document.getElementById("form_editar_ordem"), // Formulario interno da edicao de ordem.
    abrirModalEditarOrdem: document.getElementById("editar_ordem_dentro"), // Container do modal interno onde a ordem eh editada.
    inputEditarCodigo: document.getElementById("editar_codigo_produto"), // Campo do codigo do produto na edicao da ordem.
    inputEditarProduto: document.getElementById("editar_nome_produto"), // Campo do nome do produto na edicao da ordem.
    inputEditarFornecedor: document.getElementById("editar_fornecedor"), // Campo do fornecedor na edicao da ordem.
    inputEditarCliente: document.getElementById("editar_cliente"), // Campo do cliente na edicao da ordem.
    inputEditarEntrada: document.getElementById("editar_entrada"), // Campo da quantidade de entrada na edicao.
    inputEditarSaida: document.getElementById("editar_saida"), // Campo da quantidade de saida na edicao.
    inputEditarData: document.getElementById("editar_data"), // Campo da data na edicao da ordem.
    paraagrafoErro1: document.getElementById("erro1"), // Area de erro para o codigo na edicao da ordem.
    paraagrafoErro2: document.getElementById("erro2"), // Area de erro para o nome do produto na edicao da ordem.
    paraagrafoErro3: document.getElementById("erro3"), // Area de erro para o fornecedor na edicao da ordem.
    paraagrafoErro4: document.getElementById("erro4"), // Area de erro para o cliente na edicao da ordem.
    paraagrafoErro5: document.getElementById("erro5"), // Area de erro para quantidade invalida na edicao.
    paraagrafoErro6: document.getElementById("erro6"), // Area de erro para conflitos entre entrada e saida na edicao.
    paragrafoErroDataEdicao: document.getElementById("erro7"), // Area de erro para a data na edicao da ordem.
    btnSalvarEditarOrdem: document.getElementById("salvar_editar_ordem"), // Botao que salva a ordem apos editar.
    btnFecharEditarOrdemDentro: document.getElementById(
      "btn_fechar_editar_ordem_dentro"
    ), // Botao que fecha o modal interno de edicao da ordem.
    marcarTudoBtn: document.getElementById("marcar_tudo"), // Botao que marca ou desmarca todas as ordens da lista de edicao.
  };
})(window.StockPro = window.StockPro || {});

"use strict";

(function initializeState(app) {
  app.state = {
    produtos: [], // Lista principal de produtos carregada e manipulada no inventario.
    categorias: [], // Lista de categorias disponiveis para filtro e cadastro.
    arrayOrdens: [], // Lista de ordens de entrada e saida do estoque.
    ordemSelecionadaIndex: null, // Indice da ordem atualmente selecionada para editar.
    modoEdicaoCategoria: false, // Controla se o painel de categorias esta no modo de renomear.
    modoExclusaoCategoria: false, // Controla se o painel de categorias esta no modo de excluir.
    categoriaSelecionada: null, // Guarda o nome da categoria escolhida no modo de edicao.
    botaoCategoriaSelecionada: null, // Guarda a referencia visual do botao de categoria selecionado.
    paginacaoInventario: null, // Instancia da paginacao usada na tabela principal de produtos.
    paginacaoOrdens: null, // Instancia da paginacao usada na tabela de ordens.
    paginacaoCategorias: null, // Instancia da paginacao usada na lista de categorias.
  };
})(window.StockPro = window.StockPro || {});

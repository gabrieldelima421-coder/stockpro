# StockPro

Sistema web simples para controle de estoque, categorias e ordens de entrada/saida. Criado para portfólio

## Como usar

Abra o arquivo `login/stockpro-login.html` no navegador.

Nao e necessario instalar dependencias, iniciar backend ou configurar banco de dados. Todos os dados sao salvos no `localStorage` do proprio navegador.

## Dados salvos no navegador

O projeto usa estas chaves no `localStorage`:

- `stockpro_usuarios`: usuarios cadastrados no login.
- `stockpro_recuperacoes_senha`: codigos temporarios de recuperacao de senha.
- `stockpro_estado`: produtos, categorias e ordens.

Os dados ficam disponiveis apenas no navegador e no perfil do usuario em que foram criados. Limpar os dados do site no navegador tambem apaga os cadastros.

## Estrutura

- `login/`: tela de login, cadastro e recuperacao de senha.
- `pagina-inventario/`: dashboard, produtos e categorias.
- `pagina-ordens/`: ordens de entrada e saida.

## Observacoes

Como a aplicacao roda somente no navegador, as senhas ficam salvas localmente e nao ha envio real de e-mail. Na recuperacao de senha, o codigo e exibido na tela.

# Extrator de produtos Americanas.com

Este módulo imprime dados de um produto da Americanas.com como um JSON ao receber a URL dele.
É um projeto feito a partir do desafio técnico de um processo seletivo da B2W Digital.

## Observações

- Quando os elementos não possuem classes/ids identificáveis, foi utilizada a estrutura em árvore dos elementos para selecioná-los.
- Como existem produtos com múltiplas fotos, a função pega a primeira.
- O preço utilizado é o preço de venda do produto, e não o original sem desconto.
- Foi encontrando um JSON na página que já fornecia as informações pedidas pelo desafio, mas ele foi ignorado considerando que a tarefa era extrair os dados do código HTML da página.
- O GET para a página da Americanas.com da node-fetch não funcionou (erro de conexão resetada pelo servidor), então utilizei a axios no lugar desta biblioteca.
- Não usei async/await para lidar com a parte assíncrona pois não estava claro qual era a versão esperada de Javascript.

## Origem dos dados
Os dados foram extraidos dos seguintes elementos HTML:

### Id
```
#content section section span:first <!-- texto -->
```

## Breadcrumbs
```
.product-breadcrumb a <!-- cada elemento é um pedaço breadcrumb -->
```

## Nome
```
H1 <!-- texto -->
```

## Imagem
```
.gallery img <!-- atributo src -->
```

## Vendedor
```
.seller-name-container span <!-- texto -->
```

## Preço
```
section:first .sales-price <!-- texto -->
```
# Roteamento



## Rotas dinâmicas

Para utilizar as rotas dinâmicas, basta seguir o pattern de estar em um diretório, seguindo a convenção `[parameter]`.

Por exemplo, tenho uma listagem de produtos e quero acessar uma página específica do produto.

``` title="Estrutura de arquivos"
src/views/
├── Product
│   ├── [id].js
│   └── [id].jsx
└── Products
    ├── Products.js
    └── Products.jsx
```

Onde o id será nosso parâmetro, e para navegar para o produto de id igual a 12345, basta seguir o formato `/(Caminho relativo na view)/:PARAMETRO`, no nosso exemplo a nossa rota será `/Product/:id`

```js title="Chamada no Eitri-App"
Eitri.navigation.navigate({
  path: "/Product/12345",
});
```

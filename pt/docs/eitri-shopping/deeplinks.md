---
status: new
---

# Deeplinks

Deeplinks são links especiais que permitem abrir páginas ou seções específicas dentro do app. Eles seguem um formato padrão e podem incluir informações como qual página abrir e quais detalhes exibir.

Eitri App Shopping vem com uma solução integrada para resolver os deeplinks mais comuns utilizados nos principais sistemas de ecommerce de mercado permitindo ainda personalizar com suas próprias regras, rotas e caminhos.

Existem 2 tipos de deeplinks que serão descritos nesta documentação:

- Deeplinks tradicionais
- Universal links (iOS) ou App Links (Android)

## Requerimentos

Para usar deeplinks com Eitri você vai precisar:

- Um [deeplink resolver addon](https://github.com/eitri-tech/eitri-shopping-addons){:target="_blank"} configurado em seu App Eitri.
- Se você estiver usando o [deeplink resolver padrão](https://github.com/eitri-tech/eitri-shopping-addons-deeplink-resolver?tab=readme-ov-file#ativando-o-deeplink-resolver-padr%C3%A3o-para-vtex){:target="_blank"}, você deverá ter solicitado a ativação à equipe Eitri.
- Se você pretende utilizar Universal Links (iOS) ou App Links (Android) você deve configurar os arquivos well-know conforme explicado nesta documentação.

## Deeplinks tradicionais

Deeplinks tradicionais utilizam um protocolo específico para abrir o app no dispositivo do usuário. 

**Exemplo:**
`myapp://category/female/jeans`


### Estrutura

A estrutura dos deeplinks pode variar de acordo com a finalidade, mas de maneira geral ela contem 3 partes:

`prefixo`://`ação`?`params`


### Ações globais suportadas

Eitri App Shopping suporta as seguintes ações em deeplinks por padrão:

??? note "Abrir Produto"

    ### Abrir Produto

    `prefixo`://product/id/`product_id`
    <br>or<br>
    `prefixo`://product/slug/`product_slug`


    Onde:

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `product_id` = id do produto à ser aberto (você deve usar o id do produto e não sku ou variação)
    <br>
    `product_slug` = slug do produto à ser aberto (você pode obter na url de seu site)

    > VTEX: A URL das páginas de produto em sites Vtex normalmente terminam com "/p". Você precisa remove-lo pois ele não faz parte do slug.

    **Exemplos:**
    ```
    myapp://product/id/348764
    myapp://product/slug/altra-lone-peak-9-trail-running-shoe-mens-10595101
    ```


??? note "Abrir Vitrine (PLP) (Categorias Vtex / Hotsites Wake)"

    ### Abrir Vitrine (PLP)

    `prefixo`://category/`caminho_da_categoria`**?**filter=`filtros`**&**order=`ordenação`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `caminho_da_categoria` = caminho completo para a categirua (exemplo: female/jeans)
    <br>
    `filtros` *(opcional)* = filtros para considerar na exibição da vitrine
    <br>
    `ordenação` *(opcional)* = ordem para exibição dos itens

    **Opções de ordenação:**

    OrderByPriceDESC:  Preço mais ALTO primeiro
    <br>
    OrderByPriceASC:  Preço mais BAIXO primeiro
    <br>
    OrderByTopSaleDESC:  Mais vendidos primeiro
    <br>
    OrderByReviewRateDESC:  Melhores avaliações primeiro
    <br>
    OrderByNameDESC:  Ordem alfabética de Z-A
    <br>
    OrderByNameASC:  Ordem alfabética de A-Z
    <br>
    OrderByReleaseDateDESC:  Mais recentes primeiro
    <br>
    OrderByBestDiscountDESC:  Melhores descontos primeiro
    <br>
    OrderByScoreDESC: Melhor pontuação primeiro

    > ATENÇÃO: Recomendamos que você faça um uri encode nos filtros para garantir que os caracteres especiais e espaços serão lidos corretamente. Exemplo: "{"cor": "preta"}" deve ser enviado como "%7B%22cor%22%3A%20%22preta%22%7D". Para encodar conteúdos você pode utilizar uma biblioteca ou website como o [urlencoder.org](https://www.urlencoder.org/pt/){:target="_blank"}

    **Exemplos:**
    ```
    myapp://category/male
    myapp://category/female/jeans
    myapp://category/kids/clothes/pants?filters=%7B%22cor%22%3A%20%22preta%22%7D&order=OrderByNameASC
    ```



??? note "Abrir Busca"

    ### Abrir Busca

    `prefixo`://search/`termo_buscado`**?**filter=`filtros`**&**order=`ordenação`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `termo_buscado` = termo(s) que será buscado(s)
    <br>
    `filtros` *(opcional)* = filtros para considerar na exibição da vitrine
    <br>
    `ordenação` *(opcional)* = ordem para exibição dos itens

    **Opções de ordenação:**

    OrderByPriceDESC:  Preço mais ALTO primeiro
    <br>
    OrderByPriceASC:  Preço mais BAIXO primeiro
    <br>
    OrderByTopSaleDESC:  Mais vendidos primeiro
    <br>
    OrderByReviewRateDESC:  Melhores avaliações primeiro
    <br>
    OrderByNameDESC:  Ordem alfabética de Z-A
    <br>
    OrderByNameASC:  Ordem alfabética de A-Z
    <br>
    OrderByReleaseDateDESC:  Mais recentes primeiro
    <br>
    OrderByBestDiscountDESC:  Melhores descontos primeiro
    <br>
    OrderByScoreDESC: Melhor pontuação primeiro

    > ATENÇÃO: Recomendamos que você faça um uri encode nos termos buscados e nos filtros para garantir que os caracteres especiais e espaços serão lidos corretamente. Exemplo: "jeans masculino" deve ser enviado como "jeans%20masculino". Para encodar conteúdos você pode utilizar uma biblioteca ou website como o [urlencoder.org](https://www.urlencoder.org/pt/){:target="_blank"}

    **Exemplos:**
    ```
    myapp://search/shirts
    myapp://search/leather%20jackets
    myapp://search/kids%eletronic%20toys?filter=%7B%22age%22%3A%20%2210-12%22%7D&order=OrderByReleaseDateDESC
    ```



??? note "Abrir Carrinho"

    ### Abrir Carrinho

    `prefixo`://cart/`cart_id`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `cart_id` *(opcional)* = id de um carrinho específico. Quando utilizado, carrega um carrinho específico ao invés do carrinho atual do usuário.

    > ATENÇÃO: Ao usar um cart_id o carrinho atual do usuário poderá ser substituido pelo carrinho que será aberto **SOBRESCREVENDO** os itens anteriores.

    **Exemplos:**
    ```
    myapp://cart
    myapp://cart/364265434904
    ```


??? note "Abrir Perfil"

    ### Abrir Perfil
    
    `prefixo`://account

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app

    **Exemplos:**
    ```
    myapp://account
    ```

??? note "Abrir Home"

    ### Abrir Home

    `prefixo`://home

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app

    **Exemplos:**
    ```
    myapp://home
    ```

??? note "Abrir Browser/URL"

    ### Abrir Browser/URL

    `prefixo`://webview/inapp/`url`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `url` = endereço a ser aberto
    <br>
    `inapp` *(optional)* = se utilizado, irá abrir a URL dentro da webview interna do app ao invés de chamar um browser externo

    > Recomandamos que você use encode uri na URL para garantir que caracteres especiais sejam lidos corretamente. Exemplo: "https://www.mywebsite.com.br/male/shirts" deve ser passado como "https%3A%2F%2Fwww.mywebsite.com.br%2Fmale%2Fshirts". Para encodar conteúdos você pode utilizar uma biblioteca ou website como o [urlencoder.org](https://www.urlencoder.org/pt/){:target="_blank"}

    **Exemplos:**
    ```
    myapp://webview/https%3A%2F%2Fwww.mywebsite.com.br%2terms
    myapp://webview/inapp/https%3A%2F%2Fwww.mywebsite.com.br%2privacy
    ```

### Ações exclusivas Vtex

??? note "Abrir Coleção"

    ### Abrir Coleção

    `prefixo`://collection**?**filter=`collection_id`**&**O=`order`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `collection_id` = id numérico da coleção
    <br>
    `order` = ordem para exibição dos itens

    **Order options:**

    OrderByPriceDESC:  Preço mais alto primeiro
    <br>
    OrderByPriceASC:  Menor preço primeiro
    <br>
    OrderByTopSaleDESC:  Mais vendidos primeiro
    <br>
    OrderByReviewRateDESC:  Melhores avaliações primeiro
    <br>
    OrderByNameDESC:  Ordem alfabética de Z-A
    <br>
    OrderByNameASC:  Ordem alfabética de A-Z
    <br>
    OrderByReleaseDateDESC:  Mais recentes primeiro
    <br>
    OrderByBestDiscountDESC:  Melhores descontos primeiro
    <br>
    OrderByScoreDESC: Melhor pontuação primeiro

    **Exemplos:**
    ```
    myapp://collection?filter=55678&O=OrderByPriceASC
    myapp://collection?filter=55739&O=OrderByBestDiscountDESC
    ```


## App Link (Android) / Universal Link (iOS)

Precisam de uma configuração específica no seu website para ser vinculado ao seu domínio. Uma vez configurado, usuários que tem o aplicativo instalado no dispositivo serão redirecionados do website diretamente para o app na respectiva página.

Você precisará configurar seu website para ter 2 arquivos hospedados em caminhos específicos para Android e iOS. Estes arquivos serão fornecidos pela Eitri.

Na maioria dos casos você precisará abrir um ticket para seu sistema de e-commerce solicitando a criação/atualização destes arquivos.

### [:simple-android: App Link (Android)](https://developer.android.com/training/app-links){:target="_blank"}
**Caminho do arquivo:**

`https://www.mywebsite.com/.well-known/assetlinks.json`

**Exemplo do arquivo:**
```json
[{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target" : { 
        "namespace": "android_app", 
        "package_name": "app_bundle_id",
        "sha256_cert_fingerprints": ["app_bundle_fingerprint"] 
    }
}]
```

**Onde:**

`app_bundle_id` é o nome do bundle de seu app, utilizado na loja Google Play.

> Exemplo: com.myapp.store

`app_bundle_fingerprint` é o fingerprint sha256 fornecido para seu app.

> Exemplo: F8:57:A0:0C:AB:8B:B2:59:92:F7:3D:1D:38:6C:05:17:A8:3F:B1:19:B5:E7:05:5F:ED:B5:B8:27:EA:0C:E3:57


### [:simple-apple: Universal Link (iOS)](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app){:target="_blank"}

**Caminho do arquivo:** `https://www.mywebsite.com/.well-known/apple-app-site-association`

**Exemplo do arquivo:**
```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "app_bundle_id",
        "paths": [
          "*"
        ]
      }
    ]
  }
}
```

**Onde:**

`app_bundle_id` é o nome do bundle de seu app, utilizado na loja Apple App Store.

> Exemplo: com.myapp.store

`paths` são os padrões de url que você deseja redirecionar para o app

> Exemplo: "*/p" direciona todas as urls que terminem com "/p" para o app pois em geral são links de páginas de produto.



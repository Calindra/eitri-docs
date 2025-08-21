---
status: new
---

# Deeplinks

Deeplinks são links especiais que permitem abrir páginas ou seções específicas dentro do app. Eles seguem um formato padrão e podem incluir informações como qual página abrir e quais detalhes exibir.

Eitri App Shopping vem com uma solução integrada para resolver os deeplinks mais comuns utilizados nos principais sistemas de ecommerce de mercado permitindo ainda personalizar com suas próprias regras, rotas e caminhos.

Existem 2 tipos de deeplinks:

## Deeplinks tradicionais

Deeplinks tradicionais utilizam um protocolo específico para abrir o app no dispositivo do usuário. 

**Exemplo:**
`myapp://category/female/jeans`

## Universal Link (iOS) / App Link (Android)

Precisam de uma configuração específica no seu website para ser vinculado ao seu domínio. Uma vez configurado, usuários que tem o aplicativo instalado no dispositivo serão redirecionados do website diretamente para o app na respectiva página.


**Exemplo:**
`https://www.mywebsite.com.br/female/jeans`

[:simple-apple: Universal Link (iOS)](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app){:target="_blank"}

[:simple-android: App Link (Android)](https://developer.android.com/training/app-links){:target="_blank"}


## Requerimentos

Para usar deeplinks com Eitri você vai precisar:

- Um [deeplink resolver addon](https://github.com/eitri-tech/eitri-shopping-addons){:target="_blank"} configurado em seu App Eitri.
- Se você estiver usando o [deeplink resolver padrão](https://github.com/eitri-tech/eitri-shopping-addons-deeplink-resolver?tab=readme-ov-file#ativando-o-deeplink-resolver-padr%C3%A3o-para-vtex){:target="_blank"}, você deverá ter solicitado a ativação à equipe Eitri.
- Se você pretende utilizar Universal Links (iOS) ou App Links (Android) você deve configurar os arquivos well-know conforme explicado [aqui](#universal-link-ios--app-link-android){:target="_blank"}


## Estrutura

A estrutura dos deeplinks pode variar de acordo com a finalidade, mas de maneira geral ela contem 3 partes:

`prefixo`://`ação`/`params`


## Ações suportadas

Eitri App Shopping suporta as seguintes ações em deeplinks por padrão:

??? note "Abrir Produto"

    ### Abrir Produto

    `prefixo`://product/id/`product_id`
    <br>or<br>
    `prefixo`://product/slug/`product_slug`


    Onde:

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `product_id` = id do produto à ser aberto (você deve usar o id do produto e não do sku)
    <br>
    `product_slug` = slug do produto à ser aberto (você pode obter do seu site vtex)

    > A URL das páginas de produto em sites Vtex normalmente terminam com "/p". Você precisa remove-lo pois ele não faz parte do slug.

    **Exemplos:**
    ```
    myapp://product/id/348764
    myapp://product/slug/altra-lone-peak-9-trail-running-shoe-mens-10595101
    ```


??? note "Abrir Categoria"

    ### Abrir Categoria

    `prefixo`://category/`caminho_da_categoria`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `caminho_da_categoria` = caminho completo para a categirua (exemplo: female/jeans)

    **Exemplos:**
    ```
    myapp://category/male
    myapp://category/female/jeans
    myapp://category/kids/clothes/pants
    ```

??? note "Abrir Busca"

    ### Abrir Busca

    `prefixo`://search/`termo_buscado`

    **Onde:**

    `prefixo` = prefixo utilizado pelo seu app
    <br>
    `termo_buscado` = termo(s) que será buscado(s)

    > Recomendamos que você faça um uri encode no conteúdo da busca para garantir que os caracteres especiais e espaços serão lidos corretamente. Exemplo: "jeans masculino" deve ser enviado como "jeans%20masculino".

    **Exemplos:**
    ```
    myapp://search/shirts
    myapp://search/leather%20jackets
    myapp://search/kids%eletronic%20toys
    ```


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
    OrderByNameDESC:  Z-A
    <br>
    OrderByNameASC:  A-Z
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

<!--
??? note "Abrir Marca"

    ### Abrir Marca

    Marca


??? note "Abrir Carrinho"

    ### Abrir Carrinho

    Carrinho


??? note "Abrir Perfil"

    ### Abrir Perfil
    
    Perfil

??? note "Abrir Home"

    ### Abrir Home

    Home

-->


??? note "Abrir Browser/URL"

    ### Abrir Browser/URL

    `prefixo`://webview/inapp/`url`

    **Onde:**

    `url` = prefixo utilizado pelo seu app
    <br>
    'inapp' (optional) = se utilizado, irá abrir a URL dentro da webview interna do app

    > Recomandamos que você use encode uri na URL para garantir que caracteres especiais sejam lidos corretamente. Exemplo: "https://www.mywebsite.com.br/male/shirts" deve ser passado como "https%3A%2F%2Fwww.mywebsite.com.br%2Fmale%2Fshirts".

    **Exemplos:**
    ```
    myapp://webview/https%3A%2F%2Fwww.mywebsite.com.br%2Fmale%2Fshirts
    ```


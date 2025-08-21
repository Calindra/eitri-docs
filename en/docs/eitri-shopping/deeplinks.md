---
status: new
---

# Deeplinks

Deeplinks are special links to open specific pages or sections inside your app. They follow a pattern and can include information about wich page to open and wich details to show up or load.

Eitri App Shopping comes from out of box with an integrated solution to resolve most common deeplinks used in main ecommerce providers but letting you setup your customized rules, routes and paths.

There are two types of deeplinks:

## Traditional deeplinks

Deeplinks that use an specific opening protocol to open your app in user's device.

**Example:**
`myapp://category/female/jeans`

## Universal Link (iOS) / App Link (Android)

They need an specific setup in your website to be bound to your domain. Once it's configured, users that have your app installed will be redirected from web site pages directly to your app in respective app pages.


**Example:**
`https://www.mywebsite.com.br/female/jeans`

[:simple-apple: Universal Link (iOS)](https://developer.apple.com/documentation/xcode/supporting-universal-links-in-your-app){:target="_blank"}

[:simple-android: App Link (Android)](https://developer.android.com/training/app-links){:target="_blank"}


## Requirements

To use deeplinks with Eitri you will need:

- A [deeplink resolver addon](https://github.com/eitri-tech/eitri-shopping-addons) setup ready in you Eitri App.
- If you are using [default deeplink resolver](https://github.com/eitri-tech/eitri-shopping-addons-deeplink-resolver?tab=readme-ov-file#ativando-o-deeplink-resolver-padr%C3%A3o-para-vtex), you need to ask for activation to Eitri team.
- If you plan to use Universal Links (iOS) or App Links (Android) you need to setup your website well-know files as explained [here](#universal-link-ios--app-link-android).


## Structure

Deeplinks may have different structures based on what they do but they have basically 3 main parts:

`prefix`://`action`/`params`


## Supported actions

Eitri App Shopping supports the following a lot of actions for deeplinks by default:

??? note "Open Product"

    ### Open Product

    `prefix`://product/id/`product_id`
    <br>or<br>
    `prefix`://product/slug/`product_slug`


    Where:

    `prefix` = prefix used for your app
    <br>
    `product_id` = product id to open (you should use product id, not sku id)
    <br>
    `product_slug` = product slug to open (you can get it from your vtex website for example)

    > Vtex website product pages usually ends with "/p". You need to remove it since it's not part of product slug.

    **Examples:**
    ```
    myapp://product/id/348764
    myapp://product/slug/altra-lone-peak-9-trail-running-shoe-mens-10595101
    ```


??? note "Open Category"

    ### Open Category

    `prefix`://category/`path_to_category`

    **Where:**

    `prefix` = prefix used for your app
    <br>
    `path_to_category` = full path to category (like: female/jeans)

    **Examples:**
    ```
    myapp://category/male
    myapp://category/female/jeans
    myapp://category/kids/clothes/pants
    ```

??? note "Open Search"

    ### Open Search

    `prefix`://search/`term_to_search`

    **Where:**

    `prefix` = prefix used for your app
    <br>
    `term_to_search` = term(s) to search

    > We recommend that you uri encode the search content to ensure your special characters and spaces are correctly readed. Example: "male jeans" should be passed as "male%20jeans".

    **Examples:**
    ```
    myapp://search/shirts
    myapp://search/leather%20jackets
    myapp://search/kids%eletronic%20toys
    ```


??? note "Open Collection"

    ### Open Collection

    `prefix`://collection**?**filter=`collection_id`**&**O=`order`

    **Where:**

    `prefix` = prefix used for your app
    <br>
    `collection_id` = numeric id to collection
    <br>
    `order` = order used to show items from collection

    **Order options:**

    OrderByPriceDESC:  Higher price first
    <br>
    OrderByPriceASC:  Lower price first
    <br>
    OrderByTopSaleDESC:  Top sales first
    <br>
    OrderByReviewRateDESC:  Better reviews first
    <br>
    OrderByNameDESC:  Z-A
    <br>
    OrderByNameASC:  A-Z
    <br>
    OrderByReleaseDateDESC:  Release date first
    <br>
    OrderByBestDiscountDESC:  Better discount first
    <br>
    OrderByScoreDESC: Better score first

    **Examples:**
    ```
    myapp://collection?filter=55678&O=OrderByPriceASC
    myapp://collection?filter=55739&O=OrderByBestDiscountDESC
    ```

<!--
??? note "Open Brand"

    ### Open Brand

    Brand


??? note "Open Cart"

    ### Open Cart

    Cart


??? note "Open Account"

    ### Open Account
    
    Account

??? note "Open Home"

    ### Open Home

    Home

-->


??? note "Open Browser/URL"

    ### Open Browser/URL

    `prefix`://webview/inapp/`url`

    **Where:**

    `url` = prefix used for your app
    <br>
    'inapp' (optional) = if used, it will open the URL inside internal app webview

    > We recommend that you uri encode the URL content to ensure your special characters are correctly readed. Example: "https://www.mywebsite.com.br/male/shirts" should be passed as "https%3A%2F%2Fwww.mywebsite.com.br%2Fmale%2Fshirts".

    **Examples:**
    ```
    myapp://webview/https%3A%2F%2Fwww.mywebsite.com.br%2Fmale%2Fshirts
    ```


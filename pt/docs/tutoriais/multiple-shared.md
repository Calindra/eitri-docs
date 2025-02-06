# Múltiplos Shared Eitri-Apps

Para permitir que desenvolvedores reutilizem soluções em vários dos seus Eitri-Apps, é possível importar um Eitri-App em outro utilizando **Shared Eitri-Apps**. Essa funcionalidade facilita a criação de soluções modulares e compartilháveis.

## Implementação

!!! note
    **Pré-requisitos:**
    
    - CLI versão 1.17.0 ou superior;
    - Eitri-App previamente publicado como **Shared**;
        - No arquivo `eitri-app.conf.js` do Eitri-App Shared, deve constar a propriedade `sharedVersion: "v2"`.

!!! warning
    - Se o seu Shared Eitri-App não foi publicado com a versão v2, continue importando-o da maneira anterior, a partir de `shared-eitri-app`;
    - Ao usar o Shared v2, o Luminus deve seguir o formato padrão, por exemplo: `"eitri-luminus": "1.40"`. Isso garante que o design base será o do Luminus, sendo necessário garantir a compatibilidade entre os Shared Eitri-Apps que utilizam o mesmo.

### Adicionando um Shared Eitri-App

1. Para utilizar Shared Eitri-Apps, adicione-os como dependências no arquivo `eitri-app.conf.js` do Eitri-App em que deseja importar o Shared Eitri-App:

    ```javascript
    'eitri-app-dependencies': {
        'eitri-vtex': {
            version: '0.1.350',
            isEitriAppShared: true
        },
        'ds-components': {
            version: '1.4.18',
            isEitriAppShared: true
        }
    }
    ```

2. Após adicionar as dependências, acesse a tela desejada e realize a importação dos componentes:

    ```javascript
    import { EitriVtex } from 'eitri-vtex';
    import { Button, FavoriteButton, ProductImage } from 'ds-components';
    ```

### Eitri-App Start com Múltiplos Shared Apps

!!! note
    Para desenvolver com mais de um Shared Eitri-App usando `app-start`, alguns ajustes no `app-config.yaml` são necessários. O `alias` deve ter o mesmo nome da dependência (o slug do Shared), e deve-se adicionar o campo `shared: true` no Eitri-App. A CLI e o compilador interpretarão automaticamente quais são os Shared Eitri-Apps a serem utilizados, fazendo os links para as suas versões de desenvolvimento. Veja o exemplo abaixo:

```yaml
application-id: '749d6f6f-f10f-4448-b36e-9c484b1293b8'
eitri-apps:
    - alias: berserk
      path: "./eitriapp-berserk"
      workspace: DEFAULT
      focus: true
      shared: false
    - alias: "my-components-logic"
      path: "./my-components-logic"
      workspace: COMP
      shared: true
    - alias: "my-shared-logic"
      path: "./my-shared-logic"
      workspace: LOGIC
      shared: true
```
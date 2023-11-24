# CI/CD

CI/CD é a abreviação de Continuous Integration/Continuous Delivery, traduzindo para o português: integração e entrega contínuas.

Trata-se de uma prática de desenvolvimento de software que visa tornar a integração de código mais eficiente por meio de builds e testes automatizados.

Com a abordagem CI/CD é possível entregar aplicações com mais frequência aos clientes. Para tanto, regras de automação são aplicadas nas etapas de desenvolvimento de apps.

(Fonte: [RedHat](https://www.redhat.com/pt-br/topics/devops/what-is-ci-cd))

CI/CD são conceitos englobados nas práticas de DevOps e você pode integrar seus repositórios para publicar de maneira contínua e integrada seus Eitri-apps.


## Como configurar?

Existem algumas formas de integrar um repositório à plataforma Eitri para fazer publicações de Eitri-apps de maneira contínua e automatizada. A mais comum delas envolve as seguintes etapas:

## Requisitos mínimos
- Versão mínima da CLI (BETA): 1.4.0-beta.2
- Para instalar: `npm i -g eitri-cli@1.4.0-beta.2`

## Passo-a-passo

### Gerando seu par de chaves

1. Faça o login no [Console Eitri](https://console.eitri.tech/) e acesse o item **Identificação Pessoal (Gerenciando suas credenciais)** clicando em seu nome no canto superior direito

    ![Image title](https://dummyimage.com/600x400/eee/aaa)

2. Clique no botão **Gerar nova credencial** e baixe e/ou copie as chaves;

    ![Image title](https://dummyimage.com/600x400/eee/aaa)

Com este par de chaves você poderá integrar serviços como Github Actions, Bitbucket Pipelines, entre outros.

### Configurando a integração

=== "Github Actions"

    1. Acesse o GitHub vá até o menu de configuração das Settings do projeto Eitri-App;

    2. No menu lateral, no sub-menu Security, acesse a opção Secrets and variables > Actions;

    3. Clique na opção Actions;

    4. Clique em “New repository secret” para adicionar uma nova chave secreta;

    5. No campo “name” insira obrigatoriamente o nome EITRI_CLI_CLIENT_ID e no campo “secret” insira o valor da chave ClientID gerada anteriormente no Console;

    7.  Clique no botão “Add secret” para salvar;

    8.  No campo “name” insira obrigatoriamente o nome EITRI_CLI_CLIENT_SECRET e no campo “secret” insira o valor da chave Chave Secreta gerada anteriormente no Console;

    9.  Clique no botão “Add secret” para salvar;

    10. Agora, vamos configurar o GitHub Actions no projeto Eitri.
    - Abra o projeto Eitri-App;
    - Na raíz do projeto crie a seguinte estrutura de pasta .github/workflows;
    - Dentro de workflows crie o arquivo `<nome_do_pipeline>.yml`;
    - Cole o exemplo da configuração abaixo em seu arquivo recém criado:
    ```
    name: GitHub Actions Eitri-Push-Version
    on: [push]

    env:
    EITRI_CLI_CLIENT_ID: ${{secrets.EITRI_CLI_CLIENT_ID}}
    EITRI_CLI_CLIENT_SECRET: ${{secrets.EITRI_CLI_CLIENT_SECRET}}

    jobs:
    Eitri-Push-Version:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v4
        - run: cd ~
        - run: npm i -g eitri-cli@1.4.0-beta.2
        - run: mkdir -p ~/.eitri/
        - run: eitri workspace use --name CI 
        - run: cd ~
        - run: eitri push-version 
    
    ```


=== "Bitbucket Pipelines"

    Texto


!!! tip
    Recomendamos utilizar o versionamento semântico [semver](https://semver.org/lang/pt-BR/) e [conventional commits](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/) para automatizar tambem a numeração de versões de maneira adequada e cômoda em seu pipeline.

!!! info
    Ao executar o pipeline, uma nova versão será enviada ao Console de forma automática;

!!! warning
    Você deve exportar as variáveis ambientes para que o processo automatizado de push-version funcione corretamente;

!!! warning
    Caso exista uma versão igual a outra publicada anteriormente, um erro será retornado.




## Quanto custa?

Não há custos adicionais no Eitri para configuração ou uso de CI/CD, no entanto, podem haver custos de seu provedor de serviços. Muitos dos principais fornecedores deste tipo de serviço cobram por tempo de execução do pipeline.
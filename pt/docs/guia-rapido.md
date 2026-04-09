# Guia Rápido para o Eitri

Se você quer começar rapidamente a utilizar o Eitri, este guia é para você. Aqui você encontrará os principais comandos e instruções para começar a desenvolver rapidamente usando o [Eitri](https://www.eitri.tech/){:target="_blank"}.


# Requisitos para desenvolver com Eitri

Você precisará do seguinte para desenvolver usando o Eitri:

1. Instalar o [Node](https://nodejs.org/){:target="_blank"} (versão 18 ou superior), o [NPM](https://www.npmjs.com/){:target="_blank"} e [Git](https://git-scm.com/){:target="_blank"} em seu computador
2. Instalar a nossa ferramenta de linha de comando usando o comando `npm install -g eitri-cli`
3. Fazer o login como desenvolvedor com sua conta digitando `eitri login` no terminal e seguindo os passos propostos


# Criando seu primeiro Eitri-App

Agora que você tem sua conta no Eitri configurada e a CLI instalada, é hora de criar seu primeiro projeto. Vamos começar:

1. Na pasta onde deseja criar seu projeto utilize o seguinte comando: `eitri app create <nome_do_projeto>` (Você precisará de permissão como org admin para criar novos apps)
2. Você precisará selecionar um template para usar como base para seu app. Atualmente Eitri suporta apps Vtex, Wake e Shopify.
3. Ao confirmar, será criada uma pasta com o seu projeto. Você pode acessa-la e utilizar o comando  `eitri app start` para iniciar o desenvolvimento
4.  Quando estiver tudo pronto, você receberá um QrCode que deve ser escaneado com o [Eitri Play](../docs/conceitos/eitri-play.md)
5.  As versões de seus Eitri-apps (módulos) podem ser geradas individualmente usando `eitri push-version` dentro da pasta de cada um deles
6.  Após gerar a primeira versão de um Eitri-app é possível publica-las nos ambientes de seu app.

!!! warn
    Para gerar uma versão de um Eitri-app é preciso que as dependencias dele já existam no sistema. Se você tem um eitri-app que depende de outro (como um shared por exemplo), garanta primeiro que a versão do shared foi gerada para satisfazer a dependencia.

!!! info
    Os projetos de Apps Eitri já vem com sugestões de implementação de CI para automatizar o processo de geração de versão e até publicação nos ambientes mas você pode personaliza-las conforme necessário.

# Administrando Eitri-Apps
Para gerenciar a versão publicada, efetuar o rollback para versões anteriores e administrar as permissões de seu Eitri-App, você pode acessar o painel de admin do Eitri, logando com sua conta de desenvolvedor:

- [Eitri Console](https://console.eitri.tech/){:target="_blank"}
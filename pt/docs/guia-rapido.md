# Guia Rápido para o Eitri

Se você quer começar rapidamente a utilizar o Eitri, este guia é para você. Aqui você encontrará os principais comandos e instruções para começar a desenvolver rapidamente usando o [Eitri](https://www.eitri.tech/){:target="_blank"}.


# Requisitos para desenvolver com Eitri

Você precisará do seguinte para desenvolver usando o Eitri:

1. Instalar o [Node](https://nodejs.org/){:target="_blank"} (versão 18 ou superior), o [NPM](https://www.npmjs.com/){:target="_blank"} e [Git](https://git-scm.com/){:target="_blank"} em seu computador
2. Instalar a nossa ferramenta de linha de comando usando o comando `npm install -g eitri-cli`
3. Fazer o login como desenvolvedor com sua conta digitando `eitri login` no terminal e seguindo os passos propostos


# Criando seu primeiro Eitri-App

Agora que você tem sua conta no Eitri configurada e a CLI instalada, é hora de criar seu primeiro projeto. Vamos começar:

1. Na pasta onde deseja criar seu projeto utilize o seguinte comando: `eitri create <nome_do_projeto>`
2. Você precisará fornecer informações como *Aplicação*, *Nome legível*, *Nome para divulgação* e *Nome identificador único*
3. Ao confirmar, será criada uma pasta com o seu projeto. Você pode acessa-la e utilizar o comando  `eitri start` para iniciar o desenvolvimento
4.  O Eitri irá gerar um QrCode que deve ser escaneado com o App de sua organização no qual o Eitri foi integrado
5.  Quando estiver satisfeito com o desenvolvimento de seu Eitri-App você poderá publicar sua primeira versão usando o comando `eitri push-version` dentro da pasta de seu projeto
6.  Após o envio dos arquivos o seu Eitri-App estará disponível para publicação em um ambiente previamente criado para a sua organização

# Administrando Eitri-Apps
Para gerenciar a versão publicada, efetuar o rollback para versões anteriores e administrar as permissões de seu Eitri-App, você pode acessar o painel de admin do Eitri, logando com sua conta de desenvolvedor:

- [Eitri Console](https://console.eitri.tech/){:target="_blank"}
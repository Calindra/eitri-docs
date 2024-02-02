# Eitri CLI

A Eitri CLI é o ponto de partida para desenvolver Eitri-apps. Com ela você pode criar, desenvolver e publicar Eitri-apps para as aplicações de sua organização.

## Requisitos

Para utilizar a Eitri CLI você precisará ter instalado em sua máquina:

* [Node](https://nodejs.org/){:target="_blank"} 18 ou superior
* [NPM](https://www.npmjs.com/){:target="_blank"}
* [Git](https://git-scm.com/){:target="_blank"}


## Instalação

Para instalar a CLI utilize o comando `npm install -g eitri-cli` em seu terminal.

!!! info

    Caso obtenha algum erro de permissão durante a instalação, verifique se o nível de privilégios de seu usuário são adequados/suficientes para realizar esta instalação.

## Atualização

Para atualizar a versão de sua CLI basta utilizar o comando [eitri self-update](#self-update).

## Comandos disponíveis

Você pode utilizar `--help` ou `-h` no final de qualquer comando para saber como utiliza-lo e conhecer suas opções.

Muitas das funções complementares do Eitri estão disponíveis como opções dos comandos principais.

### login

Utilização: `eitri login [options]`

Efetua o login na plataforma Eitri, criando as credenciais de sua conta em sua máquina e vinculando sua ferramenta de linha de comando à sua conta de desenvolvedor Eitri.

!!! info

    A maioria dos demais comandos só podem ser executados após efetuado o login.

### create

Utilização: `eitri create [options] <project-name>`

Cria um novo projeto de Eitri-app em sua máquina e o registra na plataforma Eitri.

Você precisará fornecer algumas informações ao criar um Eitri-app:

`Aplicação`
:   (Aplicação na qual seu Eitri-app irá rodar)

`Nome legível`
:   Nome utilizado na listagem do console. Não é exibido ao cliente final ou ao usuário utilizador do Eitri-app. Este nome é utilizado internamente e não será visualizado pelos usuários.

`Nome para divulgação`
:   Nome do produto, utilizado na divulgação e em pontos de contato com o usuário ou cliente final. Este nome poderá ser visualizado pelos usuários.

`Nome único`
:   Tambem chamado de slug, é o nome utilizado para identificação única do Eitri-app na plataforma Eitri, para encontrar seu Eitri-app, referencia-lo em diversas circunstâncias e tambem na montagem de deeplinks. Este nome não pode ser repetido entre Eitri-apps e não deve conter espaços ou caracteres especiais.

### start

Utilização: `eitri start [options]`

O comando `eitri start` inicializa o Eitri-app para desenvolvimento, gerando um QrCode que deverá ser scaneado com o app de sua organização no qual o Eitri foi integrado.

À medida que você vai desenvolvendo e salvando seus arquivos localmente, seu Eitri-app contará com um hotreload que mostrará em tempo real as alterações na tela de seu aparelho, permitindo que você veja o resultado final de maneira rápida e fácil.

### push-version

Utilização: `eitri push-version [options]`

Envia uma versão de seu Eitri-app para o Console, possibilitando a publicação. Ao executar este comando uma versão de seu Eitri-app será incluída no console e ficará disponível para publicação nos ambientes cadastrados para a aplicação.

!!! info

    Esteja atento à versão de seu Eitri-app (no arquivo eitri-app.conf.js) já que não é possível enviar uma versão já existente no console.

### self-update

Utilização: `eitri self-update [options]`

Atualiza sua versão da Eitri CLI, desinstalando versões anteriores e instalando a versão estável mais recente.

É recomendado manter sempre a versão mais recente da Eitri CLI para garantir o melhor desempenho, compatibilidade, estabilidade e a melhor experiência de desenvolvimento.

### workspace

Utilização: `eitri workspace [options] [command]`

Gerencia e permite a utilização de múltiplos workspaces. Para conhecer tudo que é possível fazer com o comando workspace, utilize `eitri workspace --help`.

### clean

Utilização: `eitri clean [options]`

Realiza uma limpeza em seu workspace remoto. Ao rodar o `eitri start` seu workspace é montado com o código que está em sua máquina e é atualizado automaticamente à medida que você desenvolve e salva seus arquivos. Caso haja algum problema com seu workspace, o comando `eitri clean` pode ajudar a reestabelecer seu workspace.
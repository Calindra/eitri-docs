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

---

### login

:fontawesome-solid-terminal:{ .lg .middle }  `eitri login [opções]`

Efetua o login na plataforma Eitri, criando as credenciais de sua conta em sua máquina e vinculando sua ferramenta de linha de comando à sua conta de desenvolvedor Eitri.

#### Opções disponíveis

- `yes` Aceita o redirecionamento para o Console.

!!! info

    A maioria dos demais comandos só podem ser executados após efetuado o login.

---

### create

:fontawesome-solid-terminal:{ .lg .middle }  `eitri create [opções] <nome-do-projeto>`

Cria um novo projeto de Eitri-App em sua máquina e o registra na plataforma Eitri.

Você precisará fornecer algumas informações ao criar um Eitri-App:

`Aplicação`
:   (Aplicação na qual seu Eitri-App irá rodar)

`Nome legível`
:   Nome utilizado na listagem do console. Não é exibido ao cliente final ou ao usuário utilizador do Eitri-App. Este nome é utilizado internamente e não será visualizado pelos usuários.

`Nome para divulgação`
:   Nome do produto, utilizado na divulgação e em pontos de contato com o usuário ou cliente final. Este nome poderá ser visualizado pelos usuários.

`Nome único`
:   Também chamado de slug, é o nome utilizado para identificação única do Eitri-App na plataforma Eitri, para encontrar seu Eitri-App, referencia-lo em diversas circunstâncias e também na montagem de deeplinks. Este nome não pode ser repetido entre Eitri-apps e não deve conter espaços ou caracteres especiais.

#### Opções disponíveis

- `yes` Utiliza os valores padrão para nome, título e organização.
- `--application <aplicativo>` Permite definir o aplicativo do Eitri-App.
- `-v, --verbose` Exibe mensagens detalhadas durante a execução do comando.`

---

### start

:fontawesome-solid-terminal:{ .lg .middle }  `eitri start [opções]`

O comando `eitri start` inicializa o Eitri-App para desenvolvimento, gerando um QrCode que deverá ser scaneado com o app de sua organização no qual o Eitri foi integrado.

À medida que você vai desenvolvendo e salvando seus arquivos localmente, seu Eitri-App contará com um hotreload que mostrará em tempo real as alterações na tela de seu aparelho, permitindo que você veja o resultado final de maneira rápida e fácil.

#### Opções disponíveis

- `--initialization-params` Permite enviar parâmetros de inicialização para o Eitri-App. Facilita o desenvolvimento e testes de seu Eitri-App.

- `-v, --verbose` Exibe mensagens detalhadas durante a execução do comando.

- `-p, --playground` Inicializa o Eitri-App em modo playground, com QrCode de abertura para o Eitri Play.

- `-e, --emulator` Inicializa o Eitri-App em modo emulador, com QrCode de abertura para o Eitri Emulator.

- `-sh, --shared` Inicializa o Eitri-App em modo compartilhado, com QrCode de abertura para o Eitri Shared.

---

### push-version

:fontawesome-solid-terminal:{ .lg .middle }  `eitri push-version [opções]`

Envia uma versão de seu Eitri-App para o Console, possibilitando a publicação. Ao executar este comando uma versão de seu Eitri-App será incluída no console e ficará disponível para publicação nos ambientes cadastrados para a aplicação.

#### Opções disponíveis

- `-v, --verbose` Exibe mensagens detalhadas durante a execução do comando.

- `-s, --shared` Envia a versão de seu Eitri-App compartilhado.

- `-m, --message <version-message>` Adiciona uma mensagem à versão de seu Eitri-App.

!!! info

    Esteja atento à versão de seu Eitri-App (no arquivo eitri-app.conf.js) já que não é possível enviar uma versão já existente no console.

---

### self-update

:fontawesome-solid-terminal:{ .lg .middle }  `eitri self-update`

Atualiza sua versão da Eitri CLI, desinstalando versões anteriores e instalando a versão estável mais recente.

É recomendado manter sempre a versão mais recente da Eitri CLI para garantir o melhor desempenho, compatibilidade, estabilidade e a melhor experiência de desenvolvimento.

---

### workspace

:fontawesome-solid-terminal:{ .lg .middle }  `eitri workspace [opções]`

Gerencia e permite a utilização de múltiplos workspaces.

#### Opções disponíveis

- `list` Lista os workspaces do usuário.

- `use [opções]` Seleciona um workspace para ser utilizado.

    - `--local` Seleciona um workspace para um diretório Eitri-App.
    - `--name` Seleciona um workspace criado previamente pelo nome.

- `create` Cria um novo workspace.

- `current` Exibe o workspace atual, obedecendo a prioridade Local > Global.

- `clean` Realiza a limpeza do workspace remoto do desenvolvedor. Útil quando há mal funcionamento na compilação em nuvem do Eitri-App. Obedece a prioridade Local > Global

---

### clean

:fontawesome-solid-terminal:{ .lg .middle }  `eitri clean [opções]`

Realiza uma limpeza em seu workspace remoto.

Ao rodar o `eitri start` seu workspace é montado com o código que está em sua máquina e é atualizado automaticamente à medida que você desenvolve e salva seus arquivos.

Caso haja algum problema com seu workspace, o comando `eitri clean` pode ajudar a reestabelecer seu workspace.

#### Opções disponíveis

- `-v, --verbose` Exibe mensagens detalhadas durante a execução do comando.

---

### libs

:fontawesome-solid-terminal:{ .lg .middle }  `eitri libs [opções]`

Listagem das versões das bibliotecas Eitri.

#### Opções disponíveis

- `--luminus` Lista as versões da biblioteca de componente Eitri Luminus.
- `--bifrost` Lista as versões do SDK Eitri Bifrost.

---

### doctor

:fontawesome-solid-terminal:{ .lg .middle }  `eitri doctor`

Verifica as dependências e configurações de sua máquina para garantir que tudo está correto para o desenvolvimento de Eitri-apps.

---

### publish

:fontawesome-solid-terminal:{ .lg .middle }  `eitri publish -e [id-do-ambiente] [opções]`

Publica a versão atual no ambiente selecionado.

#### Id do ambiente

- `-e, --environment <id-do-ambiente>` Define o ambiente que irá publicar a versão atual do Eitri-App definida no *eitri-app.conf.js*. Para saber o id de seu ambiente acesse o [Console Eitri](https://console.eitri.tech/) e clique em **"Aplicativos"**, selecione seu aplicativo e em seguida clique em **"Seus ambientes"**.

#### Opções disponíveis

- `-m, --message <mensagem>` Adiciona comentários na publicação.

---

### test

:fontawesome-solid-terminal:{ .lg .middle }  `eitri test [opções]`

Executa os testes de seu Eitri-App.

#### Opções disponíveis

- `-p, --path <caminho>` Define o caminho do arquivo de testes que será executado.

---

### app

:fontawesome-solid-terminal:{ .lg .middle }  `eitri app [opções]`

Gerencia a execução de Eitri-Apps do aplicativo, declarado no arquivo app-config.yaml.

!!! info
    Veja [Desenvolvendo vários Eitri-apps](https://docs.eitri.tech/pt/tutoriais/eitri-app-start/) para mais informações.

#### Opções disponíveis

- `start [opções]` Inicializa todos os Eitri-Apps do arquivo de configuração app-config.yaml.
    - `-p, --playground` Inicializa o Eitri-App em modo playground, com QrCode de abertura para o Eitri Play.
    - `-v, --verbose` Exibe mais logs.

- `clean` Realiza a limpeza completa dos workspaces, removendo tanto os workspaces remotos quanto as pastas `.workspaces/` locais de todos os apps definidos no arquivo app-config.yaml. Útil para resolver problemas de conflitos ou dados inválidos em workspaces.
    - `-v, --verbose` Exibe mensagens detalhadas durante o processo de limpeza.

- `create [opções] <nome-do-app>`  Cria uma aplicação Eitri com Eitri-apps baseado em um template selecionado.
  - `-v, --verbose` Exibe mais logs.

- `logs` Exibe os logs dos Eitri-Apps em execução do comando `eitri app start`.

---
# Eitri CLI

A Eitri CLI é o ponto de partida para desenvolver Eitri-Apps. Com ela você pode criar, desenvolver, testar e publicar Eitri-Apps para as aplicações de sua organização.

## Requisitos

Para utilizar a Eitri CLI você precisará ter instalado em sua máquina:

* [Node](https://nodejs.org/){:target="_blank"} 18 ou superior
* [NPM](https://www.npmjs.com/){:target="_blank"}
* [Git](https://git-scm.com/){:target="_blank"}

!!! tip

    Rode [`eitri doctor`](#doctor) para verificar se sua máquina tem tudo o que a CLI precisa.

## Instalação

```bash
npm install -g eitri-cli
```

!!! info

    Caso obtenha algum erro de permissão durante a instalação, verifique se os privilégios do seu usuário são suficientes para realizar a instalação.

## Atualização

Para atualizar a sua CLI, utilize o comando [`eitri self-update`](#self-update).

## Comandos disponíveis

Adicione `--help` ou `-h` ao final de qualquer comando para ver como utilizá-lo e todas as suas opções. A maioria dos comandos só pode ser executada após o [`eitri login`](#login).

| Comando | O que faz |
| --- | --- |
| [`login`](#login) | Vincula a CLI à sua conta de desenvolvedor Eitri |
| [`create`](#create) | Cria um novo Eitri-App |
| [`start`](#start) | Executa o Eitri-App em modo de desenvolvimento, com hot-reload |
| [`push-version`](#push-version) | Envia uma versão do Eitri-App para o Console |
| [`publish`](#publish) | Publica a versão atual em um ambiente |
| [`test`](#test) | Executa os testes do Eitri-App |
| [`clean`](#clean) | Limpa seu workspace remoto |
| [`workspace`](#workspace) | Gerencia seus workspaces |
| [`app`](#app) | Executa e gerencia vários Eitri-Apps de um aplicativo (`app-config.yaml`) |
| [`dependencies`](#dependencies) | Lista, adiciona e abre a documentação das dependências do Eitri-App |
| [`agents`](#agents) | Configura os [agentes de IA](ai-agents.md) do Eitri-App |
| [`libs`](#libs) | Lista as versões das bibliotecas Eitri |
| [`doctor`](#doctor) | Verifica as dependências da sua máquina |
| [`self-update`](#self-update) | Atualiza a CLI para a versão mais recente |

---

### login

```bash
eitri login [opções]
```

Efetua o login na plataforma Eitri, salvando as credenciais da sua conta em sua máquina e vinculando a CLI à sua conta de desenvolvedor Eitri.

#### Opções

| Opção | Descrição |
| --- | --- |
| `--yes` | Aceita o redirecionamento para o Console sem perguntar. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

---

### create

```bash
eitri create [opções] <nome-do-projeto>
```

Cria um novo projeto de Eitri-App em sua máquina e o registra na plataforma Eitri.

Você precisará fornecer algumas informações ao criar um Eitri-App:

`Aplicação`
:   Aplicação na qual seu Eitri-App irá rodar.

`Nome legível`
:   Nome utilizado na listagem do Console. É usado internamente e não é exibido aos usuários.

`Nome para divulgação`
:   Nome do produto, utilizado na divulgação e nos pontos de contato com o usuário. Este nome poderá ser visualizado pelos usuários.

`Nome único`
:   Também chamado de slug, identifica o Eitri-App de forma única na plataforma Eitri e é usado para referenciá-lo em diversos lugares, inclusive em deeplinks. Não pode se repetir entre Eitri-Apps e não deve conter espaços nem caracteres especiais.

#### Opções

| Opção | Descrição |
| --- | --- |
| `--yes` | Utiliza os valores padrão para nome, título e organização. |
| `--application <aplicativo>` | Define o aplicativo do Eitri-App. |
| `-t, --template [template]` | Cria o Eitri-App a partir do template informado. Sem valor, exibe a seleção de templates. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

```bash
eitri create meu-eitri-app --template
```

---

### start

```bash
eitri start [opções]
```

Inicia o Eitri-App para desenvolvimento em um workspace online e exibe um QR Code para ser escaneado com o app de sua organização (ou com o [Eitri Play](eitri-play.md)).

À medida que você salva seus arquivos, o Eitri-App é recarregado (hot-reload) e as alterações aparecem em tempo real no seu aparelho.

#### Opções

| Opção | Descrição |
| --- | --- |
| `-i, --initialization-params <query-params>` | Envia [parâmetros de inicialização](#parametros-de-inicializacao) para o Eitri-App. Ex.: `'foo=bar&hello=world'`. |
| `-p, --playground` | Exibe o QR Code para abrir o Eitri-App no [Eitri Play](eitri-play.md). |
| `-e, --emulator <plataforma>` | Abre o Eitri-App no emulador da plataforma informada: `android` ou `ios`. |
| `-sh, --shared` | Executa o Eitri-App no modo compartilhado. |
| `-S, --show-deeplink` | Exibe o deeplink do workspace. |
| `-sm, --skip-mini-log` | Pula a conexão com o mini-log. |
| `-f, --force` | Força o start. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

??? note "Depreciado: `--initializationParams`"

    A forma `--initializationParams <initializationParams>` ainda funciona, mas está depreciada. Utilize `--initialization-params`.

#### Atalhos de teclado

Com o `eitri start` ou o [`eitri app start`](#app-start) em execução, digite uma tecla no terminal e pressione `enter`:

| Tecla | Ação |
| --- | --- |
| `a` | Abre o Eitri-App no Android. |
| `i` | Abre o Eitri-App no iOS (somente macOS). |
| `q` / `Q` | Exibe o QR Code novamente. |
| `r` | Recarrega (reload) o Eitri-App. |
| `p` | Altera os [parâmetros de inicialização](#alterando-os-parametros-em-execucao) sem reiniciar. |

No `eitri app start`, as teclas `a`, `i`, `q` e `r` perguntam qual Eitri-App do `app-config.yaml` você quer usar.

#### Parâmetros de inicialização

Os parâmetros de inicialização permitem abrir o Eitri-App em um cenário específico (um produto, um usuário, uma rota) sem alterar o código. Dentro do Eitri-App, leia-os com `Eitri.getInitializationInfos()`, que os retorna já convertidos em objeto:

```jsx
const params = await Eitri.getInitializationInfos();
// --initialization-params 'productId=123&email=dev@eitri.tech'
// params => { productId: "123", email: "dev@eitri.tech" }
```

=== "eitri start"

    ```bash
    eitri start --initialization-params 'productId=123&email=dev@eitri.tech'
    ```

=== "eitri app start"

    No `app-config.yaml`:

    ```yaml
    initialization-params:
      type: "string"
      value: "productId=123&email=dev@eitri.tech"
    ```

!!! warning "Somente query string"

    Esses parâmetros precisam estar no formato **query string** (`chave=valor&chave2=valor2`). JSON não é aceito aqui; para enviar JSON, use os parâmetros de cada aba da [simulação da Bottom Bar](../tutoriais/bottom-bar-simulation.md).

#### Alterando os parâmetros em execução

Você não precisa parar e rodar o `start` de novo para testar outros parâmetros. Digite `p` no terminal e pressione `enter`:

=== "eitri start"

    O prompt já vem preenchido com os parâmetros atuais. Edite o valor e pressione `enter`; deixe vazio para remover os parâmetros.

    !!! info

        A tecla `p` não está disponível com `--playground`.

=== "eitri app start"

    Sem `bottom-tab-view-simulation`, altera os parâmetros do Eitri-App marcado como `focus` no `app-config.yaml`, da mesma forma que no `eitri start`.

=== "Com Bottom Bar"

    Quando o `app-config.yaml` tem `bottom-tab-view-simulation`, o Eitri Play usa os parâmetros de **cada aba** e ignora os globais. Por isso a tecla `p` pergunta:

    1. qual aba alterar;
    2. o tipo dos parâmetros: `string` (query string) ou `json`;
    3. o valor (vazio remove os parâmetros da aba). JSON inválido é recusado na hora.

Depois de alterar, a CLI publica os novos parâmetros. **Escaneie o QR Code novamente ou reabra o Eitri-App pelo deeplink** para aplicá-los.

!!! note

    As alterações feitas com `p` valem apenas para a sessão atual: o arquivo `app-config.yaml` não é alterado.

Veja o [guia de parâmetros de inicialização](../tutoriais/initialization-params.md) para mais exemplos.

---

### push-version

```bash
eitri push-version [opções]
```

Envia uma versão do seu Eitri-App para o Console. A versão fica disponível para publicação nos ambientes cadastrados para a aplicação.

#### Opções

| Opção | Descrição |
| --- | --- |
| `-m, --message <mensagem-da-versao>` | Adiciona uma mensagem à versão. |
| `-r, --release` | Gera uma nova release a partir dos commits, criando o arquivo `CHANGELOG.md` automaticamente. Veja [Semantic Release](../tutoriais/semantic-release.md). |
| `-s, --shared` | Envia a versão de um Eitri-App compartilhado. |
| `-y, --yes` | Aceita automaticamente as respostas do prompt. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

!!! warning

    Confira a versão do seu Eitri-App no `eitri-app.conf.js`: não é possível enviar uma versão que já existe no Console.

---

### publish

```bash
eitri publish --environment <id-do-ambiente> [opções]
```

Publica a versão atual do Eitri-App, definida no `eitri-app.conf.js`, no ambiente selecionado.

#### Opções

| Opção | Descrição |
| --- | --- |
| `-e, --environment <id-do-ambiente>` | **Obrigatório.** Ambiente em que a versão será publicada. |
| `-m, --message <mensagem>` | Adiciona comentários na publicação. |

!!! tip "Onde encontrar o id do ambiente"

    No [Console Eitri](https://console.eitri.tech/){:target="_blank"}, clique em **Aplicativos**, selecione seu aplicativo e clique em **Seus ambientes**.

---

### test

```bash
eitri test [opções]
```

Executa os testes do seu Eitri-App. Veja [Testes](../tutoriais/tests.md).

#### Opções

| Opção | Descrição |
| --- | --- |
| `-p, --path <caminho>` | Caminho do arquivo de testes que será executado. |
| `-w, --watch` | Observa os arquivos e executa os testes novamente a cada alteração. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

---

### clean

```bash
eitri clean [opções]
```

Realiza a limpeza do seu workspace remoto.

Ao rodar o `eitri start`, seu workspace é montado com o código da sua máquina e atualizado à medida que você salva seus arquivos. Se algo der errado na compilação em nuvem, o `eitri clean` ajuda a restabelecê-lo.

#### Opções

| Opção | Descrição |
| --- | --- |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

---

### workspace

```bash
eitri workspace <comando> [opções]
```

Gerencia seus workspaces, permitindo utilizar mais de um.

| Comando | Descrição |
| --- | --- |
| `list` | Lista seus workspaces. |
| `use [opções]` | Seleciona o workspace a ser utilizado. |
| `create` | Cria um novo workspace. |
| `current` | Exibe o workspace atual, obedecendo a prioridade Local > Global. |
| `clean` | Limpa o workspace remoto. Útil quando há mau funcionamento na compilação em nuvem do Eitri-App. Obedece a prioridade Local > Global. |

#### Opções do `use`

| Opção | Descrição |
| --- | --- |
| `--local` | Seleciona um workspace apenas para o diretório do Eitri-App atual. |
| `--name <nome-do-workspace>` | Seleciona pelo nome um workspace criado previamente. |

---

### app

```bash
eitri app <comando> [opções]
```

Executa e gerencia os Eitri-Apps do aplicativo declarado no arquivo `app-config.yaml`.

!!! info

    Veja [Desenvolvendo vários Eitri-Apps](../tutoriais/eitri-app-start.md) para configurar o `app-config.yaml`.

| Comando | Descrição |
| --- | --- |
| [`start`](#app-start) | Inicia todos os Eitri-Apps do `app-config.yaml`. |
| [`logs`](#app-logs) | Exibe os logs dos Eitri-Apps iniciados pelo `eitri app start`. |
| [`clean`](#app-clean) | Limpa os workspaces remotos e locais de todos os Eitri-Apps. |
| [`create`](#app-create) | Cria um aplicativo com Eitri-Apps a partir de um template. |
| [`snapshot`](#app-snapshot) | Cria um snapshot testável e distribuível do aplicativo. |

#### app start

```bash
eitri app start [opções]
```

Inicia todos os Eitri-Apps do `app-config.yaml`. O QR Code abre o Eitri-App marcado como `focus`. Os [atalhos de teclado](#atalhos-de-teclado) e os [parâmetros de inicialização](#parametros-de-inicializacao) funcionam da mesma forma que no `eitri start`.

| Opção | Descrição |
| --- | --- |
| `-p, --playground` | Exibe o QR Code para abrir no [Eitri Play](eitri-play.md). |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

#### app logs

```bash
eitri app logs
```

Exibe os logs dos Eitri-Apps em execução pelo `eitri app start`.

#### app clean

```bash
eitri app clean [opções]
```

Realiza a limpeza completa dos workspaces, removendo tanto os workspaces remotos quanto as pastas `.workspaces/` locais de todos os apps do `app-config.yaml`. Útil para resolver conflitos ou dados inválidos nos workspaces.

| Opção | Descrição |
| --- | --- |
| `-v, --verbose` | Exibe mensagens detalhadas durante a limpeza. |

#### app create

```bash
eitri app create [opções] <nome-do-aplicativo>
```

Cria um aplicativo com vários Eitri-Apps, baseado em um template selecionado.

| Opção | Descrição |
| --- | --- |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

#### app snapshot

```bash
eitri app snapshot [opções]
```

Cria um snapshot do código-fonte do aplicativo, gerando um link e um QR Code para testar uma funcionalidade antes de publicá-la. Veja [Snapshots](../tutoriais/snapshots.md).

| Opção | Descrição |
| --- | --- |
| `-b, --branch-name <nome-do-branch>` | Nome do branch para o snapshot. |
| `-v, --verbose` | Exibe mensagens detalhadas durante a execução. |

#### Simulação da Bottom Bar

Enquanto desenvolve com o [Eitri Play](eitri-play.md) você pode simular a Bottom Bar e seus comportamentos. [Confira aqui](../tutoriais/bottom-bar-simulation.md) como simulá-la.

---

### dependencies

```bash
eitri dependencies <comando> [opções]
```

Gerencia as dependências do Eitri-App. Veja [Dependências](../tutoriais/dependencias.md).

| Comando | Descrição |
| --- | --- |
| `list` | Lista as dependências disponíveis para os Eitri-Apps. |
| `add` | Seleciona dependências e as declara em `eitri-app-dependencies` no `eitri-app.conf.js`. |
| `docs [opções]` | Seleciona uma dependência e abre a sua documentação no navegador. |

#### Opções do `docs`

| Opção | Descrição |
| --- | --- |
| `--no-open` | Apenas exibe o link, sem abrir o navegador. |

---

### agents

```bash
eitri agents <comando> [opções]
```

Gerencia os agentes de IA do Eitri-App. Para entender o que os agentes podem fazer no seu app e qual modo de integração escolher, veja [AI Agents](ai-agents.md).

| Comando | Descrição |
| --- | --- |
| `setup [opções]` | Configura as variáveis de ambiente dos agentes, do workspace ou de produção. |
| `generate:rag` | Gera os arquivos necessários para o RAG. |

#### Opções do `setup`

| Opção | Descrição |
| --- | --- |
| `-e, --env <env>` | Ambiente: `workspace` (padrão) ou `production`. |
| `-l, --llm <llm>` | Nome do LLM. |
| `-k, --api-key <api-key>` | Chave de API do LLM. |
| `-m, --model <model>` | Modelo do LLM. |

```bash
eitri agents setup --env workspace --llm <llm> --model <modelo> --api-key <api-key>
```

---

### libs

```bash
eitri libs [opções]
```

Lista as versões das bibliotecas Eitri.

| Opção | Descrição |
| --- | --- |
| `--luminus` | Lista as versões da biblioteca de componentes [Eitri Luminus](eitri-luminus.md). |
| `--bifrost` | Lista as versões do SDK [Eitri Bifrost](eitri-bifrost.md). |

---

### doctor

```bash
eitri doctor
```

Verifica as dependências e configurações da sua máquina para garantir que tudo está pronto para o desenvolvimento de Eitri-Apps.

---

### self-update

```bash
eitri self-update
```

Atualiza a Eitri CLI, desinstalando versões anteriores e instalando a versão estável mais recente.

Manter a CLI atualizada garante o melhor desempenho, compatibilidade, estabilidade e experiência de desenvolvimento.

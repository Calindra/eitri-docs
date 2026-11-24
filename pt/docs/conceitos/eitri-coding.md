---
status: new
---

# Skills de IA com o Eitri Coding

O **Eitri Coding** é um plugin open source que transforma o seu assistente de código com IA em um especialista no desenvolvimento de Eitri-Apps. Ele reúne três peças:

- **Skills**: o conhecimento do Eitri (Luminus, Bifrost, CLI, Eitri Shopping), a automação do device e fluxos completos, como criar um app inteiro a partir da URL de uma loja.
- **[Eitri MCP](eitri-mcp.md)**: um servidor MCP remoto, já configurado no plugin, que dá ao assistente acesso ao Eitri Console com as suas permissões (aplicações, ambientes, temas, mini-apps, revisões, builds e erros de produção).
- **Hook de detecção** (Claude Code): carrega o especialista automaticamente quando você abre um projeto Eitri.

O plugin é instalado de forma nativa no **Claude Code**, no **Codex** e no **Hermes Agent**. Em outros assistentes (Gemini CLI, Cursor, GitHub Copilot e qualquer um compatível com [Agent Skills](https://agentskills.io){:target="_blank"}) você instala as skills e, se quiser, conecta o MCP separadamente.

[→ Repositório eitri-tech/eitri-coding](https://github.com/eitri-tech/eitri-coding){:target="_blank" .md-button .md-button--primary }
[▶ Assista à demonstração](https://www.youtube.com/watch?v=apoOXtBtkew){:target="_blank" .md-button }

!!! info "Eitri Coding ou AI Agents?"

    O **Eitri Coding** usa IA para *desenvolver* os seus Eitri-Apps, na máquina do desenvolvedor. Os [AI Agents](ai-agents.md) colocam IA *dentro* do seu Eitri-App, para o usuário final conversar.

## O que o assistente aprende

Sem contexto, um LLM tende a escrever código React ou React Native genérico, que não funciona em um Eitri-App. Com o plugin, o assistente conhece:

- **Eitri Luminus**: usa apenas componentes Luminus (nada de tags HTML puras), com classes Tailwind e DaisyUI.
- **Eitri Bifrost**: usa as APIs do Bifrost para navegação, storage, HTTP, câmera e outros recursos nativos, em vez de `fetch`, `localStorage` ou `navigator`.
- **Roteamento por arquivos** em `src/views/` e a configuração do `eitri-app.conf.js` e do `app-config.yaml`.
- **Runtime safety**: em uma WebView, um `TypeError` deixa a tela em branco em vez de quebrar o build, então o código é defensivo por padrão.
- **O fluxo da Eitri CLI**: `eitri start`, `eitri app start` e `eitri push-version`.
- **O device**: abre o app no Eitri Play, navega, tira screenshots e lê os erros do console da WebView, no Android (ADB) e no Simulador iOS. Sem device, renderiza o build de desenvolvimento em um navegador headless no tamanho de um celular.
- **O Eitri Console**: pelo [Eitri MCP](eitri-mcp.md), lê e altera a configuração remota, temas, mini-apps e revisões, e diagnostica builds nativos e erros de produção, sempre com uma prévia antes de cada escrita.

## Como funciona

Cada capacidade é uma **skill**: uma pasta com um arquivo `SKILL.md` cuja descrição diz ao assistente *quando* carregá-la. O assistente carrega só as skills relevantes para a tarefa, sob demanda, então elas não ocupam contexto quando não são necessárias.

A `eitri-specialist` é o ponto de entrada: ela define as regras do projeto e aciona as demais skills quando a tarefa pede (uma dúvida de componente Luminus, uma API do Bifrost, a interação com o device etc.).

No Claude Code, o plugin também tem um hook que roda no início de cada sessão: se encontrar um `eitri-app.conf.js` ou `app-config.yaml` na raiz do projeto (ou em uma subpasta imediata), ele instrui o assistente a carregar a `eitri-specialist` antes de qualquer alteração, **mesmo que você nunca mencione o Eitri no prompt**. Nos outros assistentes, peça a skill pelo nome no início da sessão (por exemplo, "use a skill eitri-specialist") ou deixe essa instrução no `AGENTS.md` (ou `GEMINI.md`) do projeto.

O Eitri MCP vem declarado no plugin. Depois de um login único no navegador, as ferramentas dele ficam disponíveis em todas as sessões. Veja [Eitri MCP](eitri-mcp.md) para a lista completa e as regras de segurança.

## Skills incluídas

| Skill | Quando é usada | O que faz |
| --- | --- | --- |
| `eitri-specialist` | Qualquer tarefa em um projeto Eitri | Ponto de entrada: regras do projeto, roteamento, runtime safety e CLI. Aciona as outras skills. |
| `eitri-luminus` | Escrever ou revisar views | Catálogo de componentes Luminus, props, mapeamento HTML → Luminus e a doc oficial como fonte da verdade. |
| `eitri-bifrost` | Usar recursos nativos do device | Referência das APIs do Bifrost (navegação, storage, HTTP, câmera, QR code, geolocalização, biometria, notificações, deeplinks, tracking e outras), com fluxo de permissões e verificação com `canIUse`. |
| `eitri-shopping` | Apps de commerce | Como usar as bibliotecas do Eitri Shopping para VTEX, Wake e Shopify (catálogo, busca, carrinho, checkout, cliente, pedidos e wishlist). |
| `eitri-device` | Rodar e validar o app | Screenshots, toques, swipes, digitação, troca de abas e inspeção do DOM e do console da WebView, no Android e no Simulador iOS. Sem device, gera uma prévia em navegador headless. |
| `create-app` | Criar um app a partir da URL de uma loja | Cria a organização, a aplicação, os mini-apps, a configuração remota, o tema e o ícone no Console e um repositório local a partir do template, refaz o visual da loja e publica em `dev`. Veja [Criar um app a partir da loja](#criar-um-app-a-partir-da-loja). |
| `site-clone` | Clonar ou usar um site como referência | Captura uma página com Playwright e a reconstrói no framework do projeto (Eitri, FastStore ou React), com componentes, estilos, imagens e textos. |
| `figma-scrape` | Receber um link do Figma | Extrai uma seleção do Figma (URL com `node-id`) para um pacote de design estruturado. |
| `figma-to-eitri` | Implementar uma tela do Figma | Porta um design do Figma (pacote do `figma-scrape` ou arquivo `.fig` local) para views Eitri, respeitando o CMS e o tema do projeto. |
| `eitri-claude-design-migrate` | Portar telas do Claude Design | Transforma HTML/JSX com estilos inline em views Eitri prontas para produção, com Luminus, Tailwind e DaisyUI. |
| `eitri-typescript-migrate` | Migrar um workspace para TypeScript | Converte um Eitri-App ou um bundle multi-app de JavaScript para TypeScript, arquivo por arquivo, com tipos para Luminus, Bifrost e payloads de VTEX/Wake/Shopify. |

## Instalação

Escolha o assistente que você usa:

=== "Claude Code"

    O Claude Code é o assistente suportado oficialmente: o plugin instala as skills, o hook que detecta projetos Eitri e o Eitri MCP.

    1. Adicione o marketplace e instale o plugin de dentro do Claude Code:

        ```
        /plugin marketplace add eitri-tech/eitri-coding
        /plugin install eitri-coding@eitri-plugins
        ```

    2. Reinicie o Claude Code (ou rode `/reload-plugins`).

    3. Faça login no MCP: rode `/mcp`, selecione `plugin:eitri-coding:eitri-manager` e escolha **Authenticate**. O navegador abre o login do Eitri Console; entre com a sua conta e pronto. O login é feito uma vez só.

    A partir daí, em qualquer projeto Eitri, a `eitri-specialist` é carregada automaticamente. Para chamar uma skill explicitamente, use o nome dela com o prefixo do plugin:

    ```
    /eitri-coding:eitri-specialist
    /eitri-coding:create-app
    ```

=== "Codex"

    O Codex instala o mesmo plugin, com as skills e o Eitri MCP:

    ```bash
    codex plugin marketplace add eitri-tech/eitri-coding
    ```

    Abra `/plugins` no Codex, instale o **Eitri Coding** e faça o login no Eitri Console quando o Codex pedir. Depois, inicie uma nova sessão.

    O Codex carrega as skills automaticamente. Para chamar uma explicitamente, digite `$` seguido do nome (por exemplo, `$eitri-specialist`) ou use `/skills`.

    Para atualizar: `codex plugin marketplace upgrade eitri-plugins`.

=== "Hermes Agent"

    Instale e habilite o plugin:

    ```bash
    hermes plugins install eitri-tech/eitri-coding/plugins/eitri-coding
    hermes plugins enable eitri-coding
    ```

    O login no MCP precisa de `auth: oauth`, que o pacote do plugin não consegue definir. Adicione o servidor ao `~/.hermes/config.yaml` (essa entrada tem prioridade sobre a do plugin):

    ```yaml
    mcp_servers:
      eitri-manager:
        url: https://api.eitri.tech/eitri-manager-mcp/mcp
        auth: oauth
    ```

    E faça o login:

    ```bash
    hermes mcp login eitri-manager
    ```

    Para atualizar: `hermes plugins update eitri-coding`.

=== "Gemini CLI"

    Instale as skills direto do repositório:

    ```bash
    gemini skills install https://github.com/eitri-tech/eitri-coding --path plugins/eitri-coding/skills
    ```

    Por padrão elas são instaladas para o seu usuário. Para instalar só no projeto atual, adicione `--scope workspace`.

    O Gemini ativa as skills automaticamente quando a tarefa combina com a descrição delas, e pede confirmação antes de carregar cada uma. Use `/skills list` para conferir o que foi instalado.

    Para usar o Console pelo assistente, [conecte o Eitri MCP](eitri-mcp.md#como-conectar) separadamente.

=== "Cursor"

    O Cursor lê skills de `~/.cursor/skills` ou `~/.agents/skills` (todos os projetos) e de `.cursor/skills` ou `.agents/skills` (projeto atual). Copie as skills para lá:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    O agente aplica as skills automaticamente. Para chamar uma explicitamente, digite `/` no chat do Agent e busque pelo nome, por exemplo `/eitri-specialist`.

    Para usar o Console pelo assistente, [conecte o Eitri MCP](eitri-mcp.md#como-conectar) separadamente.

=== "GitHub Copilot"

    O modo agente no VS Code e nas IDEs JetBrains, o Copilot CLI e o Copilot cloud agent leem skills de `~/.copilot/skills` ou `~/.agents/skills` (pessoais) e de `.github/skills` ou `.agents/skills` (repositório). Copie as skills para lá:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    Para compartilhar as skills com todo o time, copie-as para `.agents/skills` no repositório e faça commit.

    Para usar o Console pelo assistente, [conecte o Eitri MCP](eitri-mcp.md#como-conectar) separadamente.

=== "Outros assistentes"

    O Eitri Coding segue o padrão aberto [Agent Skills](https://agentskills.io){:target="_blank"}. Qualquer assistente que o suporte pode usar as skills: copie as pastas de `plugins/eitri-coding/skills/` para o diretório de skills que ele lê, normalmente `~/.agents/skills` ou `.agents/skills`.

    Se o assistente não suportar skills, aponte para os arquivos `SKILL.md` no arquivo de instruções que ele lê (como o `AGENTS.md`).

    Se ele suportar servidores MCP remotos com OAuth, [conecte o Eitri MCP](eitri-mcp.md#como-conectar) também.

## Atualização

=== "Claude Code"

    Marketplaces de terceiros não se atualizam sozinhos por padrão. Você recebe novas versões de duas formas:

    - **Manualmente**: `/plugin marketplace update eitri-plugins` e depois `/plugin update eitri-coding@eitri-plugins` (ou `claude plugin update eitri-coding@eitri-plugins` no terminal). Rode `/reload-plugins` ou reinicie.
    - **Automaticamente**: `/plugin` → **Marketplaces** → `eitri-plugins` → **Enable auto-update**.

    Para um repositório de time, faça commit do trecho abaixo em `.claude/settings.json`. Assim todo colaborador recebe o marketplace, o plugin e a atualização automática:

    ```json
    {
      "extraKnownMarketplaces": {
        "eitri-plugins": {
          "source": { "source": "github", "repo": "eitri-tech/eitri-coding" },
          "autoUpdate": true
        }
      },
      "enabledPlugins": { "eitri-coding@eitri-plugins": true }
    }
    ```

=== "Codex"

    ```bash
    codex plugin marketplace upgrade eitri-plugins
    ```

=== "Hermes Agent"

    ```bash
    hermes plugins update eitri-coding
    ```

=== "Skills copiadas"

    Repita o `git clone` e a cópia das pastas de `plugins/eitri-coding/skills/`, sobrescrevendo as anteriores.

## Criar um app a partir da loja

A skill `create-app` transforma a URL de uma loja **VTEX, Wake ou Shopify** em um app Eitri funcionando, pronto para ser visto no Eitri Play. Basta pedir:

```text
Crie um app Eitri para a loja https://www.minhaloja.com.br
```

Para um resultado mais refinado, chame a skill direto e peça fidelidade em todas as telas. A execução fica mais demorada e consome mais tokens:

```text
/eitri-coding:create-app crie um app Eitri totalmente integrado para
https://minhaloja.com.br na organização minhaloja. Reproduza o visual e os
componentes o mais próximo possível de 1:1, na Home, PDP, Checkout, Account
e nas demais telas
```

### Pré-requisitos

- O **plugin instalado** e o **login no Eitri MCP** feito (veja [Instalação](#instalacao)).
- A **Eitri CLI** instalada (`npm i -g eitri-cli`) e logada (`eitri login`). A skill atualiza a CLI para a versão mais recente antes de começar.
- **Node.js 20** ou superior e **git**. Na primeira execução, a skill instala o Playwright e o Chromium para capturar a loja.
- Para criar uma **organização nova**, o papel de administrador da plataforma. Sem ele, escolha uma organização da qual você já faz parte.
- Na **Shopify**, o token público da Storefront API e os dados da Customer Account API. Você pode responder "depois": o app é criado com esses campos vazios e eles ficam listados no relatório final.

### O que acontece

1. **Detecção**: a skill identifica a plataforma, a conta, o nome, o idioma e a moeda da loja, e pergunta de uma vez só o que não conseguiu descobrir (organização, nome do app, se é um app de demonstração).
2. **Preparação, sem escrever nada no Console**: clona o template oficial da plataforma, captura a home, a listagem, a página de produto, o login e o carrinho da loja, analisa as integrações (reviews, vídeos, chat, analytics), extrai cores, fontes, logo e ícone, monta a barra inferior a partir da barra da loja e gera a configuração remota.
3. **Confirmação**: você recebe **um único resumo** com tudo o que será criado (organização, aplicação, slugs dos mini-apps, ambientes, configuração, tema, ícone, barra inferior, integrações e o que o app não vai reproduzir) e aprova uma vez. Nada é escrito no Console antes disso.
4. **Criação no Console**, pelo MCP: organização e ícone, aplicação (com os ambientes `dev` e `prod`), ícone do app, mini-apps `eitri-shopping-<app>-<alias>`, aliases de slug, configuração remota, tema Luminus v2 e CSS global v1. Em seguida, a primeira publicação do template em `dev`: **a partir daqui o app já abre no Eitri Play** com o catálogo, o tema e o ícone da loja.
5. **Fidelidade visual**: tela por tela (home, listagem, produto, login, carrinho e checkout), o assistente compara a loja com o app lado a lado e ajusta o código até ficar parecido. Cada mini-app tem textos em inglês e português.
6. **Entrega**: publica cada mini-app em `dev` e escreve um `EITRI_APP.md` na raiz do repositório com os ids criados, como visualizar, o status de cada tela, o que ainda é placeholder e o que ficou de fora.

Para ver o app: abra o **Eitri Play** no celular, faça login com a sua conta Eitri e escolha a organização → a aplicação → `dev`.

!!! tip "Execução interrompida"

    Cada escrita no Console é registrada em `.eitri/create-app.state.json` assim que acontece. Se a execução parar no meio, peça para continuar: a skill lê esse arquivo e retoma de onde parou, sem criar uma segunda organização, aplicação ou mini-app.

!!! warning

    - A criação gasta tempo e tokens: a fase de fidelidade visual é a mais longa e pode dividir as telas entre vários agentes em paralelo.
    - Não existe ferramenta de exclusão. Para descartar um app de teste, use os ids do `.eitri/create-app.state.json` e remova-o pelo Eitri Console (ou peça a um administrador).
    - Credenciais da loja ficam em `.eitri/secrets.json` e a configuração resolvida em `.eitri/remote-config.json`, ambos no `.gitignore`.

## Interação com o device

A skill `eitri-device` permite que o assistente abra o app, navegue e confira o resultado sozinho. Para isso, você precisa de:

=== "Android"

    - Um device ou emulador Android conectado e autorizado, visível em `adb devices`.
    - Python 3 com as dependências que a skill usa para ler a tela:

        ```bash
        pip install easyocr opencv-python-headless==4.10.0.84
        ```

=== "iOS (somente macOS)"

    - Um Simulador iOS iniciado, com o Eitri Play instalado.
    - As ferramentas `idb` e WebKit Inspector:

        ```bash
        brew install idb-companion ios-webkit-debug-proxy
        pip install fb-idb
        ```

=== "Sem device"

    Sem device ou emulador conectado, a skill renderiza o build de desenvolvimento em um navegador headless no tamanho de um celular e tira screenshots dele. Precisa de Node.js; na primeira execução, instala o Playwright e o Chromium.

!!! tip

    Deixe o `eitri start` (ou `eitri app start`) rodando e o Eitri Play aberto no device antes de pedir ao assistente para validar uma tela. Se o servidor não estiver rodando, o assistente o inicia.

## Sites e designs como referência

- **`site-clone`**: dê uma URL e peça para reconstruir a página no seu Eitri-App. A skill captura a página com Playwright (estrutura, estilos, imagens, textos e comportamento em diferentes larguras) e refaz cada bloco com Luminus. Precisa de Node.js; na primeira execução instala o Playwright e o Chromium.
- **`figma-scrape`** e **`figma-to-eitri`**: cole um link do Figma com `node-id` e diga qual tela ele representa. A extração usa a API do Figma com o token na variável de ambiente `FIGMA_TOKEN`. Sem token, exporte o arquivo pelo Figma (**File → Save local copy**) e entregue o `.fig`: ele é convertido offline para o mesmo pacote.

## Exemplos de uso

Os prompts abaixo estão em linguagem natural: você não precisa citar a skill, o assistente escolhe a certa.

**Criar um app a partir de uma loja**

```text
Crie um app Eitri para a loja https://www.minhaloja.com.br. É um app de
demonstração, use uma organização nova com o nome da loja.
```

**Criar uma tela**

```text
Crie uma view de perfil em src/views/Profile que carregue os dados do
usuário de https://api.minhaloja.com/me e mostre nome, e-mail e avatar,
com estado de carregamento e de erro. Depois abra no device e me mande
um screenshot.
```

**Usar um recurso nativo**

```text
Adicione um botão na tela de Checkout que leia o QR code de um cupom com
a câmera e preencha o campo de cupom. Trate o caso em que o usuário nega
a permissão da câmera.
```

**Reproduzir e corrigir um bug no device**

```text
No device, abra o carrinho e toque em "Finalizar compra". A tela fica em
branco. Leia os erros do console da WebView, encontre a causa, corrija e
confirme no device que a tela renderiza.
```

**Implementar uma tela do Figma**

```text
Implemente a tela de produto deste link do Figma no mini-app de PDP:
https://www.figma.com/design/<arquivo>/<nome>?node-id=12-345
```

**Portar uma tela do Claude Design**

```text
Porte as telas em ./design-export (geradas pelo Claude Design) para views
Eitri usando Luminus, Tailwind e DaisyUI. Mantenha a paleta de cores como
tokens do tema do Tailwind.
```

**Integrar com a plataforma da loja**

```text
Descubra qual plataforma de commerce este projeto usa e adicione um
carrossel de "Vistos recentemente" na Home usando o SDK do Eitri Shopping.
```

**Alterar a configuração remota pelo Console**

```text
No app Minha Loja, ambiente dev, troque o headerLogo da configuração remota
por https://cdn.minhaloja.com.br/logo.png. Me mostre o diff antes de aplicar.
```

**Investigar um build ou um erro de produção**

```text
Por que o último build Android do app Minha Loja falhou?
```

```text
Quais foram os erros de produção mais frequentes do app Minha Loja nos
últimos 7 dias, e em quais mini-apps?
```

**Revisar código**

```text
Revise as views em src/views/ quanto ao uso correto de Luminus e Bifrost:
tags HTML puras, uso de fetch/localStorage, awaits faltando e código que
pode quebrar em runtime.
```

## Dicas para melhores resultados

- **Abra o assistente na raiz do projeto**, onde fica o `eitri-app.conf.js` ou o `app-config.yaml`. É assim que o especialista reconhece o projeto.
- **Peça validação no device.** Terminar o prompt com "confirme no device" faz o assistente rodar o app e conferir a tela, em vez de parar no código.
- **Dê o escopo.** Diga a view, a tela ou o fluxo. Em workspaces com vários apps, diga qual Eitri-App alterar. No Console, diga o nome da aplicação e do ambiente.
- **Leia a prévia antes de confirmar.** Toda escrita do MCP mostra antes o que vai mudar (diff, possíveis segredos expostos, versão substituída). Em produção, o assistente precisa da sua autorização explícita.
- **Revise antes de publicar.** O assistente sabe que a `version` do `eitri-app.conf.js` precisa ser incrementada antes do `eitri push-version`, mas publicar uma versão é decisão sua.

## Contribua

O Eitri Coding é open source (Apache-2.0) e está em desenvolvimento ativo, com o suporte se expandindo para mais assistentes conforme o feedback dos usuários. Reporte problemas e sugira melhorias no [repositório](https://github.com/eitri-tech/eitri-coding){:target="_blank"}.

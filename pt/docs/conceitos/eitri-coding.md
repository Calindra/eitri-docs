---
status: new
---

# Skills de IA com o Eitri Coding

O **Eitri Coding** é um conjunto de **skills** open source que transforma o seu assistente de código com IA (Claude Code, Gemini CLI, Codex, Cursor, GitHub Copilot e outros) em um especialista no desenvolvimento de Eitri-Apps. Com ele, o assistente escreve código seguindo as regras do Eitri e também opera o app rodando em um device Android ou simulador iOS para validar o que construiu.

A proposta é ser **agnóstico ao LLM**: você escolhe o assistente, e o plugin entrega o mesmo conjunto de capacidades.

[→ Repositório eitri-tech/eitri-coding](https://github.com/eitri-tech/eitri-coding){:target="_blank" .md-button .md-button--primary }
[▶ Assista à demonstração](https://www.youtube.com/watch?v=apoOXtBtkew){:target="_blank" .md-button }

!!! info "Eitri Coding ou AI Agents?"

    O **Eitri Coding** usa IA para *desenvolver* os seus Eitri-Apps, na máquina do desenvolvedor. Os [AI Agents](ai-agents.md) colocam IA *dentro* do seu Eitri-App, para o usuário final conversar.

## O que o assistente aprende

Sem contexto, um LLM tende a escrever código React ou React Native genérico, que não funciona em um Eitri-App. Com as skills, o assistente conhece:

- **Eitri Luminus**: usa apenas componentes Luminus (nada de tags HTML puras), com classes Tailwind e DaisyUI.
- **Eitri Bifrost**: usa as APIs do Bifrost para navegação, storage, HTTP, câmera e outros recursos nativos, em vez de `fetch`, `localStorage` ou `navigator`.
- **Roteamento por arquivos** em `src/views/` e a configuração do `eitri-app.conf.js` e do `app-config.yaml`.
- **Runtime safety**: em uma WebView, um `TypeError` deixa a tela em branco em vez de quebrar o build, então o código é defensivo por padrão.
- **O fluxo da Eitri CLI**: `eitri start`, `eitri app start` e `eitri push-version`.
- **O device**: abre o app no Eitri Play, navega, tira screenshots e lê os erros do console da WebView, no Android (ADB) e no Simulador iOS.

## Como funciona

Cada capacidade é uma **skill**: uma pasta com um arquivo `SKILL.md` cuja descrição diz ao assistente *quando* carregá-la. O assistente carrega só as skills relevantes para a tarefa, sob demanda, então elas não ocupam contexto quando não são necessárias.

A `eitri-specialist` é o ponto de entrada: ela define as regras do projeto e aciona as demais skills quando a tarefa pede (uma dúvida de componente Luminus, uma API do Bifrost, a interação com o device etc.).

No Claude Code, o plugin também tem um hook que roda no início de cada sessão: se encontrar um `eitri-app.conf.js` ou `app-config.yaml` no projeto, ele instrui o assistente a carregar a `eitri-specialist` antes de qualquer alteração, **mesmo que você nunca mencione o Eitri no prompt**.

## Skills incluídas

| Skill | Quando é usada | O que faz |
| --- | --- | --- |
| `eitri-specialist` | Qualquer tarefa em um projeto Eitri | Ponto de entrada: regras do projeto, roteamento, runtime safety e CLI. Aciona as outras skills. |
| `eitri-luminus` | Escrever ou revisar views | Catálogo de componentes Luminus, props, mapeamento HTML → Luminus e a doc oficial como fonte da verdade. |
| `eitri-bifrost` | Usar recursos nativos do device | Referência das APIs do Bifrost (navegação, storage, HTTP, câmera, QR code, geolocalização, biometria, notificações, deeplinks, tracking e outras), com fluxo de permissões e verificação com `canIUse`. |
| `eitri-shopping` | Apps de commerce | Como usar as bibliotecas do Eitri Shopping para VTEX, Wake e Shopify (catálogo, busca, carrinho, checkout, cliente, pedidos e wishlist). |
| `eitri-claude-design-migrate` | Portar telas do Claude Design | Transforma HTML/JSX com estilos inline em views Eitri prontas para produção, com Luminus, Tailwind e DaisyUI. |
| `eitri-device` | Rodar e validar o app | Screenshots, toques, swipes, digitação, troca de abas e inspeção do DOM e do console da WebView, no Android e no Simulador iOS. |

## Instalação

Escolha o assistente que você usa:

=== "Claude Code"

    O Claude Code é o assistente suportado oficialmente: as skills são instaladas como plugin, junto com o hook que detecta projetos Eitri.

    Adicione o marketplace e instale o plugin de dentro do Claude Code:

    ```
    /plugin marketplace add eitri-tech/eitri-coding
    /plugin install eitri-coding@eitri-plugins
    ```

    Reinicie o Claude Code. A partir daí, em qualquer projeto Eitri, a `eitri-specialist` é carregada automaticamente. Para chamar uma skill explicitamente, use o nome dela com o prefixo do plugin:

    ```
    /eitri-coding:eitri-specialist
    /eitri-coding:eitri-device
    ```

    Para atualizar para a versão mais recente, rode `/plugin marketplace update eitri-plugins`.

=== "Gemini CLI"

    Instale as skills direto do repositório:

    ```bash
    gemini skills install https://github.com/eitri-tech/eitri-coding --path plugins/eitri-coding/skills
    ```

    Por padrão elas são instaladas para o seu usuário. Para instalar só no projeto atual, adicione `--scope workspace`.

    O Gemini ativa as skills automaticamente quando a tarefa combina com a descrição delas, e pede confirmação antes de carregar cada uma. Use `/skills list` para conferir o que foi instalado.

=== "Codex"

    O Codex lê skills de `~/.agents/skills` (todos os projetos) ou `.agents/skills` (só o repositório atual). Copie as skills para lá:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    O Codex carrega as skills automaticamente. Para chamar uma explicitamente, digite `$` seguido do nome (por exemplo, `$eitri-specialist`) ou use `/skills`.

=== "Cursor"

    O Cursor lê skills de `~/.cursor/skills` ou `~/.agents/skills` (todos os projetos) e de `.cursor/skills` ou `.agents/skills` (projeto atual). Copie as skills para lá:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    O agente aplica as skills automaticamente. Para chamar uma explicitamente, digite `/` no chat do Agent e busque pelo nome, por exemplo `/eitri-specialist`.

=== "GitHub Copilot"

    O modo agente no VS Code e nas IDEs JetBrains, o Copilot CLI e o Copilot cloud agent leem skills de `~/.copilot/skills` ou `~/.agents/skills` (pessoais) e de `.github/skills` ou `.agents/skills` (repositório). Copie as skills para lá:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    Para compartilhar as skills com todo o time, copie-as para `.agents/skills` no repositório e faça commit.

=== "Outros assistentes"

    O Eitri Coding segue o padrão aberto [Agent Skills](https://agentskills.io){:target="_blank"}. Qualquer assistente que o suporte pode usar as skills: copie as pastas de `plugins/eitri-coding/skills/` para o diretório de skills que ele lê, normalmente `~/.agents/skills` ou `.agents/skills`.

    Se o assistente não suportar skills, aponte para os arquivos `SKILL.md` no arquivo de instruções que ele lê (como o `AGENTS.md`).

!!! warning "Assistentes além do Claude Code"

    Só a instalação no Claude Code é oficial. Nos outros assistentes as skills funcionam, mas com duas diferenças:

    - **Não há detecção automática de projetos Eitri.** Adicione a instrução abaixo ao `AGENTS.md` (ou `GEMINI.md`) na raiz do seu projeto, para que o assistente sempre carregue o especialista:

        ```markdown
        Este é um projeto Eitri. Antes de escrever, editar, rodar ou revisar
        qualquer código, carregue a skill `eitri-specialist` e siga as regras dela.
        ```

    - **Os scripts de device apontam para a pasta de instalação do Claude Code.** Ao usar a `eitri-device`, diga ao assistente onde você copiou as skills (por exemplo, `~/.agents/skills/eitri-device/tools/`).

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

!!! tip

    Deixe o `eitri start` (ou `eitri app start`) rodando e o Eitri Play aberto no device antes de pedir ao assistente para validar uma tela. Se o servidor não estiver rodando, o assistente o inicia.

## Exemplos de uso

Os prompts abaixo funcionam com qualquer assistente que tenha as skills instaladas. Eles estão em linguagem natural: você não precisa citar a skill, o assistente escolhe a certa.

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

**Revisar código**

```text
Revise as views em src/views/ quanto ao uso correto de Luminus e Bifrost:
tags HTML puras, uso de fetch/localStorage, awaits faltando e código que
pode quebrar em runtime.
```

## Dicas para melhores resultados

- **Abra o assistente na raiz do projeto**, onde fica o `eitri-app.conf.js` ou o `app-config.yaml`. É assim que o especialista reconhece o projeto.
- **Peça validação no device.** Terminar o prompt com "confirme no device" faz o assistente rodar o app e conferir a tela, em vez de parar no código.
- **Dê o escopo.** Diga a view, a tela ou o fluxo. Em workspaces com vários apps, diga qual Eitri-App alterar.
- **Revise antes de publicar.** O assistente sabe que a `version` do `eitri-app.conf.js` precisa ser incrementada antes do `eitri push-version`, mas publicar uma versão é decisão sua.

## Contribua

O Eitri Coding é open source (Apache-2.0) e está em desenvolvimento ativo, com o suporte se expandindo para mais assistentes conforme o feedback dos usuários. Reporte problemas e sugira melhorias no [repositório](https://github.com/eitri-tech/eitri-coding){:target="_blank"}.

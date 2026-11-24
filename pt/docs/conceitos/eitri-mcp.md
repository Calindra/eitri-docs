---
status: new
---

# Eitri MCP

O **Eitri MCP** é um servidor [MCP](https://modelcontextprotocol.io){:target="_blank"} remoto que dá ao seu assistente de IA acesso ao **Eitri Console**: aplicações, ambientes e configuração remota, temas, mini-apps, revisões, builds nativos e erros de produção. Com ele, você pede em linguagem natural ("troque o logo do header no ambiente dev", "por que o build iOS falhou?") e o assistente consulta ou altera o Console por você.

```text
https://api.eitri.tech/eitri-manager-mcp/mcp
```

O servidor já vem configurado no plugin [Eitri Coding](eitri-coding.md) e é ele que permite à skill `create-app` criar um app inteiro a partir da URL de uma loja.

## Como funciona

- **Login pelo Eitri Console.** Ao conectar, o navegador abre a tela de login do Console. Você entra com a sua conta (senha, MFA ou SSO) e volta ao assistente. Nenhum client id, secret ou token é copiado e colado.
- **As suas permissões, nada além.** O MCP age como você: só enxerga as organizações e aplicações às quais você tem acesso, com os mesmos papéis que você tem no Console.
- **Ferramentas de administrador ficam ocultas.** Ferramentas restritas ao papel de administrador da plataforma (relatórios de vendas, informações comerciais, push transacional, builds de todos os apps e criação de organizações) nem aparecem para quem não é administrador.
- **Login uma vez só.** O cliente renova o acesso sozinho, e atualizações do servidor não desconectam ninguém. Você só precisa entrar de novo se a credencial for revogada ou ficar muito tempo sem uso.

## Como conectar

=== "Plugin Eitri Coding"

    É o caminho recomendado: o plugin traz o servidor configurado, junto com as skills. Instale o plugin seguindo [Eitri Coding → Instalação](eitri-coding.md#instalacao) e faça o login:

    - **Claude Code**: rode `/mcp`, selecione `plugin:eitri-coding:eitri-manager` e escolha **Authenticate**.
    - **Codex**: faça o login quando o Codex pedir, ao instalar o plugin.
    - **Hermes Agent**: adicione o servidor com `auth: oauth` ao `~/.hermes/config.yaml` e rode `hermes mcp login eitri-manager` (veja a aba Hermes Agent da instalação).

=== "Claude Code (só o MCP)"

    Para usar o MCP sem as skills:

    ```bash
    claude mcp add --transport http eitri-manager https://api.eitri.tech/eitri-manager-mcp/mcp
    ```

    O comando só registra o servidor. Abra o Claude Code, rode `/mcp`, selecione `eitri-manager` e escolha **Authenticate** para fazer o login.

=== "Claude.ai e Claude Desktop"

    Em **Settings → Connectors**, adicione um conector personalizado (**Add custom connector**) com a URL `https://api.eitri.tech/eitri-manager-mcp/mcp` e clique em **Connect** para fazer o login no Console.

    Nos planos Team e Enterprise, um administrador da organização pode precisar adicionar o conector antes.

=== "Outros clientes MCP"

    Qualquer cliente com suporte a servidores MCP remotos (Streamable HTTP) e login OAuth funciona. Cadastre a URL `https://api.eitri.tech/eitri-manager-mcp/mcp` e inicie o login pelo próprio cliente.

!!! tip "Conferindo a conexão"

    Peça ao assistente "liste as minhas organizações no Eitri". Se ele responder com as suas organizações, o MCP está conectado.

## Segurança das escritas

Toda ferramenta que altera algo no Console segue as mesmas regras:

- **Prévia antes de aplicar.** A primeira chamada nunca escreve: ela devolve uma prévia (o diff da configuração, a versão que será substituída, os slugs que já existem). A escrita só acontece em uma segunda chamada com `confirm: true`, depois que você aprova.
- **Produção protegida.** Alterar a configuração, os aliases ou as revisões de um ambiente de produção, publicar o CSS global de um app com produção ou iniciar um build no canal de produção exige uma autorização explícita a mais (`allowProduction: true`).
- **Busca por segredos.** Antes de gravar uma configuração remota, a prévia aponta valores que parecem credenciais (`possibleLeaks`), para evitar expor segredos em um config que o app lê no cliente.
- **Sem exclusão.** Não há ferramentas para apagar organizações, aplicações, ambientes ou mini-apps. Remoções continuam sendo feitas pelo Console.
- **Dados sensíveis ficam de fora.** A `secretKey` dos mini-apps, a senha e o zip do código das revisões e os links de download dos builds nunca são retornados. Os logs de build passam por um filtro que oculta tokens e credenciais.

## Ferramentas

### Descoberta

| Ferramenta | O que faz |
| --- | --- |
| `list_my_organizations` | Lista as suas organizações, com a quantidade de apps e a imagem de cada uma. |
| `list_my_applications` | Lista as suas aplicações (id, nome, organização e labels), paginado. |
| `get_application` | Detalhes completos de uma aplicação. |
| `list_templates` | Templates disponíveis para novos apps, filtráveis por tipo e plataforma de e-commerce. |
| `get_template` | Um template, com dependências, aplicação de referência e schema do CMS. |

### Ambientes e configuração remota

| Ferramenta | O que faz |
| --- | --- |
| `list_environments` | Ambientes de uma aplicação. |
| `get_environment_config` | Configuração remota de um ambiente, com o histórico. |
| `create_environment` | Cria um ambiente, opcionalmente com uma configuração inicial. |
| `update_environment_config` | Altera a configuração remota. Com `merge: true`, só as chaves enviadas mudam (e `null` remove uma chave). |
| `restore_environment_config` | Restaura uma versão do histórico de configuração. |

### Temas

| Ferramenta | O que faz |
| --- | --- |
| `list_themes` / `get_theme` | Temas Luminus v2 da aplicação. |
| `create_theme` / `publish_theme` | Cria e publica um tema Luminus v2. |
| `list_global_css` / `get_global_css` | Builds do CSS global (Luminus v1, "CSS Global" no Console) e o conteúdo de um build. |
| `create_global_css` | Cria um build de CSS global em rascunho em todos os ambientes, recusando CSS malformado. |
| `publish_global_css` | Publica um build em todos os ambientes (publicar um build antigo é um rollback). |

### Mini-apps e revisões

| Ferramenta | O que faz |
| --- | --- |
| `list_eitri_apps` | Mini-apps (Eitri-Apps) de uma aplicação: id, slug, título e chave pública. |
| `create_eitri_apps` | Cria mini-apps e o grupo que os une. A prévia aponta slugs já em uso; com `resume: true`, retoma uma criação interrompida. |
| `set_slug_aliases` | Adiciona aliases de slug em um ambiente (por exemplo, para o código do template abrir `cart` ou `pdp`). |
| `list_revisions` | Revisões mais recentes de um mini-app ou de toda a aplicação, com os ambientes em que cada uma está publicada. |
| `list_published_revisions` | O que um ambiente está servindo. |
| `publish_revision` | Publica uma revisão enviada com `eitri push-version` em um ambiente, mostrando a versão que será substituída. |

### Criação de aplicações

| Ferramenta | O que faz |
| --- | --- |
| `create_organization` | Cria uma organização e adiciona você como `ORG_ADMIN`. **Somente administradores.** |
| `create_application` | Cria uma aplicação. Os ambientes `prod` e `dev` e um primeiro CSS global são criados junto. |
| `upload_application_icon` | Envia o ícone da aplicação a partir de uma URL pública de imagem. A imagem vira um PNG quadrado (512 px, mínimo 180 px). |
| `upload_organization_icon` | O mesmo, para a imagem da organização. |

### Builds nativos

| Ferramenta | O que faz |
| --- | --- |
| `list_app_builds` | Builds nativos recentes de uma aplicação: estado, workflow, branch e duração. |
| `diagnose_build` | Explica por que um build falhou: separa o log em etapas e traz só as linhas de erro das que falharam. Comece por aqui. |
| `get_build_log` | Um trecho do log de um build, por etapa, por busca de texto ou por intervalo de linhas. |
| `list_build_artifacts` | Arquivos gerados por um build (nome, tipo e tamanho). |
| `start_build` | Inicia um build Android ou iOS da branch `main`, no canal de desenvolvimento ou de produção. Consome minutos de build. |
| `list_all_builds` | Builds de todos os apps. **Somente administradores.** |

### Erros de produção

| Ferramenta | O que faz |
| --- | --- |
| `list_prod_errors` | Erros de runtime em produção dos mini-apps de uma aplicação, com filtros por período, mini-app e crashes. |
| `resume_prod_errors` | Erros agrupados e contados em um período. |
| `daily_error_report` | Total de erros por dia de uma organização, com a divisão por mini-app. |

### Administração

Disponíveis apenas para administradores da plataforma:

| Ferramenta | O que faz |
| --- | --- |
| `find_report_configurations` / `get_applications_sales_summary` | Configurações de relatório das lojas (VTEX, Wake, Shopify) e o resumo de vendas da loja e do app em um período. |
| `list_application_commercial_info` / `get_application_commercial_info` / `get_application_commercial_info_summary` / `upsert_application_commercial_info` | Consulta e edição das informações comerciais das aplicações. |
| `list_push_stores` / `get_push_store` / `audit_push_store_webhooks` | Lojas com push transacional configurado e a verificação do webhook de pedidos das lojas VTEX. |

Além das ferramentas, o servidor expõe o recurso `eitri://applications` e o prompt `safe_config_edit`, um roteiro para alterar a configuração de um ambiente revisando o diff antes de aplicar.

## Exemplos de uso

```text
Liste os ambientes do app Minha Loja e me mostre a configuração remota do dev.
```

```text
No ambiente dev do app Minha Loja, mude appConfigs.headerLogo para
https://cdn.minhaloja.com.br/logo.png. Mostre o diff antes de aplicar.
```

```text
Por que o último build iOS do app Minha Loja falhou?
```

```text
Publique em dev a revisão mais recente do mini-app de carrinho do app Minha Loja.
```

```text
Quais erros de produção mais aconteceram no app Minha Loja na última semana?
```

## Solução de problemas

| Sintoma | O que fazer |
| --- | --- |
| "Your Eitri connection is no longer valid" | A credencial foi revogada ou expirou. Remova e adicione o conector de novo (no Claude Code, `/mcp` → o servidor → **Authenticate**). |
| Uma ferramenta não aparece | Ela é restrita a administradores da plataforma, ou o seu cliente ainda não recarregou a lista de ferramentas depois de uma atualização. |
| `403` ao criar mini-apps, aliases, configuração ou ao publicar | Você não é membro da organização da aplicação. Peça acesso a um administrador da organização. |
| A prévia aponta `possibleLeaks` | Um valor parece um segredo. Confirme que ele pode ficar no cliente antes de aplicar; a configuração remota é lida pelo app. |

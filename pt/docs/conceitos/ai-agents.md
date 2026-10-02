---
status: new
---

# AI Agents

Com o Eitri, o seu aplicativo pode ter **agentes de IA inteligentes** integrados à experiência do usuário: assistentes virtuais que conversam, entendem o contexto da conversa, consultam informações e executam tarefas dentro do app, como buscar produtos, tirar dúvidas ou guiar uma compra.

A biblioteca **Eitri Agents** traz tudo o que o Eitri-App precisa para isso: definição dos agentes em arquivos Markdown, ferramentas (funções) em TypeScript que o agente pode chamar, histórico e contexto de conversa, envio de imagens e arquivos, além de logs e timeouts configuráveis.

[→ Documentação técnica do Eitri Agents](https://cdn.83io.com.br/library/eitri-agents/doc/latest/){:target="_blank" .md-button .md-button--primary }

## Duas formas de usar

=== "Eitri Agents"

    O agente roda na infraestrutura de agentes do próprio Eitri, e **o dono do app fornece as credenciais da LLM de sua preferência**.

    - Os prompts ficam em `agents/*.md`, e as ferramentas são escritas em TypeScript.
    - Você escolhe a LLM e o modelo.
    - Suporta RAG e áudio.
    - No Eitri-App, use o hook `useAgent`.

    As credenciais da LLM são configuradas pela CLI com o [`eitri agents setup`](eitri-cli.md#agents), tanto para o workspace quanto para produção:

    ```bash
    eitri agents setup --env production --llm <llm> --model <modelo> --api-key <api-key>
    ```

=== "Eitri Agents + VTEX CX Platform"

    O agente é criado e hospedado na **CX Platform da VTEX**, e o app passa a ser **mais um canal** de atendimento desse agente.

    - As respostas chegam em streaming via WebSocket, com reconexão automática e recuperação de sessão.
    - O histórico fica no servidor e é paginado.
    - As mensagens ricas da CX Platform (respostas rápidas, listas, CTAs e listas de produtos) chegam já normalizadas para renderizar no app.
    - No Eitri-App, use o hook `useAgentVtexCX`.

| | Eitri Agents | Eitri Agents + VTEX CX Platform |
| --- | --- | --- |
| Onde o agente vive | Infraestrutura de agentes do Eitri | CX Platform da VTEX |
| LLM | A escolhida pelo dono do app, com as credenciais dele | Gerenciada pela CX Platform |
| Prompts e ferramentas | No Eitri-App (`agents/*.md` + TypeScript) | Configurados na CX Platform |
| Hook | `useAgent` | `useAgentVtexCX` |

!!! tip

    Já usa a CX Platform da VTEX no atendimento? Com o `useAgentVtexCX`, o mesmo agente atende também dentro do seu app, sem precisar recriar prompts nem ferramentas.

Veja na [documentação técnica](https://cdn.83io.com.br/library/eitri-agents/doc/latest/){:target="_blank"} a instalação, a configuração e exemplos completos de cada modo.

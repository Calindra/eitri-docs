---
status: new
---

# AI Agents

With Eitri, your application can have **intelligent AI agents** built into the user experience: virtual assistants that chat, understand the conversation context, look up information, and perform tasks inside the app, such as searching for products, answering questions, or guiding a purchase.

The **Eitri Agents** library brings everything an Eitri-App needs for that: agents defined in Markdown files, TypeScript tools (functions) the agent can call, conversation history and context, image and file sending, plus configurable logs and timeouts.

[→ Eitri Agents technical documentation](https://cdn.83io.com.br/library/eitri-agents/doc/latest/){:target="_blank" .md-button .md-button--primary }

!!! info

    Looking for AI to help you *develop* Eitri-Apps? See [Eitri Coding](eitri-coding.md).

## Two ways to use it

=== "Eitri Agents"

    The agent runs on Eitri's own agent infrastructure, and **the app owner provides the credentials of their preferred LLM**.

    - Prompts live in `agents/*.md`, and tools are written in TypeScript.
    - You choose the LLM and the model.
    - Supports RAG and audio.
    - In the Eitri-App, use the `useAgent` hook.

    The LLM credentials are set up through the CLI with [`eitri agents setup`](eitri-cli.md#agents), both for the workspace and for production:

    ```bash
    eitri agents setup --env production --llm <llm> --model <model> --api-key <api-key>
    ```

=== "Eitri Agents + VTEX CX Platform"

    The agent is created and hosted on the **VTEX CX Platform**, and the app becomes **one more channel** for that agent.

    - Responses are streamed over WebSocket, with automatic reconnection and session recovery.
    - History is stored on the server and paginated.
    - Rich CX Platform messages (quick replies, lists, CTAs, and product lists) arrive already normalized for rendering in the app.
    - In the Eitri-App, use the `useAgentVtexCX` hook.

| | Eitri Agents | Eitri Agents + VTEX CX Platform |
| --- | --- | --- |
| Where the agent lives | Eitri's agent infrastructure | VTEX CX Platform |
| LLM | Chosen by the app owner, with their own credentials | Managed by the CX Platform |
| Prompts and tools | In the Eitri-App (`agents/*.md` + TypeScript) | Configured on the CX Platform |
| Hook | `useAgent` | `useAgentVtexCX` |

!!! tip

    Already using the VTEX CX Platform for customer service? With `useAgentVtexCX`, the same agent also serves users inside your app, with no need to recreate prompts or tools.

See the [technical documentation](https://cdn.83io.com.br/library/eitri-agents/doc/latest/){:target="_blank"} for installation, configuration, and complete examples of each mode.

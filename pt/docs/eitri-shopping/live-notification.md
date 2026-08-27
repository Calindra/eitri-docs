---
status: new
---

# Live Notification

A **Live Notification** é a notificação de acompanhamento de pedido que fica *viva* na tela do
usuário: uma barra de progresso que avança conforme o pedido muda de status, sem gerar uma nova
notificação a cada atualização.

No Android ela aparece na gaveta, na tela de bloqueio e no chip da status bar (Android 16+). No iOS
aparece na tela de bloqueio e na Dynamic Island (iOS 16.2+).

## Como funciona

A notificação **só pode ser iniciada pelo app** — normalmente na conclusão do pedido, depois que o
usuário concede a permissão de push. A partir daí ela fica ativa no aparelho e é **atualizada
remotamente** a cada mudança de status da entrega — pelo webhook da Abbiamo ou por uma chamada do
seu próprio sistema à API do Eitri.

```
app (pedido concluído) ──► inicia a Live Notification no aparelho
                                              ▲
Abbiamo ──webhook──┐                          │
                   ├──► Eitri ──push──────────┘  (atualiza status, texto e progresso)
seu sistema ──API──┘
```

Isso significa que:

- sem o app ter iniciado a notificação daquele pedido, nenhuma atualização cria uma;
- o usuário precisa ter concedido a permissão de push;
- se o usuário dispensar a notificação, ela não é recriada pelas atualizações seguintes.

---

## 1. Duas formas de atualizar

| Forma | Quando usar |
| --- | --- |
| **Webhook da Abbiamo** | A operação de entrega roda na Abbiamo: ela mesma avisa o Eitri a cada mudança de status, sem você escrever código. |
| **API do Eitri (envio genérico)** | Você tem sistema próprio (ou outro provedor de logística) e já sabe o status do pedido do seu lado. Seu backend chama o Eitri a cada mudança. |

As duas terminam no mesmo lugar: a notificação já ativa no aparelho é atualizada. Use uma ou outra —
não é necessário combinar as duas.

---

## 2. Solicitando o acesso

O acesso **não é autoatendimento** — é gerado pelo time da plataforma do Eitri para a sua loja.

Abra uma solicitação com o seu contato no Eitri (ou pelo canal de suporte) informando:

| Informação | Descrição |
| --- | --- |
| Forma de integração | Webhook da Abbiamo ou envio genérico pela API |
| Loja / ambiente | Ambiente da loja que vai receber as Live Notifications (produção, homologação) |
| Responsável técnico | E-mail de quem vai receber e guardar as credenciais |
| Conta na Abbiamo | Só para o webhook: identificação da conta/operação que dispara os eventos |
| Status a notificar | Quais status de entrega devem gerar atualização (ex.: separação, em rota, entregue) |

O time do Eitri devolve, conforme a forma escolhida:

- **Webhook da Abbiamo** — a **URL do endpoint** a ser cadastrada como webhook e um **token de
  autenticação**, enviado pela Abbiamo no header `Authorization` a cada chamada.
- **Envio genérico** — um par **`client_id` / `client_secret`**, com o escopo
  `live-notification:status`.

!!! warning "O segredo é entregue uma única vez"
    Ele não pode ser recuperado depois. Guarde-o em um cofre de segredos (Vault, AWS Secrets Manager
    etc.). Em caso de perda ou vazamento, peça uma **rotação** ao time do Eitri — uma nova credencial
    é gerada e a anterior deixa de funcionar imediatamente.

Solicite um acesso por ambiente: a credencial identifica a loja, e eventos de uma loja não podem ser
enviados com a credencial de outra.

**URL base (produção):** `https://api.eitri.tech/push-notification-eitri-shop-api`

### Cadastrando o webhook na Abbiamo

No painel da Abbiamo, cadastre o webhook de atualização de entrega com a URL fornecida e o token no
header `Authorization`. A partir daí cada mudança de status da entrega vira uma atualização da
notificação já ativa no aparelho do cliente.

### Enviando o status pela API (envio genérico)

Primeiro troque as credenciais por um access token:

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/oauth/token \
  --header 'Content-Type: application/json' \
  --data '{
    "grant_type": "client_credentials",
    "client_id": "pk_live_2f1c...",
    "client_secret": "s3cr3t..."
  }'
```

Reaproveite o token até expirar (use o `expires_in` da resposta) em vez de pedir um novo a cada
envio. Ele já identifica a loja — não existe campo de loja no corpo das chamadas seguintes.

Depois, a cada mudança de status do pedido:

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/live-notifications/order-status \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <access_token>' \
  --data '{
    "orderId": "266694368",
    "orderStatus": "DELIVERING",
    "estimatedTime": "15:35"
  }'
```

| Campo | Obrigatório | Descrição |
| --- | --- | --- |
| `orderId` | Sim | Identificador do pedido, o mesmo usado pelo app ao iniciar a notificação |
| `orderStatus` | Sim | Status configurado para a sua loja (ex.: `DELIVERING`) |
| `estimatedTime` | Não | Horário previsto de entrega exibido na notificação (ex.: `15:35`) |

O `estimatedTime` é o único conteúdo aceito no corpo — texto, ícone e progresso vêm da configuração
da loja. Se o status configurado não tiver um nome amigável definido, é o próprio `orderStatus` que
aparece na tela.

**Resposta — `202 Accepted`**

```json
{ "accepted": true, "requestId": "9c2a5f4e-..." }
```

O processamento é assíncrono: o `202` significa que a solicitação foi aceita, não que a notificação
já foi atualizada. Guarde o `requestId` — é ele que você informa ao suporte do Eitri para rastrear um
envio.

`orderId` ou `orderStatus` vazio retorna `400`; token ausente, expirado ou sem o escopo
`live-notification:status` retorna `401`/`403`.

**Quem recebe:** apenas os aparelhos que iniciaram a Live Notification **daquele pedido**. Outros
aparelhos do mesmo cliente não recebem, e um pedido sem notificação ativa simplesmente não gera
envio.

---

## 3. O que você configura

O que muda de loja para loja são os **textos e o progresso de cada status** — o restante (layout,
posição dos campos, comportamento da barra) é definido pelo sistema operacional e pelo app.

Para cada status configurável você define:

| Item | O que é | Recomendação |
| --- | --- | --- |
| Nome do status | Rótulo curto da etapa (ex.: `Em separação`, `Em rota`) | 1 ou 2 palavras |
| Mensagem | Frase de detalhe daquela etapa | uma frase curta, nunca vazia |
| Progresso | Quanto da barra já foi percorrido, de 0 a 1 | cresça sempre, sem voltar |
| Ícone | Ícone exibido no iOS | um por etapa, ou o mesmo para todas |

Além disso é configurável o **nome da loja** exibido na notificação.

**Status sem mensagem configurada não gera atualização** — é assim que se escolhe quais etapas o
cliente vê. Peça ao time do Eitri a inclusão, alteração ou remoção de um status.

O **tempo estimado** vem do próprio evento da Abbiamo (data prevista de entrega, no formato
`até HH:mm`) e não é configurável. O **número do pedido** exibido vem do app.

---

## 4. Como os dados aparecem — Android

O sistema renderiza **uma** notificação em três superfícies diferentes.

### Expandida (gaveta / tela de bloqueio)

```
┌─────────────────────────────────────────────────────────┐
│ [ícone]  nome da loja · agora                       ▾   │
│                                                         │
│  Pedido #4821                                           │
│  João está a 2 km • até 15:35                           │
│                                                         │
│  ━━━━━━━━━━━━━━━━◉─────────────────────[📍]             │
│                  ↑ progresso                            │
└─────────────────────────────────────────────────────────┘
```

### Colapsada (uma linha)

```
┌─────────────────────────────────────────────────────────┐
│ [ícone] Pedido #4821   João está a 2 km • até 15:35 ▾   │
│         ━━━━━━━━━━━━◉──────────────[📍]                 │
└─────────────────────────────────────────────────────────┘
```

O nome da loja tende a ser cortado nesse estado.

### Chip da status bar (o "Live Update")

```
┌──────────────────────────────┐
│ [◔] Em rota             14:32│
└──────────────────────────────┘
```

| Conteúdo | Onde aparece | Tamanho útil |
| --- | --- | --- |
| Número do pedido | título (1ª linha, negrito) | ~30 caracteres |
| Mensagem | corpo, 1ª parte | ~40 caracteres antes de truncar |
| Tempo estimado | corpo, logo após `" • "` | curto |
| Nome da loja | subtexto do header | ~15 caracteres |
| Nome do status | chip da status bar | ~10 caracteres — o mais apertado |
| Progresso | posição do marcador na barra | — |

!!! info "Duas características do Android"
    **O ícone configurado não é usado.** Todo status usa o ícone padrão de notificação do app.

    **A barra não tem marcos de etapa.** Ela é contínua: só o marcador se move, e a animação é o
    próprio sistema interpolando entre duas atualizações.

---

## 5. Como os dados aparecem — iOS

Cada superfície é um desenho diferente do mesmo conteúdo.

### Tela de bloqueio / banner

```
┌──────────────────────────────────────────────────────────┐
│  [🚚]   Pedido #4821                        até 15:35     │
│         Padaria Central                                   │
│  ─────────────────────────────────────────────────────    │
│  Em rota                              João está a 2 km    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     │
└──────────────────────────────────────────────────────────┘
```

Único layout em que **todos** os conteúdos aparecem juntos.

### Dynamic Island expandida

```
        ╭───────────────────────────────────────╮
        │  [🚚]   Pedido #4821       até 15:35  │
        │                                       │
        │          João está a 2 km             │
        │  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░      │
        ╰───────────────────────────────────────╯
```

### Dynamic Island compacta

```
   ╭─────────────────────╮
   │ [🚚]     até 15:35  │
   ╰─────────────────────╯
```

### Dynamic Island mínima

```
   ╭────╮
   │[🚚]│   ← só o ícone
   ╰────╯
```

| Conteúdo | Tela de bloqueio | DI expandida | DI compacta | DI mínima |
| --- | --- | --- | --- | --- |
| Ícone | ✅ à esquerda | ✅ à esquerda | ✅ à esquerda | ✅ único |
| Número do pedido | ✅ título | ✅ centro | ❌ | ❌ |
| Nome da loja | ✅ sob o título | ❌ | ❌ | ❌ |
| Nome do status | ✅ esquerda, negrito | ❌ | ❌ | ❌ |
| Mensagem | ✅ direita, cinza | ✅ abaixo | ❌ | ❌ |
| Tempo estimado | ✅ topo-direita | ✅ à direita | ✅ à direita | ❌ |
| Progresso | ✅ barra | ✅ barra | ❌ | ❌ |

Na Dynamic Island compacta o tempo estimado divide espaço com o relógio e trunca acima de ~6
caracteres: `até 15:35` cabe, `15 minutos` não.

---

## 6. Quando a notificação não aparece

A entrega é assíncrona e, em algumas situações, o evento é recebido sem gerar atualização:

- o app não iniciou a Live Notification daquele pedido (aparelho sem suporte, permissão de push
  negada, ou o pedido não se enquadra nas regras do app);
- não há mensagem configurada para aquele status;
- o usuário dispensou a notificação daquele pedido.

Em caso de dúvida sobre um envio específico, informe ao suporte do Eitri o pedido e o horário do
evento — ou o `requestId`, quando o envio foi feito pela API.

## Veja também

- [Push-notifications](push-notification.md)
- [API de Push para Parceiros](partner-push-api.md)
- [Deeplinks](deeplinks.md)

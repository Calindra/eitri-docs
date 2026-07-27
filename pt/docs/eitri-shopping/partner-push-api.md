---
status: new
---

# API de Push para Parceiros

Esta página é destinada a **parceiros do Eitri** que precisam disparar push notifications para os dispositivos de uma loja Eitri Shopping usando a infraestrutura do Eitri (o serviço `push-notification-eitri-shop-api`).

O fluxo é padrão OAuth 2.0 *client credentials*:

1. O time interno do Eitri gera um par **`client_id` / `client_secret`** para a sua integração, vinculado a uma loja específica.
2. Você troca essas credenciais por um **access token** em `POST /v1/oauth/token`.
3. Você usa esse token para chamar um dos endpoints de envio:
    - `POST /v1/partner/push` — push livre, com título, corpo e dispositivos definidos por você.
    - `POST /v1/partner/push/order-status` — push de alteração de status de pedido, em que você envia apenas o pedido e o Eitri monta e dispara a notificação.

**URL base (produção):** `https://api.eitri.tech/push-notification-eitri-shop-api`

---

## 1. Solicitando as credenciais

**As credenciais não são autoatendimento.** Não existe endpoint público de cadastro: a criação é feita por um administrador do Eitri através de uma rota protegida por token de ADMIN.

Abra uma solicitação com o time interno do Eitri (seu contato comercial ou o canal de suporte) informando:

| Informação | Descrição |
| --- | --- |
| Loja / ambiente (`envKey`) | Identificador do ambiente da loja para o qual os pushes serão enviados |
| `label` | Nome do parceiro ou da integração que vai usar a credencial (ex.: `crm-acme`) |
| Escopos necessários | Atualmente o único escopo disponível é `push:send` (aplicado por padrão) |
| Responsável técnico | E-mail de quem vai receber e guardar o segredo |

Após a criação, **o time do Eitri fornece a você o `client_id` e o `client_secret`** — é esse par que você usará para se autenticar em `POST /v1/oauth/token` e obter o access token do push.

!!! warning "O `clientSecret` é entregue uma única vez"
    O Eitri armazena apenas um hash do segredo — não é possível recuperá-lo depois. Guarde-o em um cofre de segredos (Vault, AWS Secrets Manager, etc.). Se ele for perdido ou vazar, peça uma **rotação** ao time do Eitri: um novo segredo é gerado e o anterior deixa de funcionar imediatamente.

### Ciclo de vida da credencial

Todas as operações abaixo são executadas pelo time interno do Eitri, mediante solicitação:

- **Criação** — gera `client_id` e `client_secret` para uma loja.
- **Rotação** — gera um novo segredo para o mesmo `client_id` (invalida o anterior).
- **Atualização de escopos** — altera o conjunto de escopos da credencial.
- **Revogação** — marca a credencial como `revoked`. Tokens já emitidos param de funcionar na próxima chamada, pois o status da credencial é verificado a cada requisição.

Uma credencial é sempre vinculada a **uma única loja**. Se você atende várias lojas, solicite uma credencial por loja.

---

## 2. Obtendo o access token

`POST /v1/oauth/token`

Endpoint público (não requer autenticação prévia além das próprias credenciais). O `grant_type` suportado é `client_credentials`.

As credenciais podem ser enviadas de duas formas:

**a) No corpo da requisição**

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

**b) Via HTTP Basic** (`Authorization: Basic base64(client_id:client_secret)`)

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/oauth/token \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Basic cGtfbGl2ZV8yZjFjLi4uOnMzY3IzdC4uLg==' \
  --data '{ "grant_type": "client_credentials" }'
```

Resposta:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "push:send"
}
```

O token é um JWT com validade padrão de **900 segundos (15 minutos)** — sempre use o valor retornado em `expires_in` em vez de fixar o tempo no código. Ele carrega a loja (`storeId` / `storeEnvId`) e os escopos da credencial; você não precisa (nem deve) informar a loja manualmente nas chamadas seguintes.

Reaproveite o token até ele expirar em vez de pedir um novo a cada push.

### Erros

| HTTP | `name` | Quando ocorre |
| --- | --- | --- |
| 400 | `unsupported_grant_type` | `grant_type` diferente de `client_credentials` |
| 400 | `invalid_request` | `client_id` ou `client_secret` ausente |
| 401 | `invalid_client` | Credenciais inválidas, inexistentes ou revogadas |

---

## 3. Enviando um push livre

`POST /v1/partner/push`

Requer o header `Authorization: Bearer <access_token>` e o escopo `push:send`.

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/partner/push \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --data '{
    "deviceIds": ["fcm-token-do-dispositivo-1", "fcm-token-do-dispositivo-2"],
    "notification": {
      "title": "Seu pedido saiu para entrega",
      "body": "Acompanhe pelo app",
      "image": "https://cdn.exemplo.com/banner.png"
    },
    "data": {
      "deeplink": "eitrishopping://orders/123"
    }
  }'
```

### Corpo da requisição

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `deviceIds` | `string[]` | Sim | Tokens de dispositivo (FCM) previamente registrados no Eitri para essa loja. Não pode ser vazio. |
| `notification.title` | `string` | Sim | Título da notificação (não pode ser vazio) |
| `notification.body` | `string` | Sim | Corpo da notificação (não pode ser vazio) |
| `notification.image` | `string` | Não | URL da imagem exibida na notificação |
| `data` | `object<string,string>` | Não | Payload extra entregue ao app (todos os valores devem ser string). Use aqui o deeplink de destino. |
| `apns` | `object` | Não | Overrides específicos de APNs (iOS) repassados ao Firebase |
| `storeId` / `storeEnvId` | `string` | Não | Opcionais e redundantes: se enviados, precisam ser idênticos aos do token, caso contrário a requisição é rejeitada com `403` |

!!! info "Não existe broadcast"
    A API **sempre** exige a lista explícita de `deviceIds`. Não há envio para "todos os dispositivos da loja" — cabe ao parceiro manter a base de tokens que deseja atingir.

### Resposta — `202 Accepted`

```json
{
  "accepted": true,
  "requestId": "9c2a5f4e-...",
  "enqueued": 2
}
```

O envio é **assíncrono**: o `202` significa que a mensagem foi enfileirada com sucesso, não que a notificação já chegou ao dispositivo. Guarde o `requestId` — é ele que o time do Eitri usa para rastrear o envio nos logs.

Durante o processamento, cada `deviceId` é resolvido e validado contra a loja do token. Dispositivos não encontrados ou pertencentes a outra loja são **descartados silenciosamente** (e registrados para auditoria), portanto `enqueued` reflete o que foi aceito, não o total efetivamente entregue.

### Erros

| HTTP | `name` | Quando ocorre |
| --- | --- | --- |
| 400 | `invalid_target` | `deviceIds` ausente, vazio ou com item em branco |
| 400 | `invalid_notification` | `notification.title` ou `notification.body` vazio |
| 401 | `UNAUTHORIZED` | Token ausente ou inválido |
| 401 | `invalid_token` | Credencial revogada ou inativa |
| 403 | `FORBIDDEN` | Token sem o escopo `push:send`, ou `storeId`/`storeEnvId` do corpo divergente do token |
| 404 | `store.not.found` | Loja do token não encontrada |

---

## 4. Push de alteração de status de pedido

`POST /v1/partner/push/order-status`

Alternativa ao endpoint anterior para o caso mais comum: avisar o cliente de que o **status do pedido mudou**. Aqui o parceiro **não monta a notificação nem escolhe os dispositivos** — envia apenas a identificação do pedido e o novo status, e o Eitri faz o resto:

1. Recebe o `orderId` e o `orderStatus`.
2. Busca o pedido na plataforma de e-commerce da loja (VTEX, Wake ou Shopify) para descobrir o cliente e os dados do pedido.
3. Resolve os dispositivos daquele cliente registrados para a loja.
4. Monta a notificação a partir da **mensagem configurada para aquele parceiro e aquele status** e dispara o push.

Isso significa que os textos das notificações são definidos na configuração da integração junto ao Eitri, e não a cada requisição — para alterá-los, fale com o time do Eitri.

Requer o header `Authorization: Bearer <access_token>`, exatamente como o endpoint de push livre.

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/partner/push/order-status \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --data '{
    "orderId": "123",
    "orderStatus": "CHANGE"
  }'
```

### Corpo da requisição

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `orderId` | `string` | Sim | Identificador do pedido na plataforma de e-commerce da loja |
| `orderStatus` | `string` | Sim | Novo status do pedido, conforme a nomenclatura da plataforma da loja |

A loja é sempre a do token — não há campo de loja no corpo e não é possível consultar pedidos de outra loja com a mesma credencial.

### Resposta — `202 Accepted`

Assim como no push livre, o processamento é assíncrono: o `202` confirma que a solicitação foi aceita e enfileirada, não que a notificação foi entregue. A resposta traz um `requestId` para rastreamento nos logs do Eitri.

O push pode não ser enviado — sem erro para o parceiro — quando o pedido não é encontrado na plataforma, o cliente não possui dispositivos registrados, ou não há mensagem configurada para aquele status. Esses casos ficam registrados nos logs do Eitri e podem ser consultados pelo `requestId`.

### Erros

| HTTP | Quando ocorre |
| --- | --- |
| 400 | `orderId` ou `orderStatus` ausente ou vazio |
| 401 | Token ausente, inválido, expirado ou credencial revogada |
| 403 | Token sem o escopo necessário |
| 404 | Loja do token não encontrada |

---

## Boas práticas

- **Guarde o segredo em cofre**, nunca no código-fonte, em repositório ou no front-end. A integração deve ser feita a partir do seu backend.
- **Cacheie o access token** durante sua validade e renove-o apenas quando expirar (ou ao receber `401`).
- **Trate o `202` como aceite, não como entrega.** Se precisar de confirmação de entrega, alinhe com o time do Eitri.
- **Envie os `deviceIds` em lotes** em vez de uma requisição por dispositivo.
- **Peça rotação imediata** ao suspeitar de vazamento do segredo.

## Deeplinks

Para direcionar o usuário a uma tela específica ao tocar na notificação, use o campo `data` com o deeplink correspondente. Veja [nossa documentação de deeplinks](deeplinks.md) para saber como estruturá-los.

---
status: new
---

# Partner Push API

This page is for **Eitri partners** that need to send push notifications to the devices of an Eitri Shopping store using Eitri's infrastructure (the `push-notification-eitri-shop-api` service).

The flow is a standard OAuth 2.0 *client credentials* exchange:

1. The internal Eitri team generates a **`client_id` / `client_secret`** pair for your integration, bound to a specific store.
2. You exchange those credentials for an **access token** at `POST /v1/oauth/token`.
3. You use that token to call one of the delivery endpoints:
    - `POST /v1/partner/push` — free-form push, with the title, body and target devices defined by you.
    - `POST /v1/partner/push/order-status` — order status change push, where you send only the order and Eitri builds and fires the notification.

**Base URL (production):** `https://api.eitri.tech/push-notification-eitri-shop-api`

---

## 1. Requesting credentials

**Credentials are not self-service.** There is no public sign-up endpoint: they are created by an Eitri administrator through an ADMIN-protected route.

Open a request with the internal Eitri team (your commercial contact or the support channel) providing:

| Information | Description |
| --- | --- |
| Store / environment (`envKey`) | Identifier of the store environment the pushes will target |
| `label` | Name of the partner or integration that will use the credential (e.g. `crm-acme`) |
| Required scopes | Currently the only available scope is `push:send` (applied by default) |
| Technical owner | E-mail of whoever will receive and store the secret |

Once created, **the Eitri team provides you with the `client_id` and the `client_secret`** — that pair is what you use to authenticate at `POST /v1/oauth/token` and get the push access token.

!!! warning "The `clientSecret` is handed over only once"
    Eitri stores only a hash of the secret — it cannot be retrieved later. Keep it in a secret manager (Vault, AWS Secrets Manager, etc.). If it is lost or leaked, ask the Eitri team for a **rotation**: a new secret is generated and the previous one stops working immediately.

### Credential lifecycle

All the operations below are performed by the internal Eitri team, upon request:

- **Creation** — generates a `client_id` and `client_secret` for a store.
- **Rotation** — generates a new secret for the same `client_id` (invalidates the previous one).
- **Scope update** — changes the set of scopes assigned to the credential.
- **Revocation** — marks the credential as `revoked`. Already-issued tokens stop working on the next call, since the credential status is checked on every request.

A credential is always bound to **a single store**. If you serve multiple stores, request one credential per store.

---

## 2. Getting the access token

`POST /v1/oauth/token`

Public endpoint (no authentication beyond the credentials themselves). The supported `grant_type` is `client_credentials`.

Credentials can be sent in two ways:

**a) In the request body**

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

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "push:send"
}
```

The token is a JWT valid for **900 seconds (15 minutes)** by default — always rely on the returned `expires_in` instead of hardcoding the lifetime. It carries the store (`storeId` / `storeEnvId`) and the credential scopes; you do not need to (and should not) pass the store manually in the following calls.

Reuse the token until it expires instead of requesting a new one for every push.

### Errors

| HTTP | `name` | When it happens |
| --- | --- | --- |
| 400 | `unsupported_grant_type` | `grant_type` other than `client_credentials` |
| 400 | `invalid_request` | Missing `client_id` or `client_secret` |
| 401 | `invalid_client` | Invalid, unknown or revoked credentials |

---

## 3. Sending a free-form push

`POST /v1/partner/push`

Requires the `Authorization: Bearer <access_token>` header and the `push:send` scope.

```bash
curl --request POST \
  --url https://api.eitri.tech/push-notification-eitri-shop-api/v1/partner/push \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
  --data '{
    "deviceIds": ["device-1-fcm-token", "device-2-fcm-token"],
    "notification": {
      "title": "Your order is out for delivery",
      "body": "Track it in the app",
      "image": "https://cdn.example.com/banner.png"
    },
    "data": {
      "deeplink": "eitrishopping://orders/123"
    }
  }'
```

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deviceIds` | `string[]` | Yes | Device (FCM) tokens previously registered with Eitri for that store. Must not be empty. |
| `notification.title` | `string` | Yes | Notification title (must not be empty) |
| `notification.body` | `string` | Yes | Notification body (must not be empty) |
| `notification.image` | `string` | No | URL of the image shown in the notification |
| `data` | `object<string,string>` | No | Extra payload delivered to the app (all values must be strings). Put the target deeplink here. |
| `apns` | `object` | No | APNs-specific (iOS) overrides forwarded to Firebase |
| `storeId` / `storeEnvId` | `string` | No | Optional and redundant: if sent, they must match the token exactly, otherwise the request is rejected with `403` |

!!! info "There is no broadcast"
    The API **always** requires an explicit `deviceIds` list. There is no "send to every device in the store" mode — keeping the list of tokens you want to reach is the partner's responsibility.

### Response — `202 Accepted`

```json
{
  "accepted": true,
  "requestId": "9c2a5f4e-...",
  "enqueued": 2
}
```

Delivery is **asynchronous**: the `202` means the message was successfully enqueued, not that the notification already reached the device. Keep the `requestId` — the Eitri team uses it to trace the delivery in the logs.

During processing, each `deviceId` is resolved and validated against the token's store. Devices that are not found or belong to another store are **silently dropped** (and logged for auditing), so `enqueued` reflects what was accepted, not what was actually delivered.

### Errors

| HTTP | `name` | When it happens |
| --- | --- | --- |
| 400 | `invalid_target` | `deviceIds` missing, empty, or containing a blank item |
| 400 | `invalid_notification` | Empty `notification.title` or `notification.body` |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 401 | `invalid_token` | Revoked or inactive credential |
| 403 | `FORBIDDEN` | Token without the `push:send` scope, or body `storeId`/`storeEnvId` diverging from the token |
| 404 | `store.not.found` | Store from the token not found |

---

## 4. Order status change push

`POST /v1/partner/push/order-status`

An alternative to the previous endpoint for the most common case: telling the customer that the **order status has changed**. Here the partner **does not build the notification nor pick the devices** — it sends only the order identification and the new status, and Eitri does the rest:

1. Receives the `orderId` and the `orderStatus`.
2. Fetches the order from the store's e-commerce platform (VTEX, Wake or Shopify) to resolve the customer and the order data.
3. Resolves that customer's devices registered for the store.
4. Builds the notification from the **message configured for that specific partner and status** and fires the push.

This means notification texts are defined in the integration configuration with Eitri, not per request — to change them, talk to the Eitri team.

Requires the `Authorization: Bearer <access_token>` header, exactly like the free-form push endpoint.

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

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `orderId` | `string` | Yes | Order identifier in the store's e-commerce platform |
| `orderStatus` | `string` | Yes | New order status, following the naming used by the store's platform |

The store is always the one in the token — there is no store field in the body, and the same credential cannot look up orders from another store.

### Response — `202 Accepted`

As with the free-form push, processing is asynchronous: the `202` confirms the request was accepted and enqueued, not that the notification was delivered. The response carries a `requestId` for tracing in Eitri's logs.

The push may end up not being sent — with no error returned to the partner — when the order is not found in the platform, the customer has no registered devices, or there is no message configured for that status. Those cases are recorded in Eitri's logs and can be looked up by `requestId`.

### Errors

| HTTP | When it happens |
| --- | --- |
| 400 | Missing or empty `orderId` or `orderStatus` |
| 401 | Missing, invalid or expired token, or revoked credential |
| 403 | Token without the required scope |
| 404 | Store from the token not found |

---

## Best practices

- **Keep the secret in a vault**, never in source code, in a repository or on the front-end. The integration must run from your backend.
- **Cache the access token** for its lifetime and refresh it only when it expires (or upon a `401`).
- **Treat `202` as acceptance, not delivery.** If you need delivery confirmation, align with the Eitri team.
- **Send `deviceIds` in batches** instead of one request per device.
- **Ask for an immediate rotation** if you suspect the secret has leaked.

## Deeplinks

To route the user to a specific screen when the notification is tapped, use the `data` field with the corresponding deeplink. See [our deeplinks documentation](deeplinks.md) to learn how to structure them.

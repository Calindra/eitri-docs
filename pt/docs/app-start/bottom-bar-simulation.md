---
status: new
---

# Simulação de Bottom Tab View

A chave `bottom-tab-view-simulation` permite simular uma navegação por **abas inferiores** (bottom tabs), muito comum em aplicativos mobile nativos. Essa funcionalidade serve para testar múltiplos **Eitri-Apps** simultaneamente como se fossem seções de um mesmo app, facilitando a visualização do comportamento integrado entre eles.

### 🔧 Requisitos Mínimos

- Versão da CLI : 1.44.0 ou superior

### 🔧 Estrutura YAML

Adicione a chave `bottom-tab-view-simulation` à sua `app-config.yaml` e defina a lista `eitri-apps` com os Eitri-Apps desejados para serem mostrados na aba inferior.

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "slug-do-eitri-app"
      title: "Título da Aba"
      initialization-params: "chave1=valor1&chave2=valor2"
      init-params: { "chave": "valor" }
```

### 🧩 Campos disponíveis

| Campo                   | Tipo     | Obrigatório | Descrição                                                   |
| ----------------------- | -------- | ----------- | ----------------------------------------------------------- |
| `slug`                  | `string` | ✅ Sim      | Identificador do Eitri-App que será carregado.              |
| `title`                 | `string` | ✅ Sim      | Nome da aba que aparecerá na bottom bar.                    |
| `initialization-params` | `string` | ❌ Não      | Query string de inicialização no formato `chave=valor&...`. |
| `init-params`           | `object` | ❌ Não      | Parâmetros de inicialização no formato objeto JSON.         |

> **Obs:** Os campos `initialization-params` e `init-params` são **equivalentes**, mas apenas um deles deve ser usado por aba. O comportamento é o mesmo, mas os formatos são diferentes:
>
> - `initialization-params`: útil para testes rápidos, via string de URL.
> - `init-params`: útil para estruturas mais complexas, com objetos ou arrays.

---

### ✅ Exemplo completo

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "power-rune"
      title: "Primeira"
      initialization-params: "var1=xpto&var2=foobar"

    - slug: "eihwaz-rune"
      title: "Segunda"
      init-params: { "foo": "bar" }

    - slug: "eitri-doctor"
      title: "Terceira"

    - slug: "eitri-doctor"
      title: "Quarta"
```

---

### 💡 Dicas

- Utilize `initialization-params` se quiser passar rapidamente dados simulando query strings.
- Prefira `init-params` caso o app consuma um payload estruturado via JSON.
- Títulos iguais ou diferentes são permitidos; o controle visual é baseado na ordem de declaração.

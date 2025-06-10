---
status: new
---

# Simulação de Bottom Tab View

A chave `bottom-tab-view-simulation` permite simular uma interface de **navegação por abas inferiores** (bottom tab), semelhante aos aplicativos mobile nativos. Essa funcionalidade possibilita rodar múltiplos **Eitri-Apps** em paralelo, cada um exibido como uma aba, facilitando os testes e a visualização de apps como se fossem seções de um único aplicativo.

---

### 🔧 Estrutura YAML

Adicione a chave `bottom-tab-view-simulation` à sua `app-config.yaml` e defina a lista `eitri-apps` com os Eitri-Apps desejados para serem mostrados na aba inferior.

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "slug-do-eitri-app"
      title: "Título da Aba"
      initialization-params:
        type: "string"
        value: "<valor de inicialização>"
```

---

### 🧩 Campos disponíveis

| Campo                   | Tipo     | Obrigatório | Descrição                                            |
| ----------------------- | -------- | ----------- | ---------------------------------------------------- |
| `slug`                  | `string` | ✅ Sim      | Identificador (slug) do Eitri-App a ser carregado.   |
| `title`                 | `string` | ✅ Sim      | Nome da aba exibida na bottom bar.            
<!-- | `initialization-params` | `json`   | ❌ Não      | Parâmetros de inicialização como JSON (veja abaixo). | -->

<!-- #### JSON `initialization-params`

| Campo   | Tipo     | Obrigatório | Descrição                                                                  |
| ------- | -------- | ----------- | -------------------------------------------------------------------------- |
| `type`  | `string` | ✅ Sim      | Pode ser `"string"` (formato query string) ou `"json"` (formato JSON).     |
| `value` | `string` | ✅ Sim      | Valor a ser passado para inicialização. O formato depende do campo `type`. |

> O campo `initialization-params` é opcional e deve ser usado **somente se for necessário passar dados de entrada** ao app no momento da inicialização.
> Ambos os campos `type` e `value` são obrigatórios caso você deseje usá-lo. -->

---

### ✅ Exemplo completo

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "power-rune"
      title: "Primeira"
      initialization-params:
        type: "string"
        value: "var1=xpto&var2=foobar"

    - slug: "eihwaz-rune"
      title: "Segunda"

    - slug: "eitri-doctor"
      title: "Terceira"

    - slug: "eitri-doctor"
      title: "Quarta"
```

---

### 💡 Dicas

- Use `type: "string"` para entradas rápidas no estilo de query string (`chave=valor`).
<!-- - Use `type: "json"` para passar dados estruturados como string JSON (ex: `'{ "foo": "bar" }'`).
- O valor do campo `value` **deve sempre ser uma string válida**, mesmo no caso de JSON.
- As abas são exibidas na ordem em que são declaradas no YAML. -->
- Você pode repetir o mesmo `slug` com títulos ou parâmetros diferentes.

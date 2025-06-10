---
status: new
---

# Bottom Tab View Simulation

The `bottom-tab-view-simulation` key allows you to simulate a **bottom tab navigation** interface, similar to those found in native mobile apps. This feature enables running multiple **Eitri-Apps** in parallel, each shown as a tab, making it easier to test apps as if they were sections of a single application.

---

### 🔧 YAML Structure

Add the `bottom-tab-view-simulation` key to your `app-config.yaml` file, and define the `eitri-apps` list with the desired Eitri-Apps to show in the bottom tab view.

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "eitri-app-slug"
      title: "Tab Title"
      initialization-params:
        type: "string"
        value: "<initialization payload>"
```

---

### 🧩 Available Fields

| Field                   | Type     | Required | Description                                     |
| ----------------------- | -------- | -------- | ----------------------------------------------- |
| `slug`                  | `string` | ✅ Yes   | The identifier (slug) of the Eitri-App to load. |
| `title`                 | `string` | ✅ Yes   | The title shown on the bottom tab for this app. |
<!-- | `initialization-params` | `json`   | ❌ No    | Initialization params as JSON (see below).      | -->

<!-- #### `initialization-params` JSON

| Field   | Type     | Required | Description                                                                          |
| ------- | -------- | -------- | ------------------------------------------------------------------------------------ |
| `type`  | `string` | ✅ Yes   | Must be either `"string"` (for query string format) or `"json"` (for JSON payloads). |
| `value` | `string` | ✅ Yes   | The actual initialization value, format depends on `type`.                           |

> Only include `initialization-params` if you need to pass input to the app at startup.
> You **must** set both `type` and `value` if using this field. -->

---

### ✅ Full Example

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "power-rune"
      title: "First"
      initialization-params:
        type: "string"
        value: "var1=xpto&var2=foobar"

    - slug: "eihwaz-rune"
      title: "Second"

    - slug: "eitri-doctor"
      title: "Third"

    - slug: "eitri-doctor"
      title: "Fourth"
```

---

### 💡 Tips

- Use `type: "string"` for quick query-style inputs like `key=value&key2=value2`.
<!-- - Use `type: "json"` to pass structured data as a JSON string (e.g., `{ "foo": "bar" }`). -->
<!-- - The `value` must always be a **valid string**, even when the type is `json`. -->
- The tabs appear in the order they're listed.

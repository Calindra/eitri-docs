---
status: new
---

# Bottom Tab View Simulation

The `bottom-tab-view-simulation` key allows you to simulate a **bottom tab navigation** interface, similar to native mobile apps. This feature enables you to run multiple **Eitri-Apps** side by side, as if they were different sections of the same app, making it easier to test and visualize integrated behavior.

## Minimum Requirements

- CLI Version: 1.44.0 or higher

### 🔧 YAML Structure

Add the `bottom-tab-view-simulation` key to your `app-config.yaml` file, and define the `eitri-apps` list with the desired Eitri-Apps to show in the bottom tab view.

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "eitri-app-slug"
      title: "Tab Title"
      initialization-params: "key1=value1&key2=value2"
      init-params: { "key": "value" }
```

### 🧩 Available Fields

| Field                   | Type     | Required | Description                                                |
| ----------------------- | -------- | -------- | ---------------------------------------------------------- |
| `slug`                  | `string` | ✅ Yes   | The identifier (slug) of the Eitri-App to load.            |
| `title`                 | `string` | ✅ Yes   | The title shown on the bottom tab for this app.            |
| `initialization-params` | `string` | ❌ No    | Initialization query string in the format `key=value&...`. |
| `init-params`           | `object` | ❌ No    | Initialization parameters in JSON object format.           |

> **Note:** You should use **either** `initialization-params` **or** `init-params`, not both. They serve the same purpose but support different formats:
>
> - `initialization-params`: ideal for quick testing with URL-style query strings.
> - `init-params`: better suited for more complex structured data, like nested objects.

---

### ✅ Full Example

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "power-rune"
      title: "First"
      initialization-params: "var1=xpto&var2=foobar"

    - slug: "eihwaz-rune"
      title: "Second"
      init-params: { "foo": "bar" }

    - slug: "eitri-doctor"
      title: "Third"

    - slug: "eitri-doctor"
      title: "Fourth"
```

---

### 💡 Tips

- Use `initialization-params` when you want to simulate query strings quickly.
- Use `init-params` when you need to pass structured JSON payloads to the app.
- You can repeat the same app (`slug`) with different tab titles or parameters.
- Tab order follows the order defined in the YAML list.

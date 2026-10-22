---
status: new
---

# Bottom Tab Bar Simulation

While developing your app using Eitri, the `bottom-tab-view-simulation` key in your `app-config.yaml` file allows you to simulate a **bottom tab navigation** interface, similar to those found in native mobile apps. This feature enables running multiple **Eitri-Apps** in parallel, each shown as a tab, making it easier to test apps as if they were sections of a single application.

---

## 📋 Default bar

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

To customize the look of the bar (colors, icons, badges), create a `dynamic-bottom-tab-view-spec.json` file at the project root. See [Dynamic bottom bar](#dynamic-bottom-bar).

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

## 🎨 Dynamic bottom bar

By default, the simulation draws a simple bar with text-only tabs. Create a `dynamic-bottom-tab-view-spec.json` file at the project root, next to `app-config.yaml`, and the app renders the same **dynamic bottom bar** used by production apps, with your colors, icons, badges, border and sizes.

The `bottom-tab-view-simulation` key in `app-config.yaml` is still required: it defines which Eitri-App each tab opens and each tab's `initialization-params`. The JSON file only defines the look.

`app-config.yaml`:

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "eitri-app-slug"
      title: "Tab Title"
```

`dynamic-bottom-tab-view-spec.json`:

```json
{
  "layout": {
    "theme": "classic",
    "backgroundColor": "#FFFFFF"
  },
  "eitriApps": [
    {
      "slug": "eitri-app-slug",
      "title": "Tab Title",
      "icon": "https://example.com/icon_home.png"
    }
  ]
}
```

The file holds two nodes:

- `layout`: how the bar looks.
- `eitriApps`: the title, icon and badge of each tab, in the same order as `eitri-apps`.

### Appearance

Fields under `layout`.

| Field                | Type                         | Description                                                                                       |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `theme`              | `string`                     | Bar theme. Currently only `classic` (also the default).                                           |
| `backgroundColor`    | `string`                     | Bar background color (hex).                                                                       |
| `selectedColor`      | `string`                     | Icon and label color of the selected tab (hex).                                                   |
| `unselectedColor`    | `string`                     | Icon and label color of the other tabs (hex).                                                     |
| `badgeBackground`    | `string`                     | Background color of every badge (hex). Default: red.                                              |
| `badgeTextColor`     | `string`                     | Text color of every badge (hex). Default: white.                                                  |
| `fontFamily`         | `{ android, ios }`           | Label font. It must already be bundled with the app; otherwise the system font is used.          |
| `selectedFontFamily` | `{ android, ios }`           | Label font of the selected tab. When omitted, `fontFamily` is used.                              |
| `themeCustomizations`| `object`                     | Layout settings per theme. See `classic` below.                                                  |

### `classic` theme

Fields under `layout.themeCustomizations.classic`.

| Field              | Type                    | Default   | Description                                                                 |
| ------------------ | ----------------------- | --------- | --------------------------------------------------------------------------- |
| `labels`           | `"shown"` \| `"hidden"` | `shown`   | `hidden` removes every title and centers the icons.                         |
| `topBorder`        | `{ thickness, color }`  | no border | Top border of the bar. `thickness: 0` removes it.                           |
| `iconSize`         | `number`                | `24`      | Width and height of each icon.                                              |
| `labelFontSize`    | `number`                | `12`      | Label font size.                                                            |
| `iconLabelSpacing` | `number`                | `2`       | Vertical space between icon and label.                                      |
| `paddingTop`       | `number`                | `6`       | Space above the icon.                                                       |
| `paddingBottom`    | `number`                | `6`       | Space below the label.                                                      |

The bar height can't be set directly. It follows the content: `paddingTop` + icon + `iconLabelSpacing` + label + `paddingBottom`.

### Tabs

Fields of each item in `eitriApps`.

| Field   | Type     | Required | Description                                                                                   |
| ------- | -------- | -------- | --------------------------------------------------------------------------------------------- |
| `slug`  | `string` | ✅ Yes   | Slug of the tab's Eitri-App. Use the same one as the matching tab in `eitri-apps`.            |
| `title` | `string` | ✅ Yes   | Tab label. Takes precedence over the `title` in `eitri-apps`. An empty string hides the label. |
| `icon`  | `string` | ❌ No    | Icon URL (`https`).                                                                           |
| `badge` | `string` | ❌ No    | Initial badge text over the icon. Omit for no badge.                                          |

If any item is missing `slug` or `title`, the whole file is rejected.

!!! warning "Icon requirements"
    The bar repaints each icon with `selectedColor` / `unselectedColor`, so only the icon's shape matters.

    - **PNG with a transparent background.** An opaque background turns the tab into a solid square.
    - Draw the icon in a **single flat color** (black is the usual choice).
    - Use a **square** image, around **96×96 px**, with the same padding across all icons.
    - The URL must be **`https`**.

### ✅ Full example

`app-config.yaml`:

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "my-store-home"
      title: "Home"
      initialization-params:
        type: "string"
        value: "tabIndex=0"
    - slug: "my-store-home"
      title: "Categories"
      initialization-params:
        type: "string"
        value: "tabIndex=1&route=Categories"
    - slug: "my-store-cart"
      title: "Cart"
      initialization-params:
        type: "string"
        value: "tabIndex=2"
    - slug: "my-store-account"
      title: "Profile"
      initialization-params:
        type: "string"
        value: "tabIndex=3"
```

`dynamic-bottom-tab-view-spec.json`:

```json
{
  "layout": {
    "theme": "classic",
    "backgroundColor": "#FFFFFF",
    "selectedColor": "#373737",
    "unselectedColor": "#8B8D98",
    "badgeBackground": "#E5484D",
    "badgeTextColor": "#FFFFFF",
    "themeCustomizations": {
      "classic": {
        "labels": "shown",
        "topBorder": {
          "thickness": 1,
          "color": "#DBDDE0"
        }
      }
    }
  },
  "eitriApps": [
    {
      "slug": "my-store-home",
      "title": "Home",
      "icon": "https://media-eitri-content.eitri.tech/default/icon_home_v1.png"
    },
    {
      "slug": "my-store-home",
      "title": "Categories",
      "icon": "https://media-eitri-content.eitri.tech/default/icon_menu_v1.png"
    },
    {
      "slug": "my-store-cart",
      "title": "Cart",
      "icon": "https://media-eitri-content.eitri.tech/default/icon_cart_v1.png",
      "badge": "2"
    },
    {
      "slug": "my-store-account",
      "title": "Profile",
      "icon": "https://media-eitri-content.eitri.tech/default/icon_user_v1.png"
    }
  ]
}
```

---

## 💡 Tips

- Use `type: "string"` for quick query-style inputs like `key=value&key2=value2`.
<!-- - Use `type: "json"` to pass structured data as a JSON string (e.g., `{ "foo": "bar" }`). -->
<!-- - The `value` must always be a **valid string**, even when the type is `json`. -->
- The tabs appear in the order they're listed.
- You can repeat the same `slug` with different titles or parameters.
- In the dynamic bottom bar, tabs are matched **by position**: keep `eitri-apps` (YAML) and `eitriApps` (JSON) in the same order and with the same number of items.
- During `eitri app start`, the CLI watches `dynamic-bottom-tab-view-spec.json` and resends the layout on every change. To see it, scan the QR Code again or reopen the Eitri-App through the deeplink.
- If the file is invalid, the CLI prints the error in the terminal and keeps the last valid layout.
- If the app you're running on already has a dynamic bottom bar configured in its environment, that configuration takes precedence over the file. In that case, `{ "eitriApps": [], "layout": { "theme": "classic" } }` is enough for the simulation to use the app's own bar.
- Without the file, or on app versions without support for it, the simulation uses the default bar. The dynamic bottom bar requires Eitri CLI 1.61.0 and Eitri Play 2.31.0 or later.

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

To customize the look of the bar (colors, icons, badges), add the optional `layout` key. See [Dynamic bottom bar](#dynamic-bottom-bar).

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

By default, the simulation draws a simple bar with text-only tabs. Add the optional `layout` key, at the same level as `eitri-apps`, and the app renders the same **dynamic bottom bar** used by production apps, with your colors, icons, badges, border and sizes.

```yaml
bottom-tab-view-simulation:
  eitri-apps:            # navigation: which Eitri-App each tab opens
    - slug: "eitri-app-slug"
      title: "Tab Title"
  layout:
    layout:              # appearance of the bar
      theme: classic
      backgroundColor: "#FFFFFF"
    eitriApps:           # presentation of each tab, in the same order as eitri-apps
      - title: "Tab Title"
        icon: "https://example.com/icon_home.png"
```

The `layout` key holds two nodes:

- `layout.layout`: how the bar looks.
- `layout.eitriApps`: the title, icon and badge of each tab.

`slug` and `initialization-params` stay in `eitri-apps`.

### Appearance

Fields under `layout.layout`.

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

Fields under `layout.layout.themeCustomizations.classic`.

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

Fields of each item in `layout.eitriApps`.

| Field   | Type     | Description                                                                                   |
| ------- | -------- | --------------------------------------------------------------------------------------------- |
| `title` | `string` | Tab label. Takes precedence over the `title` in `eitri-apps`. An empty string hides the label. |
| `icon`  | `string` | Icon URL (`https`).                                                                           |
| `badge` | `string` | Initial badge text over the icon. Omit for no badge.                                          |

!!! warning "Icon requirements"
    The bar repaints each icon with `selectedColor` / `unselectedColor`, so only the icon's shape matters.

    - **PNG with a transparent background.** An opaque background turns the tab into a solid square.
    - Draw the icon in a **single flat color** (black is the usual choice).
    - Use a **square** image, around **96×96 px**, with the same padding across all icons.
    - The URL must be **`https`**.

### ✅ Full example

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
  layout:
    layout:
      theme: classic
      backgroundColor: "#FFFFFF"
      selectedColor: "#373737"
      unselectedColor: "#8B8D98"
      badgeBackground: "#E5484D"
      badgeTextColor: "#FFFFFF"
      themeCustomizations:
        classic:
          labels: shown
          topBorder:
            thickness: 1
            color: "#DBDDE0"
    eitriApps:
      - title: "Home"
        icon: "https://media-eitri-content.eitri.tech/default/icon_home_v1.png"
      - title: "Categories"
        icon: "https://media-eitri-content.eitri.tech/default/icon_menu_v1.png"
      - title: "Cart"
        icon: "https://media-eitri-content.eitri.tech/default/icon_cart_v1.png"
        badge: "2"
      - title: "Profile"
        icon: "https://media-eitri-content.eitri.tech/default/icon_user_v1.png"
```

---

## 💡 Tips

- Use `type: "string"` for quick query-style inputs like `key=value&key2=value2`.
<!-- - Use `type: "json"` to pass structured data as a JSON string (e.g., `{ "foo": "bar" }`). -->
<!-- - The `value` must always be a **valid string**, even when the type is `json`. -->
- The tabs appear in the order they're listed.
- You can repeat the same `slug` with different titles or parameters.
- With `layout`, tabs are matched **by position**: keep `eitri-apps` and `layout.eitriApps` in the same order and with the same number of items.
- If the app you're running on already has a dynamic bottom bar configured in its environment, that configuration takes precedence over the YAML. In that case, `layout: { layout: { theme: classic } }` is enough for the simulation to use the app's own bar.
- Without `layout`, or on app versions without support for it, the simulation uses the default bar. The dynamic bottom bar requires Eitri Play 2.31.0 or later.

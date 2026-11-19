---
status: new
---

# AI Skills with Eitri Coding

**Eitri Coding** is an open source plugin that turns your AI coding assistant into an Eitri-App development specialist. It brings three pieces together:

- **Skills**: Eitri knowledge (Luminus, Bifrost, CLI, Eitri Shopping), device automation, and complete flows such as creating a whole app from a store URL.
- **[Eitri Manager MCP](eitri-manager-mcp.md)**: a remote MCP server, already configured in the plugin, that gives the assistant access to the Eitri Console with your permissions (applications, environments, themes, mini-apps, revisions, builds, and production errors).
- **Detection hook** (Claude Code): loads the specialist automatically when you open an Eitri project.

The plugin installs natively in **Claude Code**, **Codex**, and **Hermes Agent**. In other assistants (Gemini CLI, Cursor, GitHub Copilot, and any assistant that supports [Agent Skills](https://agentskills.io){:target="_blank"}), you install the skills and, if you want, connect the MCP separately.

[→ eitri-tech/eitri-coding repository](https://github.com/eitri-tech/eitri-coding){:target="_blank" .md-button .md-button--primary }
[▶ Watch the demo](https://www.youtube.com/watch?v=apoOXtBtkew){:target="_blank" .md-button }

!!! info "Eitri Coding or AI Agents?"

    **Eitri Coding** uses AI to *develop* your Eitri-Apps, on the developer's machine. [AI Agents](ai-agents.md) put AI *inside* your Eitri-App, for the end user to chat with.

## What the assistant learns

Without context, an LLM tends to write generic React or React Native code, which does not work in an Eitri-App. With the plugin, the assistant knows:

- **Eitri Luminus**: uses only Luminus components (no raw HTML tags), with Tailwind and DaisyUI classes.
- **Eitri Bifrost**: uses Bifrost APIs for navigation, storage, HTTP, camera, and other native features, instead of `fetch`, `localStorage`, or `navigator`.
- **File-based routing** under `src/views/` and the configuration of `eitri-app.conf.js` and `app-config.yaml`.
- **Runtime safety**: in a WebView, a `TypeError` blanks the screen instead of breaking the build, so the code is defensive by default.
- **The Eitri CLI flow**: `eitri start`, `eitri app start`, and `eitri push-version`.
- **The device**: opens the app in Eitri Play, navigates, takes screenshots, and reads the WebView console errors, on Android (ADB) and the iOS Simulator. Without a device, it renders the development build in a headless browser at phone size.
- **The Eitri Console**: through the [Eitri Manager MCP](eitri-manager-mcp.md), it reads and changes remote config, themes, mini-apps, and revisions, and diagnoses native builds and production errors, always with a preview before each write.

## How it works

Each capability is a **skill**: a folder with a `SKILL.md` file whose description tells the assistant *when* to load it. The assistant loads only the skills relevant to the task, on demand, so they take no context when they are not needed.

`eitri-specialist` is the entry point: it defines the project rules and triggers the other skills when the task calls for them (a Luminus component question, a Bifrost API, device interaction, and so on).

In Claude Code, the plugin also has a hook that runs at the start of each session: if it finds an `eitri-app.conf.js` or `app-config.yaml` at the project root (or in an immediate subfolder), it instructs the assistant to load `eitri-specialist` before any change, **even if you never mention Eitri in the prompt**.

The Eitri Manager MCP is declared in the plugin. After a one-time browser login, its tools are available in every session. See [Eitri Manager MCP](eitri-manager-mcp.md) for the full list and the safety rules.

## Included skills

| Skill | When it is used | What it does |
| --- | --- | --- |
| `eitri-specialist` | Any task in an Eitri project | Entry point: project rules, routing, runtime safety, and CLI. Triggers the other skills. |
| `eitri-luminus` | Writing or reviewing views | Catalog of Luminus components, props, HTML → Luminus mapping, and the official docs as the source of truth. |
| `eitri-bifrost` | Using native device features | Reference for the Bifrost APIs (navigation, storage, HTTP, camera, QR code, geolocation, biometrics, notifications, deeplinks, tracking, and more), with the permission flow and `canIUse` checks. |
| `eitri-shopping` | Commerce apps | How to use the Eitri Shopping libraries for VTEX, Wake, and Shopify (catalog, search, cart, checkout, customer, orders, and wishlist). |
| `eitri-device` | Running and validating the app | Screenshots, taps, swipes, typing, tab switching, and WebView DOM and console inspection, on Android and the iOS Simulator. Without a device, it renders a preview in a headless browser. |
| `create-app` | Creating an app from a store URL | Creates the organization, application, mini-apps, remote config, theme, and icon in the Console, plus a local repository from the template, rebuilds the store's look, and publishes to `dev`. See [Create an app from a store](#create-an-app-from-a-store). |
| `site-clone` | Cloning a site or using it as a reference | Captures a page with Playwright and rebuilds it in the project's framework (Eitri, FastStore, or React), with components, styles, images, and copy. |
| `figma-scrape` | Receiving a Figma link | Extracts a Figma selection (URL with `node-id`) into a structured design bundle. |
| `figma-to-eitri` | Implementing a Figma screen | Ports a Figma design (a `figma-scrape` bundle or a local `.fig` file) into Eitri views, following the project's CMS and theme. |
| `eitri-claude-design-migrate` | Porting Claude Design screens | Turns HTML/JSX with inline styles into production-ready Eitri views, with Luminus, Tailwind, and DaisyUI. |
| `eitri-typescript-migrate` | Migrating a workspace to TypeScript | Converts an Eitri-App or a multi-app bundle from JavaScript to TypeScript, file by file, with types for Luminus, Bifrost, and VTEX/Wake/Shopify payloads. |

## Installation

Choose the assistant you use:

=== "Claude Code"

    Claude Code is the officially supported assistant: the plugin installs the skills, the hook that detects Eitri projects, and the Eitri Manager MCP.

    1. Add the marketplace and install the plugin from inside Claude Code:

        ```
        /plugin marketplace add eitri-tech/eitri-coding
        /plugin install eitri-coding@eitri-plugins
        ```

    2. Restart Claude Code (or run `/reload-plugins`).

    3. Log in to the MCP: run `/mcp`, select `plugin:eitri-coding:eitri-manager`, and choose **Authenticate**. The browser opens the Eitri Console login; sign in with your account and you're done. You only log in once.

    From then on, in any Eitri project, `eitri-specialist` loads automatically. To call a skill explicitly, use its name with the plugin prefix:

    ```
    /eitri-coding:eitri-specialist
    /eitri-coding:create-app
    ```

=== "Codex"

    Codex installs the same plugin, with the skills and the Eitri Manager MCP:

    ```bash
    codex plugin marketplace add eitri-tech/eitri-coding
    ```

    Open `/plugins` in Codex, install **Eitri Coding**, and log in to the Eitri Console when Codex asks. Then start a new session.

    Codex loads the skills automatically. To call one explicitly, type `$` followed by its name (for example, `$eitri-specialist`) or use `/skills`.

    To update: `codex plugin marketplace upgrade eitri-plugins`.

=== "Hermes Agent"

    Install and enable the plugin:

    ```bash
    hermes plugins install eitri-tech/eitri-coding/plugins/eitri-coding
    hermes plugins enable eitri-coding
    ```

    The MCP login needs `auth: oauth`, which the plugin package cannot set. Add the server to `~/.hermes/config.yaml` (this entry takes precedence over the plugin's):

    ```yaml
    mcp_servers:
      eitri-manager:
        url: https://api.eitri.tech/eitri-manager-mcp/mcp
        auth: oauth
    ```

    And log in:

    ```bash
    hermes mcp login eitri-manager
    ```

    To update: `hermes plugins update eitri-coding`.

=== "Gemini CLI"

    Install the skills straight from the repository:

    ```bash
    gemini skills install https://github.com/eitri-tech/eitri-coding --path plugins/eitri-coding/skills
    ```

    By default they are installed for your user. To install them only in the current project, add `--scope workspace`.

    Gemini activates the skills automatically when the task matches their description, and asks for confirmation before loading each one. Use `/skills list` to check what was installed.

    To use the Console through the assistant, [connect the Eitri Manager MCP](eitri-manager-mcp.md#how-to-connect) separately.

=== "Cursor"

    Cursor reads skills from `~/.cursor/skills` or `~/.agents/skills` (all projects) and from `.cursor/skills` or `.agents/skills` (current project). Copy the skills there:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    The agent applies the skills automatically. To call one explicitly, type `/` in the Agent chat and search for its name, for example `/eitri-specialist`.

    To use the Console through the assistant, [connect the Eitri Manager MCP](eitri-manager-mcp.md#how-to-connect) separately.

=== "GitHub Copilot"

    Agent mode in VS Code and JetBrains IDEs, Copilot CLI, and Copilot cloud agent read skills from `~/.copilot/skills` or `~/.agents/skills` (personal) and from `.github/skills` or `.agents/skills` (repository). Copy the skills there:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    To share the skills with the whole team, copy them to `.agents/skills` in the repository and commit them.

    To use the Console through the assistant, [connect the Eitri Manager MCP](eitri-manager-mcp.md#how-to-connect) separately.

=== "Other assistants"

    Eitri Coding follows the open [Agent Skills](https://agentskills.io){:target="_blank"} standard. Any assistant that supports it can use the skills: copy the folders from `plugins/eitri-coding/skills/` to the skills directory it reads, usually `~/.agents/skills` or `.agents/skills`.

    If the assistant does not support skills, point to the `SKILL.md` files in the instructions file it reads (such as `AGENTS.md`).

    If it supports remote MCP servers with OAuth, [connect the Eitri Manager MCP](eitri-manager-mcp.md#how-to-connect) too.

!!! warning "Assistants other than Claude Code"

    The hook that loads `eitri-specialist` automatically exists only in Claude Code. In other assistants:

    - **Ask for the skill by name** at the start of the session (for example, "use the eitri-specialist skill"), or add the instruction below to the `AGENTS.md` (or `GEMINI.md`) at the root of your project:

        ```markdown
        This is an Eitri project. Before writing, editing, running, or reviewing
        any code, load the `eitri-specialist` skill and follow its rules.
        ```

    - **When the skills are copied by hand** (Gemini CLI, Cursor, Copilot, and others), the skills' scripts live in the folder you copied them to. When using `eitri-device`, `site-clone`, or `create-app`, tell the assistant where they are (for example, `~/.agents/skills/eitri-device/tools/`).

## Updating

=== "Claude Code"

    Third-party marketplaces don't auto-update by default. You get new versions in one of two ways:

    - **Manually**: `/plugin marketplace update eitri-plugins`, then `/plugin update eitri-coding@eitri-plugins` (or `claude plugin update eitri-coding@eitri-plugins` from the shell). Run `/reload-plugins` or restart.
    - **Automatically**: `/plugin` → **Marketplaces** → `eitri-plugins` → **Enable auto-update**.

    For a team repository, commit the snippet below to `.claude/settings.json` so every collaborator gets the marketplace, the plugin, and auto-update:

    ```json
    {
      "extraKnownMarketplaces": {
        "eitri-plugins": {
          "source": { "source": "github", "repo": "eitri-tech/eitri-coding" },
          "autoUpdate": true
        }
      },
      "enabledPlugins": { "eitri-coding@eitri-plugins": true }
    }
    ```

=== "Codex"

    ```bash
    codex plugin marketplace upgrade eitri-plugins
    ```

=== "Hermes Agent"

    ```bash
    hermes plugins update eitri-coding
    ```

=== "Copied skills"

    Repeat the `git clone` and copy the folders from `plugins/eitri-coding/skills/` again, overwriting the previous ones.

## Create an app from a store

The `create-app` skill turns the URL of a **VTEX, Wake, or Shopify** store into a working Eitri app, ready to be viewed in Eitri Play. Just ask:

```text
Create an Eitri app for the store https://www.mystore.com
```

### Requirements

- The **plugin installed** and the **Eitri Manager MCP login** done (see [Installation](#installation)).
- The **Eitri CLI** installed (`npm i -g eitri-cli`) and logged in (`eitri login`). The skill updates the CLI to the latest version before it starts.
- **Node.js 20** or later and **git**. On the first run, the skill installs Playwright and Chromium to capture the store.
- To create a **new organization**, the platform administrator role. Without it, pick an organization you already belong to.
- On **Shopify**, the public Storefront API token and the Customer Account API details. You can answer "later": the app is created with those fields empty and they are listed in the final report.

### What happens

1. **Detection**: the skill identifies the store's platform, account, name, language, and currency, and asks everything it could not find out in a single message (organization, app name, whether it is a demo app).
2. **Preparation, with no Console writes**: it clones the platform's official template, captures the store's home, listing, product page, login, and cart, analyzes its integrations (reviews, videos, chat, analytics), extracts colors, fonts, logo, and icon, builds the bottom bar from the store's own tab bar, and generates the remote config.
3. **Confirmation**: you get **one summary** of everything that will be created (organization, application, mini-app slugs, environments, config, theme, icon, bottom bar, integrations, and what the app will not reproduce) and approve once. Nothing is written to the Console before that.
4. **Console creation**, through the MCP: organization and its icon, application (with the `dev` and `prod` environments), app icon, `eitri-shopping-<app>-<alias>` mini-apps, slug aliases, remote config, Luminus v2 theme, and v1 global CSS. Then the template's first publish to `dev`: **from here on the app already opens in Eitri Play** with the store's catalog, theme, and icon.
5. **Visual fidelity**: screen by screen (home, listing, product, login, cart, and checkout), the assistant compares the store with the app side by side and adjusts the code until they look alike. Every mini-app ships English and Portuguese texts.
6. **Handoff**: it publishes each mini-app to `dev` and writes an `EITRI_APP.md` at the repository root with the created ids, how to preview, each screen's status, what is still a placeholder, and what was left out.

To see the app: open **Eitri Play** on your phone, log in with your Eitri account, and pick the organization → the application → `dev`.

!!! tip "Interrupted run"

    Every Console write is recorded in `.eitri/create-app.state.json` as soon as it happens. If the run stops midway, ask to continue: the skill reads that file and resumes where it left off, without creating a second organization, application, or mini-app.

!!! warning

    - Creating an app takes time and tokens: the visual fidelity phase is the longest one and can split the screens across several agents in parallel.
    - There is no delete tool. To discard a test app, use the ids in `.eitri/create-app.state.json` and remove it in the Eitri Console (or ask an administrator).
    - Store credentials are kept in `.eitri/secrets.json` and the resolved config in `.eitri/remote-config.json`, both gitignored.

## Device interaction

The `eitri-device` skill lets the assistant open the app, navigate, and check the result on its own. For that, you need:

=== "Android"

    - An Android device or emulator connected and authorized, visible in `adb devices`.
    - Python 3 with the dependencies the skill uses to read the screen:

        ```bash
        pip install easyocr opencv-python-headless==4.10.0.84
        ```

=== "iOS (macOS only)"

    - A running iOS Simulator, with Eitri Play installed.
    - The `idb` and WebKit Inspector tools:

        ```bash
        brew install idb-companion ios-webkit-debug-proxy
        pip install fb-idb
        ```

=== "No device"

    With no device or emulator connected, the skill renders the development build in a headless browser at phone size and takes screenshots of it. It needs Node.js; on the first run, it installs Playwright and Chromium.

!!! tip

    Keep `eitri start` (or `eitri app start`) running and Eitri Play open on the device before asking the assistant to validate a screen. If the server is not running, the assistant starts it.

## Sites and designs as a reference

- **`site-clone`**: give it a URL and ask to rebuild the page in your Eitri-App. The skill captures the page with Playwright (structure, styles, images, copy, and behavior at different widths) and rebuilds each block with Luminus. It needs Node.js; on the first run it installs Playwright and Chromium.
- **`figma-scrape`** and **`figma-to-eitri`**: paste a Figma link with a `node-id` and say which screen it is. Extraction uses the Figma API with the token in the `FIGMA_TOKEN` environment variable. Without a token, export the file from Figma (**File → Save local copy**) and hand over the `.fig`: it is converted offline into the same bundle.

## Usage examples

The prompts below are in natural language: you don't need to name the skill, the assistant picks the right one.

**Create an app from a store**

```text
Create an Eitri app for the store https://www.mystore.com. It is a demo
app; use a new organization named after the store.
```

**Create a screen**

```text
Create a profile view in src/views/Profile that loads the user data from
https://api.mystore.com/me and shows name, email, and avatar, with loading
and error states. Then open it on the device and send me a screenshot.
```

**Use a native feature**

```text
Add a button to the Checkout screen that reads a coupon QR code with the
camera and fills in the coupon field. Handle the case where the user denies
camera permission.
```

**Reproduce and fix a bug on the device**

```text
On the device, open the cart and tap "Checkout". The screen goes blank.
Read the WebView console errors, find the cause, fix it, and confirm on the
device that the screen renders.
```

**Implement a Figma screen**

```text
Implement the product screen from this Figma link in the PDP mini-app:
https://www.figma.com/design/<file>/<name>?node-id=12-345
```

**Port a Claude Design screen**

```text
Port the screens in ./design-export (generated by Claude Design) to Eitri
views using Luminus, Tailwind, and DaisyUI. Keep the color palette as
Tailwind theme tokens.
```

**Integrate with the store platform**

```text
Find out which commerce platform this project uses and add a "Recently
viewed" carousel to the Home using the Eitri Shopping SDK.
```

**Change the remote config in the Console**

```text
In the My Store app, dev environment, change the remote config's headerLogo
to https://cdn.mystore.com/logo.png. Show me the diff before applying it.
```

**Investigate a build or a production error**

```text
Why did the latest Android build of the My Store app fail?
```

```text
What were the most frequent production errors of the My Store app in the
last 7 days, and in which mini-apps?
```

**Review code**

```text
Review the views in src/views/ for correct use of Luminus and Bifrost: raw
HTML tags, use of fetch/localStorage, missing awaits, and code that can
break at runtime.
```

## Tips for better results

- **Open the assistant at the project root**, where `eitri-app.conf.js` or `app-config.yaml` lives. That is how the specialist recognizes the project.
- **Ask for validation on the device.** Ending the prompt with "confirm on the device" makes the assistant run the app and check the screen, instead of stopping at the code.
- **Give it scope.** Name the view, screen, or flow. In workspaces with several apps, say which Eitri-App to change. In the Console, name the application and the environment.
- **Read the preview before confirming.** Every MCP write first shows what will change (diff, possible exposed secrets, the version it replaces). In production, the assistant needs your explicit authorization.
- **Review before publishing.** The assistant knows the `version` in `eitri-app.conf.js` must be bumped before `eitri push-version`, but publishing a version is your call.

## Contribute

Eitri Coding is open source (Apache-2.0) and under active development, with support expanding to more assistants based on user feedback. Report issues and suggest improvements in the [repository](https://github.com/eitri-tech/eitri-coding){:target="_blank"}.

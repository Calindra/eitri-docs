---
status: new
---

# AI Skills with Eitri Coding

**Eitri Coding** is a set of open-source **skills** that turns your AI coding assistant (Claude Code, Gemini CLI, Codex, Cursor, GitHub Copilot, and others) into a specialist in Eitri-App development. With it, the assistant writes code following Eitri's rules and also drives the app running on an Android device or iOS simulator to validate what it built.

The idea is to be **LLM-agnostic**: you pick the assistant, and the plugin delivers the same set of capabilities.

[→ eitri-tech/eitri-coding repository](https://github.com/eitri-tech/eitri-coding){:target="_blank" .md-button .md-button--primary }
[▶ Watch the demo](https://www.youtube.com/watch?v=apoOXtBtkew){:target="_blank" .md-button }

!!! info "Eitri Coding or AI Agents?"

    **Eitri Coding** uses AI to *develop* your Eitri-Apps, on the developer's machine. [AI Agents](ai-agents.md) put AI *inside* your Eitri-App, for the end user to chat with.

## What the assistant learns

Without context, an LLM tends to write generic React or React Native code, which doesn't work in an Eitri-App. With the skills, the assistant knows:

- **Eitri Luminus**: uses only Luminus components (no raw HTML tags), with Tailwind and DaisyUI classes.
- **Eitri Bifrost**: uses Bifrost APIs for navigation, storage, HTTP, camera, and other native features, instead of `fetch`, `localStorage`, or `navigator`.
- **File-based routing** under `src/views/`, and the `eitri-app.conf.js` and `app-config.yaml` configuration.
- **Runtime safety**: in a WebView, a `TypeError` blanks the screen instead of failing the build, so the code is defensive by default.
- **The Eitri CLI flow**: `eitri start`, `eitri app start`, and `eitri push-version`.
- **The device**: opens the app in Eitri Play, navigates, takes screenshots, and reads the WebView console errors, on Android (ADB) and on the iOS Simulator.

## How it works

Each capability is a **skill**: a folder with a `SKILL.md` file whose description tells the assistant *when* to load it. The assistant loads only the skills relevant to the task, on demand, so they don't take up context when they are not needed.

`eitri-specialist` is the entry point: it sets the project rules and calls the other skills when the task requires it (a Luminus component question, a Bifrost API, interaction with the device, and so on).

In Claude Code, the plugin also has a hook that runs at the start of each session: if it finds an `eitri-app.conf.js` or `app-config.yaml` in the project, it instructs the assistant to load `eitri-specialist` before any change, **even if you never mention Eitri in the prompt**.

## Included skills

| Skill | When it is used | What it does |
| --- | --- | --- |
| `eitri-specialist` | Any task in an Eitri project | Entry point: project rules, routing, runtime safety, and CLI. Calls the other skills. |
| `eitri-luminus` | Writing or reviewing views | Luminus component catalog, props, HTML → Luminus mapping, and the official docs as the source of truth. |
| `eitri-bifrost` | Using native device features | Bifrost API reference (navigation, storage, HTTP, camera, QR code, geolocation, biometrics, notifications, deeplinks, tracking, and more), with permission flows and `canIUse` checks. |
| `eitri-shopping` | Commerce apps | How to use the Eitri Shopping libraries for VTEX, Wake, and Shopify (catalog, search, cart, checkout, customer, orders, and wishlist). |
| `eitri-claude-design-migrate` | Porting screens from Claude Design | Turns HTML/JSX with inline styles into production-ready Eitri views with Luminus, Tailwind, and DaisyUI. |
| `eitri-device` | Running and validating the app | Screenshots, taps, swipes, typing, tab switching, and inspection of the WebView DOM and console, on Android and the iOS Simulator. |

## Installation

Pick the assistant you use:

=== "Claude Code"

    Claude Code is the officially supported assistant: the skills are installed as a plugin, together with the hook that detects Eitri projects.

    Add the marketplace and install the plugin from inside Claude Code:

    ```
    /plugin marketplace add eitri-tech/eitri-coding
    /plugin install eitri-coding@eitri-plugins
    ```

    Restart Claude Code. From then on, in any Eitri project, `eitri-specialist` is loaded automatically. To call a skill explicitly, use its name with the plugin prefix:

    ```
    /eitri-coding:eitri-specialist
    /eitri-coding:eitri-device
    ```

    To update to the latest version, run `/plugin marketplace update eitri-plugins`.

=== "Gemini CLI"

    Install the skills straight from the repository:

    ```bash
    gemini skills install https://github.com/eitri-tech/eitri-coding --path plugins/eitri-coding/skills
    ```

    By default they are installed for your user. To install only in the current project, add `--scope workspace`.

    Gemini activates the skills automatically when the task matches their descriptions, and asks for confirmation before loading each one. Use `/skills list` to check what was installed.

=== "Codex"

    Codex reads skills from `~/.agents/skills` (all projects) or `.agents/skills` (only the current repository). Copy the skills there:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    Codex loads the skills automatically. To call one explicitly, type `$` followed by its name (for example, `$eitri-specialist`) or use `/skills`.

=== "Cursor"

    Cursor reads skills from `~/.cursor/skills` or `~/.agents/skills` (all projects) and from `.cursor/skills` or `.agents/skills` (current project). Copy the skills there:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    The agent applies the skills automatically. To call one explicitly, type `/` in the Agent chat and search for its name, for example `/eitri-specialist`.

=== "GitHub Copilot"

    Agent mode in VS Code and JetBrains, the Copilot CLI, and the Copilot cloud agent read skills from `~/.copilot/skills` or `~/.agents/skills` (personal) and from `.github/skills` or `.agents/skills` (repository). Copy the skills there:

    ```bash
    git clone https://github.com/eitri-tech/eitri-coding.git /tmp/eitri-coding
    mkdir -p ~/.agents/skills
    cp -R /tmp/eitri-coding/plugins/eitri-coding/skills/* ~/.agents/skills/
    ```

    To share the skills with the whole team, copy them to `.agents/skills` in the repository and commit them.

=== "Other assistants"

    Eitri Coding follows the open [Agent Skills](https://agentskills.io){:target="_blank"} standard. Any assistant that supports it can use the skills: copy the folders from `plugins/eitri-coding/skills/` to the skills directory it reads, usually `~/.agents/skills` or `.agents/skills`.

    If the assistant doesn't support skills, point it to the `SKILL.md` files in the instructions file it reads (such as `AGENTS.md`).

!!! warning "Assistants other than Claude Code"

    Only the Claude Code installation is official. On the other assistants the skills work, but with two differences:

    - **There is no automatic detection of Eitri projects.** Add the instruction below to the `AGENTS.md` (or `GEMINI.md`) at the root of your project, so the assistant always loads the specialist:

        ```markdown
        This is an Eitri project. Before writing, editing, running, or reviewing
        any code, load the `eitri-specialist` skill and follow its rules.
        ```

    - **The device scripts point to the Claude Code installation folder.** When using `eitri-device`, tell the assistant where you copied the skills (for example, `~/.agents/skills/eitri-device/tools/`).

## Interacting with the device

The `eitri-device` skill lets the assistant open the app, navigate, and check the result on its own. For that, you need:

=== "Android"

    - An Android device or emulator connected and authorized, visible in `adb devices`.
    - Python 3 with the dependencies the skill uses to read the screen:

        ```bash
        pip install easyocr opencv-python-headless==4.10.0.84
        ```

=== "iOS (macOS only)"

    - An iOS Simulator booted with Eitri Play installed.
    - The `idb` and WebKit Inspector tools:

        ```bash
        brew install idb-companion ios-webkit-debug-proxy
        pip install fb-idb
        ```

!!! tip

    Leave `eitri start` (or `eitri app start`) running and Eitri Play open on the device before asking the assistant to validate a screen. If the server is not running, the assistant starts it.

## Usage examples

The prompts below work with any assistant that has the skills installed. They are written in plain language: you don't need to name the skill, the assistant picks the right one.

**Create a screen**

```text
Create a profile view in src/views/Profile that loads the user's data
from https://api.mystore.com/me and shows the name, e-mail, and avatar,
with a loading state and an error state. Then open it on the device
and send me a screenshot.
```

**Use a native feature**

```text
Add a button to the Checkout screen that reads a coupon QR code with the
camera and fills in the coupon field. Handle the case where the user
denies camera permission.
```

**Reproduce and fix a bug on the device**

```text
On the device, open the cart and tap "Checkout". The screen goes blank.
Read the WebView console errors, find the cause, fix it, and confirm on
the device that the screen renders.
```

**Port a screen from Claude Design**

```text
Port the screens in ./design-export (generated by Claude Design) to
Eitri views using Luminus, Tailwind, and DaisyUI. Keep the color palette
as Tailwind theme tokens.
```

**Integrate with the store's platform**

```text
Find out which commerce platform this project uses and add a "Recently
viewed" carousel on the Home screen using the Eitri Shopping SDK.
```

**Review code**

```text
Review the views in src/views/ for Luminus and Bifrost correctness:
raw HTML tags, fetch/localStorage usage, missing awaits, and code that
could crash at runtime.
```

## Tips for better results

- **Open the assistant at the project root**, where `eitri-app.conf.js` or `app-config.yaml` is. That is how the specialist recognizes the project.
- **Ask for on-device validation.** Ending the prompt with "confirm on the device" makes the assistant run the app and check the screen, instead of stopping at the code.
- **Give the scope.** Name the view, the screen, or the flow. In multi-app workspaces, say which Eitri-App to change.
- **Review before publishing.** The assistant knows that `version` in `eitri-app.conf.js` must be incremented before `eitri push-version`, but publishing a version is your call.

## Contribute

Eitri Coding is open source (Apache-2.0) and under active development, with support expanding to more assistants based on user feedback. Report issues and suggest improvements in the [repository](https://github.com/eitri-tech/eitri-coding){:target="_blank"}.

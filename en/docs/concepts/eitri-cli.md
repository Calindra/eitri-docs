# Eitri CLI

The Eitri CLI is the starting point for developing Eitri-Apps. With it, you can create, develop, test, and publish Eitri-Apps for your organization's applications.

## Requirements

To use the Eitri CLI, you will need to have the following installed on your machine:

* [Node](https://nodejs.org/){:target="_blank"} 18 or higher
* [NPM](https://www.npmjs.com/){:target="_blank"}
* [Git](https://git-scm.com/){:target="_blank"}

!!! tip

    Run [`eitri doctor`](#doctor) to check that your machine has everything the CLI needs.

## Installation

```bash
npm install -g eitri-cli
```

!!! info

    If you encounter any permission errors during installation, check if your user privileges are sufficient for the installation.

## Update

To update your CLI, use the [`eitri self-update`](#self-update) command.

## Available Commands

Add `--help` or `-h` at the end of any command to see how to use it and all its options. Most commands can only be run after [`eitri login`](#login).

| Command | What it does |
| --- | --- |
| [`login`](#login) | Links the CLI to your Eitri developer account |
| [`create`](#create) | Creates a new Eitri-App |
| [`start`](#start) | Runs the Eitri-App in development mode, with hot-reload |
| [`push-version`](#push-version) | Uploads a version of the Eitri-App to the Console |
| [`publish`](#publish) | Publishes the current version in an environment |
| [`test`](#test) | Runs the Eitri-App tests |
| [`clean`](#clean) | Cleans your remote workspace |
| [`workspace`](#workspace) | Manages your workspaces |
| [`app`](#app) | Runs and manages several Eitri-Apps of an application (`app-config.yaml`) |
| [`dependencies`](#dependencies) | Lists, adds, and opens the docs of Eitri-App dependencies |
| [`agents`](#agents) | Sets up the [AI agents](ai-agents.md) of the Eitri-App |
| [`libs`](#libs) | Lists the versions of the Eitri libraries |
| [`doctor`](#doctor) | Checks your machine's dependencies |
| [`self-update`](#self-update) | Updates the CLI to the latest version |

---

### login

```bash
eitri login [options]
```

Logs into the Eitri platform, saving your account credentials on your machine and linking the CLI to your Eitri developer account.

#### Options

| Option | Description |
| --- | --- |
| `--yes` | Accepts the redirection to the Console without asking. |
| `-v, --verbose` | Displays detailed messages during execution. |

---

### create

```bash
eitri create [options] <project-name>
```

Creates a new Eitri-App project on your machine and registers it on the Eitri platform.

You will need to provide some information when creating an Eitri-App:

`Application`
:   The application in which your Eitri-App will run.

`Display Name`
:   Name used in the Console listing. It is used internally and is not visible to users.

`Marketing Name`
:   Product name, used in promotion and contact points with the user. This name may be visible to users.

`Unique Name`
:   Also called slug, it uniquely identifies the Eitri-App on the Eitri platform and is used to reference it in several places, including deep links. It must be unique among Eitri-Apps and must not contain spaces or special characters.

#### Options

| Option | Description |
| --- | --- |
| `--yes` | Uses the default values for name, title, and organization. |
| `--application <application>` | Sets the application of the Eitri-App. |
| `-t, --template [template]` | Creates the Eitri-App from the given template. Without a value, shows the template selection. |
| `-v, --verbose` | Displays detailed messages during execution. |

```bash
eitri create my-eitri-app --template
```

---

### start

```bash
eitri start [options]
```

Starts the Eitri-App for development in an online workspace and shows a QR Code to be scanned with your organization's app (or with [Eitri Play](eitri-play.md)).

As you save your files, the Eitri-App is hot-reloaded and the changes show up on your device in real time.

#### Options

| Option | Description |
| --- | --- |
| `-i, --initialization-params <query-params>` | Sends [initialization parameters](#initialization-parameters) to the Eitri-App. E.g.: `'foo=bar&hello=world'`. |
| `-p, --playground` | Shows the QR Code to open the Eitri-App in [Eitri Play](eitri-play.md). |
| `-e, --emulator <platform>` | Opens the Eitri-App in the emulator of the given platform: `android` or `ios`. |
| `-sh, --shared` | Runs the Eitri-App in shared mode. |
| `-S, --show-deeplink` | Displays the workspace deep link. |
| `-sm, --skip-mini-log` | Skips the connection to the mini-log. |
| `-f, --force` | Forces the start. |
| `-v, --verbose` | Displays detailed messages during execution. |

??? note "Deprecated: `--initializationParams`"

    The `--initializationParams <initializationParams>` form still works, but it is deprecated. Use `--initialization-params`.

#### Keyboard shortcuts

While `eitri start` or [`eitri app start`](#app-start) is running, type a key in the terminal and press `enter`:

| Key | Action |
| --- | --- |
| `a` | Opens the Eitri-App on Android. |
| `i` | Opens the Eitri-App on iOS (macOS only). |
| `q` / `Q` | Shows the QR Code again. |
| `r` | Reloads the Eitri-App. |
| `p` | Changes the [initialization parameters](#changing-the-parameters-while-running) without restarting. |

In `eitri app start`, the `a`, `i`, `q`, and `r` keys ask which Eitri-App of the `app-config.yaml` you want to use.

#### Initialization parameters

Initialization parameters let you open the Eitri-App in a specific scenario (a product, a user, a route) without changing the code. Inside the Eitri-App, read them with `Eitri.getInitializationInfos()`, which returns them already converted into an object:

```jsx
const params = await Eitri.getInitializationInfos();
// --initialization-params 'productId=123&email=dev@eitri.tech'
// params => { productId: "123", email: "dev@eitri.tech" }
```

=== "eitri start"

    ```bash
    eitri start --initialization-params 'productId=123&email=dev@eitri.tech'
    ```

=== "eitri app start"

    In the `app-config.yaml`:

    ```yaml
    initialization-params:
      type: "string"
      value: "productId=123&email=dev@eitri.tech"
    ```

!!! warning "Query string only"

    These parameters must be in **query string** format (`key=value&key2=value2`). JSON is not supported here; to send JSON, use the parameters of each tab of the [Bottom Tab Bar simulation](../quick-guides/bottom-bar-simulation.md).

#### Changing the parameters while running

You don't need to stop and run `start` again to try other parameters. Type `p` and press `enter` in the terminal:

=== "eitri start"

    The prompt comes filled in with the current parameters. Edit the value and press `enter`; leave it empty to remove the parameters.

    !!! info

        The `p` key is not available with `--playground`.

=== "eitri app start"

    Without `bottom-tab-view-simulation`, it changes the parameters of the Eitri-App marked as `focus` in the `app-config.yaml`, the same way as in `eitri start`.

=== "With Bottom Tab Bar"

    When the `app-config.yaml` has `bottom-tab-view-simulation`, Eitri Play uses the parameters of **each tab** and ignores the global ones. So the `p` key asks:

    1. which tab to change;
    2. the parameter type: `string` (query string) or `json`;
    3. the value (empty removes the tab parameters). Invalid JSON is rejected on the spot.

After changing, the CLI publishes the new parameters again. **Scan the QR Code again or reopen the Eitri-App through the deep link** to apply them.

!!! note

    Changes made with `p` only last for the current session: the `app-config.yaml` file is not changed.

See the [initialization parameters guide](../quick-guides/initialization-params.md) for more examples.

---

### push-version

```bash
eitri push-version [options]
```

Uploads a version of your Eitri-App to the Console. The version becomes available for publication in the environments registered for the application.

#### Options

| Option | Description |
| --- | --- |
| `-m, --message <version-message>` | Adds a message to the version. |
| `-r, --release` | Generates a new release from the commits, creating the `CHANGELOG.md` file automatically. See [Semantic Release](../quick-guides/semantic-release.md). |
| `-s, --shared` | Uploads the version of a shared Eitri-App. |
| `-y, --yes` | Automatically accepts the prompt answers. |
| `-v, --verbose` | Displays detailed messages during execution. |

!!! warning

    Check the version of your Eitri-App in `eitri-app.conf.js`: you cannot upload a version that already exists in the Console.

---

### publish

```bash
eitri publish --environment <environment-id> [options]
```

Publishes the current version of the Eitri-App, defined in `eitri-app.conf.js`, in the selected environment.

#### Options

| Option | Description |
| --- | --- |
| `-e, --environment <environment-id>` | **Required.** Environment where the version will be published. |
| `-m, --message <message>` | Adds comments to the publication. |

!!! tip "Where to find the environment id"

    In the [Eitri Console](https://console.eitri.tech/){:target="_blank"}, go to **Applications**, select your application and click **Your environments**.

---

### test

```bash
eitri test [options]
```

Runs the tests of your Eitri-App. See [Tests](../quick-guides/tests.md).

#### Options

| Option | Description |
| --- | --- |
| `-p, --path <path>` | Path of the test file to run. |
| `-w, --watch` | Watches the files and runs the tests again on every change. |
| `-v, --verbose` | Displays detailed messages during execution. |

---

### clean

```bash
eitri clean [options]
```

Cleans your remote workspace.

When you run `eitri start`, your workspace is built with the code on your machine and updated as you save your files. If something goes wrong with the cloud build, `eitri clean` helps restore it.

#### Options

| Option | Description |
| --- | --- |
| `-v, --verbose` | Displays detailed messages during execution. |

---

### workspace

```bash
eitri workspace <command> [options]
```

Manages your workspaces, allowing you to use more than one.

| Command | Description |
| --- | --- |
| `list` | Lists your workspaces. |
| `use [options]` | Selects the workspace to be used. |
| `create` | Creates a new workspace. |
| `current` | Displays the current workspace, following the priority Local > Global. |
| `clean` | Cleans the remote workspace. Useful when the cloud build of the Eitri-App malfunctions. Follows the priority Local > Global. |

#### `use` options

| Option | Description |
| --- | --- |
| `--local` | Selects a workspace only for the current Eitri-App directory. |
| `--name <workspace-name>` | Selects a previously created workspace by name. |

---

### app

```bash
eitri app <command> [options]
```

Runs and manages the Eitri-Apps of the application declared in the `app-config.yaml` file.

!!! info

    See [Developing multiple Eitri-Apps](../quick-guides/eitri-app-start.md) to configure the `app-config.yaml`.

| Command | Description |
| --- | --- |
| [`start`](#app-start) | Starts all Eitri-Apps of the `app-config.yaml`. |
| [`logs`](#app-logs) | Displays the logs of the Eitri-Apps started by `eitri app start`. |
| [`clean`](#app-clean) | Cleans the remote and local workspaces of all Eitri-Apps. |
| [`create`](#app-create) | Creates an application with Eitri-Apps from a template. |
| [`snapshot`](#app-snapshot) | Creates a testable and distributable snapshot of the application. |

#### app start

```bash
eitri app start [options]
```

Starts all Eitri-Apps of the `app-config.yaml`. The QR Code opens the Eitri-App marked as `focus`. The [keyboard shortcuts](#keyboard-shortcuts) and the [initialization parameters](#initialization-parameters) work the same way as in `eitri start`.

| Option | Description |
| --- | --- |
| `-p, --playground` | Shows the QR Code to open in [Eitri Play](eitri-play.md). |
| `-v, --verbose` | Displays detailed messages during execution. |

#### app logs

```bash
eitri app logs
```

Displays the logs of the Eitri-Apps running from `eitri app start`.

#### app clean

```bash
eitri app clean [options]
```

Cleans the workspaces completely, removing both the remote workspaces and the local `.workspaces/` folders of all apps in the `app-config.yaml`. Useful to solve conflicts or invalid data in the workspaces.

| Option | Description |
| --- | --- |
| `-v, --verbose` | Displays detailed messages during the cleanup. |

#### app create

```bash
eitri app create [options] <application-name>
```

Creates an application with several Eitri-Apps, based on a selected template.

| Option | Description |
| --- | --- |
| `-v, --verbose` | Displays detailed messages during execution. |

#### app snapshot

```bash
eitri app snapshot [options]
```

Creates a snapshot of the application's source code, generating a link and a QR Code to test a feature before publishing it. See [Snapshots](../quick-guides/snapshots.md).

| Option | Description |
| --- | --- |
| `-b, --branch-name <branch-name>` | Name of the branch for the snapshot. |
| `-v, --verbose` | Displays detailed messages during execution. |

#### Bottom Tab Bar simulation

While developing with [Eitri Play](eitri-play.md) you can simulate the Bottom Tab Bar and its behaviors. [Check here](../quick-guides/bottom-bar-simulation.md) how to simulate it.

---

### dependencies

```bash
eitri dependencies <command> [options]
```

Manages the dependencies of the Eitri-App. See [Dependencies](../quick-guides/dependencies.md).

| Command | Description |
| --- | --- |
| `list` | Lists the dependencies available for Eitri-Apps. |
| `add` | Selects dependencies and declares them in `eitri-app-dependencies` in `eitri-app.conf.js`. |
| `docs [options]` | Selects a dependency and opens its documentation in the browser. |

#### `docs` options

| Option | Description |
| --- | --- |
| `--no-open` | Only displays the link, without opening the browser. |

---

### agents

```bash
eitri agents <command> [options]
```

Manages the AI agents of the Eitri-App. To understand what agents can do in your app and which integration mode to choose, see [AI Agents](ai-agents.md).

| Command | Description |
| --- | --- |
| `setup [options]` | Sets up the agent environment variables, for the workspace or production. |
| `generate:rag` | Generates the files needed for the RAG. |

#### `setup` options

| Option | Description |
| --- | --- |
| `-e, --env <env>` | Environment: `workspace` (default) or `production`. |
| `-l, --llm <llm>` | Name of the LLM. |
| `-k, --api-key <api-key>` | API key of the LLM. |
| `-m, --model <model>` | Model of the LLM. |

```bash
eitri agents setup --env workspace --llm <llm> --model <model> --api-key <api-key>
```

---

### libs

```bash
eitri libs [options]
```

Lists the versions of the Eitri libraries.

| Option | Description |
| --- | --- |
| `--luminus` | Lists the versions of the [Eitri Luminus](eitri-luminus.md) component library. |
| `--bifrost` | Lists the versions of the [Eitri Bifrost](eitri-bifrost.md) SDK. |

---

### doctor

```bash
eitri doctor
```

Checks the dependencies and settings of your machine to make sure everything is ready for Eitri-App development.

---

### self-update

```bash
eitri self-update
```

Updates the Eitri CLI, uninstalling previous versions and installing the latest stable version.

Keeping the CLI up to date ensures the best performance, compatibility, stability, and development experience.

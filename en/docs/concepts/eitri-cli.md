# Eitri CLI

The Eitri CLI is the starting point for developing Eitri-Apps. With it, you can create, develop, and publish Eitri-Apps for your organization's applications.

## Requirements

To use the Eitri CLI, you will need to have the following installed on your machine:

* [Node](https://nodejs.org/){:target="_blank"} 18 or higher
* [NPM](https://www.npmjs.com/){:target="_blank"}
* [Git](https://git-scm.com/){:target="_blank"}

## Installation

To install the CLI, use the command `npm install -g eitri-cli` in your terminal.

!!! info

    If you encounter any permission errors during installation, check if your user privileges are adequate/sufficient for the installation.

## Update

To update your CLI version, just use the command [eitri self-update](#self-update).

## Available Commands

You can use `--help` or `-h` at the end of any command to learn how to use it and explore its options.

Many of the additional functions of Eitri are available as options for the main commands.

---

### login

⌨️  `eitri login [options]`

Logs into the Eitri platform, creating account credentials on your machine and linking your command-line tool to your Eitri developer account.

#### Available Options

- `yes` Accepts redirection to the Console.

!!! info

    Most other commands can only be executed after logging in.

---

### create

⌨️  `eitri create [options] <project-name>`

Creates a new Eitri-App project on your machine and registers it on the Eitri platform.

You will need to provide some information when creating an Eitri-App:

`Application`
:   (The application in which your Eitri-App will run)

`Display Name`
:   Name used in the console listing. It is not displayed to the end client or user of the Eitri-App. This name is used internally and will not be visible to users.

`Marketing Name`
:   Product name, used in promotion and contact points with the user or end client. This name may be visible to users.

`Unique Name`
:   Also called slug, it is the name used for the unique identification of the Eitri-App on the Eitri platform, to find your Eitri-App, reference it in various circumstances, and also for building deep links. This name must not be repeated among Eitri-Apps and should not contain spaces or special characters.

#### Available Options

- `yes` Uses default values for name, title, and organization.
- `--application <application>` Allows you to define the application of the Eitri-App.
- `-v, --verbose` Displays detailed messages during command execution.

---

### start

⌨️  `eitri start [options]`

The `eitri start` command initializes the Eitri-App for development, generating a QR Code that should be scanned with the app of your organization in which Eitri was integrated.

As you develop and save your files locally, your Eitri-App will have a hot-reload feature that shows the changes in real-time on your device, allowing you to quickly and easily see the final result.

#### Available Options

- `--initialization-params` Allows you to send initialization parameters to the Eitri-App, which facilitates development and testing.
- `-v, --verbose` Displays detailed messages during command execution.
- `-p, --playground` Initializes the Eitri-App in playground mode, with an opening QR code for the Eitri Play.
- `-e, --emulator` Initializes the Eitri-App in emulator mode, with an opening QR code for the Eitri Emulator.
- `-sh, --shared` Initializes the Eitri-App in shared mode, with an opening QR code for the Eitri Shared.

---

### push-version

⌨️  `eitri push-version [options]`

Uploads a version of your Eitri-App to the Console, enabling publication. When this command is executed, a version of your Eitri-App will be added to the console and will be available for publication in the registered environments for the application.

#### Available Options

- `-v, --verbose` Displays detailed messages during command execution.
- `-s, --shared` Uploads the shared version of your Eitri-App.
- `-m, --message <version-message>` Adds a message to the version of your Eitri-App.

!!! info

    Pay attention to the version of your Eitri-App (in the eitri-app.conf.js file) since you cannot upload an existing version in the console.

---

### self-update

⌨️  `eitri self-update`

Updates your version of the Eitri CLI by uninstalling previous versions and installing the latest stable version.

It is recommended to always keep the latest version of the Eitri CLI to ensure the best performance, compatibility, stability, and development experience.

---

### workspace

⌨️  `eitri workspace [options]`

Manages and allows the use of multiple workspaces.

#### Available Options

- `list` Lists the user's workspaces.

- `use [options]` Selects a workspace to be used.

    - `--local` Selects a workspace for an Eitri-App directory.
    - `--name` Selects a previously created workspace by name.

- `create` Creates a new workspace.

- `current` Displays the current workspace, following the priority Local > Global.

- `clean` Cleans the developer's remote workspace. Useful when there is a malfunction in the cloud compilation of the Eitri-App. It follows the priority Local > Global.

---

### clean

⌨️  `eitri clean [options]`

Cleans your remote workspace.

When you run `eitri start`, your workspace is built with the code on your machine and is automatically updated as you develop and save your files.

If there is an issue with your workspace, the `eitri clean` command can help reestablish it.

#### Available Options

- `-v, --verbose` Displays detailed messages during command execution.

---

### libs

⌨️  `eitri libs [options]`

Lists the versions of Eitri libraries.

#### Available Options

- `--luminus` Lists the versions of the Eitri Luminus component library.
- `--bifrost` Lists the versions of the Eitri Bifrost SDK.

---

### doctor

⌨️  `eitri doctor`

Checks the dependencies and settings of your machine to ensure everything is correct for Eitri-App development.

---

### publish

⌨️  `eitri publish -e [environment-id] [options]`

Publishes the current version in the selected environment.

### Environment Id

- `-e, --environment <environment-id>` Set the environment to publishthe actual version of your Eitri-App defined by *eitri-app.conf.js*. To know your environment id, access the [Eitri Console](https://console.eitri.tech/) e go to **"Applications"**, select your app and click **"Your environments"**.

#### Available Options

- `-m, --message <message>` Adds comments to the publication.

---

### test

⌨️  `eitri test [options]`

Runs the tests of your Eitri-App.

#### Available Options

- `-p, --path <path>` Defines the path to the test file to be executed.

---

### app

⌨️  `eitri app [options]`

Manages the execution of Eitri-Apps from the application declared in the app-config.yaml file.

!!! info
    Take a look at [Developing multiple Eitri-apps](../quick-guides/eitri-app-start.md) for more information.

#### Available Options

- `start [options]` Initializes all Eitri-Apps from the app-config.yaml configuration file.
    - `-p, --playground` Initializes the Eitri-App in playground mode, with a QR Code for opening in Eitri Play.
    - `-v, --verbose` Displays more logs.

- `clean` Performs a complete cleanup of the workspaces, removing both remote workspaces and the local `.workspaces/` folders of all apps defined in the app-config.yaml file. Useful for resolving conflicts or invalid data issues in workspaces.
    - `-v, --verbose` Displays detailed messages during the cleanup process.

- `create [options] <app-name>` Creates an Eitri application with Eitri-apps based on a selected template.
    - `-v, --verbose` Displays more logs.

- `logs` Displays the logs of the Eitri-Apps running from the `eitri app start` command.

##### Bottom Tab Bar Simulation

While developing your app with [Eitri Play](eitri-play.md) you can simulate Eitri Bottom Tab Bar and it's behaviours. [Check here](../quick-guides/bottom-bar-simulation.md) to know more about how to simulate a Bottom Tab Bar.
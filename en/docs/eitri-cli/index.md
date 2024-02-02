# Eitri CLI

Eitri CLI is the starting point for developing Eitri-apps. With it, you can create, develop, and publish Eitri-apps for your organization's applications.

## Requirements

To use the Eitri CLI, you will need to have installed on your machine:

* [Node](https://nodejs.org/){:target="_blank"} 18 or higher
* [NPM](https://www.npmjs.com/){:target="_blank"}
* [Git](https://git-scm.com/){:target="_blank"}


## Installation

To install the CLI, use the command `npm install -g eitri-cli` in your terminal.

!!! info

    If you encounter any permission errors during installation, check if your user's privilege level is adequate/sufficient to carry out this installation.

## Update

To update your CLI version, simply use the command [eitri self-update](#self-update).

## Available Commands

You can use `--help` or `-h` at the end of any command to learn how to use it and to know its options.

Many of Eitri's complementary functions are available as options in the main commands.

### login

Usage: `eitri login [options]`

Performs the login to the Eitri platform, creating your account credentials on your machine and linking your command line tool to your Eitri developer account.

!!! info

    Most other commands can only be executed after logging in.

### create

Usage: `eitri create [options] <project-name>`

Creates a new Eitri-app project on your machine and registers it on the Eitri platform.

You will need to provide some information when creating an Eitri-app:

`Application`
:   (The application in which your Eitri-app will run)

`Readable Name`
:   Name used in the console listing. It is not displayed to the end customer or the user using the Eitri-app. This name is used internally and will not be seen by users.

`Promotional Name`
:   Name of the product, used in advertising and in contact points with the user or end customer. This name will be visible to users.

`Unique Name`
:   Also called a slug, it is the name used for the unique identification of the Eitri-app on the Eitri platform, to find your Eitri-app, refer to it in various circumstances, and also in the assembly of deeplinks. This name cannot be repeated among Eitri-apps and should not contain spaces or special characters.

### start

Usage: `eitri start [options]`

The `eitri start` command initializes the Eitri-app for development, generating a QR Code that must be scanned with your organization's app in which Eitri has been integrated.

As you develop and save your files locally, your Eitri-app will have a hotreload that shows real-time changes on your device's screen, allowing you to see the final result quickly and easily.

### push-version

Usage: `eitri push-version [options]`

Sends a version of your Eitri-app to the Console, enabling publication. When you execute this command, a version of your Eitri-app will be included in the console and will be available for publication in the environments registered for the application.

!!! info

    Pay attention to your Eitri-app's version (in the eitri-app.conf.js file) since it is not possible to send a version that already exists in the console.

### self-update

Usage: `eitri self-update [options]`

Updates your version of the Eitri CLI, uninstalling previous versions and installing the most recent stable version.

It is recommended to always keep the latest version of the Eitri CLI to ensure the best performance, compatibility, stability, and the best development experience.

### workspace

Usage: `eitri workspace [options] [command]`

Manages and allows the use of multiple workspaces. To know everything that can be done with the workspace command, use `eitri workspace --help`.

### clean

Usage: `eitri clean [options]`

Performs a cleaning in your remote workspace. When running `eitri start`, your workspace is set up with the code on your machine and is automatically updated as you develop and save your files. If there is any problem with your workspace, the `eitri clean` command can help reestablish it.

# Quick start for Eitri

If you wanna get started in a fast and easy way developing eitri-apps, this quick guide is for you. Here you will find the main commands and directions to quickly start developing using [Eitri](https://www.eitri.tech/){:target="_blank"}.

# Minimum requirements

This is what you'll need to develop using Eitri:

1. [Node](https://nodejs.org/){:target="_blank"} (version 18 or higher), [NPM](https://www.npmjs.com/){:target="_blank"} and [Git](https://git-scm.com/){:target="_blank"} installed
2. Install our CLI tool using `npm install -g eitri-cli`
3. Login into your developer account using `eitri login` in your terminal and follow the required steps


# Creating your first Eitri-App

Once you have installed Eitri CLI and logged in, it's time to create your first app:

1. Use the command `eitri app create <project_name>` inside the folder where you want your project to be created (You will need permission as org admin to create new apps)
2. You will need to select a template to use as base for your app. Actually Eitri support Vtex, Wake and Shopify apps.
3. When confirmed, you will have a new directory created with your project. You can enter it and use `eitri app start` to start developing your eitri-app
4. When it's all ready, you will receive a QrCode that needs to be scanned with [Eitri Play](../docs/concepts/eitri-play.md)
5. Your Eitri-apps (modules) versions can be generated individually by using `eitri push-version` inside their folders
6. After generating an Eitri-app version it will be avaliable for publishing on your apps environments.

!!! warn
    To generate a version of an Eitri-app, its dependencies must already exist in the system. If you have an Eitri app that depends on another one (such as a shared eitri-app, for example), first make sure the shared eitri-app version has been generated to satisfy that dependency.

!!! info
    Eitri App projects already come with suggested CI implementations to automate the version generation process and even publication to environments, but you can customize them as needed.


# Managing Eitri-Apps
To manage the published version, rollback to previous versions and set permissions for your eitri-app, you can log into Eitri Console with your developer account:

- [Eitri Console](https://console.eitri.tech/){:target="_blank"}
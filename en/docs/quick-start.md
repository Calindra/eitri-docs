# Quick start for Eitri

If you wanna get started in a fast and easy way developing eitri-apps, this quick guide is for you. Here you will find the main commands and directions to quickly start developing using [Eitri](https://www.eitri.tech/){:target="_blank"}.

# Minimum requirements

This is what you'll need to develop using Eitri:

1. [Node](https://nodejs.org/){:target="_blank"} (version 18 or higher), [NPM](https://www.npmjs.com/){:target="_blank"} and [Git](https://git-scm.com/){:target="_blank"} installed
2. Install our CLI tool using `npm install -g eitri-cli`
3. Login into your developer account using `eitri login` in your terminal and follow the required steps


# Creating your first Eitri-App

Once you have installed Eitri CLI and logged in, it's time to create your first project:

1. Use the command `eitri create <project_name>` inside the folder where you want your project to be created
2. You will need to provide a few information about your Eitri-App like *Application*, *Name*, *Public name* e *Slug*
3. When confirmed, you will have a new directory created with your project. You can enter it and use `eitri start` to start developing your eitri-app
4. Eitri will generate a QrCode that needs to be scanned with your organization app where Eitri was integrated, the same one that you declared on "Application" step before.
5. You can publish your first version using `eitri push-version` inside your eitri-app folder
6. After uploading your files, your eitri-app will be avaliable for publishing on your organization application environments.

# Managing Eitri-Apps
To manage the published version, rollback to previous versions and set permissions for your eitri-app, you can log into Eitri Console with your developer account:

- [Eitri Console](https://console.eitri.tech/){:target="_blank"}
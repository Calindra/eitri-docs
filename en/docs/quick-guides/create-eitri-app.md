# Creating an Eitri-App

The creation of an Eitri-App is done through the CLI, using the command `eitri create [options] <project-name>`

Once the command is done executing, a new Eitri-App project will be created on your device, and the Eitri-App will be registered in the Eitri platform.

During the command's execution, the following information will be required:

`Application`
:   The application under which the Eitri-App will run. This affects data such as the CSS theme used by the Eitri-App.

`Name`
:   This is the name used to identify your Eitri-App in the [Eitri Console](https://console.eitri.tech/){:target="_blank"}. It is only used internally and won't be public to any users.

`Public name`
:   This is the product name that will be displayed to users or clients.

`Slug`
: This is a name that will be used as an unique ID for your Eitri-App in the Eitri platform to locate it, reference it under various circunstances and in the assembly of deeplinks. This name cannot be used by multiple Eitri-Apps and it cannot contain whitespaces or special characters.
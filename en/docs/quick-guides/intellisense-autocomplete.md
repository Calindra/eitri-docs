# Eitri IntelliSense

IntelliSense is a feature present in various development tools, such as Visual Studio and Visual Studio Code, that provides automatic code suggestions while you are programming. It helps increase productivity by offering:

1. **Autocomplete**: Suggestions for variable names, functions, methods, and classes as you type.
2. **Parameter hints**: Information about the parameters that a function accepts, making it easier to use APIs and libraries.
3. **Quick documentation**: Displays relevant information about the code, such as comments or function descriptions.
4. **Navigation**: Allows you to quickly access definitions and references in the code.

These features make coding faster and less error-prone, providing a more efficient development experience.

## Start

### Requirements

- [Eitri-Luminus](/eitri-luminus)
- [Eitri-Bifrost](/eitri-bifrost)

A `jsconfig.json` file will be automatically generated. This file is read-only; any manual changes made to it will not work and will be lost at each start.

## [App Start](/quick-guides/eitri-app-start)

### Requirements

- Have all shared Eitri-Apps in the project structure at the root.
- Declare in the App-Config the fields eitri-bifrost and eitri-luminus with the respective common versions of the Eitri-Apps to generate the link with autocomplete and IntelliSense for the Eitri libraries.

Example of how it should look in `app-config.yaml`:

_Remember to ensure that the versions match those of the Eitri-Apps to avoid inconsistent autocomplete between versions._
<br/>
<br/>
![image](https://docs.eitri.tech/assets/intellisense/app-config.png)

A `jsconfig.json` file will be automatically generated. This file is read-only; any manual changes made to it will not work and will be lost at each app start. In the case of shared Eitri-Apps, a link will be generated according to the slug of the shared Eitri-App, thus enabling autocomplete and import suggestions for the shared components.

_In some cases, autocomplete and IntelliSense may not work initially, but simply reload VSCode with `command + shift + p` and selecting Reload Window._

## Final Result

### Import

![image](https://docs.eitri.tech/assets/intellisense/import.png)

### Eitri-Bifrost

![image](https://docs.eitri.tech/assets/intellisense/bifrost.png)

### Eitri-Luminus

![image](https://docs.eitri.tech/assets/intellisense/luminus.png)

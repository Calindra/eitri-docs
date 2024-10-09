# Eitri-App Start

Allows the developer to simultaneously run more than one Eitri-App in their respective workspaces. This is useful for developing and testing integration between different Eitri-Apps.

!!! note
    **Prerequisites:**

    - CLI version 1.17.0 or higher.


## Usage

1.  Structure your project with the following organization:
    ```plaintext
    ├── eitriapp-berserk (eitri-app folder)
    ├── components-logic (eitri-app folder)
    ├── shared-logic (eitri-app folder)
    ├── app-config.yaml (configuration file)
    ```

2. Create an `app-config.yaml` file at the root of the project with the following structure:
    - **application-id**: Application ID;
    - **eitri-apps**: List of Eitri-Apps to be started;
    - **alias**: Eitri-App alias;
    - **path**: Eitri-App path;
    - **workspace**: Eitri-App workspace;
    - **focus**: Defines if the Eitri-App will be opened in the foreground;
    - **shared**: Defines if the Eitri-App is shared between other Eitri-Apps.
```yaml
application-id: 'bd9b96af-ac33-492e-876c-6755b3aefaef'
eitri-apps:
    - alias: berserk
      path: "./eitriapp-berserk"
      workspace: DEFAULT
      focus: true
    - alias: "components-logic"
      path: "./components-logic"
      workspace: component
      shared: true
    - alias: "shared-logic"
      path: "./shared-logic"
      workspace: logic
      shared: true
```

3. Run the command **`eitri app start`** at the root of the project.
```bash
eitri app start
```

4. The command will start the Eitri-Apps configured in the **`app-config.yaml`** file, and the Eitri-App with the **`focus: true`** attribute will open in the foreground of the application.

5. Example of running the command:
```bash
eitri app start
Starting app start!
App start: Compiler ready for continuous use!
berserk | Building Eitri-App
components-logic | Building Eitri-App
shared-logic | Building Eitri-App
berserk | Starting Eitri builder
    
// further information hidden
```

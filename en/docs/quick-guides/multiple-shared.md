# Multiple Shared Eitri-Apps

To enable developers to reuse solutions across several of their Eitri-Apps, it is possible to import one Eitri-App into another by using **Shared Eitri-Apps**. This functionality facilitates the creation of modular and shareable solutions.

## Implementation

!!! note
    **Prerequisites:**
    
    - CLI version 1.17.0 or higher;
    - Eitri-App previously published as **Shared**;
        - The property `sharedVersion: "v2"` must be included in the `eitri-app.conf.js` file of the Shared Eitri-App.

!!! warning
    - If your Shared Eitri-App has not been published as version v2, continue importing it as before, from `shared-eitri-app`;
    - When using Shared v2, Luminus must follow the standard format, e.g.: `"eitri-luminus": "1.40"`. This ensures that the base design will be from Luminus, and you need to ensure that the Shared Eitri-Apps using it are compatible with each other.

### Adding a Shared Eitri-App

1. To use Shared Eitri-Apps, add them as dependencies in the `eitri-app.conf.js` file of the Eitri-App where you want to import the Shared Eitri-App:

    ```javascript
    'eitri-app-dependencies': {
        'eitri-vtex': {
            version: '0.1.350',
            isEitriAppShared: true
        },
        'ds-components': {
            version: '1.4.18',
            isEitriAppShared: true
        }
    }
    ```

2. After adding the dependencies, access the desired screen and import the components:

    ```javascript
    import { EitriVtex } from 'eitri-vtex';
    import { Button, FavoriteButton, ProductImage } from 'ds-components';
    ```

### Eitri-App Start with Multiple Shared Apps

!!! note
    To develop with more than one Shared Eitri-App using `app-start`, some adjustments are required in the `app-config.yaml` file. The `alias` should match the dependency name (the slug of the Shared), and the field `shared: true` must be added to the Eitri-App. The CLI and the compiler will automatically interpret which Shared Eitri-Apps your app is using and link them for development versions. Below is an example:

```yaml
application-id: '749d6f6f-f10f-4448-b36e-9c484b1293b8'
eitri-apps:
    - alias: berserk
      path: "./eitriapp-berserk"
      workspace: DEFAULT
      focus: true
      shared: false
    - alias: "my-components-logic"
      path: "./my-components-logic"
      workspace: COMP
      shared: true
    - alias: "my-shared-logic"
      path: "./my-shared-logic"
      workspace: LOGIC
      shared: true
```
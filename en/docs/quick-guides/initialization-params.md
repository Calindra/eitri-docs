# Eitri-App Initialization with Parameters

Initialization parameters let the Eitri-App start already configured for a specific scenario in the development environment. You can pass, for example, a product ID or a user email to simulate different cases without changing the code on each run.

## Reading the parameters in the Eitri-App

Inside the Eitri-App, use `Eitri.getInitializationInfos()` to get the parameters sent at startup. They arrive already converted into an object:

```jsx
export default function Home() {
  useEffect(() => {
    getStartParams();
  }, []);

  const getStartParams = async () => {
    const params = await Eitri.getInitializationInfos();
    // productId=e4386d93&email=developer@eitri.tech
    // => { productId: "e4386d93", email: "developer@eitri.tech" }
    console.log(params);
  };

  /**
   * additional code omitted
   * for readability
   */
}
```

## Sending the parameters

=== "Single Eitri-App"

    Use the [`--initialization-params`](../concepts/eitri-cli.md#start) option of `eitri start`:

    ```bash
    eitri start --initialization-params "productId=e4386d93-d6a7-4212-8501-2a99fc9a3f12&email=developer@eitri.tech"
    ```

=== "Eitri-App Start"

    Requires CLI version 1.18.0 or higher. In the `app-config.yaml` file of [`eitri app start`](eitri-app-start.md), add the `initialization-params` key with `type: "string"` and the value in **query string** format:

    ```yaml
    application-id: "4e8448ad-44c3-4504-a03b-4e8fc7ce27dc"
    environment-id: "bcf3b8f1-95ee-47d5-9499-8fd7d4689ff0"
    eitri-apps:
      - alias: equinox
        path: "./eitri-app-equinox"
        workspace: DEFAULT
        focus: true
      - alias: cronos
        path: "./eitri-app-cronos"
        workspace: cronos

    initialization-params:
      type: "string"
      value: "productId=e4386d93-d6a7-4212-8501-2a99fc9a3f12&foo=bar"
    ```

    The parameters are sent to the Eitri-App marked as `focus`.

!!! warning "Query string only"

    The parameters of `--initialization-params` and of the `initialization-params` key must be in **query string** format (`key=value&key2=value2`). JSON sent in this field does not reach the Eitri-App.

## Parameters per tab (Bottom Tab Bar)

When the `app-config.yaml` has [`bottom-tab-view-simulation`](bottom-bar-simulation.md), each tab can have its own parameters, and Eitri Play **ignores the global parameters**. Here, besides `string`, you can use the `json` type to send nested structures:

=== "string"

    ```yaml
    bottom-tab-view-simulation:
      eitri-apps:
        - slug: "home"
          title: "Home"
          initialization-params:
            type: "string"
            value: "tabIndex=0&route=Categories"
    ```

=== "json"

    ```yaml
    bottom-tab-view-simulation:
      eitri-apps:
        - slug: "search"
          title: "Search"
          initialization-params:
            type: "json"
            value: '{"route":"Search","searchTerm":"bossa"}'
    ```

## Changing the parameters without restarting

With `eitri start` or `eitri app start` running, type `p` in the terminal and press `enter` to change the parameters on the spot, with no need to stop the CLI:

1. The CLI shows the current value so you can edit it. Leave it empty to remove the parameters.
2. With `bottom-tab-view-simulation`, you first choose the **tab** and the **type** (`string` or `json`). Invalid JSON is rejected before it is sent.
3. The CLI publishes the new parameters. **Scan the QR Code again or reopen the Eitri-App through the deep link** to apply them.

!!! note

    - The change only lasts for the current session: the `app-config.yaml` is not changed.
    - In `eitri start`, the `p` key is not available with `--playground`.

See all the shortcuts in [Keyboard shortcuts](../concepts/eitri-cli.md#keyboard-shortcuts).

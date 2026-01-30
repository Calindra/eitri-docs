# Eitri-App Initialization with Parameters

The initialization with parameters feature allows Eitri-App to be properly configured from the start of its execution in a development environment. It facilitates development by enabling specific parameters, such as a product ID or user email, to simulate different scenarios.

This approach allows testing behavior variations, dynamically configuring information like product IDs or other specific parameters without the need to modify the base code with each execution.

## Implementation

### Single Eitri-App

To pass initialization parameters when starting the Eitri-App, the developer can use the [`--initialization-params`](https://docs.eitri.tech/en/eitri-cli/#start) command in the CLI:

```bash
eitri start --initialization-params "productId=e4386d93-d6a7-4212-8501-2a99fc9a3f12&email=developer@eitri.tech"
```

Within the Eitri-App code, the internal Eitri API method (Eitri.getInitializationInfos) is used to obtain the parameters passed when the Eitri-App starts.

```jsx
export default function Home() {
  useEffect(() => {
    getStartParams();
  }, []);

  const getStartParams = async () => {
    const params = await Eitri.getInitializationInfos();
    console.log(params);
  };

  /**
   * additional code omitted
   * for readability
   */
}
```

### Eitri-App Start

Read more about [`eitri app start`](https://docs.eitri.tech/en/quick-guides/initialization-params/).

#### Requirements

- CLI version 1.18.0 or higher

#### How to use

1. In the `app-config.yaml` file, add the `initialization-params` key to define the initialization parameters. The `initialization-params` key should be of type `string` with the desired value in **query-string** format.

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

2. Within the Eitri-App code, the internal Eitri API method (`Eitri.getInitializationInfos()`) is used to obtain the parameters passed when the Eitri-App starts.

```jsx
export default function Home() {
  useEffect(() => {
    getStartParams();
  }, []);

  const getStartParams = async () => {
    const params = await Eitri.getInitializationInfos();
    console.log(params);
  };

  /**
   * additional code omitted
   * for readability
   */
}
```

!!! note
**Retrieving parameters:** Initialization parameters are retrieved through the `Eitri.getInitializationInfos()` method.

    **Value format:** Currently, only **query-string** format values are accepted for initialization parameters.

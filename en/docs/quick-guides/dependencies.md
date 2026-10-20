# Managing Dependencies in Eitri-Apps

Eitri-Apps allow you to leverage various dependencies available within the Eitri platform to extend your application's functionality. This guide explains how to list, add and use these dependencies with the [Eitri CLI](../concepts/eitri-cli.md#dependencies).

## Listing available dependencies

Eitri-Apps support a curated list of third-party libraries, with controlled versions to ensure stability and compatibility. To see the available dependencies and their versions, run:

```bash
eitri dependencies list
```

!!! tip

    The list comes from the CLI itself. Keep it up to date with [`eitri self-update`](../concepts/eitri-cli.md#self-update) to see the latest dependencies.

## Adding dependencies with the CLI

In the root of your Eitri-App (where `eitri-app.conf.js` is), run:

```bash
eitri dependencies add
```

The CLI shows the available dependencies for you to select and declares them in `eitri-app-dependencies` in your `eitri-app.conf.js`. After that, just [import them in your code](#using-dependencies-in-your-code).

## Opening a dependency's documentation

To open a dependency's documentation in the browser, run the command below and select the dependency:

```bash
eitri dependencies docs
```

Use `--no-open` to only display the link, without opening the browser.

## Declaring Dependencies (`eitri-app.conf.js`)

All dependencies, whether they are shared Eitri-Apps or standard libraries, are declared in your `eitri-app.conf.js` file. `eitri dependencies add` already writes in this format, but you can also declare them manually, as is the case for shared Eitri-Apps.

### Structure

Each dependency is defined as an object within the `"eitri-app-dependencies"` section, specifying its `version`. For shared Eitri-Apps, you must also include `isEitriAppShared: true`.

```js
module.exports = {
  version: "1.0.1",
  "eitri-app-dependencies": {
    // Example of a Shared Eitri-App
    "eitri-shopping-vtex-shared": { isEitriAppShared: true, version: "2.0.0" },

    // Examples of Standard Optional Libraries
    dayjs: { version: "1.11.19" },
    "@tanstack/react-query": { version: "4.41.0" },
    "react-icons": { version: "5.5.0" },
  },
};
```

!!! note

    The versions above are for illustration only. Check the supported versions with `eitri dependencies list`.

## Using Dependencies in Your Code

Once declared in `eitri-app.conf.js`, you can import and use these dependencies in your React components as you normally would.

**Example with `dayjs`:**

```jsx
import dayjs from "dayjs";
import { Text } from "eitri-luminus";

export default function MyComponent() {
  const formattedDate = dayjs().format("YYYY-MM-DD");

  return <Text>Today's Date: {formattedDate}</Text>;
}
```

**Example with `react-icons`:**

```jsx
import { FaBeer } from "react-icons/fa";
import { View } from "eitri-luminus";

export default function IconDisplay() {
  return (
    <View>
      <FaBeer size={24} color="gold" />
    </View>
  );
}
```

By following these guidelines, you can effectively manage and utilize external dependencies in your Eitri-Apps.

## Integrating Apollo Client

Eitri provides a custom Apollo Link implementation that enables GraphQL requests to be processed through the device's native layer. This integration is essential for Eitri-Apps that need to communicate with GraphQL APIs using the Super App's network infrastructure, ensuring consistent behavior and leveraging native capabilities.

### Key Benefits

- Leverages the native HTTP stack for improved performance and reliability
- Enables access to native features such as certificate pinning and cookie management
- Shares the same network session as the host Super App
- Provides seamless integration with the Eitri ecosystem

### Basic Setup

To use Apollo Client with Eitri, you'll need to configure it with the custom `createEitriLink` function:

```typescript
import { createEitriLink } from "@eitri-helper/apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: createEitriLink({
    uri: "https://api.example.com/graphql",
    headers: {
      Authorization: "Bearer your-token-here",
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});
```

### Integration with Application Providers

The Apollo Client should be integrated into your application's provider hierarchy. The `src/providers/__main__.tsx` file serves as the main provider wrapper for your entire application. You can read more about providers in the [Providers documentation](../concepts/eitri-app.md#providers-and-global-state).

```tsx
import { createContext } from "react";
import UserProvider from "./User";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { createEitriLink } from "@eitri-helper/apollo";

type MainContextType = {};

const MainContext = createContext({} as MainContextType);

export default function MainProvider({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createEitriLink({
      uri: "https://your-graphql-api.com/graphql",
      headers: {
        // Add any additional headers required by your API
        "X-API-Key": "your-api-key",
        Authorization: "Bearer your-access-token",
      },
    }),
  });

  return (
    <MainContext.Provider value={{}}>
      <ApolloProvider client={client}>
        <UserProvider>{children}</UserProvider>
      </ApolloProvider>
    </MainContext.Provider>
  );
}
```

### Configuration Options

The `createEitriLink` function accepts an options object with the following properties:

```typescript
export interface EitriLinkOptions {
  /** The GraphQL endpoint URL */
  uri: string;
  /** Additional HTTP headers to include in requests */
  headers?: Record<string, string>;
}
```

**Required Properties:**

- **`uri`** (string): The GraphQL endpoint URL. This is a required field that specifies where your GraphQL server is located.

**Optional Properties:**

- **`headers`** (Record<string, string>, optional): An object containing additional HTTP headers to include in all GraphQL requests. Common headers include authorization tokens, API keys, and content-type specifications.

### Making GraphQL Queries

Once configured, you can use Apollo Client's hooks to make GraphQL queries in your components:

```tsx
import { gql, useQuery } from "@apollo/client";
import { View, Text } from "eitri-luminus";

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export default function UserProfile({ userId }: { userId: string }) {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <Text>User: {data.user.name}</Text>
      <Text>Email: {data.user.email}</Text>
    </View>
  );
}
```

This setup ensures that your GraphQL requests are properly routed through the Eitri native layer, taking advantage of the Super App's network infrastructure and security features.

### Working with GraphQL Files

Eitri supports `.gql` and `.graphql` file extensions for organizing your GraphQL queries and mutations. You can import these files directly into your components:

```javascript
import { GET_CART } from "../queries/get-cart.gql";
```

When you define queries in these files, they are imported as strings that can be used with Apollo Client:

```graphql
query GET_CART($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
  }
}

query GET_CART_QUANTITY($cartId: ID!) {
  cart(id: $cartId) {
    id
    totalQuantity
  }
}
```

You can then use the imported query directly with Apollo's `gql` tag or in your hooks:

```tsx
import { GET_CART } from "../queries/get-cart.gql";
import { gql, useQuery } from "@apollo/client";

// Using the imported query with gql
const { loading, error, data } = useQuery(gql(GET_CART), {
  variables: { cartId: "some-id" },
});
```

This approach allows you to organize your GraphQL operations in separate files, keeping your component code clean and maintaining a clear separation of concerns. You can create a dedicated directory for all your queries and mutations, making them easy to manage and reuse across your application.

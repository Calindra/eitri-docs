# Eitri-App

An Eitri-App is an application developed using the Eitri platform. They are mini-applications that run inside host apps, allowing you to create rich and interactive experiences in a modular way.

## What is an Eitri-App?

Eitri-Apps are applications built with React that can run inside mobile apps that integrate the Eitri platform. They offer:

- **Agile development**: Real-time hot-reload during development
- **Componentization**: Use [Eitri Luminus](eitri-luminus.md) components to create interfaces
- **Access to native resources**: Through [Eitri Bifrost](eitri-bifrost.md), access camera, GPS, and other resources
- **Simplified publishing**: Manage versions and publications through [Eitri Console](https://console.eitri.tech/)

## Eitri-App Structure

```
my-eitri-app/
├── src/
│   ├── views/           # App screens
│   │   └── Home.jsx
│   ├── providers/       # Global Providers/Hooks
│   └── locales/         # Internationalization files
├── eitri-app.conf.js    # Eitri-App configuration
└── package.json
```

## Creating an Eitri-App

To create a new Eitri-App, use the [Eitri CLI](eitri-cli.md):

```bash
eitri create my-eitri-app
```

## Development Cycle

1. **Create**: Use `eitri create` to start a new project
2. **Develop**: Use `eitri start` for development with hot-reload
3. **Test**: Scan the QR Code with [Eitri Play](eitri-play.md) or integrated app
4. **Publish**: Use `eitri push-version` to send to Console
5. **Release**: Publish the version to the desired environment through Console

## Creating Views and Components

In Eitri, all screens (views) and components are built using React **functional components**. Each `.jsx` or `.js` file in the `src/views/` folder represents a screen in your app.

### Basic View Structure

A view must export a function as `default` that receives `props` as a parameter:

```jsx
import { Window, View, Text } from "eitri-luminus";

export default function Home(props) {
  return (
    <Window>
      <View padding="medium">
        <Text fontSize="large">Welcome to Eitri!</Text>
      </View>
    </Window>
  );
}
```

**Requirements:**

- Files with `.js` or `.jsx` extension
- Export the function as `default`
- Receive `props` as parameter to access navigation data

### Complete Example with State and Requests

```jsx
import { useEffect, useState } from "react";
import { Window, View, Text, Image } from "eitri-luminus";
import Eitri from "eitri-bifrost";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await Eitri.http.get("https://api.example.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Window>
        <Text>Loading...</Text>
      </Window>
    );
  }

  return (
    <Window>
      {products.map((product) => (
        <View
          key={product.id}
          display="flex"
          direction="column"
          marginTop="medium"
          padding="medium"
        >
          <Image src={product.imageUrl} width={320} height={320} />
          <Text fontSize="large">{product.title}</Text>
          <Text>{product.description}</Text>
        </View>
      ))}
    </Window>
  );
}
```

### Providers and Global State

Eitri does **not** use `App.tsx`. All global state must be centralized in the `providers/` folder.

#### MainProvider

The file `src/providers/__main__.jsx` is the main provider that wraps the entire application. Use it to centralize all other providers.

**File: `src/providers/__main__.jsx`**

```jsx
import { createContext } from "react";
import AuthProvider from "./Auth";

const MainContext = createContext({});

export default function MainProvider({ children }) {
  return (
    <MainContext.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </MainContext.Provider>
  );
}
```

#### Creating a Provider

To share state between multiple views, create Providers in the `src/providers/` folder. The file must start with an uppercase letter and export the provider as `default`.

**Example: `src/providers/Auth.jsx`**

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Authentication logic
    const userData = await authenticateUser(credentials);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

#### Using the Provider in a View

```jsx
import { useAuth } from "@/providers/Auth";

export default function Profile(props) {
  const { user, logout } = useAuth();

  return (
    <Window>
      <Text>Hello, {user?.name}</Text>
      <Button label="Logout" onPress={logout} />
    </Window>
  );
}
```

!!! tip "Import with @"
Use `@/` to import files from the `src/` folder, regardless of your current view's depth level.

## Navigation

Eitri uses a file-based routing system, where the folder and file structure within `src/views/` automatically defines the available routes in your Eitri-App.

### File-based Routing

Each `.js` or `.jsx` file inside the `src/views/` folder automatically becomes an accessible route in your Eitri-App.

**File structure:**

```
src/views/
├── Home.jsx          → /Home
├── Products.jsx      → /Products
├── Product/
│   └── [id].jsx      → /Product/:id
└── Settings/
    ├── index.jsx     → /Settings
    └── Profile.jsx   → /Settings/Profile
```

**Conventions:**

- **Files at views root**: Each file becomes a route with the file name
- **Folders**: Create nested route segments
- **index.jsx**: Represents the root route of a folder
- **[parameter]**: Creates dynamic routes with parameters

### Dynamic Routes

To use dynamic routes, follow the `[parameter]` convention in the file or folder name.

For example, for a product listing with a details page:

**File structure:**

```
src/views/
├── Product
│   └── [id].jsx
└── Products.jsx
```

Where `id` will be the dynamic parameter. To navigate to the product with id 12345, the route will be `/Product/12345`.

### Parameter & State Retrieval

Data must be destructured inside the component body from the `props` object.

```jsx
export default function ProductDetail(props) {
  // URL Parameters (e.g., [id])
  const { id } = props.match.params;

  // Passed State (Navigation object)
  const { fromSearch } = props.location.state || {};

  // Logic...
}
```

### Programmatic Navigation

To navigate between screens in your Eitri-App, use the `Eitri.navigation.navigate` method:

```js
// Navigate to Home page
Eitri.navigation.navigate({
  path: "/Home",
});

// Navigate to a specific product
Eitri.navigation.navigate({
  path: "/Product/12345",
});

// Navigate with state
Eitri.navigation.navigate({
  path: "/Products",
  state: { category: "electronics" },
});
```

For more information about available navigation methods, see the [Eitri Bifrost](eitri-bifrost.md) documentation.

## Dependencies

To understand how to manage and use dependencies in your Eitri-App, refer to the [Managing Dependencies in Eitri-Apps](../quick-guides/dependencies.md) guide.

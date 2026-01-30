# Functional Programming

## How to develop functional components?

### Requirements

- Must have .(js)x .(js) files
- Export function in the following standard only:
  ```js
  export default function MY_FUNCTIONAL_COMPONENT(props) {}
  ```
- Use and receive props only in the format shown above
- Custom providers (hooks) only in the `/providers/*` folder and must export a provider as default

### How to use

To use functional components, just follow the formats below:

```jsx
import { useEffect, useState } from "react";
import { View, Window, Text, Image } from "@eitri/react";
import Eitri from "eitri-bifrost";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { location } = props;
  useEffect(() => {
    console.log(location.state);
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await Eitri.http.get(
      "https://calindra.tech/eitri/product_list.json",
    );

    const data = response.data;
    setProducts(data.resultItems);
  };

  return (
    <Window>
      {products?.map((product) => (
        <View
          key={product.id}
          display="flex"
          direction="column"
          marginTop="big"
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

Above, the .jsx|.tsx file identifies as if the states and methods were at the same level, unlike the class format where it is necessary to use `this` to access a property or method of that component.

### Provider(Hook) with global context

To have a customized provider(Hook) with global state, just have inside `src` the `providers` folder with the provider file named with a capital letter and .jsx|.tsx extension, example: `User.jsx`.

```jsx
const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const login = async (data) => {
    setUser(data);
    console.log({ user, data });
  };

  return (
    <UserContext.Provider value={{ login, user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);

  return context;
}
```

As shown above, we create a user context, from this context we generate the `UserProvider` function which is exported as default, and a hook that uses this context and we can access the state generated in the provider.
To use this hook, just import the provider, as follows:

```js
// In the way below we can use the @ to enter inside the src regardless of the level you are at
import { useAuth } from "@/providers/User";

// Or in the standard format, if you are in /view/Login.js
import { useAuth } from "../providers/User";

const { login, user } = useAuth();
```

In this way, we can access the login method and the user state created in the provider globally.
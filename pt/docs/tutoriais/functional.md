---
status: new
---

# Programação Funcional

## Como desenvolver componentes funcionais?

### Requisitos

- Possuir arquivos .(js)x .(js)
- Exportar função no seguinte padrão somente:
  ```js
  export default function MEU_COMPONENT_FUNCIONAL(props) {}
  ```
- Uso e recebimento de props somente no formato igual acima
- Providers (hooks) personalizados somente na pasta `/providers/*` e obrigatoriamente precisa exportar como default um provider

### Como utilizar

Para utilizar componentes funcionais basta seguir os seguintes formatos:

```js title="Arquivo JS | TS"
export default function Products(props) {
  const [products, setProducts] = useState([]);
  const { location } = props;
  useEffect(() => {
    console.log(location.state);
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch(
      "https://calindra.tech/eitri/product_list.json"
    );

    const data = await response.json();
    setProducts(data.resultItems);
  };
}
```

```jsx title="Arquivo JSX | TSX"
<Window>
  {products?.map((product) => (
    <View key={product.id} display="flex" direction="column" marginTop="big">
      <Image src={product.imageUrl} width={320} height={320} />
      <Text fontSize="large">{product.title}</Text>
      <Text>{product.description}</Text>
    </View>
  ))}
</Window>
```

Acima o arquivo .jsx|.tsx identifica como se os estados e métodos estivesse no mesmo nível, diferente do formato de classe que é necessário usar o `this` para acessar uma propriedade ou método daquele componente.

### Provider(Hook) com contexto global

Para ter um provider(Hook) customizado com estado global, basta ter dentro de `src` a pasta `providers` com o arquivo do provider com o nome começando com letra maiúscula e extensão .jsx|.tsx, exemplo: `User.jsx`.

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

Como mostrado acima, nos criamos um contexto de usuário, a partir desse contexto geramos a função `UserProvider` que é exportada como default, e um hook que utiliza esse contexto e podemos acessar o estado gerado no provider.
Para utilizar esse hook basta importar o provider, da seguinte forma:

```js
// Da forma abaixo podemos utilizar o @ para entrar dentro da src independente do nível que você esteja
import { useAuth } from "@/providers/User";

// Ou no formato padrão, caso esteja em /view/Login.js
import { useAuth } from "../providers/User";

const { login, user } = useAuth();
```

Dessa forma podemos acessar o método login e o estado de usuário criado no provider de forma global.

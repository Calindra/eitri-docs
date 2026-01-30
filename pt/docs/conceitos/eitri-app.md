# Eitri-App

Um Eitri-App é uma aplicação desenvolvida utilizando a plataforma Eitri. São mini-aplicações que rodam dentro de aplicativos host, permitindo criar experiências ricas e interativas de forma modular.

## O que é um Eitri-App?

Eitri-Apps são aplicações construídas com React que podem ser executadas dentro de aplicativos móveis que integram a plataforma Eitri. Eles oferecem:

- **Desenvolvimento ágil**: Hot-reload em tempo real durante o desenvolvimento
- **Componentização**: Utilize componentes do [Eitri Luminus](eitri-luminus.md) para criar interfaces
- **Acesso a recursos nativos**: Através do [Eitri Bifrost](eitri-bifrost.md), acesse câmera, GPS e outros recursos
- **Publicação simplificada**: Gerencie versões e publicações pelo [Console Eitri](https://console.eitri.tech/)

## Estrutura de um Eitri-App

```
meu-eitri-app/
├── src/
│   ├── views/           # Telas do aplicativo
│   │   └── Home.jsx
│   ├── providers/       # Providers/Hooks globais
│   └── locales/         # Arquivos de internacionalização
├── eitri-app.conf.js    # Configurações do Eitri-App
└── package.json
```

## Criando um Eitri-App

Para criar um novo Eitri-App, utilize a [Eitri CLI](eitri-cli.md):

```bash
eitri create meu-eitri-app
```

## Ciclo de Desenvolvimento

1. **Criar**: Use `eitri create` para iniciar um novo projeto
2. **Desenvolver**: Use `eitri start` para desenvolvimento com hot-reload
3. **Testar**: Escaneie o QR Code com o [Eitri Play](eitri-play.md) ou app integrado
4. **Publicar**: Use `eitri push-version` para enviar ao Console
5. **Disponibilizar**: Publique a versão no ambiente desejado pelo Console

## Criando Views e Componentes

No Eitri, todas as telas (views) e componentes são construídos usando **componentes funcionais** do React. Cada arquivo `.jsx` ou `.js` na pasta `src/views/` representa uma tela do seu aplicativo.

### Estrutura básica de uma View

Uma view deve exportar uma função como `default` que recebe `props` como parâmetro:

```jsx
import { Window, View, Text } from "eitri-luminus";

export default function Home(props) {
  return (
    <Window>
      <View padding="medium">
        <Text fontSize="large">Bem-vindo ao Eitri!</Text>
      </View>
    </Window>
  );
}
```

**Requisitos:**

- Arquivos com extensão `.js` ou `.jsx`
- Exportar a função como `default`
- Receber `props` como parâmetro para acessar dados de navegação

### Exemplo completo com estado e requisições

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
      const response = await Eitri.http.get("https://api.exemplo.com/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Window>
        <Text>Carregando...</Text>
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

### Providers e Estado Global

O Eitri **não utiliza** `App.tsx`. Todo estado global deve ser centralizado na pasta `providers/`.

#### MainProvider

O arquivo `src/providers/__main__.jsx` é o provider principal que envolve toda a aplicação. Use-o para centralizar todos os outros providers.

**Arquivo: `src/providers/__main__.jsx`**

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

#### Criando um Provider

Para compartilhar estado entre múltiplas views, crie Providers na pasta `src/providers/`. O arquivo deve começar com letra maiúscula e exportar o provider como `default`.

**Exemplo: `src/providers/Auth.jsx`**

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Lógica de autenticação
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

#### Usando o Provider em uma View

```jsx
import { useAuth } from "@/providers/Auth";

export default function Profile(props) {
  const { user, logout } = useAuth();

  return (
    <Window>
      <Text>Olá, {user?.name}</Text>
      <Button label="Sair" onPress={logout} />
    </Window>
  );
}
```

!!! tip "Importação com @"
Use `@/` para importar arquivos a partir da pasta `src/`, independente do nível de profundidade da sua view atual.

## Navegação

O Eitri utiliza um sistema de navegação baseado em arquivos, onde a estrutura de pastas e arquivos dentro de `src/views/` define automaticamente as rotas disponíveis no seu Eitri-App.

### Roteamento baseado em arquivos

Cada arquivo `.js` ou `.jsx` dentro da pasta `src/views/` se torna automaticamente uma rota acessível no seu Eitri-App.

**Estrutura de arquivos:**

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

**Convenções:**

- **Arquivos na raiz de views**: Cada arquivo se torna uma rota com o nome do arquivo
- **Pastas**: Criam segmentos de rota aninhados
- **index.jsx**: Representa a rota raiz de uma pasta
- **[parameter]**: Cria rotas dinâmicas com parâmetros

### Rotas Dinâmicas

Para utilizar rotas dinâmicas, siga a convenção `[parameter]` no nome do arquivo ou pasta.

Por exemplo, para uma listagem de produtos com página de detalhes:

**Estrutura de arquivos:**

```
src/views/
├── Product
│   └── [id].jsx
└── Products.jsx
```

Onde `id` será o parâmetro dinâmico. Para navegar para o produto com id 12345, a rota será `/Product/12345`.

### Obtendo Parâmetros e Estado

Os dados devem ser desestruturados dentro do corpo do componente a partir do objeto `props`.

```jsx
export default function ProductDetail(props) {
  // Parâmetros da URL (ex: [id])
  const { id } = props.match.params;

  // Estado passado (objeto de navegação)
  const { fromSearch } = props.location.state || {};

  // Lógica...
}
```

### Navegação Programática

Para navegar entre telas no seu Eitri-App, utilize o método `Eitri.navigation.navigate`:

```js
// Navegar para a página Home
Eitri.navigation.navigate({
  path: "/Home",
});

// Navegar para um produto específico
Eitri.navigation.navigate({
  path: "/Product/12345",
});

// Navegar com estado
Eitri.navigation.navigate({
  path: "/Products",
  state: { category: "electronics" },
});
```

Para mais informações sobre os métodos de navegação disponíveis, consulte a documentação do [Eitri Bifrost](eitri-bifrost.md).

## Dependências

Para entender como gerenciar e usar dependências em seu Eitri-App, consulte o guia [Gerenciando Dependências em Eitri-Apps](../tutoriais/dependencias.md).

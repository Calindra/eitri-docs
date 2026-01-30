# Gerenciando Dependências em Eitri-Apps

Eitri-Apps permitem que você utilize várias dependências disponíveis na plataforma Eitri para estender a funcionalidade da sua aplicação. Este guia explica como declarar e usar essas dependências.

## Dependências Suportadas e Versões

Eitri-Apps suportam uma lista curada de bibliotecas de terceiros com controle de versão rigoroso para garantir estabilidade e compatibilidade. Sempre consulte a documentação oficial ou seu `eitri-app.conf.js` para as versões exatas suportadas.

Aqui está uma amostra de dependências comumente usadas:

| Biblioteca                | Versão  | Biblioteca         | Versão |
| :------------------------ | :------ | :----------------- | :----- |
| **dayjs**                 | 1.11.19 | **eitri-i18n**     | 14.1.2 |
| **qs**                    | 6.13.0  | **uuid**           | 11.1.0 |
| **@fnando/cpf**           | 1.0.2   | **@fnando/cnpj**   | 1.0.2  |
| **firebase**              | 11.1.0  | **recaptcha**      | 2      |
| **react-icons**           | 5.5.0   | **liveshop**       | 1.0.0  |
| **google-map-react**      | 2.2.5   | **@apollo/client** | 4.1.3  |
| **@tanstack/react-query** | 4.41.0  |                    |        |

## Declarando Dependências (`eitri-app.conf.js`)

Todas as dependências, sejam Eitri-Apps compartilhados ou bibliotecas padrão, devem ser declaradas no seu arquivo `eitri-app.conf.js`.

### Estrutura

Cada dependência é definida como um objeto dentro da seção `"eitri-app-dependencies"`, especificando sua `version`. Para Eitri-Apps compartilhados, você também deve incluir `isEitriAppShared: true`.

```js
module.exports = {
  version: "1.0.1",
  "eitri-app-dependencies": {
    // Exemplo de um Eitri-App Compartilhado
    "eitri-shopping-vtex-shared": { isEitriAppShared: true, version: "2.0.0" },

    // Exemplos de Bibliotecas Opcionais Padrão
    dayjs: { version: "1.11.19" },
    "@tanstack/react-query": { version: "4.41.0" },
    "react-icons": { version: "5.5.0" },
  },
};
```

## Usando Dependências no Seu Código

Uma vez declaradas em `eitri-app.conf.js`, você pode importar e usar essas dependências em seus componentes React como faria normalmente.

**Exemplo com `dayjs`:**

```jsx
import dayjs from "dayjs";
import { Text } from "eitri-luminus";

export default function MyComponent() {
  const formattedDate = dayjs().format("YYYY-MM-DD");

  return <Text>Data de Hoje: {formattedDate}</Text>;
}
```

**Exemplo com `react-icons`:**

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

Seguindo estas diretrizes, você pode gerenciar e utilizar efetivamente dependências externas em seus Eitri-Apps.

## Integração com Apollo Client

O Eitri fornece uma implementação personalizada do Apollo Link que permite que requisições GraphQL sejam processadas através da camada nativa do dispositivo. Essa integração é essencial para Eitri-Apps que precisam se comunicar com APIs GraphQL usando a infraestrutura de rede do Super App, garantindo comportamento consistente e aproveitando as capacidades nativas.

### Benefícios Principais

- Aproveita a pilha HTTP nativa para melhor desempenho e confiabilidade
- Permite acesso a recursos nativos como pinning de certificado e gerenciamento de cookies
- Compartilha a mesma sessão de rede do Super App hospedeiro
- Fornece integração perfeita com o ecossistema Eitri

### Configuração Básica

Para usar o Apollo Client com o Eitri, você precisará configurá-lo com a função personalizada `createEitriLink`:

```typescript
import { createEitriLink } from "@eitri-helper/apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: createEitriLink({
    uri: "https://api.exemplo.com/graphql",
    headers: {
      Authorization: "Bearer seu-token-aqui",
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});
```

### Integração com Provedores da Aplicação

O Apollo Client deve ser integrado à hierarquia de provedores da sua aplicação. O arquivo `src/providers/__main__.tsx` serve como o invólucro principal do provedor para toda a aplicação. Você pode ler mais sobre provedores na [documentação de provedores](../conceitos/eitri-app.md#providers-e-estado-global).

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
      uri: "https://sua-api-graphql.com/graphql",
      headers: {
        // Adicione quaisquer cabeçalhos adicionais exigidos pela sua API
        "X-API-Key": "sua-chave-de-api",
        Authorization: "Bearer seu-token-de-acesso",
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

### Opções de Configuração

A função `createEitriLink` aceita um objeto de opções com as seguintes propriedades:

```typescript
export interface EitriLinkOptions {
  /** A URL do endpoint GraphQL */
  uri: string;
  /** Cabeçalhos HTTP adicionais para incluir nas requisições */
  headers?: Record<string, string>;
}
```

**Propriedades Obrigatórias:**

- **`uri`** (string): A URL do endpoint GraphQL. Este campo é obrigatório e especifica onde seu servidor GraphQL está localizado.

**Propriedades Opcionais:**

- **`headers`** (Record<string, string>, opcional): Um objeto contendo cabeçalhos HTTP adicionais para incluir em todas as requisições GraphQL. Cabeçalhos comuns incluem tokens de autorização, chaves de API e especificações de tipo de conteúdo.

### Fazendo Consultas GraphQL

Uma vez configurado, você pode usar os hooks do Apollo Client para fazer consultas GraphQL em seus componentes:

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

  if (loading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro: {error.message}</Text>;

  return (
    <View>
      <Text>Usuário: {data.user.name}</Text>
      <Text>Email: {data.user.email}</Text>
    </View>
  );
}
```

Essa configuração garante que suas requisições GraphQL sejam roteadas corretamente através da camada nativa do Eitri, aproveitando a infraestrutura de rede e os recursos de segurança do Super App.

### Trabalhando com Arquivos GraphQL

O Eitri suporta as extensões de arquivo `.gql` e `.graphql` para organizar suas queries e mutações GraphQL. Você pode importar esses arquivos diretamente em seus componentes:

```javascript
import { GET_CART } from "../queries/get-cart.gql";
```

Quando você define queries nesses arquivos, elas são importadas como strings que podem ser usadas com o Apollo Client:

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

Você pode então usar a query importada diretamente com a tag `gql` do Apollo ou em seus hooks:

```tsx
import { GET_CART } from "../queries/get-cart.gql";
import { gql, useQuery } from "@apollo/client";

// Usando a query importada com gql
const { loading, error, data } = useQuery(gql(GET_CART), {
  variables: { cartId: "algum-id" },
});
```

Essa abordagem permite que você organize suas operações GraphQL em arquivos separados, mantendo seu código de componente limpo e mantendo uma separação clara de responsabilidades. Você pode criar um diretório dedicado para todas as suas queries e mutações, tornando-as fáceis de gerenciar e reutilizar em toda a sua aplicação.

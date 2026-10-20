# Gerenciando Dependências em Eitri-Apps

Eitri-Apps permitem que você utilize várias dependências disponíveis na plataforma Eitri para estender a funcionalidade da sua aplicação. Este guia explica como listar, adicionar e usar essas dependências com a [Eitri CLI](../conceitos/eitri-cli.md#dependencies).

## Consultando as dependências disponíveis

Eitri-Apps suportam uma lista curada de bibliotecas de terceiros, com versões controladas para garantir estabilidade e compatibilidade. Para ver as dependências disponíveis e suas versões, rode:

```bash
eitri dependencies list
```

!!! tip

    A lista vem da própria CLI. Mantenha-a atualizada com [`eitri self-update`](../conceitos/eitri-cli.md#self-update) para ver as dependências mais recentes.

## Adicionando dependências pela CLI

Na raiz do seu Eitri-App (onde está o `eitri-app.conf.js`), rode:

```bash
eitri dependencies add
```

A CLI exibe as dependências disponíveis para você selecionar e as declara em `eitri-app-dependencies` no seu `eitri-app.conf.js`. Depois disso, basta [importá-las no seu código](#usando-dependencias-no-seu-codigo).

## Consultando a documentação de uma dependência

Para abrir no navegador a documentação de uma dependência, rode o comando abaixo e selecione a dependência:

```bash
eitri dependencies docs
```

Use `--no-open` para apenas exibir o link, sem abrir o navegador.

## Declarando Dependências (`eitri-app.conf.js`)

Todas as dependências, sejam Eitri-Apps compartilhados ou bibliotecas padrão, ficam declaradas no seu arquivo `eitri-app.conf.js`. O `eitri dependencies add` já escreve nesse formato, mas você também pode declará-las manualmente, como é o caso dos Eitri-Apps compartilhados.

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

!!! note

    As versões acima são apenas ilustrativas. Consulte as versões suportadas com `eitri dependencies list`.

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

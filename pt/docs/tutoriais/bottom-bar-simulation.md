---
status: new
---

# Simulação da Bottom Bar

Enquanto desenvolve seu app Eitri, a chave `bottom-tab-view-simulation`  no arquivo `app-config.yaml` permite simular uma interface de **navegação por abas inferiores** (bottom tab), semelhante aos aplicativos mobile nativos. Essa funcionalidade possibilita rodar múltiplos **Eitri-Apps** em paralelo, cada um exibido como uma aba, facilitando os testes e a visualização de apps como se fossem seções de um único aplicativo.

---

## 📋 Barra padrão

### 🔧 Estrutura YAML

Adicione a chave `bottom-tab-view-simulation` à sua `app-config.yaml` e defina a lista `eitri-apps` com os Eitri-Apps desejados para serem mostrados na aba inferior.

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "slug-do-eitri-app"
      title: "Título da Aba"
      initialization-params:
        type: "string"
        value: "<valor de inicialização>"
```

---

### 🧩 Campos disponíveis

| Campo                   | Tipo     | Obrigatório | Descrição                                            |
| ----------------------- | -------- | ----------- | ---------------------------------------------------- |
| `slug`                  | `string` | ✅ Sim      | Identificador (slug) do Eitri-App a ser carregado.   |
| `title`                 | `string` | ✅ Sim      | Nome da aba exibida na bottom bar.                   |
<!-- | `initialization-params` | `json`   | ❌ Não      | Parâmetros de inicialização como JSON (veja abaixo). | -->

Para personalizar a aparência da barra (cores, ícones, badges), adicione a chave opcional `layout`. Veja [Bottom bar dinâmica](#bottom-bar-dinamica).

<!-- #### JSON `initialization-params`

| Campo   | Tipo     | Obrigatório | Descrição                                                                  |
| ------- | -------- | ----------- | -------------------------------------------------------------------------- |
| `type`  | `string` | ✅ Sim      | Pode ser `"string"` (formato query string) ou `"json"` (formato JSON).     |
| `value` | `string` | ✅ Sim      | Valor a ser passado para inicialização. O formato depende do campo `type`. |

> O campo `initialization-params` é opcional e deve ser usado **somente se for necessário passar dados de entrada** ao app no momento da inicialização.
> Ambos os campos `type` e `value` são obrigatórios caso você deseje usá-lo. -->

---

### ✅ Exemplo completo

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "power-rune"
      title: "Primeira"
      initialization-params:
        type: "string"
        value: "var1=xpto&var2=foobar"

    - slug: "eihwaz-rune"
      title: "Segunda"

    - slug: "eitri-doctor"
      title: "Terceira"

    - slug: "eitri-doctor"
      title: "Quarta"
```

---

## 🎨 Bottom bar dinâmica

Por padrão, a simulação desenha uma barra simples, com abas só de texto. Adicione a chave opcional `layout`, no mesmo nível de `eitri-apps`, e o app passa a exibir a mesma **bottom bar dinâmica** dos apps em produção, com suas cores, ícones, badges, borda e tamanhos.

```yaml
bottom-tab-view-simulation:
  eitri-apps:            # navegação: qual Eitri-App cada aba abre
    - slug: "slug-do-eitri-app"
      title: "Título da Aba"
  layout:
    layout:              # aparência da barra
      theme: classic
      backgroundColor: "#FFFFFF"
    eitriApps:           # apresentação de cada aba, na mesma ordem de eitri-apps
      - title: "Título da Aba"
        icon: "https://exemplo.com/icon_home.png"
```

A chave `layout` tem dois nós:

- `layout.layout`: a aparência da barra.
- `layout.eitriApps`: o título, o ícone e o badge de cada aba.

`slug` e `initialization-params` continuam em `eitri-apps`.

### Aparência

Campos de `layout.layout`.

| Campo                | Tipo                         | Descrição                                                                                         |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------- |
| `theme`              | `string`                     | Tema da barra. Hoje só existe `classic` (também é o padrão).                                      |
| `backgroundColor`    | `string`                     | Cor de fundo da barra (hex).                                                                      |
| `selectedColor`      | `string`                     | Cor do ícone e do título da aba selecionada (hex).                                                |
| `unselectedColor`    | `string`                     | Cor do ícone e do título das demais abas (hex).                                                   |
| `badgeBackground`    | `string`                     | Cor de fundo de todos os badges (hex). Padrão: vermelho.                                          |
| `badgeTextColor`     | `string`                     | Cor do texto de todos os badges (hex). Padrão: branco.                                            |
| `fontFamily`         | `{ android, ios }`           | Fonte dos títulos. Precisa já estar embarcada no app; senão, usa a fonte do sistema.             |
| `selectedFontFamily` | `{ android, ios }`           | Fonte do título da aba selecionada. Se omitida, usa `fontFamily`.                                |
| `themeCustomizations`| `object`                     | Ajustes de layout por tema. Veja `classic` abaixo.                                               |

### Tema `classic`

Campos de `layout.layout.themeCustomizations.classic`.

| Campo              | Tipo                    | Padrão     | Descrição                                                                  |
| ------------------ | ----------------------- | ---------- | -------------------------------------------------------------------------- |
| `labels`           | `"shown"` \| `"hidden"` | `shown`    | `hidden` remove todos os títulos e centraliza os ícones.                   |
| `topBorder`        | `{ thickness, color }`  | sem borda  | Borda superior da barra. `thickness: 0` remove a borda.                    |
| `iconSize`         | `number`                | `24`       | Largura e altura de cada ícone.                                            |
| `labelFontSize`    | `number`                | `12`       | Tamanho da fonte dos títulos.                                              |
| `iconLabelSpacing` | `number`                | `2`        | Espaço vertical entre ícone e título.                                      |
| `paddingTop`       | `number`                | `6`        | Espaço acima do ícone.                                                     |
| `paddingBottom`    | `number`                | `6`        | Espaço abaixo do título.                                                   |

Não dá para definir a altura da barra diretamente. Ela acompanha o conteúdo: `paddingTop` + ícone + `iconLabelSpacing` + título + `paddingBottom`.

### Abas

Campos de cada item de `layout.eitriApps`.

| Campo   | Tipo     | Descrição                                                                                       |
| ------- | -------- | ----------------------------------------------------------------------------------------------- |
| `title` | `string` | Título da aba. Tem prioridade sobre o `title` de `eitri-apps`. String vazia esconde o título.   |
| `icon`  | `string` | URL do ícone (`https`).                                                                         |
| `badge` | `string` | Texto inicial do badge sobre o ícone. Omita para não exibir badge.                              |

!!! warning "Requisitos do ícone"
    A barra repinta cada ícone com `selectedColor` / `unselectedColor`, então só o formato do ícone importa.

    - **PNG com fundo transparente.** Um fundo opaco faz a aba virar um quadrado sólido.
    - Desenhe o ícone em **uma única cor chapada** (normalmente preto).
    - Use uma imagem **quadrada**, com cerca de **96×96 px** e o mesmo respiro em todos os ícones.
    - A URL precisa ser **`https`**.

### ✅ Exemplo completo

```yaml
bottom-tab-view-simulation:
  eitri-apps:
    - slug: "minha-loja-home"
      title: "Início"
      initialization-params:
        type: "string"
        value: "tabIndex=0"
    - slug: "minha-loja-home"
      title: "Categorias"
      initialization-params:
        type: "string"
        value: "tabIndex=1&route=Categories"
    - slug: "minha-loja-cart"
      title: "Sacola"
      initialization-params:
        type: "string"
        value: "tabIndex=2"
    - slug: "minha-loja-account"
      title: "Perfil"
      initialization-params:
        type: "string"
        value: "tabIndex=3"
  layout:
    layout:
      theme: classic
      backgroundColor: "#FFFFFF"
      selectedColor: "#373737"
      unselectedColor: "#8B8D98"
      badgeBackground: "#E5484D"
      badgeTextColor: "#FFFFFF"
      themeCustomizations:
        classic:
          labels: shown
          topBorder:
            thickness: 1
            color: "#DBDDE0"
    eitriApps:
      - title: "Início"
        icon: "https://media-eitri-content.eitri.tech/default/icon_home_v1.png"
      - title: "Categorias"
        icon: "https://media-eitri-content.eitri.tech/default/icon_menu_v1.png"
      - title: "Sacola"
        icon: "https://media-eitri-content.eitri.tech/default/icon_cart_v1.png"
        badge: "2"
      - title: "Perfil"
        icon: "https://media-eitri-content.eitri.tech/default/icon_user_v1.png"
```

---

## 💡 Dicas

- Use `type: "string"` para entradas rápidas no estilo de query string (`chave=valor`).
<!-- - Use `type: "json"` para passar dados estruturados como string JSON (ex: `'{ "foo": "bar" }'`).
- O valor do campo `value` **deve sempre ser uma string válida**, mesmo no caso de JSON. -->
- As abas são exibidas na ordem em que são declaradas no YAML.
- Você pode repetir o mesmo `slug` com títulos ou parâmetros diferentes.
- Com `layout`, as abas são casadas **por posição**: mantenha `eitri-apps` e `layout.eitriApps` na mesma ordem e com a mesma quantidade de itens.
- Se o app em que você está rodando já tem uma bottom bar dinâmica configurada no ambiente, essa configuração tem prioridade sobre o YAML. Nesse caso, `layout: { layout: { theme: classic } }` basta para a simulação usar a barra do próprio app.
- Sem `layout`, ou em versões do app sem suporte, a simulação usa a barra padrão. A bottom bar dinâmica requer o Eitri Play 2.31.0 ou superior.

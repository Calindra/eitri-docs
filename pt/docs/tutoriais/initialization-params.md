# Inicialização do Eitri-App com Parâmetros

Os parâmetros de inicialização permitem que o Eitri-App comece já configurado para um cenário específico no ambiente de desenvolvimento. Você pode passar, por exemplo, o ID de um produto ou o e-mail de um usuário para simular diferentes casos sem alterar o código a cada execução.

## Lendo os parâmetros no Eitri-App

Dentro do Eitri-App, use `Eitri.getInitializationInfos()` para obter os parâmetros enviados no start. Eles chegam já convertidos em objeto:

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
    }

    /** 
     * demais códigos ocultados
     * para facilitar a leitura
     */
}
```

## Enviando os parâmetros

=== "Único Eitri-App"

    Use a opção [`--initialization-params`](../conceitos/eitri-cli.md#start) do `eitri start`:

    ```bash
    eitri start --initialization-params "productId=e4386d93-d6a7-4212-8501-2a99fc9a3f12&email=developer@eitri.tech"
    ```

=== "Eitri-App Start"

    Requer a CLI 1.18.0 ou superior. No arquivo `app-config.yaml` do [`eitri app start`](eitri-app-start.md), adicione a chave `initialization-params` com `type: "string"` e o valor no formato **query string**:

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

    Os parâmetros são enviados ao Eitri-App marcado como `focus`.

!!! warning "Somente query string"

    Os parâmetros do `--initialization-params` e da chave `initialization-params` precisam estar no formato **query string** (`chave=valor&chave2=valor2`). JSON enviado nesse campo não chega ao Eitri-App.

## Parâmetros por aba (Bottom Bar)

Quando o `app-config.yaml` tem [`bottom-tab-view-simulation`](bottom-bar-simulation.md), cada aba pode ter os seus próprios parâmetros, e o Eitri Play **ignora os parâmetros globais**. Aqui, além de `string`, você pode usar o tipo `json` para enviar estruturas aninhadas:

=== "string"

    ```yaml
    bottom-tab-view-simulation:
      eitri-apps:
        - slug: "home"
          title: "Início"
          initialization-params:
            type: "string"
            value: "tabIndex=0&route=Categories"
    ```

=== "json"

    ```yaml
    bottom-tab-view-simulation:
      eitri-apps:
        - slug: "search"
          title: "Busca"
          initialization-params:
            type: "json"
            value: '{"route":"Search","searchTerm":"bossa"}'
    ```

## Alterando os parâmetros sem reiniciar

Com o `eitri start` ou o `eitri app start` em execução, digite `p` no terminal e pressione `enter` para trocar os parâmetros na hora, sem precisar parar a CLI:

1. A CLI exibe o valor atual para você editar. Deixe vazio para remover os parâmetros.
2. Com `bottom-tab-view-simulation`, você escolhe antes a **aba** e o **tipo** (`string` ou `json`). JSON inválido é recusado antes de ser enviado.
3. A CLI publica os novos parâmetros. **Escaneie o QR Code novamente ou reabra o Eitri-App pelo deeplink** para aplicá-los.

!!! note

    - A alteração vale apenas para a sessão atual: o `app-config.yaml` não é modificado.
    - No `eitri start`, a tecla `p` não está disponível com `--playground`.

Veja todos os atalhos em [Atalhos de teclado](../conceitos/eitri-cli.md#atalhos-de-teclado).

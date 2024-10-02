# Inicialização do Eitri-App com Parâmetros

A funcionalidade de inicialização com parâmetros permite que o Eitri-App seja configurado corretamente desde o início da sua execução em ambiente de desenvolvimento. Facilita o desenvolvimento, podendo passar parâmetros específicos, como o ID de um produto ou e-mail de usuário, para simular diferentes cenários.

Essa abordagem permite testar variações de comportamento, configurando dinamicamente informações como IDs de produto ou outros parâmetros específicos, sem a necessidade de alterar o código base a cada execução.


## Implementação

### Único Eitri-App

Para passar os parâmetros de inicialização ao iniciar o Eitri-App, o desenvolvedor pode usar o comando `--initializationParams` na CLI:

```bash
eitri start --initializationParams "productId=e4386d93-d6a7-4212-8501-2a99fc9a3f12&email=developer@eitri.tech"
```

Dentro do código do Eitri-App, é utilizado o método da API interna do Eitri (Eitri.getInitializationInfos) para obter os parâmetros passados no momento do start do Eitri-App.

```jsx
export default function Home() {

    useEffect(() => {
        getStartParams()
    }, []);

    const getStartParams = async () => {
        const params = await Eitri.getInitializationInfos()
        console.log(params)
    }

    /** 
     * demais códigos ocultados
     * para facilitar a leitura
     */
}
```


### Eitri-App Start

#### Requisitos
* Versão da CLI 1.18.0 ou superior

#### Como utilizar

1. No arquivo `app-config.yaml`, adicione a chave `initialization-params` para definir os parâmetros de inicialização. A chave `initialization-params` deve ter o tipo `string` e o valor desejado em formato de **query-string**.

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

2. Dentro do código do Eitri-App, é utilizado o método da API interna do Eitri (`Eitri.getInitializationInfos()`) para obter os parâmetros passados no momento do start do Eitri-App.

```jsx
export default function Home() {

    useEffect(() => {
        getStartParams();
    }, []);

    const getStartParams = async () => {
        const params = await Eitri.getInitializationInfos();
        console.log(params);
    }

    /** 
     * demais códigos ocultados
     * para facilitar a leitura
     */
}
```

#### Observações

* **Obtendo os parâmetros:** Os parâmetros de inicialização são recuperados através do método `Eitri.getInitializationInfos()`.
* **Formato dos valores:** Atualmente, apenas valores no formato **query-string** são aceitos para os parâmetros de inicialização.


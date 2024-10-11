# Desenvolvendo vários Eitri-Apps

Permite que o desenvolvedor possa executar simultaneamente mais de um Eitri-App, em seus devidos workspaces. Isso é útil para desenvolver e testar a integração entre diferentes Eitri-Apps.

!!! note
    **Pré-requisitos:**

    - CLI versão 1.17.0 ou superior.


## Uso

1.  Estruture o seu projeto com a seguinte organização:
```plaintext
  ├── eitriapp-berserk (pasta do eitri-app)
  ├── components-logic (pasta do eitri-app)
  ├── shared-logic (pasta do eitri-app)
  ├── app-config.yaml (arquivo de configuração)
```

2. Crie um arquivo `app-config.yaml` na raiz do projeto, com a seguinte estrutura:
    - **application-id**: ID do aplicativo;
    - **eitri-apps**: Lista de Eitri-Apps que serão iniciados;
    - **alias**: Alias do Eitri-App;
    - **path**: Caminho do Eitri-App;
    - **workspace**: Workspace do Eitri-App;
    - **focus**: Define qual Eitri-App será aberto em primeiro plano;
    - **shared**: Define se o Eitri-App é compartilhado entre outros Eitri-Apps.
```yaml
application-id: 'bd9b96af-ac33-492e-876c-6755b3aefaef'
eitri-apps:
    - alias: berserk
      path: "./eitriapp-berserk"
      workspace: DEFAULT
      focus: true
    - alias: "components-logic"
      path: "./components-logic"
      workspace: component
      shared: true
    - alias: "shared-logic"
      path: "./shared-logic"
      workspace: logic
      shared: true
```

3. Execute o comando **`eitri app start`** na raiz do projeto.
```bash
eitri app start
```

4. O comando irá iniciar os Eitri-Apps configurados no arquivo **`app-config.yaml`** e o Eitri-App com o atributo **`focus: true`** será aberto em primeiro plano no aplicativo.

5. Exemplo de execução do comando:
```bash
eitri app start
Iniciando app start!
App start: Compilador pronto para uso contínuo!
berserk | Construindo Eitri-App
components-logic | Construindo Eitri-App
shared-logic | Construindo Eitri-App
berserk | Iniciando Eitri builder

// código de log desnecessário no exemplo oculto
```
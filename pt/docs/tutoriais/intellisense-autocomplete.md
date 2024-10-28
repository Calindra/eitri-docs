# IntelliSense do Eitri

O IntelliSense é uma funcionalidade presente em diversas ferramentas de desenvolvimento, como o Visual Studio e o Visual Studio Code, que oferece sugestões automáticas de código enquanto você está programando. Ele ajuda a aumentar a produtividade ao fornecer:

1. **Autocompletar**: Sugestões de nomes de variáveis, funções, métodos e classes à medida que você digita.
2. **Dicas de parâmetros**: Informações sobre os parâmetros que uma função aceita, o que facilita o uso de APIs e bibliotecas.
3. **Documentação rápida**: Exibe informações relevantes sobre o código, como comentários ou descrições de funções.
4. **Navegação**: Permite que você acesse rapidamente definições e referências no código.

Essas funcionalidades tornam a codificação mais rápida e menos propensa a erros, proporcionando uma experiência de desenvolvimento mais eficiente.

## Start

### Requisitos

- [Eitri-Luminus](/eitri-luminus)
- [Eitri-Bifrost](/eitri-bifrost)

Será gerado automaticamente um arquivo `jsconfig.json`. Somente leitura, qualquer alteração feita manualmente nele não funcionará e será perdida a cada start.

## [App Start](/tutoriais/eitri-app-start)

### Requisitos

    * Ter na raiz todos os shared Eitri-Apps na estrutura do projeto.
    * Declarar no App-Config os campos eitri-bifrost e eitri-luminus com as respectivas versões em comum dos Eitri-Apps, para ser gerado o link com o autocomplete e intelliSense das bibliotecas do Eitri.

Exemplo de como deve ficar no `app-config.yaml`:

_Lembre-se de as versões estarem de acordo com as dos Eitri-Apps para evitar auto-complete inconsistente entre as versões_
<br/>
<br/>
![image](https://docs.eitri.tech/assets/intellisense/app-config.png)

Será gerado automaticamente um arquivo `jsconfig.json`. Somente leitura, qualquer alteração feita manualmente nele não funcionará e será perdida a cada app start. No caso dos shared Eitri-Apps será gerando um link de acordo com o slug do Eitri-App que é shared, assim gerando auto complete, sugestões de import do shared.

_Em alguns casos pode ser que não funcione o auto complete e intelliSense de primeira mas basta dar reload no VSCode com `command + shift + p` e selecionando Reload Window._

## Resultado Final

### Import

![image](https://docs.eitri.tech/assets/intellisense/import.png)

### Eitri-Bifrost

![image](https://docs.eitri.tech/assets/intellisense/bifrost.png)

### Eitri-Luminus

![image](https://docs.eitri.tech/assets/intellisense/luminus.png)

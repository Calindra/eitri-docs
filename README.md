# eitri-docs

Os projetos em inglês e em português são 2 projetos completamente separados e a única coisa que compartilham são os assets da pasta `override`. 

Para rodar o projeto você precisará:

1. instalar o python (De preferência 3.11 ou superior)

2. Criar o virtual environment do python para a instalação:

`python3 -m venv venv`

3. Ativar o virtual environment do Python (O caminho vai depender do seu SO e da versão do Python):

- No windows:
`source venv/Scripts/activate`

- No Linux:
`source venv/bin/activate`

> **OBS1**: isso fará com que este venv seja a instância do python usada para as instalações de dependências e não a instalação global do python, similar ao node_modules no JS

> **OBS2**: para desativar o uso do venv para o python use o `deactivate` voltando a considerar a instalação global do python como padrão

> **OBS3**: Você pode fornecer outro nome no segundo parâmetro do comando como "python -m venv nomedapasta" mas não esqueça de incluí-la no gitignore

4. Instalar mkdocs e plugins

`pip install mkdocs-material mkdocs-exclude-search mkdocs-glightbox mkdocs-awesome-pages-plugin mkdocs-with-pdf mkdocs-redirects`

5. Entrar na pasta "*pt*" ou "*en*" e rodar o projeto

`mkdocs serve`

> Para buildar a versão estática para publicação rode: `mkdocs build`. A versão estática será gerada na pasta `site`

## Informações importantes:

- A pasta `overrides` serve para sobrepor estruturas padrão do mkdocs material e pastas ou arquivos dentro deste diretório devem ser referenciados sem mencionar o diretório especificamente. Por exemplo....para apontar para o arquivo `eitri-logo.svg` dentro da pasta `overrides/assets` você deve chamar apenas `assets/eitri-logo.svg` visto que durante a compilação tudo que está em eitritheme irá sobrepor o tema original.

- Para mais informações sobre esta sobreposição do tema Eitri [acesse este link](https://squidfunk.github.io/mkdocs-material/customization/#extending-the-theme)

- Para mais informações sobre personalização do MkDocs [clique aqui](https://squidfunk.github.io/mkdocs-material/setup/)

- Para informações sobre recursos adicionais do MkDocs ao escrever seus MDs, acesse [este link](https://squidfunk.github.io/mkdocs-material/reference/)

- Para informações adicionais sobre redirecionamentos no mkdocs acesse [este link](https://github.com/mkdocs/mkdocs-redirects)


### Navegação

A construção dos menus para navegação é configurada a partir do plugin [awesome pages](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin) para mkdocs.

Com ela você pode incluir um arquivo `.pages` dentro de uma pasta e este arquivo passa a reger a forma como o mkdocs irá gerar os menus para aquele nível de dados.

Para mais informações, consulte o [repositório do plugin awesome pages](https://github.com/lukasgeiter/mkdocs-awesome-pages-plugin).
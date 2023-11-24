# eitri-docs

Para rodar o projeto você precisará:

1. instalar o python (De preferencia 3.11 ou superior)

2. Criar o virtual environment do python para a instalação:

`python -m venv venv`

3. Ativar o virtual environment do Python:

`source venv/Scripts/activate`

> **OBS1**: isso fará com que este venv seja a instância do python usada para as instalações de dependencias e não a instalação global do python, similar ao node_modules no JS

> **OBS2**: para desativar o uso do venv para o python use o "deactivate" voltando a considerar a instalação global do python como padrão

> **OBS3**: Você pode fornecer outro nome no segundo parâmetro do comando como "python -m venv nomedapasta" mas não esqueça de incluí-la no gitignore

4. Instalar mkdocs e plugins

`pip install mkdocs-material`

`pip install mkdocs-exclude-search`

`pip install mkdocs-glightbox`

5. Rodar o projeto

`mkdocs serve`


## Informações importantes:

- A pasta eitritheme serve para sobrepor estruturas padrão do mkdocs material e pastas ou arquivos dentro deste diretório devem ser referenciados sem mencionar o diretório especificamente. Por exemplo....para apontar para o arquivo `eitri-logo.svg` dentro da pasta `eitritheme/assets` você deve chamar apenas `assets/eitri-logo.svg` visto que durante a compilação tudo que está em eitritheme irá sobrepor o tema original.

- Para mais informações sobre esta sobreposição do tema Eitri [acesse este link](https://squidfunk.github.io/mkdocs-material/customization/#extending-the-theme)

- Para mais informações sobre personalização do MkDocs [clique aqui](https://squidfunk.github.io/mkdocs-material/setup/)

- Para informações sobre recursos adicionais do MkDocs ao escrever seus MDs, acesse [este link](https://squidfunk.github.io/mkdocs-material/reference/)
# Semantic Release no Push-Version

O **Semantic Release** é uma ferramenta que automatiza o processo de versionamento e publicação de um projeto com base nas mudanças de código e nas mensagens de commit, seguindo o conceito de **versionamento semântico** (ou _semantic versioning_). Com ele, versões novas são geradas automaticamente, e o processo de publicação é desencadeado conforme o conteúdo dos commits, simplificando o fluxo de CI/CD.

## Principais Funcionalidades

1. **Versionamento Automático**: Analisa os commits para determinar o tipo de versão a ser liberada (major, minor, patch).
2. **Geração de Changelog**: Cria um changelog atualizado com as mudanças de cada versão.
3. **Facilidade de Integração com CI/CD**: Funciona bem com serviços como Bitbucket Pipelines, GitHub Actions.

## Como Funciona?

O Semantic Release utiliza mensagens de commit padronizadas, como:

- `feat`: para novas funcionalidades, liberando uma versão _minor_.
- `fix`: para correções de bugs, liberando uma versão _patch_.
- `BREAKING CHANGE`: indica uma alteração que quebra compatibilidade, liberando uma versão _major_.

Essas convenções são seguidas pelo [Conventional Commits](https://www.conventionalcommits.org/){:target="\_blank"}, que torna o versionamento previsível e estruturado.

## Requisitos

1. [**Configuração de CI/CD do Eitri**](ci-cd.md)
2. [**Commits com Padrão de Conventional Commits**](https://www.conventionalcommits.org/){:target="\_blank"}

## Como executar

Para utilizar o Semantic Release ao fazer Push-version, basta executar o comando com o argumento `--release`. Exemplo:

```bash
eitri push-version --release
```

Dessa forma a versão do **Eitri-App** será atualizada automaticamente conforme o **Conventional Commits**. Cada alteração no GIT terá uma tag versionada, essa versão da tag será utilizada para gerar a versão do Eitri-App. Dessa forma dispensa a necessidade de fazer alteração da versão manualmente.

### Importante

Caso seu Eitri-App tenha uma versão acima de 1.x.x, será necessário gerar uma tag git para a última versão, pois poderá ter conflito entre as versões pré existentes do seu **Eitri-App**. [Como criar a tag manualmente](https://git-scm.com/book/en/v2/Git-Basics-Tagging){:target="\_blank"}.

# CI/CD

CI/CD é a abreviação de Continuous Integration/Continuous Delivery, traduzindo para o português: integração e entrega contínuas. Trata-se de uma prática de desenvolvimento de software que visa tornar a integração de código mais eficiente por meio de builds e testes automatizados. Com a abordagem CI/CD é possível entregar aplicações com mais frequência aos clientes. Para tanto, regras de automação são aplicadas nas etapas de desenvolvimento de apps. ([RedHat](https://www.redhat.com/pt-br/topics/devops/what-is-ci-cd))

CI/CD são conceitos englobados nas práticas de DevOps e você pode integrar seus repositórios para publicar de maneira contínua e integrada seus Eitri-apps.


## Como configurar?

Existem algumas formas de integrar um repositório à plataforma Eitri para fazer publicações de Eitri-apps de maneira contínua e automatizada. A mais comum delas envolve as seguintes etapas:

1. Crie um usuário específico para as públicações. (O ideal é que nenhum usuário humano utilize esta conta e que ela seja utilizada exclusivamente para a integração.)
2. Gere um par de chaves deste usuário.
3. Configure o pipeline em seu repositório para rodar nossa ferramenta de linha de comando [eitri-cli]() e utilize as chaves geradas anteriormente.
4. Recomendamos utilizar o versionamento semântico [semver](https://semver.org/lang/pt-BR/) e [conventional commits](https://www.conventionalcommits.org/pt-br/v1.0.0-beta.4/) para automatizar tambem a numeração de versões de maneira adequada e cômoda em seu pipeline. 



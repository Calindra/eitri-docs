# Snapshot — Testes mais rápidos no Eitri
Com os Snapshots os testes das tarefas ficam bem mais simples e rápidos. Não é mais necessário subir código num ambiente para esperar a validação do cliente final.

Agora, o código pode ser testado diretamente na sua branch, sem travar o desenvolvimento do projeto 🚀

## Criando um snapshot
1. Crie uma branch que contém apenas o código que deseja alterar
2. Finalize a implementação e subi o código para o repositório nessa branch (commit + push)
3. Não é necessário alterar a versão do EitriApp neste momento
4. Ajuste o arquivo app-config.yaml, deixando apenas os EitriApps que participaram da alteração
5. Abra um PR para sua branch principal
6. Crie o Snapshot para validação usando o comando na pasta raiz do projeto (a mesma do `eitri app start`):

[`eitri app snapshot`](../concepts/eitri-cli.md#app)

!!!info
    Ao final da criação, o Snapshot gera:
    📎 Um link + 📱 Um QRCode


## Testando seu snapshot
Para rodar o snapshot você precisa ter o **app de Dev** do app em questão instalado no smartphone.

!!!info
    O snapshot é gerado como deeplink. Para abrir um deeplink algumas dicas podem ser valiosas:
    - **No iOS** é possível colar um deeplink no app de `lembretes` ou `bloco de notas` nativo do iOS e ele vira clicável, podendo ser aberto no aparelho.
    - **No Android** é possível utilizar o app [Deeplink Tester](https://play.google.com/store/apps/details?id=com.app.deeplinktester&hl=pt) para rodar deeplinks.

!!!warn
    Ao abrir um deeplink de snapshot um círculo vermelho aparece na BottomBar indicando que o app está rodando em modo Snapshot. A partir desse momento você estará navegando no app com as alterações contidas no snapshot até que saia ativamente deste modo clicando na bolinha vermelha e optando por voltar ao modo normal do app.

## Consultando snapshots
No [console Eitri](https://console.eitri.tech/) é possível visualizar todas as snapshots criadas para um app acessando a opção `Snapshots` no menu principal de seu app. Lá você encontra qr code, deeplink e informações adicionais de cada snapshot criado.


Com o Snapshot você consegue realizar testes diretos numa branch antes de mergea-la e garantir que as alterações estão conforme o esperado, acelerando a validação de alterações, dependendo menos do ambiente de desenvolvimento e organizando melhor seu código e o trabalho da equipe.
# Criar um Eitri-App

A criação de um Eitri-App ocorre através da CLI, com o comando `eitri create [options] <project-name>`

Após o fim da execução do comando será criado um novo projeto de Eitri-App em sua máquina, e esse Eitri-App será registrado na plataforma Eitri.

Durante a execução do comando serão pedidas algumas informações, sendo essas:

`Aplicação`
:   A aplicação sob a qual o Eitri-App será executado. Isso define inforamções como o tema CSS que ele utilizará, por exemplo.

`Nome legível`
:   Esse é o nome que será utilizado para identificar o seu Eitri-App no [Eitri Console](https://console.eitri.tech/){:target="_blank"}. Esse nome só é utilizado internamente e não será visualizado pelos usuários.

`Nome para divulgação`
:   Esse é o nome do produto que será utilizado na divulgação e em pontos de contato com o usuário ou cliente final, sendo visualizado pelos usuários.

`Nome único`
: Esse nome, também chamado de slug, será utilizado como uma identificação única do seu Eitri-App na plataforma Eitri para encontrá-lo, referenciá-lo em diversas circunstâncias e na montagem de deeplinks. Este nome não pode ser repetido entre Eitri-Apps e não pode conter espaços ou caracteres especiais.

Para mais informações sobre o comando, [clique aqui](https://docs.eitri.tech/pt/eitri-cli/#create){:target="_blank"}
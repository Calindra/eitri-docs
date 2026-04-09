# Recaptcha

## Apps Vtex
Em apps integrados com a Vtex, o Eitri App Shopping utiliza Google Recaptcha V3 por padrão. [Clique aqui](https://www.google.com/recaptcha/about/){:target="_blank"} para saber mais sobre o Google Recaptcha.

1. Criar um novo [google recaptcha score based v3](https://www.google.com/recaptcha/admin/create){:target="_blank"}
2. Caso necessário, selecione keys do tipo *Web*
3. Adicione os domínios do Eitri ( `app.eitri.tech` / `release.eitri.calindra.com.br` )
4. Selecionar em qual projeto de seu Google Cloud Platform será criada a chave captcha
5. [Criar uma API](https://console.cloud.google.com/apis/credentials) key no Google no mesmo projeto onde o captcha foi criado
6. Seguir a documentação da Vtex para configurar no carrinho o captcha. O preenchimento do parâmetro deve ser o seguinte:


```json
{
"clientId": <SITE_KEY>,
"clientSecret": <GOOGLE_API_KEY>,
"projectId": <GOOGLE_PROJECT_ID>,
"label": <CAPTCHA_IDENTIFIER>,
"score": <OPCIONAL>
}
```

!!! info
    Google Project ID não é necessariamente o nome do projeto, [confira o seu id](https://support.google.com/googleapi/answer/7014113)

!!! info
    Após a criação você receberá o site key e a secret key. Você deverá usar a site key na configuração da Vtex (o secret key pode ser ignorado nesse processo, ela é utilizada para validar o token, mas não será usada na configuração). Para saber mais sobre como configurar sua conta vtex, [clique aqui](https://developers.vtex.com/docs/guides/implementing-recaptcha-in-integrations)

!!! info
    Google Recaptcha usa infraestrutura do [Google Cloud Platform](https://console.cloud.google.com/){:target="_blank"}. Para utiliza-lo, você precisará de uma conta do GCP.

## Apps Wake
Em apps integrados com a Wake, o Eitri App Shopping não utiliza reCAPTCHA, sendo necessário criar um token para o app com uso de reCAPTCHA desativado.

Para criar um token para o app, acesse em seu painel Wake:

1. Clique em Storefront no menu da sidebar
2. Acesse a opção Tokens
3. Crie um novo Token e garanta que as configurações de reCAPTCHA estão desativadas em todas as áreas

Uma vez gerado o token ele poderá ser configurado nos ambientes de seu app através do [Console Eitri](https://console.eitri.tech/){:target="_blank"}.
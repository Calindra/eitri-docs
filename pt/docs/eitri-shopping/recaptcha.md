---
status: new
---

# Google Recaptcha

Eitri App Shopping utiliza Google Recaptcha V3 por padrão. [Clique aqui](https://www.google.com/recaptcha/about/){:target="_blank"} para saber mais sobre o Google Recaptcha.

1. Criar um novo [google recaptcha score based v3](https://www.google.com/recaptcha/admin/create){:target="_blank"}
2. Adicione os domínios do Eitri ( `app.eitri.tech` / `release.eitri.calindra.com.br` )
3. Selecionar em qual projeto será criada o captcha
4. [Criar uma API](https://console.cloud.google.com/apis/credentials) key no Google no mesmo projeto onde o captcha foi criado
5. Seguir a documentação da Vtex para configurar no carrinho o captcha. O preenchimento do parâmetro deve ser o seguinte:


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
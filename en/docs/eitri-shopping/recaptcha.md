---
status: new
---

# Google Recaptcha

Eitri App Shopping uses Google Recaptcha V3 by default. [Click here](https://www.google.com/recaptcha/about/){:target="_blank"} to know more about Google Recaptcha.

To use it in your app you need to:

1. Create a new [google recaptcha score based v3](https://www.google.com/recaptcha/admin/create){:target="_blank"}
2. Add Eitri domains ( `app.eitri.tech` / `release.eitri.calindra.com.br` )
3. Select in wich project will be created your captcha
4. [Create an API](https://console.cloud.google.com/apis/credentials){:target="_blank"} key within the same project where the captcha was created
5. Follow Vtex configuration to setup captcha on your cart. Fill parameters as shown bellow:


```json
{
"clientId": <SITE_KEY>,
"clientSecret": <GOOGLE_API_KEY>,
"projectId": <GOOGLE_PROJECT_ID>,
"label": <CAPTCHA_IDENTIFIER>,
"score": <OPTIONAL>
}
```

!!! info
    Google Project ID is not the project name, [check your exact id](https://support.google.com/googleapi/answer/7014113){:target="_blank"}

!!! info
    After creating it will should get site key and secret key. You'll need to use the site key in your vtex configuration (you can ignore secret key for this process since it's not used in this configuration). To know more about configuring your vtex account, [click here](https://developers.vtex.com/docs/guides/implementing-recaptcha-in-integrations){:target="_blank"}
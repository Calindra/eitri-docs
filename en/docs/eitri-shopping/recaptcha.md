# Google Recaptcha

## Vtex apps
For Vtex apps, Eitri App Shopping uses Google Recaptcha V3 by default. [Click here](https://www.google.com/recaptcha/about/){:target="_blank"} to know more about Google Recaptcha.

To use it in your app you need to:

1. Create a new [google recaptcha score based v3](https://www.google.com/recaptcha/admin/create){:target="_blank"}
2. If needed, select *Web* key type
3. Add Eitri domains ( `app.eitri.tech` / `release.eitri.calindra.com.br` )
4. Select in wich project will be created your captcha
5. [Create an API](https://console.cloud.google.com/apis/credentials){:target="_blank"} key within the same project where the captcha was created
6. Follow Vtex configuration to setup captcha on your cart. Fill parameters as shown bellow:


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

!!! info
    Google Recaptcha uses [Google Cloud Platform](https://console.cloud.google.com/){:target="_blank"} infrastructure. To use it, you will need a GCP account.

## Wake apps
In apps integrated with Wake, Eitri App Shopping does not use reCAPTCHA, so you must create a token for the app with reCAPTCHA disabled.

To create a token for the app go to your Wake panel:

1. Click in Storefront in sidebar menu
2. Go to Tokens
3. Create a new token and make sure reCAPTCHA configurations are disable for every section avaliable

Once it's created you can configure your app to use this token accessing your apps environment in [Eitri Console](https://console.eitri.tech/){:target="_blank"}.
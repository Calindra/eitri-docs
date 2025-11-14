---
status: new
---

# Push Notification

Eitri App Shopping vem com integração nativa com o [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging){:target="_blank"} mas é possível disparar pushes a partir de outros provedores de serviços.

A utilização de deeplinks na configuração de seus pushes pode variar de acordo com a implementação em seu app e de acordo com o provedor de serviços que você utiliza.

Se seu aplicativo utiliza a solução de deeplinks padrão do Eitri Shopping, confira [nossa documentação de deeplinks](deeplinks.md) para saber mais sobre como estruturar e utilizar deeplinks.

Tambem é possível personalizar os deeplinks padrão do Eitri Shopping para modificar o suporte e direcionamento de deeplinks em seu aplicativo. Para saber mais, consulte a [documentação dos nossos addons de deeplinks](https://github.com/eitri-tech/eitri-shopping-addons){:target="_blank"}.

## Push-notifications no Firebase
Para saber mais sobre como disparar push-notifications confira a [Documentação do Firebase](https://firebase.google.com/docs/cloud-messaging/android/send-with-console){:target="_blank"}

## Push-notification na Insider
Para fazer a configuração e disparo de push-notification via insider, utilize deeplinks do tipo `URL Scheme` e forneça o deeplink completo que deseja abrir conforme [nossa documentação de deeplinks](deeplinks.md)
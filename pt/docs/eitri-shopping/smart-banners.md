# Smart Banners

Com os passos abaixo, o site da sua loja passa a convidar quem o visita pelo celular a usar o app: quem ainda não tem o app recebe o convite para baixá-lo, e quem já tem recebe um botão para abri-lo.

## Onde o banner aparece

O banner aparece em dois cenários: no Chrome do Android e no Safari do iPhone. Nos dois, o banner sabe se o app já está instalado: para quem não tem, oferece o download; para quem tem, oferece abrir o app.

- **Android, no Chrome:** o visitante vê um banner criado pelo seu site, com link para a Google Play, ou o botão "Abrir" se já tiver o app. Você precisa pedir à Eitri uma versão do app com os domínios do site e adicionar um manifesto e um script ao site.
- **iPhone, no Safari:** o visitante vê o banner padrão da Apple, com link para a App Store, ou o botão "Abrir" se já tiver o app. Você precisa adicionar uma linha ao código do site.
- **Outros navegadores** (Chrome no iPhone, apps de redes sociais, computador): o visitante não vê nada.

A recomendação deste guia é não exibir banner nesses outros ambientes, para não oferecer o download a quem já tem o app.

## Antes de começar

Você vai precisar de três informações. Nos exemplos deste guia, troque os valores fictícios pelos da sua loja.

- **Nome do pacote do app Android**, por exemplo `com.minhaloja.app`. Fica no endereço da página do app na Google Play, depois de `id=`: `play.google.com/store/apps/details?id=com.minhaloja.app`.
- **ID do app na App Store**, por exemplo `123456789`. É o número depois de `id` no endereço da página do app na App Store: `apps.apple.com/br/app/minha-loja/id123456789`.
- **Domínios do site**, por exemplo `www.minhaloja.com.br`. São todos os endereços em que o banner vai aparecer. Com e sem `www` contam como endereços diferentes.

Envie a lista de domínios à Eitri logo no início. Ela só é usada no Android, onde o app precisa reconhecer o site; o iPhone não depende dela.

## Passo 1: Android

No Android, o app e o site precisam se reconhecer. A Eitri cuida do lado do app; o time do site faz os passos 2 a 4.

**1. Peça à Eitri a nova versão do app.** Ela inclui os domínios do seu site. Aguarde a publicação na Google Play antes de testar. Quem estiver com uma versão antiga do app continua vendo o botão "Baixar" até atualizar.

**2. Crie um arquivo de manifesto** no site, por exemplo em `/manifest.webmanifest`:

```json
{
  "name": "Minha Loja",
  "related_applications": [
    { "platform": "play", "id": "com.minhaloja.app" }
  ]
}
```

Se o site já tem um manifesto, não crie outro: acrescente o trecho `related_applications` ao existente.

**3. Referencie o manifesto** no `<head>` de todas as páginas em que o banner vai aparecer:

```html
<link rel="manifest" href="/manifest.webmanifest">
```

**4. Adicione o banner e o script** do exemplo completo, mais abaixo. O site precisa usar `https`.

**Botão "Abrir".** Para quem já tem o app, o script troca o botão "Baixar" por "Abrir", que leva à mesma página do site dentro do app. Para isso, o app precisa ter os App Links configurados para os domínios do site, como explicado em [Deeplinks](deeplinks.md). Combine com a Eitri quais páginas o app sabe abrir. Se o app não reconhecer o link, o visitante é levado à página do app na Google Play.

## Passo 2: iPhone

No iPhone, nada muda no app. Basta adicionar esta linha ao `<head>` de todas as páginas em que o banner vai aparecer:

```html
<meta name="apple-itunes-app" content="app-id=123456789">
```

O Safari exibe o banner sozinho: para quem não tem o app, com link para a App Store; para quem tem, com o botão "Abrir". O visual é definido pela Apple e não pode ser personalizado.

**Opcional: abrir o app na mesma página.** Acrescente o endereço da página atual em `app-argument`:

```html
<meta name="apple-itunes-app" content="app-id=123456789, app-argument=https://www.minhaloja.com.br/produto/camiseta-azul">
```

Assim, quem tocar em "Abrir" vai direto ao mesmo produto ou categoria no app. Combine com a Eitri quais páginas o app sabe abrir. Nas demais, deixe o `app-argument` de fora, e o app abre na tela inicial.

## Exemplo completo

O código abaixo cobre Android e iPhone de uma vez. Troque `123456789` pelo ID da App Store e `com.minhaloja.app` (aparece três vezes) pelo nome do pacote. O visual do `#app-banner` fica a critério do time do site.

```html
<head>
  <meta name="apple-itunes-app" content="app-id=123456789">
  <link rel="manifest" href="/manifest.webmanifest">
</head>
<body>
  <div id="app-banner" hidden>
    <span>Compre pelo app da Minha Loja</span>
    <a href="https://play.google.com/store/apps/details?id=com.minhaloja.app">Baixar</a>
    <button type="button" aria-label="Fechar">×</button>
  </div>

  <script>
    async function isAppInstalledOnAndroid(packageName) {
      if (!/Android/i.test(navigator.userAgent) || !navigator.getInstalledRelatedApps) return null;
      try {
        const apps = await navigator.getInstalledRelatedApps();
        return apps.some((app) => app.id === packageName);
      } catch {
        return null;
      }
    }

    (async () => {
      const banner = document.getElementById('app-banner');
      try { if (localStorage.getItem('app-banner-dismissed')) return; } catch {}
      const installed = await isAppInstalledOnAndroid('com.minhaloja.app');
      if (installed === null) return;

      if (installed) {
        const link = banner.querySelector('a');
        link.textContent = 'Abrir';
        link.href = `intent://${location.host}${location.pathname}${location.search}` +
          `#Intent;scheme=https;package=com.minhaloja.app;S.browser_fallback_url=${encodeURIComponent(link.href)};end`;
      }

      banner.hidden = false;
      banner.querySelector('button').onclick = () => {
        banner.hidden = true;
        try { localStorage.setItem('app-banner-dismissed', '1'); } catch {}
      };
    })();
  </script>
</body>
```

O banner do site só aparece no Chrome do Android: com "Baixar" para quem não tem o app e com "Abrir" para quem tem. No iPhone, quem cuida do banner é o Safari. Quando o visitante fecha o banner, ele não volta naquele navegador.

## Como testar

Teste em celulares de verdade: o banner do iPhone não aparece em simuladores. No Android, use a versão do app já publicada pela Eitri.

### Android, no Chrome

1. Sem o app instalado, abra o site: o banner aparece com "Baixar".
2. Instale o app pela Google Play, feche o Chrome e abra o site de novo: o banner aparece com "Abrir".
3. Toque em "Abrir" e confira se o app abre na página certa.
4. Repita em cada domínio do site, com e sem `www`.

### iPhone, no Safari

1. Sem o app instalado, abra o site: o banner aparece com link para a App Store.
2. Com o app instalado, o banner mostra "Abrir" e leva ao app.
3. Se usar `app-argument`, confira se o app abre na página certa.

Depois de fechado, o banner do iPhone não volta naquele aparelho. Para testar de novo, use outro aparelho.

## Dúvidas frequentes

**No Android, o banner mostra "Baixar" para quem já tem o app. O que verificar?** Confira, nesta ordem: se o app instalado está atualizado; se o endereço exato da página, com ou sem `www`, está na lista enviada à Eitri; se o nome do pacote no manifesto está correto; e se o site usa `https`.

**No Android, "Abrir" leva à Google Play em vez de abrir o app. Por quê?** O app instalado não reconheceu o link. Confira com a Eitri se os App Links estão configurados para o domínio da página e se o app instalado está atualizado.

**No iPhone, o banner não aparece. Por quê?** Ele só aparece no Safari e em aparelhos reais. Também não aparece se o visitante já o fechou antes ou se o app não está disponível no país dele.

**Preciso de uma nova versão do app para iPhone?** Não. No iPhone, tudo acontece no site.

**Posso mostrar o banner em outros navegadores?** Pode, mas neles não há como saber se o app está instalado. O banner apareceria também para quem já tem o app.

**O site ganhou um domínio novo. O que fazer?** Envie o domínio à Eitri. Ele entra na próxima versão do app Android, e o banner passa a funcionar nele quando os usuários atualizarem.

## Referências

- [Get Installed Related Apps API](https://developer.chrome.com/docs/capabilities/get-installed-related-apps), documentação do Chrome
- [Android Intents with Chrome](https://developer.chrome.com/docs/android/intents), documentação do Chrome
- [Promoting apps with Smart App Banners](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners), documentação da Apple

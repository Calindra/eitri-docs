# Smart Banners

With the steps below, your store's website starts inviting mobile visitors to download the app, and only shows the invitation to people who don't have the app installed yet.

## Where the banner appears

The banner appears in two scenarios: in Chrome on Android and in Safari on iPhone. In both, people who already have the app installed don't see the banner.

| Phone and browser | What the visitor sees | What you need to do |
| --- | --- | --- |
| Android, Chrome | A banner created by your website, with a link to Google Play | Ask Eitri for an app version that includes the website's domains, and add a manifest and a script to the website |
| iPhone, Safari | Apple's standard banner, with a link to the App Store, or the "Open" button for people who already have the app | Add one line to the website's code |
| Other browsers (Chrome on iPhone, social media apps, desktop) | Nothing | — |

This guide recommends not showing a banner in these other environments, so you don't offer the download to people who already have the app.

## Before you start

You will need three pieces of information. In this guide's examples, replace the placeholder values with your store's.

| Information | Where to find it | Example |
| --- | --- | --- |
| Android app package name | In the URL of the app's Google Play page, after `id=` (`play.google.com/store/apps/details?id=com.mystore.app`) | `com.mystore.app` |
| App Store app ID | In the URL of the app's App Store page, the number after `id` (`apps.apple.com/us/app/my-store/id123456789`) | `123456789` |
| Website domains | Every address where the banner will appear. With and without `www` count as different addresses | `www.mystore.com` |

Send the list of domains to Eitri right at the start. It is only used on Android, where the app needs to recognize the website; iPhone doesn't depend on it.

## Step 1: Android

On Android, the app and the website need to recognize each other. Eitri handles the app side; the website team does steps 2 to 4.

**1. Ask Eitri for the new app version.** It includes your website's domains. Wait for it to be published on Google Play before testing. Anyone on an older version of the app keeps seeing the banner until they update.

**2. Create a manifest file** on the website, for example at `/manifest.webmanifest`:

```json
{
  "name": "My Store",
  "related_applications": [
    { "platform": "play", "id": "com.mystore.app" }
  ]
}
```

If the website already has a manifest, don't create another one: add the `related_applications` entry to the existing one.

**3. Reference the manifest** in the `<head>` of every page where the banner will appear:

```html
<link rel="manifest" href="/manifest.webmanifest">
```

**4. Add the banner and the script** from the complete example below. The website must use `https`.

## Step 2: iPhone

On iPhone, nothing changes in the app. Just add this line to the `<head>` of every page where the banner will appear:

```html
<meta name="apple-itunes-app" content="app-id=123456789">
```

Safari shows the banner on its own: with a link to the App Store for people who don't have the app, and with the "Open" button for people who do. Its look is defined by Apple and cannot be customized.

**Optional: open the app on the same page.** Add the current page's URL in `app-argument`:

```html
<meta name="apple-itunes-app" content="app-id=123456789, app-argument=https://www.mystore.com/product/blue-t-shirt">
```

This way, anyone who taps "Open" goes straight to the same product or category in the app. Agree with Eitri on which pages the app can open. On the others, leave `app-argument` out, and the app opens on the home screen.

## Complete example

The code below covers Android and iPhone at once. Replace `123456789` with the App Store ID and `com.mystore.app` (it appears twice) with the package name. The look of `#app-banner` is up to the website team.

```html
<head>
  <meta name="apple-itunes-app" content="app-id=123456789">
  <link rel="manifest" href="/manifest.webmanifest">
</head>
<body>
  <div id="app-banner" hidden>
    <span>Shop on the My Store app</span>
    <a href="https://play.google.com/store/apps/details?id=com.mystore.app">Download</a>
    <button type="button" aria-label="Close">×</button>
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
      if (await isAppInstalledOnAndroid('com.mystore.app') !== false) return;

      banner.hidden = false;
      banner.querySelector('button').onclick = () => {
        banner.hidden = true;
        try { localStorage.setItem('app-banner-dismissed', '1'); } catch {}
      };
    })();
  </script>
</body>
```

The website's banner only appears in Chrome on Android, for people who don't have the app. On iPhone, Safari takes care of the banner. Once the visitor closes the banner, it doesn't come back in that browser.

## How to test

Test on real phones: the iPhone banner doesn't appear in simulators. On Android, use the app version already published by Eitri.

### Android, in Chrome

1. Without the app installed, open the website: the banner appears.
2. Install the app from Google Play, close Chrome and open the website again: the banner doesn't appear.
3. Repeat on each of the website's domains, with and without `www`.

### iPhone, in Safari

1. Without the app installed, open the website: the banner appears with a link to the App Store.
2. With the app installed, the banner shows "Open" and takes you to the app.
3. If you use `app-argument`, check that the app opens on the right page.

Once closed, the iPhone banner doesn't come back on that device. To test again, use another device.

## Frequently asked questions

**On Android, the banner appears for people who already have the app. What should I check?** Check, in this order: whether the installed app is up to date; whether the exact page address, with or without `www`, is in the list sent to Eitri; whether the package name in the manifest is correct; and whether the website uses `https`.

**On iPhone, the banner doesn't appear. Why?** It only appears in Safari and on real devices. It also doesn't appear if the visitor has closed it before or if the app isn't available in their country.

**Do I need a new app version for iPhone?** No. On iPhone, everything happens on the website.

**Can I show the banner in other browsers?** You can, but there is no way to know whether the app is installed in them. The banner would also appear for people who already have the app.

**The website got a new domain. What should I do?** Send the domain to Eitri. It goes into the next Android app version, and the banner starts working on it once users update.

## References

- [Get Installed Related Apps API](https://developer.chrome.com/docs/capabilities/get-installed-related-apps), Chrome documentation
- [Promoting apps with Smart App Banners](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners), Apple documentation

# Snapshot — Faster tests in Eitri
Using Snapshots makes task tests much simpler and faster. There is no need to deploy code to an environment and wait for final client validation.

Now, code can be tested directly on your branch without blocking project development 🚀

## Creating a snapshot
1. Create a branch containing only the code you want to change
2. Finish implementation and push the code to the repository in that branch (commit + push)
3. No need to change the EitriApp version at this point
4. Adjust the app-config.yaml file, leaving only the EitriApps that are part of the change
5. Open a PR to your main branch
6. Create the Snapshot for validation using the command in the project root folder (same as `eitri app start`):

`eitri app snapshot`

!!!info
    At the end of creation, the Snapshot generates:
    📎 A link + 📱 A QRCode

## Testing your snapshot
To run the snapshot, you need to have the **Dev version** of the app installed on your smartphone.

!!!info
    The snapshot is generated as a deeplink. Here are some useful hints to open deeplinks:
    - **On iOS** you can paste a deeplink into the native `Reminders` or `Notes` app and it becomes clickable, allowing you to open it on the device.
    - **On Android** you can use the [Deeplink Tester](https://play.google.com/store/apps/details?id=com.app.deeplinktester&hl=pt) app to run deeplinks.

!!!warn
    When you open a snapshot deeplink, a red circle appears in the BottomBar indicating the app is running in Snapshot mode. From that moment on, you will be navigating the app with the snapshot changes until you exit this mode by actively tapping the red dot and choosing to return to normal app mode.

## Viewing snapshots
In the [Eitri console](https://console.eitri.tech/) you can view all snapshots created for an app by accessing the `Snapshots` option in your app's main menu. There you will find the QR code, deeplink, and additional information for each snapshot created.

With Snapshot, you can run direct tests on a branch before merging it and ensure changes are as expected, speeding up change validation, relying less on a dev environment, and organizing your code and team work better.

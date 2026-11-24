---
status: new
---

# Eitri MCP

The **Eitri MCP** is a remote [MCP](https://modelcontextprotocol.io){:target="_blank"} server that gives your AI assistant access to the **Eitri Console**: applications, environments and remote config, themes, mini-apps, revisions, native builds, and production errors. With it, you ask in natural language ("change the header logo in the dev environment", "why did the iOS build fail?") and the assistant reads or changes the Console for you.

```text
https://api.eitri.tech/eitri-manager-mcp/mcp
```

The server comes preconfigured in the [Eitri Coding](eitri-coding.md) plugin, and it is what lets the `create-app` skill create a whole app from a store URL.

## How it works

- **Login through the Eitri Console.** When you connect, the browser opens the Console login page. You sign in with your account (password, MFA, or SSO) and go back to the assistant. No client id, secret, or token is copied and pasted.
- **Your permissions, nothing more.** The MCP acts as you: it only sees the organizations and applications you can access, with the same roles you have in the Console.
- **Administrator tools stay hidden.** Tools restricted to the platform administrator role (sales reports, commercial info, transactional push, builds across all apps, and organization creation) don't even show up for non-administrators.
- **Log in once.** The client renews access on its own, and server updates sign no one out. You only need to sign in again if the credential is revoked or goes unused for a long time.

## How to connect

=== "Eitri Coding plugin"

    This is the recommended path: the plugin brings the server configured, together with the skills. Install the plugin following [Eitri Coding → Installation](eitri-coding.md#installation) and log in:

    - **Claude Code**: run `/mcp`, select `plugin:eitri-coding:eitri-manager`, and choose **Authenticate**.
    - **Codex**: log in when Codex asks, while installing the plugin.
    - **Hermes Agent**: add the server with `auth: oauth` to `~/.hermes/config.yaml` and run `hermes mcp login eitri-manager` (see the Hermes Agent installation tab).

=== "Claude Code (MCP only)"

    To use the MCP without the skills:

    ```bash
    claude mcp add --transport http eitri-manager https://api.eitri.tech/eitri-manager-mcp/mcp
    ```

    The command only registers the server. Open Claude Code, run `/mcp`, select `eitri-manager`, and choose **Authenticate** to log in.

=== "Claude.ai and Claude Desktop"

    In **Settings → Connectors**, add a custom connector (**Add custom connector**) with the URL `https://api.eitri.tech/eitri-manager-mcp/mcp` and click **Connect** to log in to the Console.

    On Team and Enterprise plans, an organization administrator may need to add the connector first.

=== "Other MCP clients"

    Any client that supports remote MCP servers (Streamable HTTP) with OAuth login works. Register the URL `https://api.eitri.tech/eitri-manager-mcp/mcp` and start the login from the client itself.

!!! tip "Checking the connection"

    Ask the assistant to "list my Eitri organizations". If it answers with your organizations, the MCP is connected.

## Write safety

Every tool that changes something in the Console follows the same rules:

- **Preview before applying.** The first call never writes: it returns a preview (the config diff, the version that will be replaced, slugs already in use). The write only happens on a second call with `confirm: true`, after you approve.
- **Protected production.** Changing the config, aliases, or revisions of a production environment, publishing the global CSS of an app that has production, or starting a build on the production channel requires one more explicit authorization (`allowProduction: true`).
- **Secret scan.** Before writing a remote config, the preview flags values that look like credentials (`possibleLeaks`), to avoid exposing secrets in a config the app reads on the client.
- **No deletes.** There are no tools to delete organizations, applications, environments, or mini-apps. Removals are still done in the Console.
- **Sensitive data stays out.** Mini-apps' `secretKey`, revisions' source password and zip, and build download links are never returned. Build logs go through a filter that hides tokens and credentials.

## Tools

### Discovery

| Tool | What it does |
| --- | --- |
| `list_my_organizations` | Lists your organizations, with each one's app count and image. |
| `list_my_applications` | Lists your applications (id, name, organization, and labels), paginated. |
| `get_application` | Full details of one application. |
| `list_templates` | Templates available for new apps, filterable by type and e-commerce platform. |
| `get_template` | One template, with its dependencies, reference application, and CMS schema. |

### Environments and remote config

| Tool | What it does |
| --- | --- |
| `list_environments` | An application's environments. |
| `get_environment_config` | An environment's remote config, with its history. |
| `create_environment` | Creates an environment, optionally with an initial config. |
| `update_environment_config` | Changes the remote config. With `merge: true`, only the keys sent change (and `null` removes a key). |
| `restore_environment_config` | Restores a version from the config history. |

### Themes

| Tool | What it does |
| --- | --- |
| `list_themes` / `get_theme` | The application's Luminus v2 themes. |
| `create_theme` / `publish_theme` | Creates and publishes a Luminus v2 theme. |
| `list_global_css` / `get_global_css` | Global CSS builds (Luminus v1, "Global CSS" in the Console) and one build's content. |
| `create_global_css` | Creates a draft global CSS build in every environment, refusing malformed CSS. |
| `publish_global_css` | Publishes a build to every environment (publishing an older build is a rollback). |

### Mini-apps and revisions

| Tool | What it does |
| --- | --- |
| `list_eitri_apps` | An application's mini-apps (Eitri-Apps): id, slug, title, and public key. |
| `create_eitri_apps` | Creates mini-apps and the group that ties them together. The preview flags slugs already in use; with `resume: true`, it resumes an interrupted creation. |
| `set_slug_aliases` | Adds slug aliases to an environment (for example, so the template code can open `cart` or `pdp`). |
| `list_revisions` | Newest revisions of a mini-app or of the whole application, with the environments each one is published in. |
| `list_published_revisions` | What an environment is serving. |
| `publish_revision` | Publishes a revision pushed with `eitri push-version` to an environment, showing the version it replaces. |

### Application creation

| Tool | What it does |
| --- | --- |
| `create_organization` | Creates an organization and adds you as `ORG_ADMIN`. **Administrators only.** |
| `create_application` | Creates an application. The `prod` and `dev` environments and a first global CSS are created with it. |
| `upload_application_icon` | Uploads the application icon from a public image URL. The image becomes a square PNG (512 px, 180 px minimum). |
| `upload_organization_icon` | The same, for the organization's image. |

### Native builds

| Tool | What it does |
| --- | --- |
| `list_app_builds` | An application's recent native builds: state, workflow, branch, and duration. |
| `diagnose_build` | Explains why a build failed: splits the log into steps and returns only the error lines of the failed ones. Start here. |
| `get_build_log` | A slice of a build log, by step, text search, or line range. |
| `list_build_artifacts` | Files produced by a build (name, type, and size). |
| `start_build` | Starts an Android or iOS build of the `main` branch, on the development or production channel. Uses build minutes. |
| `list_all_builds` | Builds across all apps. **Administrators only.** |

### Production errors

| Tool | What it does |
| --- | --- |
| `list_prod_errors` | Production runtime errors of an application's mini-apps, filterable by period, mini-app, and crashes. |
| `resume_prod_errors` | Errors grouped and counted over a period. |
| `daily_error_report` | An organization's errors per day, broken down by mini-app. |

### Administration

Available to platform administrators only:

| Tool | What it does |
| --- | --- |
| `find_report_configurations` / `get_applications_sales_summary` | Stores' report configurations (VTEX, Wake, Shopify) and the store and app sales summary over a period. |
| `list_application_commercial_info` / `get_application_commercial_info` / `get_application_commercial_info_summary` / `upsert_application_commercial_info` | Reading and editing the applications' commercial info. |
| `list_push_stores` / `get_push_store` / `audit_push_store_webhooks` | Stores with transactional push configured and the order webhook check for VTEX stores. |

Besides the tools, the server exposes the `eitri://applications` resource and the `safe_config_edit` prompt, a script for changing an environment's config while reviewing the diff before applying it.

## Usage examples

```text
List the environments of the My Store app and show me the dev remote config.
```

```text
In the dev environment of the My Store app, change appConfigs.headerLogo to
https://cdn.mystore.com/logo.png. Show the diff before applying it.
```

```text
Why did the latest iOS build of the My Store app fail?
```

```text
Publish the newest revision of the My Store cart mini-app to dev.
```

```text
Which production errors happened most in the My Store app last week?
```

## Troubleshooting

| Symptom | What to do |
| --- | --- |
| "Your Eitri connection is no longer valid" | The credential was revoked or expired. Remove and re-add the connector (in Claude Code, `/mcp` → the server → **Authenticate**). |
| A tool does not show up | It is restricted to platform administrators, or your client has not reloaded the tool list after an update. |
| `403` when creating mini-apps, aliases, or config, or when publishing | You are not a member of the application's organization. Ask an organization administrator for access. |
| The preview flags `possibleLeaks` | A value looks like a secret. Make sure it can live on the client before applying; the app reads the remote config. |

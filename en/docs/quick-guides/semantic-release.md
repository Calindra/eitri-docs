---
status: new
---

# Semantic Release with Push-Version

**Semantic Release** is a tool that automates the versioning and publishing process of a project based on code changes and commit messages, following the concept of **semantic versioning**. With it, new versions are automatically generated, and the release process is triggered according to the content of the commits, simplifying the CI/CD flow.

## Key Features

1. **Automatic Versioning**: Analyzes commits to determine the type of version to be released (major, minor, patch).
2. **Changelog Generation**: Creates an updated changelog with the changes of each version.
3. **Seamless Integration with CI/CD**: Works well with services like Bitbucket Pipelines, GitHub Actions.

## How It Works

Semantic Release uses standardized commit messages, such as:

- `feat`: for new features, releasing a _minor_ version.
- `fix`: for bug fixes, releasing a _patch_ version.
- `BREAKING CHANGE`: indicates a backward-incompatible change, releasing a _major_ version.

These conventions follow [Conventional Commits](https://www.conventionalcommits.org/){:target="\_blank"}, making versioning predictable and structured.

## Requirements

1. [**Eitri CI/CD Configuration**](/quick-guides/ci-cd)
2. [**Commits Following the Conventional Commits Standard**](https://www.conventionalcommits.org/){:target="\_blank"}

## How to Execute

To use Semantic Release when doing a Push-version, simply run the command with the `--release` argument. Example:

```bash
eitri push-version --release
```

In this way, the **Eitri-App** version will be updated automatically following **Conventional Commits**. Each change in GIT will have a tagged version, and this tag version will be used to generate the Eitri-App version. This removes the need for manual version changes.

### Important

If your Eitri-App has a version above 1.x.x, it will be necessary to create a git tag for the latest version, as there may be conflicts with existing versions of your **Eitri-App**. [How to create a tag manually](https://git-scm.com/book/en/v2/Git-Basics-Tagging){:target="\_blank"}

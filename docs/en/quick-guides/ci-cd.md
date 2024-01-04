# CI/CD

CI/CD stands for **Continuous Integration/Continuous Delivery**, which translates to continuous integration and delivery in Portuguese.

It is a software development practice aimed at making code integration more efficient through automated builds and tests.

With the CI/CD approach, it is possible to deliver applications more frequently to customers. To achieve this, automation rules are applied in the app development stages.

(Source: [RedHat](https://www.redhat.com/en/topics/devops/what-is-ci-cd){:target="_blank"})

CI/CD are concepts encompassed in DevOps practices and you can integrate your repositories to continuously and integratedly publish your Eitri-apps.


## How to configure my CI/CD?

There are several ways to integrate a repository with the Eitri platform for continuous and automated publishing of Eitri-apps. The most common of them involves the following steps:

### Generating your key pair

1. Log in to the [Eitri Console](https://console.eitri.tech/){:target="_blank"} and access the item **Personal Identification (Managing your credentials)** by clicking on your name in the top right corner

    <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

2. Click on the **Generate new credential** button and download and/or copy the keys;

    <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

With this key pair, you can integrate services like Github Actions, Bitbucket Pipelines, among others.

### Configuring integration with **Github**

Follow the steps described in each tab to configure your integration.

=== "In Github Actions"

    1. Access your Eitri-app repository on [GitHub](https://github.com){:target="_blank"} and click on the **Settings** tab

        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

    2. In the **Security** submenu, access the **Secrets and variables** option and then **Actions**

    3. In the **Secrets** tab, click on **New repository secret** to add a new secret key

        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

    4. In the **name** field, enter the name ==EITRI_CLI_CLIENT_ID==

    5. In the **secret** field: enter the value of the **ClientID** key generated in the Console

    6.  Click the **Add secret** button to save

    7. In the **name** field, enter the name ==EITRI_CLI_CLIENT_SECRET==

    8. In the **secret** field: enter the value of the **Secret Key** generated in the Console

    9.  Click the **Add secret** button to save

        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

=== "In your Eitri-app"

    1.  To configure integration with Github in your Eitri-app, create a `.github/workflows` folder in the root folder of your project
    
    2. Inside workflows create the file `<name_of_pipeline>.yml`
    
        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

    3. Paste the example configuration below into your newly created file:

    ```
        name: GitHub Actions Eitri-Push-Version
        on: [push]

        env:
        EITRI_CLI_CLIENT_ID: ${{secrets.EITRI_CLI_CLIENT_ID}}
        EITRI_CLI_CLIENT_SECRET: ${{secrets.EITRI_CLI_CLIENT_SECRET}}

        jobs:
        Eitri-Push-Version:
            runs-on: ubuntu-latest
            steps:
            - uses: actions/checkout@v4
            - run: npm i -g eitri-cli
            - run: eitri push-version
    
    ```

### Configuring integration with **Bitbucket**

Follow the steps described in each tab to configure your integration.

=== "In Bitbucket Pipelines"

    1. Access your Eitri-app repository on [Bitbucket](https://bitbucket.org){:target="_blank"} and click on **Repository Settings** and then on **Repository Variables**

        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

    !!! warning

        Pipelines settings must already be activated (in `Repository Settings > Settings > Enable Pipelines`)

    !!! warning

        If the item `Repository Settings` does not appear for you, you may lack some permission on bitbucket

    2. In the **name** field, enter the name ==EITRI_CLI_CLIENT_ID==

    3. In the **value** field: enter the value of the **ClientID** key generated in the Console

    4.  Click the **Add** button to add

    5. In the **name** field, enter the name ==EITRI_CLI_CLIENT_SECRET==

    6. In the **value** field: enter the value of the **Secret Key** generated in the Console

    7.  Click the **Add** button to add

        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

=== "In your Eitri-app"

    1.  To configure integration with Github in your Eitri-app, create the file `bitbucket-pipelines.yml` in the root folder of your project (the same folder where the `eitri.conf.js` file is located)
    
        <!-- ![Image title](https://dummyimage.com/600x400/eee/aaa) -->

    2. Paste the example configuration below into your newly created file:

    ```yml
        image: node:20

        pipelines:
        branches:
            'main':
            - step: 
                name: Push Version
                script:
                    - npm i -g eitri-cli
                    - eitri push-version
    ```


!!! note
    The version of Node.js should be 16 or higher.

!!! tip
    It is highly recommended to use semantic versioning [semver](https://semver.org/lang/en/){:target="_blank"} and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/){:target="_blank"} to also automate version numbering appropriately and comfortably in your pipeline.

!!! info
    When running the pipeline, a new version will be sent to the Console automatically. If there is a previously published version with the same number, an error will be returned in the publication.


## How much does it cost?

There are no additional costs in Eitri for setting up or using CI/CD, however, there may be costs from your service provider. Many major providers of this type of service charge for pipeline runtime.
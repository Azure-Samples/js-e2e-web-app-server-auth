---
page_type: sample
languages:
- javascript
- nodejs
name: "Add Microsoft authentication to Express.js application"
description: "JavaScript end-to-end add Microsoft authentication with MSAL to Express.js application"
products:
- azure
- azure-portal
- vs-code
- msal-node
- msal-js
- microsoft-identity-web
- identity
- developer-tools
- app-service
---
# Add Microsoft authentication to Express.js application

For a complete tutorial, please use the [Microsoft Documentation tutorial found here]().

## Express.js app

This sample illustrates how to integrate MSAL authentication for the Microsoft Identity provider into an Express.js app to provide:
* Login/logout
* Route restrictions
* Query a restricted API, such as Graph

## Usage

1. Start by building the wrapper:

    ```bash
    npm install
    ```

2. Then, configure required MSAL settings file in JSON (see: [appSettings.json](./TestApp/appSettings.json)). The file looks like the following:

    ```JSON
    "credentials": {
        "clientId": process.env.AD_CLIENT_ID || "REPLACE-WITH-YOUR-APP-CLIENT-ID",
        "tenantId": process.env.AD_TENANT_ID || "REPLACE-WITH-YOUR-APP-TENANT-ID",
        "clientSecret": process.env.AD_CLIENT_ID_SECRET || "REPLACE-WITH-YOUR-APP-CLIENT-ID-SECRET"
    },
    ```

3. Run the project. 

    ```bash
    npm start
    ```

8. Open a browser at `http://localhost:8080`.

## Remarks

### Session support

Session support in this sample is provided by the [express-session](https://www.npmjs.com/package/express-session) package. **express-session** is considered unfit for production, and you should either implement your own session solution or use a more suitable 3rd party library.

### Persistent caching

MSAL Node has an in-memory cache by default. This sample also features a persistent cache plugin in order to save the cache to disk. This plugin is not meant to be production-ready. As such, you might want to implement persistent caching using a 3rd party library like [redis](https://redis.io/).

## More information

* [Initializing a confidential client app with MSAL Node](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md)
* [MSAL Node Configuration options](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md)
* [Scenario: A web app that calls web APIs](https://docs.microsoft.com/azure/active-directory/develop/scenario-web-app-call-api-overview)

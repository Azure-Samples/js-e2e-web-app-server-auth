const appSettings = () => {

    // BASE_URI = `YOUR-APP-NAME.azurewebsites.net`
    const domainName = process.env.BASE_URI || "localhost";
    
    const port = process.env.PORT || 8080;
    const protocol = domainName.includes(".azurewebsites.net") ? "https" : "http";
    const baseUri = `${protocol}://${domainName}:${port}`
    
    const app_settings_vals = {
        "host": {
            "port": port
        },
        "credentials": {
            "clientId": process.env.AD_CLIENT_ID || "REPLACE-WITH-YOUR-APP-CLIENT-ID",
            "tenantId": process.env.AD_TENANT_ID || "REPLACE-WITH-YOUR-APP-TENANT-ID",
            "clientSecret": process.env.AD_CLIENT_ID_SECRET || "REPLACE-WITH-YOUR-APP-CLIENT-ID-SECRET"
        },
        "settings": {
            "homePageRoute": "/home",
            "redirectUri": `${baseUri}/redirect`,
            "postLogoutRedirectUri": `${baseUri}/`
        },
        "resources": {
            "graphAPI": {
                "callingPageRoute": "/profile",
                "endpoint": "https://graph.microsoft.com/v1.0/me",
                "scopes": ["user.read"]
            },
            "armAPI": {
                "callingPageRoute": "/tenant",
                "endpoint": "https://management.azure.com/tenants?api-version=2020-01-01",
                "scopes": ["https://management.azure.com/user_impersonation"]
            }
        }

    }
    console.log(JSON.stringify(app_settings_vals));
    return app_settings_vals;
}

module.exports = appSettings;
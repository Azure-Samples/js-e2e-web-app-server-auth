const fetchManager = require('./utils/fetchManager');

const isConfigured = (req) => {
    
    if (req.app.locals.appSettings.credentials.clientId != 'REPLACE-WITH-YOUR-APP-CLIENT-ID' &&
        req.app.locals.appSettings.credentials.tenantId != 'REPLACE-WITH-YOUR-APP-TENANT-ID' &&
        req.app.locals.appSettings.credentials.clientSecret != 'REPLACE-WITH-YOUR-APP-CLIENT-ID-SECRET') {
        console.log("appSettings is configured")
        return true;
    } else {
        console.log("appSettings is NOT configured")
        return false;
    }
}

exports.getHomePage = (req, res, next) => {

    res.render('home', { isAuthenticated: req.session.isAuthenticated, configured: isConfigured(req) });
}

exports.getIdPage = (req, res, next) => {
    const claims = {
        name: req.session.idTokenClaims.name,
        preferred_username: req.session.idTokenClaims.preferred_username,
        oid: req.session.idTokenClaims.oid,
        sub: req.session.idTokenClaims.sub
    };

    res.render('id', { isAuthenticated: req.session.isAuthenticated, claims: claims, configured: isConfigured(req) });
}

exports.getProfilePage = async(req, res, next) => {
    let profile;

    try {
        profile = await fetchManager.callAPI(req.app.locals.appSettings.resources.graphAPI.endpoint, req.session["graphAPI"].accessToken);        
    } catch (error) {
        console.log(error)
    }

    res.render('profile', { isAuthenticated: req.session.isAuthenticated, profile: profile, configured: isConfigured(req) });
}

exports.getTenantPage = async(req, res, next) => {
    let tenant;

    try {
        // Getting tenant information requires Admin level 
        // permission
        tenant = await fetchManager.callAPI(req.app.locals.appSettings.resources.armAPI.endpoint, req.session["armAPI"].accessToken);   
    } catch (error) {
        console.log(error)
    }

    res.render('tenant', { isAuthenticated: req.session.isAuthenticated, tenant: tenant.value[0], configured: isConfigured(req) });
}
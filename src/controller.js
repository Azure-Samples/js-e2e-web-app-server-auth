const fetchManager = require('./utils/fetchManager');

exports.getHomePage = (req, res, next) => {
    res.render('home', { isAuthenticated: req.session.isAuthenticated });
}

exports.getIdPage = (req, res, next) => {
    const claims = {
        name: req.session.idTokenClaims.name,
        preferred_username: req.session.idTokenClaims.preferred_username,
        oid: req.session.idTokenClaims.oid,
        sub: req.session.idTokenClaims.sub
    };

    res.render('id', { isAuthenticated: req.session.isAuthenticated, claims: claims });
}

exports.getProfilePage = async(req, res, next) => {
    let profile;

    try {
        profile = await fetchManager.callAPI(req.app.locals.appSettings.resources.graphAPI.endpoint, req.session["graphAPI"].accessToken);        
    } catch (error) {
        console.log(error)
    }

    res.render('profile', { isAuthenticated: req.session.isAuthenticated, profile: profile });
}

exports.getTenantPage = async(req, res, next) => {
    let tenant;
    console.log("tenant")

    try {
        // Getting tenant information requires Admin level 
        // permission
        tenant = await fetchManager.callAPI(req.app.locals.appSettings.resources.armAPI.endpoint, req.session["armAPI"].accessToken);   
    } catch (error) {
        console.log(error)
    }

    res.render('tenant', { isAuthenticated: req.session.isAuthenticated, tenant: tenant.value[0] });
}
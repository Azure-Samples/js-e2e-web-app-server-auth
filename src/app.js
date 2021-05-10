/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const express = require('express');
const session = require('express-session');
const path = require('path');
const getRoutes = require('./router');
const mainController = require('./controller');
const cache = require('./utils/cachePlugin');
const app = express();

// get settings and set up Authentication into app
const appSettings = require('../appSettings')();
const msalWrapper = require('./msal-express-wrapper/auth-provider');
const authProvider = new msalWrapper.AuthProvider(appSettings, cache);
app.locals = {
    appSettings,
    authProvider
};

// View engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Static files and other configurations
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

/**
 * Using express-session middleware. Be sure to familiarize yourself with available options
 * and set the desired options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(session({ secret: 'ENTER_YOUR_SECRET_HERE', resave: false, saveUninitialized: false }));

// set up routes with authentication
app.use(getRoutes(mainController, authProvider, express.Router()));

app.listen(appSettings.host.port, () => console.log(`Msal Node Auth Code Sample app listening on port ${appSettings.host.port}!`));
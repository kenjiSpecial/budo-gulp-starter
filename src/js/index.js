"use strict";

import App from './lib/app';
import GLApp from "./gl-app";

var isDebug;
if(process.env.ENV == "dev" && !!require('./lib/utils').getQueryVariable("debug")) isDebug = true;
else                                                                               isDebug = false;

App.configure({
    isDebug : isDebug,
    env: process.env.ENV,
    baseURL: process.env.BASE_URL,
    assetsURL: process.env.ASSETS_URL,
})

require('domready')(() => {
    var glApp = new GLApp();
    glApp.start();
});
/// <reference path="selfcare.js" />
'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('LandingCtrl', care.Controllers.LandingCtrl)

    // Path: /home
    .controller('HomeCtrl', care.Controllers.HomeCtrl)

    // Path: /about
    .controller('AboutCtrl', care.Controllers.AboutCtrl)

    // Path: /login
    .controller('LoginCtrl', care.Controllers.LoginCtrl)

    // Path: /error/404
    .controller('Error404Ctrl', care.Controllers.Error404Ctrl);
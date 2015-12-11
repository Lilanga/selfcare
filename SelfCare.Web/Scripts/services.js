/// <reference path="selfcare.js" />
'use strict';

//register services here
angular.module('app.services', [])
    .service('authenticationService', care.Services.AuthenticationService)
    .value('version', '0.1');
/// <reference path="selfcare.js" />
'use strict';

//register services here
angular.module('app.services', [])
    .service('authenticationService', care.Services.AuthenticationService)
    .service('categoryService', care.Services.CategoryService)
    .factory('authenticationInterceptor', ['$location', '$q', 'localStorageService', care.Utilities.authenticationInterceptorFactory])
    .value('version', '0.1');
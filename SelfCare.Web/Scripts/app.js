'use strict';

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
angular.module('app', ['ui.router', 'app.filters', 'app.services', 'app.directives', 'app.controllers', 'LocalStorageModule', 'angular-loading-bar'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider)
        { cfpLoadingBarProvider.includeSpinner = false; }])
    .config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------

        $stateProvider
            .state('index', {
                url: '/',
                layout: 'public',
                templateUrl: '/views/index',
                controller: 'LandingCtrl',
                resolve: {
                    auth: publicState
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: '/views/home',
                controller: 'HomeCtrl',
                layout: 'loggedIn',
                resolve: {
                    auth: authState
                }
            })
            .state('about', {
                url: '/about',
                layout: 'public',
                templateUrl: '/views/about',
                controller: 'AboutCtrl',
                resolve: {
                    auth: publicState
                }
            })
            .state('login', {
                url: '/login',
                layout: 'popup',
                templateUrl: '/views/login',
                controller: 'LoginCtrl',
                resolve: {
                    auth: publicState
                }
            })
            .state('signUp', {
                url: '/signUp',
                layout: 'popup',
                templateUrl: '/views/signUp',
                controller: 'SignUpCtrl',
                resolve: {
                    auth: publicState
                }
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: '/views/404',
                controller: 'Error404Ctrl'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
    // include headers before service calls
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authenticationInterceptor');
    })

    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', '$location', 'authenticationService', '$timeout', function ($templateCache, $rootScope, $state, $stateParams, $location, authenticationService, $timeout) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // authenticate related
        $rootScope.authService = authenticationService;

        $rootScope.$on('user:logout', function (event, authInfo) {
            // handle the global logout logic
            if (!authInfo.isAuth) {
                $location.path('/');
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (error.authenticated === false) {
                $timeout(function () {
                    $location.path('/login');
                });                
                // $rootScope.$apply();
            } else {
                $timeout(function () {
                    $location.path('/home');
                });
                // $rootScope.$apply();
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (authInfo) {
        });
    }]);

var authState = ["$q", "authenticationService", function($q, authenticationService) {
        var authInfo = authenticationService.reloadAuthInfo();

        if (authInfo && authInfo.isAuth) {
            return $q.when(authInfo);
        } else {
            return $q.reject({ authenticated: false });
        }
    }
];

var publicState = ["$q", "authenticationService", '$location', '$timeout', function ($q, authenticationService, $location, $timeout) {
    var authInfo = authenticationService.reloadAuthInfo();

    if (!authInfo || !authInfo.isAuth) {
        return $q.when(authInfo);
    } else {
        return $q.reject({ authenticated: true });
    }
}];
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
                templateUrl: '/views/index',
                controller: 'LandingCtrl'

            })
            .state('home', {
                url: '/home',
                templateUrl: '/views/home',
                controller: 'HomeCtrl',
                resolve: {
                    auth: authState
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: '/views/about',
                controller: 'AboutCtrl'
            })
            .state('login', {
                url: '/login',
                layout: 'basic',
                templateUrl: '/views/login',
                controller: 'LoginCtrl'
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
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', '$location', function ($templateCache, $rootScope, $state, $stateParams, $location) {

        // <ui-view> contains a pre-rendered template for the current view
        // caching it will prevent a round-trip to a server at the first page load
        var view = angular.element('#ui-view');
        $templateCache.put(view.data('tmpl-url'), view.html());

        // Allows to retrieve UI Router state information from inside templates
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            // Sets the layout name, which can be used to display different layouts (header, footer etc.)
            // based on which page the user is located
            $rootScope.layout = toState.layout;
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (error.authenticated === false) {
                $location.path('/login');
                $rootScope.$apply();
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (authInfo) {
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                $location.path('/login');
                $rootScope.$apply();
            }
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
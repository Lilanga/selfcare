/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
module care.Controllers {
    'use strict';

    export interface IBaseScope extends ng.IScope {
        events: BaseController;
        logOut: () => void;
        isAuthenticated: boolean;
    }

    export class BaseController {
        scope: IBaseScope;
        $location;
        $window;
        authService: Services.IAuthenticationService;

        constructor($scope: IBaseScope) {
            var $injector = angular.element(document.getElementById('app')).injector();
            this.scope = $scope;
            this.scope.events = this;
            this.$location = $injector.get('$location');
            this.$window = $injector.get('$window');
            this.authService = $injector.get('authenticationService');
            this.initialize();
        }

        private initialize(): void {
            var self = this;

            self.scope.isAuthenticated = self.authService.reloadAuthInfo().isAuth;
            self.scope.logOut = function() {
                self.authService.logout();
                self.$location.path('/');
            };
        }
    }
}
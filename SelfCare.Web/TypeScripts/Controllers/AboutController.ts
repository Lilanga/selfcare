module care.Controllers {
    import LoginData = Extentions.LoginData;
    'use strict';

    export class AboutCtrl extends BaseController {
        private $scope;
        private $window;
        private $location;
        private authService: Services.IAuthenticationService;
        private signinData: LoginData;
        static $inject = ['$scope', '$location', '$window', 'authenticationService'];

        private init(): void {
            var self = this;
            self.$scope.$root.title = 'SelfCare Portal | About';
            self.$scope.$on('$viewContentLoaded', () => {
                this.$window.ga('send', 'pageview', { 'page': this.$location.path(), 'title': this.$scope.$root.title });
            });
        }

        constructor($scope: IBaseScope, $location, $window, authenticationService) {
            super($scope);
            this.$scope = $scope;
            this.$window = $window;
            this.$location = $location;
            this.authService = authenticationService;
            this.init();
        }
    }
}
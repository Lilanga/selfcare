module care.Controllers {
    'use strict';
    import LoginData = Extentions.LoginData;

    export class LoginCtrl extends BaseController {
        private $scope;
        private $window;
        private $location;
        private authService: Services.IAuthenticationService;
        private signinData: LoginData;
        static $inject = ['$scope', '$location', '$window', 'authenticationService'];

        private init(): void {
            var self = this;

            self.$scope.$root.title = 'SelfCare Portal | Sign In';
            self.$scope.loginData = new LoginData();

            // TODO: Authorize a user
            self.$scope.login = function () {
                self.signinData = new LoginData();
                self.signinData.userName = self.$scope.loginData.userName;
                self.signinData.password = self.$scope.loginData.password;
                self.authService.getAuthenticationToken(self.signinData).then(
                    function (response) {
                        self.$location.path('/home');
                    },
                    function (response) {
                    }
                );
            };

            self.$scope.cancel = function () {
                self.$location.path('/');
                return false;
            };
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
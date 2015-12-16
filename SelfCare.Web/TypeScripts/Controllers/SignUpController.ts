module care.Controllers {
    'use strict';
    import SignUpData = Extentions.SignUpData;

    export class SignUpCtrl extends BaseController {
        private $scope;
        private $window;
        private $location;
        private authService: Services.IAuthenticationService;
        private signinData: SignUpData;
        static $inject = ['$scope', '$location', '$window', 'authenticationService'];

        private init(): void {
            var self = this;

            self.$scope.$root.title = 'SelfCare Portal | Sign In';
            self.$scope.signUpData = new SignUpData();

            // SignUp a user
            self.$scope.signUp = function () {
                self.signinData = new SignUpData();
                self.signinData.email = self.$scope.signUpData.email;
                self.signinData.userName = self.$scope.signUpData.userName;
                self.signinData.password = self.$scope.signUpData.password;
                self.signinData.confirmPassword = self.$scope.signUpData.confirmPassword;
                self.authService.postSignUp(self.signinData).then(
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
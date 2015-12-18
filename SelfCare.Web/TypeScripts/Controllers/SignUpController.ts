module care.Controllers {
    'use strict';
    import SignUpData = Extentions.SignUpData;

    export class SignUpCtrl extends BaseController {
        private $scope;
        private signUpData: SignUpData;
        static $inject = ['$scope'];

        private init(): void {
            var self = this;

            self.$scope.$root.title = 'SelfCare Portal | Sign In';
            self.$scope.signUpData = new SignUpData();

            // SignUp a user
            self.$scope.signUp = function () {
                self.signUpData = new SignUpData();
                self.signUpData.email = self.$scope.signUpData.email;
                self.signUpData.userName = self.$scope.signUpData.userName;
                self.signUpData.password = self.$scope.signUpData.password;
                self.signUpData.confirmPassword = self.$scope.signUpData.confirmPassword;
                self.authService.postSignUp(self.signUpData).then(
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

        constructor($scope: IBaseScope) {
            super($scope);
            this.$scope = $scope;

            this.init();
        }
    }
}
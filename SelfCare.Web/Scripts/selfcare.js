var care;
(function (care) {
    var Extentions;
    (function (Extentions) {
        'use strict';
        var LoginData = (function () {
            function LoginData() {
            }
            return LoginData;
        })();
        Extentions.LoginData = LoginData;
    })(Extentions = care.Extentions || (care.Extentions = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Services;
    (function (Services) {
        'use strict';
    })(Services = care.Services || (care.Services = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var BaseController = (function () {
            function BaseController($scope) {
                this.scope = $scope;
                this.scope.events = this;
            }
            return BaseController;
        })();
        Controllers.BaseController = BaseController;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var AboutCtrl = (function (_super) {
            __extends(AboutCtrl, _super);
            function AboutCtrl($scope, $location, $window, authenticationService) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                this.authService = authenticationService;
                this.init();
            }
            AboutCtrl.prototype.init = function () {
                var _this = this;
                var self = this;
                self.$scope.$root.title = 'SelfCare Portal | About';
                self.$scope.$on('$viewContentLoaded', function () {
                    _this.$window.ga('send', 'pageview', { 'page': _this.$location.path(), 'title': _this.$scope.$root.title });
                });
            };
            AboutCtrl.$inject = ['$scope', '$location', '$window', 'authenticationService'];
            return AboutCtrl;
        })(Controllers.BaseController);
        Controllers.AboutCtrl = AboutCtrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var HomeCtrl = (function (_super) {
            __extends(HomeCtrl, _super);
            function HomeCtrl($scope, $location, $window) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                // this.categorySvc = categoryDataSvc;
                this.init();
            }
            HomeCtrl.prototype.init = function () {
                var _this = this;
                var self = this;
                self.$scope.$root.title = 'SelfCare Portal | Home';
                self.$scope.$on('$viewContentLoaded', function () {
                    _this.$window.ga('send', 'pageview', { 'page': _this.$location.path(), 'title': _this.$scope.$root.title });
                });
                //self.categorySvc.getAllCategories().then(function (data) {
                //    self.$scope.categories = data;
                //});
            };
            // private categorySvc: CategoryDataSvc;
            HomeCtrl.$inject = ['$scope', '$location', '$window'];
            return HomeCtrl;
        })(Controllers.BaseController);
        Controllers.HomeCtrl = HomeCtrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var LoginData = care.Extentions.LoginData;
        var LoginCtrl = (function (_super) {
            __extends(LoginCtrl, _super);
            function LoginCtrl($scope, $location, $window, authenticationService) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                this.authService = authenticationService;
                this.init();
            }
            LoginCtrl.prototype.init = function () {
                var self = this;
                self.$scope.$root.title = 'SelfCare Portal | Sign In';
                self.$scope.loginData = new LoginData();
                // TODO: Authorize a user
                self.$scope.login = function () {
                    self.signinData = new LoginData();
                    self.signinData.userName = self.$scope.loginData.userName;
                    self.signinData.password = self.$scope.loginData.password;
                    self.authService.getAuthenticationToken(self.signinData).then(function (response) {
                        self.$location.path('/home');
                    }, function (response) {
                    });
                };
                self.$scope.cancel = function () {
                    self.$location.path('/');
                    return false;
                };
            };
            LoginCtrl.$inject = ['$scope', '$location', '$window', 'authenticationService'];
            return LoginCtrl;
        })(Controllers.BaseController);
        Controllers.LoginCtrl = LoginCtrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var LandingCtrl = (function (_super) {
            __extends(LandingCtrl, _super);
            function LandingCtrl($scope, $location, $window) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                this.init();
            }
            LandingCtrl.prototype.init = function () {
                var _this = this;
                var self = this;
                self.$scope.$root.title = 'SelfCare Portal | Welcome';
                self.$scope.$on('$viewContentLoaded', function () {
                    _this.$window.ga('send', 'pageview', { 'page': _this.$location.path(), 'title': _this.$scope.$root.title });
                });
            };
            LandingCtrl.$inject = ['$scope', '$location', '$window'];
            return LandingCtrl;
        })(Controllers.BaseController);
        Controllers.LandingCtrl = LandingCtrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var Error404Ctrl = (function (_super) {
            __extends(Error404Ctrl, _super);
            function Error404Ctrl($scope, $location, $window) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$window = $window;
                this.$location = $location;
                this.init();
            }
            Error404Ctrl.prototype.init = function () {
                var _this = this;
                var self = this;
                self.$scope.$root.title = 'Error 404: Page Not Found';
                self.$scope.$on('$viewContentLoaded', function () {
                    _this.$window.ga('send', 'pageview', { 'page': _this.$location.path(), 'title': _this.$scope.$root.title });
                });
            };
            Error404Ctrl.$inject = ['$scope', '$location', '$window'];
            return Error404Ctrl;
        })(Controllers.BaseController);
        Controllers.Error404Ctrl = Error404Ctrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
/// <reference path="../../scripts/typings/angular-local-storage/angular-local-storage.d.ts" />
var care;
(function (care) {
    var Services;
    (function (Services) {
        'use strict';
        var AuthenticationService = (function () {
            function AuthenticationService($http, $q, localStorageService) {
                this.httpService = $http;
                this.qService = $q;
                this.localStorageService = localStorageService;
            }
            AuthenticationService.prototype.getAuthenticationToken = function (loginData) {
                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
                var deferred = this.qService.defer();
                var self = this;
                self.httpService.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                    self.authenticationInfo = response;
                    self.authenticationInfo.isAuth = true;
                    self.localStorageService.set('authorizationData', self.authenticationInfo);
                    deferred.resolve(response);
                }).error(function (err, status) {
                    self.logout();
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            AuthenticationService.prototype.postSignUp = function (signUpdata) {
                var self = this;
                self.logout();
                return self.httpService.post(serviceBase + 'api/account/register', signUpdata)
                    .then(function (response) {
                    return response;
                });
            };
            AuthenticationService.prototype.logout = function () {
                this.localStorageService.remove('authorizationData');
                this.authenticationInfo.isAuth = false;
                this.authenticationInfo.userName = "";
            };
            AuthenticationService.prototype.reloadAuthInfo = function () {
                this.authenticationInfo = this.localStorageService.get('authorizationData');
                return this.authenticationInfo;
            };
            AuthenticationService.$inject = ['$http', '$q', 'localStorageService'];
            return AuthenticationService;
        })();
        Services.AuthenticationService = AuthenticationService;
    })(Services = care.Services || (care.Services = {}));
})(care || (care = {}));
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="interfaces/iextentions.ts" />
/// <reference path="interfaces/iservices.ts" />
/// <reference path="utilities.ts" />
/// <reference path="controllers/basecontroller.ts" />
/// <reference path="controllers/aboutcontroller.ts" />
/// <reference path="controllers/homecontroller.ts" />
/// <reference path="controllers/loginController.ts" />
/// <reference path="controllers/landingController.ts" />
/// <reference path="controllers/error404Controller.ts" />
/// <reference path="Services/authenticationService.ts" /> 

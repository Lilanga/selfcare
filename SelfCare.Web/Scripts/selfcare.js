var care;
(function (care) {
    var Extentions;
    (function (Extentions) {
        'use strict';
        var AuthInfo = (function () {
            function AuthInfo() {
            }
            return AuthInfo;
        })();
        Extentions.AuthInfo = AuthInfo;
        var LoginData = (function () {
            function LoginData() {
            }
            return LoginData;
        })();
        Extentions.LoginData = LoginData;
        var SignUpData = (function () {
            function SignUpData() {
            }
            return SignUpData;
        })();
        Extentions.SignUpData = SignUpData;
    })(Extentions = care.Extentions || (care.Extentions = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Services;
    (function (Services) {
        'use strict';
    })(Services = care.Services || (care.Services = {}));
})(care || (care = {}));
/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var BaseController = (function () {
            function BaseController($scope) {
                var $injector = angular.element(document.getElementById('app')).injector();
                this.scope = $scope;
                this.scope.events = this;
                this.$location = $injector.get('$location');
                this.$window = $injector.get('$window');
                this.authService = $injector.get('authenticationService');
                this.initialize();
            }
            BaseController.prototype.initialize = function () {
                var self = this;
                self.scope.isAuthenticated = self.authService.reloadAuthInfo().isAuth;
                self.scope.logOut = function () {
                    self.authService.logout();
                    self.$location.path('/');
                };
            };
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
            function AboutCtrl($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
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
            AboutCtrl.$inject = ['$scope'];
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
            function HomeCtrl($scope, categoryService) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.categorySvc = categoryService;
                this.init();
            }
            HomeCtrl.prototype.init = function () {
                var _this = this;
                var self = this;
                self.$scope.$root.title = 'SelfCare Portal | Home';
                self.$scope.$on('$viewContentLoaded', function () {
                    _this.$window.ga('send', 'pageview', { 'page': _this.$location.path(), 'title': _this.$scope.$root.title });
                });
                self.categorySvc.loadCategories().then(function (data) {
                    self.$scope.categories = data;
                }, function (response) {
                });
            };
            HomeCtrl.$inject = ['$scope', 'categoryService'];
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
            function LoginCtrl($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
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
            LoginCtrl.$inject = ['$scope'];
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
            function LandingCtrl($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
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
            LandingCtrl.$inject = ['$scope'];
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
            function Error404Ctrl($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
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
            Error404Ctrl.$inject = ['$scope'];
            return Error404Ctrl;
        })(Controllers.BaseController);
        Controllers.Error404Ctrl = Error404Ctrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var SignUpData = care.Extentions.SignUpData;
        var SignUpCtrl = (function (_super) {
            __extends(SignUpCtrl, _super);
            function SignUpCtrl($scope) {
                _super.call(this, $scope);
                this.$scope = $scope;
                this.init();
            }
            SignUpCtrl.prototype.init = function () {
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
                    self.authService.postSignUp(self.signUpData).then(function (response) {
                        self.$location.path('/home');
                    }, function (response) {
                    });
                };
                self.$scope.cancel = function () {
                    self.$location.path('/');
                    return false;
                };
            };
            SignUpCtrl.$inject = ['$scope'];
            return SignUpCtrl;
        })(Controllers.BaseController);
        Controllers.SignUpCtrl = SignUpCtrl;
    })(Controllers = care.Controllers || (care.Controllers = {}));
})(care || (care = {}));
/// <reference path="../../scripts/typings/angular-local-storage/angular-local-storage.d.ts" />
var care;
(function (care) {
    var Services;
    (function (Services) {
        var AuthInfo = care.Extentions.AuthInfo;
        'use strict';
        var AuthenticationService = (function () {
            function AuthenticationService($http, $q, localStorageService, $rootScope) {
                this.httpService = $http;
                this.qService = $q;
                this.localStorageService = localStorageService;
                this.$rootScope = $rootScope;
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
                if (this.localStorageService) {
                    this.localStorageService.remove('authorizationData');
                }
                if (!this.authenticationInfo) {
                    this.reloadAuthInfo();
                }
                this.authenticationInfo.isAuth = false;
                this.authenticationInfo.userName = "";
                this.$rootScope.$broadcast('user:logout', this.authenticationInfo);
            };
            AuthenticationService.prototype.reloadAuthInfo = function () {
                this.authenticationInfo = this.localStorageService.get('authorizationData');
                if (!this.authenticationInfo) {
                    this.authenticationInfo = new AuthInfo();
                    this.authenticationInfo.isAuth = false;
                    this.authenticationInfo.userName = "";
                }
                return this.authenticationInfo;
            };
            AuthenticationService.$inject = ['$http', '$q', 'localStorageService', '$rootScope'];
            return AuthenticationService;
        })();
        Services.AuthenticationService = AuthenticationService;
    })(Services = care.Services || (care.Services = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Services;
    (function (Services) {
        'use strict';
        var CategoryService = (function () {
            function CategoryService($http, $q) {
                this.httpService = $http;
                this.qService = $q;
            }
            CategoryService.prototype.loadCategories = function () {
                var deferred = this.qService.defer();
                var self = this;
                self.httpService.get(serviceBase + 'api/Values').success(function (response) {
                    deferred.resolve(response);
                }).error(function (response) {
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            CategoryService.$inject = ['$http', '$q'];
            return CategoryService;
        })();
        Services.CategoryService = CategoryService;
    })(Services = care.Services || (care.Services = {}));
})(care || (care = {}));
var care;
(function (care) {
    var Utilities;
    (function (Utilities) {
        function authenticationInterceptorFactory($location, $q, localStorageService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    var authenticationInfo = localStorageService.get('authorizationData');
                    if (authenticationInfo && authenticationInfo.isAuth) {
                        config.headers.Authorization = 'Bearer ' + authenticationInfo.access_token;
                    }
                    return config;
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        }
        Utilities.authenticationInterceptorFactory = authenticationInterceptorFactory;
    })(Utilities = care.Utilities || (care.Utilities = {}));
})(care || (care = {}));
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="interfaces/iextentions.ts" />
/// <reference path="interfaces/iservices.ts" />
/// <reference path="interfaces/iutilities.ts" />
/// <reference path="controllers/basecontroller.ts" />
/// <reference path="controllers/aboutcontroller.ts" />
/// <reference path="controllers/homecontroller.ts" />
/// <reference path="controllers/loginController.ts" />
/// <reference path="controllers/landingController.ts" />
/// <reference path="controllers/error404Controller.ts" />
/// <reference path="controllers/signupcontroller.ts" />
/// <reference path="Services/authenticationService.ts" />
/// <reference path="services/categoryservice.ts" />
/// <reference path="utilities.ts" /> 

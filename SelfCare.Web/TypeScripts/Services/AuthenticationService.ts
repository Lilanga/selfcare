/// <reference path="../../scripts/typings/angular-local-storage/angular-local-storage.d.ts" />
module care.Services {
    import LocalStorageService = angular.local.storage.ILocalStorageService;
    import AuthInfo = care.Extentions.AuthInfo;
    'use strict';
    declare var serviceBase: string;

    export class AuthenticationService implements IAuthenticationService {
        httpService: ng.IHttpService;
        qService: ng.IQService;
        localStorageService: LocalStorageService;
        authenticationInfo: Extentions.IAuthInfo;
        $rootScope;

        static $inject = ['$http', '$q', 'localStorageService', '$rootScope'];

        constructor($http, $q, localStorageService, $rootScope) {
            this.httpService = $http;
            this.qService = $q;
            this.localStorageService = localStorageService;
            this.$rootScope = $rootScope;
        }

        getAuthenticationToken(loginData: Extentions.ILoginData): any {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            var deferred = this.qService.defer();
            var self = this;

            self.httpService.post(serviceBase + 'token', data, {headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function (response) {

                self.authenticationInfo = <Extentions.IAuthInfo>response;
                self.authenticationInfo.isAuth = true;
                
                self.localStorageService.set('authorizationData',self.authenticationInfo);

                deferred.resolve(response);

            }).error(function (err, status) {
                self.logout();
                deferred.reject(err);
            });

            return deferred.promise;
        }

        postSignUp(signUpdata: Extentions.ISignUpData): any {
            var self = this;
            self.logout();

            return self.httpService.post(serviceBase + 'api/account/register', signUpdata)
                .then(function (response) {
                    return response;
            });
        }

        logout(): void {
            if (this.localStorageService) {
                this.localStorageService.remove('authorizationData');
            }

            if (!this.authenticationInfo) {
                this.reloadAuthInfo();
            }
                this.authenticationInfo.isAuth = false;
                this.authenticationInfo.userName = "";
            

            this.$rootScope.$broadcast('user:logout', this.authenticationInfo);
        }

        reloadAuthInfo(): Extentions.IAuthInfo {
            this.authenticationInfo = <Extentions.IAuthInfo>this.localStorageService.get('authorizationData');
            if (!this.authenticationInfo) {
                this.authenticationInfo = new AuthInfo();
                this.authenticationInfo.isAuth = false;
                this.authenticationInfo.userName = "";
            }

            return this.authenticationInfo;
        }
    }
}
/// <reference path="../../scripts/typings/angular-local-storage/angular-local-storage.d.ts" />
module care.Services {
    import LocalStorageService = angular.local.storage.ILocalStorageService;
    'use strict';
    declare var serviceBase: string;

    export class AuthenticationService implements IAuthenticationService {
        httpService: ng.IHttpService;
        qService: ng.IQService;
        localStorageService: LocalStorageService;
        authenticationInfo: Extentions.IAuthInfo;

        static $inject = ['$http', '$q', 'localStorageService'];

        constructor($http, $q, localStorageService) {
            this.httpService = $http;
            this.qService = $q;
            this.localStorageService = localStorageService;
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
            this.localStorageService.remove('authorizationData');
            this.authenticationInfo.isAuth = false;
            this.authenticationInfo.userName = "";
        }

        reloadAuthInfo(): Extentions.IAuthInfo {
            this.authenticationInfo = <Extentions.IAuthInfo>this.localStorageService.get('authorizationData');
            return this.authenticationInfo;
        }
    }
}
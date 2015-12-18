module care.Utilities {
    export function authenticationInterceptorFactory($location,$q: ng.IQService, localStorageService: angular.local.storage.ILocalStorageService) {
        return {
            request: (config) => {
                config.headers = config.headers || {};

                var authenticationInfo = <Extentions.IAuthInfo>localStorageService.get('authorizationData');
                if (authenticationInfo && authenticationInfo.isAuth) {
                    config.headers.Authorization = 'Bearer ' + authenticationInfo.access_token;
                }

                return config;
            },
            responseError: (rejection) => {
                if (rejection.status === 401) {
                    $location.path('/login');
                }

                return $q.reject(rejection);
            }
        };
    }
}
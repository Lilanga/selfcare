module care.Services {
    'use strict';
    declare var serviceBase: string;

    export class CategoryService implements ICategoryService {
        httpService: ng.IHttpService;
        qService: ng.IQService;

        static $inject = ['$http', '$q'];

        constructor($http, $q) {
            this.httpService = $http;
            this.qService = $q;
        }

        loadCategories(): any {
            var deferred = this.qService.defer();
            var self = this;

            self.httpService.get(serviceBase + 'api/Values').success(function (response) {
                deferred.resolve(response);
            }).error(function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }
}
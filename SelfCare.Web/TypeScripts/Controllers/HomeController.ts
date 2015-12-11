module care.Controllers {
    'use strict';

    export class HomeCtrl extends BaseController{
        private $scope;
        private $window;
        private $location;
        // private categorySvc: CategoryDataSvc;
        static $inject = ['$scope', '$location', '$window'];

        private init(): void {
            var self = this;
            self.$scope.$root.title = 'SelfCare Portal | Home';

            self.$scope.$on('$viewContentLoaded', () => {
                this.$window.ga('send', 'pageview', { 'page': this.$location.path(), 'title': this.$scope.$root.title });
            });

            //self.categorySvc.getAllCategories().then(function (data) {
            //    self.$scope.categories = data;
            //});
        }

        constructor($scope: IBaseScope, $location, $window) {
            super($scope);
            this.$scope = $scope;
            this.$window = $window;
            this.$location = $location;
            // this.categorySvc = categoryDataSvc;

            this.init();
        }
    }
}
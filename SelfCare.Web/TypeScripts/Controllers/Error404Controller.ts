module care.Controllers {
    'use strict';

    export class Error404Ctrl extends BaseController {
        private $scope;
        static $inject = ['$scope'];

        private init(): void {
            var self = this;
            self.$scope.$root.title = 'Error 404: Page Not Found';
            self.$scope.$on('$viewContentLoaded', () => {
                this.$window.ga('send', 'pageview', { 'page': this.$location.path(), 'title': this.$scope.$root.title });
            });
        }

        constructor($scope: IBaseScope) {
            super($scope);
            this.$scope = $scope;

            this.init();
        }
    }
}
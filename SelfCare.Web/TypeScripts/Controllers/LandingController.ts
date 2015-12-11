module care.Controllers {
    'use strict';

    export class LandingCtrl extends BaseController {
        private $scope;
        private $window;
        private $location;

        static $inject = ['$scope', '$location', '$window'];

        private init(): void {
            var self = this;
            self.$scope.$root.title = 'SelfCare Portal | Welcome';

            self.$scope.$on('$viewContentLoaded', () => {
                this.$window.ga('send', 'pageview', { 'page': this.$location.path(), 'title': this.$scope.$root.title });
            });
        }

        constructor($scope: IBaseScope, $location, $window) {
            super($scope);
            this.$scope = $scope;
            this.$window = $window;
            this.$location = $location;

            this.init();
        }
    }
}
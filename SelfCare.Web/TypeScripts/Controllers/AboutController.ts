module care.Controllers {
    import LoginData = Extentions.LoginData;
    'use strict';

    export class AboutCtrl extends BaseController {
        private $scope;
        static $inject = ['$scope'];

        private init(): void {
            var self = this;
            self.$scope.$root.title = 'SelfCare Portal | About';
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
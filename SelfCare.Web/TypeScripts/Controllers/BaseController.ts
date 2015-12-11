module care.Controllers {
    'use strict';

    export interface IBaseScope extends ng.IScope {
        events: BaseController;
    }

    export class BaseController {
        scope: IBaseScope;

        constructor($scope: IBaseScope) {
            this.scope = $scope;
            this.scope.events = this;
        }
    }
}
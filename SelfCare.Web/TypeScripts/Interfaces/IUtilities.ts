module care.Utilities {
    export interface IInterceptor {
        request: Function;
        requestError: Function;
        response: Function;
        responseError: Function;
    }
}
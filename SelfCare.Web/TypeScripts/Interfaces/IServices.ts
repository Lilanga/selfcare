module care.Services {
    'use strict';
    import LoginData = Extentions.ILoginData;
    import AuthInfo = Extentions.IAuthInfo;
    import SignUpData = Extentions.ISignUpData;

    export interface IAuthenticationService {
        getAuthenticationToken: (loginData: LoginData) => ng.IPromise<any>;
        postSignUp: (signUpdata: SignUpData) => ng.IPromise<any>;
        logout: ()=>void;
        reloadAuthInfo:()=>AuthInfo;
    }

    export interface ICategoryService {
        loadCategories: () => ng.IPromise<any>;
    }
}
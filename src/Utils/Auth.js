export const Auth = {
    loggedIn(){
        return window.sessionStorage.token != null;
    },
    getToken(){
        return window.sessionStorage.token;
    }
}

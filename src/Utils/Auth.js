export const Auth = {
    loggedIn(){
        return window.sessionStorage.token != null && window.sessionStorage.exp > Date.now()/1000;
    },
    getToken(){
        return window.sessionStorage.token;
    },
    getName(){
        return window.sessionStorage.name;
    }
}

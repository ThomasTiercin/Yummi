export function authHeader() {
    // return authorization header with basic auth credentials
    let username = JSON.parse(localStorage.getItem('username'));
    let token = JSON.parse(localStorage.getItem('token'));

    if (username && token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}
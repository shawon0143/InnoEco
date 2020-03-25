import axios from 'axios';

let baseUrl = 'https://innoeco-backend.herokuapp.com';

export function getApiUrl() {
    let urlParts =  window.location.href.split('/'),  // ["https://www.google.com/", "/order"]
        host = urlParts[0] + '//' + urlParts[2];

    if (urlParts[2].substring(0,9) === 'localhost') {
        return host;
    } else {
        // @ts-ignore
        return baseUrl;
    }
}

export default getApiUrl();

let commands: any = {};

// user authentication
commands['signup'] = { url: `/user/signup`, method: 'POST', responseType: 'json' };
commands['login'] = { url: `/user/login`, method: 'POST', responseType: 'json' };
commands['deleteUser'] = { url: `/user/:userId`, method: 'DELETE', responseType: 'json' };
commands['verifyAccount'] = { url: `/user/verifyAccount/:token`, method: 'GET', responseType: 'json' };
commands['resendToken'] = { url: `/user/resendToken`, method: 'POST', responseType: 'json' };



export const callApi = (command: any, data: any, pathPara: any, cb: any) => {
    let callback = cb,
        url = getApiUrl() + commands[command].url;

    if (typeof data === 'function') {
        callback = data;
    } else if (typeof pathPara === 'function') {
        callback = pathPara;
    } else {
        for (let field in pathPara) {
            url = getApiUrl() + commands[command].url.replace(':' + field, pathPara[field]);
        }
    }

    if (typeof commands[command] === 'undefined') {
        console.log(`command: ${command} not exists`);
        return callback('command not exists', null);
    }

    // TODO: handle user access control
    // if (typeof commands[command].userLevel !== 'undefined' && sessionInfo().userLevel < commands[command].userLevel) {
    //     console.warn(`user needs userLevel: ${commands[command].userLevel} has ${sessionInfo().userLevel}`);
    //     // alert('No access !');
    //     return callback('noAccess', null, null);
    // }

    if ((commands[command].method === 'GET' || commands[command].method === 'DELETE') && data) {
        url += '?';
        for (let field in data) {
            if (data.hasOwnProperty(field)) {
                url += `${field}=${data[field]}&`;
            }
        }
        url = url.substring(0, url.length - 1);
        data = null;
    }

    const header = (localStorage.getItem('token')) ? { 'token': localStorage.getItem('token') } : null,
        para: any = {
            url: url,
            method: commands[command].method,
            data: data,
            responseType: (commands[command].responseType) ? commands[command].responseType : 'json',
            validateStatus: null
        };

    if (header) {
        para['headers'] = header;
    }
    // console.log(para);
    axios(para)
        .then(res => {
            // console.log(res);
            if (res.status === 200) {
                callback(null, res.data, res.status);
            } else if (res.status === 400) {
                callback(res.data, null, res.status);
            } else if (res.status === 403) {
                console.log('not authorised');
                // window.location.href = '#/logout';
                // authLogout();
            } else if (res.status === 406) {
                callback(res.data, null, res.status);
            } else if (res.status === 404) {
                callback('route not exists', null, res.status);
            } else {
                callback(null, res.data, res.status);
            }
        })
        .catch(error => {
            return callback(error, null, null);
        })


};

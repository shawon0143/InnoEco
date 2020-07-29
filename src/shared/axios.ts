import axios from 'axios';
import {authLogout} from "../store/actions";

let baseUrl = 'https://innoeco-backend.herokuapp.com';

export function getApiUrl() {
    let urlParts =  window.location.href.split('/');  // ["https://www.google.com/", "/order"]

    if (urlParts[2].substring(0,9) === 'localhost') {
        return 'http://localhost:5000'
    } else {
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
commands['forgotPassword'] = { url: `/user/forgotPassword`, method: 'POST', responseType: 'json'};
commands['resetPassword'] = { url: `/user/resetPassword/:token`, method: 'POST', responseType: 'json' };
commands['getUserDetails'] = { url: `/user/getUserDetails/:email`, method: 'GET', responseType: 'json'};
commands['getUserByIdList'] = { url: `/user/getUserByIdList`, method: 'POST', responseType: 'json'};
commands['updateUser'] = { url: `/user/:email`, method: 'PATCH', responseType: 'json'};
// file related commands
commands['deleteFile'] = { url: `/upload/s3_delete_object/:fileName`, method: 'DELETE', responseType: 'json' };
// knowledge
commands['createKnowledge'] = { url: `/knowledge`, method: 'POST', responseType: 'json' };
commands['updateKnowledge'] = { url: `/knowledge/:knowledgeId`, method: 'PATCH', responseType: 'json' };
commands['getKnowledge'] = { url: `/knowledge`, method: 'GET', responseType: 'json' };
commands['getKnowledgeById'] = { url: `/knowledge/:knowledgeId`, method: 'GET', responseType: 'json' };
commands['deleteKnowledge'] = { url: `/knowledge/:knowledgeId`, method: 'DELETE', responseType: 'json' };
commands['addComment'] = { url: `/knowledge/comment/:knowledgeId`, method: 'POST', responseType: 'json' };
commands['addLike'] = { url: `/knowledge/like/:knowledgeId`, method: 'POST', responseType: 'json' };
// events
commands['addEvent'] = { url: `/event/createEvent`, method: 'POST', responseType: 'json' };
commands['registerEvent'] = { url: `/event/register/:eventId`, method: 'POST', responseType: 'json' };
commands['getEventById'] = { url: `/event/:eventId`, method: 'GET', responseType: 'json' };
commands['getAllEvents'] = { url: `/event`, method: 'GET', responseType: 'json' };



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

    const header = (localStorage.getItem('token')) ? { 'authorization': 'Bearer ' +localStorage.getItem('token') } : null,
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
            } else if (res.status === 401) {
                console.log('not authorised');
                window.location.href = '/';
                authLogout();
                callback(res.data, null, res.status);
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

export const uploadFile = (file: any, fileName: any, fileType: any, cb: any) => {
    let callback = cb;
    console.log("Preparing the upload");
    axios.post(getApiUrl() +"/upload/sign_s3",{
        fileName : fileName,
        fileType : fileType
    }, {
        headers: {
            'authorization': 'Bearer ' +localStorage.getItem('token')
        }
    })
        .then(response => {
            let returnData = response.data.data.returnData;
            let signedRequest = returnData.signedRequest;
            let url = returnData.url;
            console.log("Received a signed request " + signedRequest);

            // Put the fileType in the headers for the upload
            let options = {
                headers: {
                    'Content-Type': fileType
                }
            };
            axios.put(signedRequest,file,options)
                .then(result => {
                    console.log("Response from s3");
                    callback(null, url);
                })
                .catch(error => {
                    // alert("ERROR " + JSON.stringify(error));
                    callback(error, null);
                })
        })
        .catch(error => {
            // alert(JSON.stringify(error));
            callback(error, null);
        })
};

export const sessionInfo = () => {
    return {
        token: localStorage.getItem('token'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        role: localStorage.getItem('role'),
        email: localStorage.getItem('email'),
        id: localStorage.getItem('id')
    };
};

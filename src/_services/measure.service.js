import config from 'config';
import { authHeader } from '../_helpers';

export const measureService = {
    getAll,
    deleteMeasure
};



function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Measures`, requestOptions).then(handleResponse);
}

function deleteMeasure(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Measures/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            console.log(text)
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
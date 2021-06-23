import config from 'config';
import { authHeader, postAuthHeader } from '../_helpers';

export const measureService = {
    getAll,
    deleteMeasure,
    getMeasureById,
    updateMeasure,
    createMeasure
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Measures`, requestOptions).then(handleResponse);
}

function getMeasureById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Measures/${id}`, requestOptions).then(handleResponse);
}

function deleteMeasure(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Measures/${id}`, requestOptions).then(handleResponse);
}

function updateMeasure(id, measure) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(measure)
    };
    return fetch(`${config.apiUrl}/api/Measures/${id}`, requestOptions).then(handleResponse);
}

function createMeasure(measure) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(measure)
    };
    return fetch(`${config.apiUrl}/api/Measures`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
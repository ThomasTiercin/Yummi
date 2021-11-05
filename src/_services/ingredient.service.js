import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const ingredientService = {
    getAll,
    deleteIngredient,
    getIngredientById,
    updateIngredient,
    createIngredient
};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('username');    
    localStorage.removeItem('role');    
    localStorage.removeItem('id');    
    localStorage.removeItem('token');    
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/ingredients`, requestOptions).then(handleResponse);
}


function getIngredientById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Ingredients/${id}`, requestOptions).then(handleResponse);
}

function deleteIngredient(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Ingredients/${id}`, requestOptions).then(handleResponse);
}

function updateIngredient(id, ingredient) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(ingredient)
    };
    return fetch(`${config.apiUrl}/api/Ingredients/${id}`, requestOptions).then(handleResponse);
}

function createIngredient(ingredient) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(ingredient)
    };
    return fetch(`${config.apiUrl}/api/Ingredients`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                return Promise.reject(error);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
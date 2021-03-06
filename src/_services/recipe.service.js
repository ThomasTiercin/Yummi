import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const recipeService = {
    getAll,
    deleteRecipe,
    getRecipeById,
    updateRecipe,
    createRecipe
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
    return fetch(`${config.apiUrl}/api/recipes`, requestOptions).then(handleResponse);
}

function getRecipeById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Recipes/${id}`, requestOptions).then(handleResponse);
}

function deleteRecipe(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Recipes/${id}`, requestOptions).then(handleResponse);
}

function updateRecipe(id, recipe) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipe)
    };
    return fetch(`${config.apiUrl}/api/Recipes/${id}`, requestOptions).then(handleResponse);
}

function createRecipe(recipe) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipe)
    };
    return fetch(`${config.apiUrl}/api/Recipes`, requestOptions).then(handleResponse);
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
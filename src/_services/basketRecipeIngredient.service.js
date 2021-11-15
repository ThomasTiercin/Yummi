import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const basketRecipeIngredientService = {
    getAll,
    deleteBasketRecipeIngredient,
    getBasketRecipeIngredientById,
    updateBasketRecipeIngredient,
    createBasketRecipeIngredient,
    getBasketRecipeIngredientByUser,
    GetBasketRecipeIngredientGroupBy,
    updateBasketByIngredientMeasure
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
    return fetch(`${config.apiUrl}/api/basketRecipeIngredient`, requestOptions).then(handleResponse);
}

function getBasketRecipeIngredientById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/basketRecipeIngredient/${id}`, requestOptions).then(handleResponse);
}

function deleteBasketRecipeIngredient(id, visible) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/basketRecipeIngredient/${id}/${visible}`, requestOptions).then(handleResponse);
}

function getBasketRecipeIngredientByUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/User/${id}/basketRecipeIngredient`, requestOptions).then(handleResponse);
}

function GetBasketRecipeIngredientGroupBy(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/User/${id}/BasketRecipeIngredientGroupBy`, requestOptions).then(handleResponse);
}

function updateBasketRecipeIngredient(id, basketRecipeIngredient) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(basketRecipeIngredient)
    };
    return fetch(`${config.apiUrl}/api/basketRecipeIngredient/${id}`, requestOptions).then(handleResponse);
}

function updateBasketByIngredientMeasure(ingredientId, measureId, userId) {
    const requestOptions = {
        method: 'GET',
        headers:   authHeader()
    };
    return fetch(`${config.apiUrl}/api/BasketRecipeIngredient/ingredient/${ingredientId}/measure/${measureId}/user/${userId}`, requestOptions).then(handleResponse);
}

async function createBasketRecipeIngredient(basketRecipeIngredient) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(basketRecipeIngredient)
    };
    return fetch(`${config.apiUrl}/api/BasketRecipeIngredient`, requestOptions);
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
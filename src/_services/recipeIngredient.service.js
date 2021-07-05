import config from 'config';
import { authHeader, postAuthHeader } from '../_helpers';

export const recipeIngredientService = {
    getAll,
    deleteRecipeIngredient,
    getRecipeIngredientById,
    updateRecipeIngredient,
    createRecipeIngredient,
    getRecipeIngredientByRecipe
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/RecipeIngredients`, requestOptions).then(handleResponse);
}

function getRecipeIngredientById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/RecipeIngredients/${id}`, requestOptions).then(handleResponse);
}

function getRecipeIngredientByRecipe(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Recipe/${id}/recipeIngredients`, requestOptions).then(handleResponse);
}

function deleteRecipeIngredient(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/RecipeIngredients/${id}`, requestOptions).then(handleResponse);
}

function updateRecipeIngredient(id, recipeIngredient) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipeIngredient)
    };
    return fetch(`${config.apiUrl}/api/RecipeIngredients/${id}`, requestOptions).then(handleResponse);
}

function createRecipeIngredient(recipeIngredient) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipeIngredient)
    };
    return fetch(`${config.apiUrl}/api/RecipeIngredients`, requestOptions).then(handleResponse);
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
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
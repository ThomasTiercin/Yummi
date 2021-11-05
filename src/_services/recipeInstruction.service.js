import config from 'config';
import { authHeader, postAuthHeader } from '../_helpers';

export const recipeInstructionService = {
    getAll,
    deleteRecipeInstruction,
    getRecipeInstructionById,
    updateRecipeInstruction,
    createRecipeInstruction,
    getRecipeInstructionByRecipe
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/recipeInstruction`, requestOptions).then(handleResponse);
}

function getRecipeInstructionById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/recipeInstruction/${id}`, requestOptions).then(handleResponse);
}

function deleteRecipeInstruction(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/recipeInstruction/${id}`, requestOptions).then(handleResponse);
}

function getRecipeInstructionByRecipe(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/Recipe/${id}/recipeInstruction`, requestOptions).then(handleResponse);
}
function updateRecipeInstruction(id, recipeInstruction) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipeInstruction)
    };
    return fetch(`${config.apiUrl}/api/recipeInstruction/${id}`, requestOptions).then(handleResponse);
}

function createRecipeInstruction(recipeInstruction) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(recipeInstruction)
    };
    return fetch(`${config.apiUrl}/api/RecipeInstruction`, requestOptions).then(handleResponse);
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
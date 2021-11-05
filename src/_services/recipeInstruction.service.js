import config from '../config.json';
import { authHeader, postAuthHeader } from '../_helpers';

export const recipeInstructionService = {
    getAll,
    deleteRecipeInstruction,
    getRecipeInstructionById,
    updateRecipeInstruction,
    createRecipeInstruction,
    getRecipeInstructionByRecipe
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
                return Promise.reject(error);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
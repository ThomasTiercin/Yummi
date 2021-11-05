import config from 'config';
import { authHeader, postAuthHeader } from '../_helpers';
import { recipeIngredientService, basketRecipeIngredientService } from '../_services';
export const basketService = {
    getAll,
    deleteBasket,
    getBasketById,
    updateBasket,
    createBasket,
    getBasketByUser
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/basket`, requestOptions).then(handleResponse);
}

function getBasketById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/basket/${id}`, requestOptions).then(handleResponse);
}

function deleteBasket(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/basket/${id}`, requestOptions).then(handleResponse);
}

function getBasketByUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/api/User/${id}/basket`, requestOptions).then(handleResponse);
}
function updateBasket(id, basket) {
    const requestOptions = {
        method: 'PUT',
        headers:   postAuthHeader(),
        body: JSON.stringify(basket)
    };
    return fetch(`${config.apiUrl}/api/basket/${id}`, requestOptions).then(handleResponse);
}

async function createBasket(basket) {
    const requestOptions = {
        method: 'POST',
        headers:   postAuthHeader(),
        body: JSON.stringify(basket)
    };
    await fetch(`${config.apiUrl}/api/Basket`, requestOptions).then(handleResponse)
    .then(async(recipeCreated)=>{
        await recipeIngredientService.getRecipeIngredientByRecipe(basket.recipeId)
        .then(async recipeIngredients=>{
            let recipeIngredientsArray = new Array
            let basketId = recipeCreated.id
            let userId = recipeCreated.userId
            await recipeIngredients.map(async recipeIngredient => {
                let recipeIngredientId = recipeIngredient.id
                let visible = 1
                recipeIngredientsArray.push({visible, basketId, recipeIngredientId, userId})
            })
            await basketRecipeIngredientService.createBasketRecipeIngredient(recipeIngredientsArray)
        })
    })
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
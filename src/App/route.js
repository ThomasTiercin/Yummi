import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginRoute, AdminRoute } from '../_components';
import { SignupPage, HomePage, LoginPage, Logout, MeasurePage, MeasureEdit, MeasureCreate, RecipePage, RecipeEdit, RecipeCreate, IngredientPage, IngredientEdit, IngredientCreate, RecipeIngredientPage,
     RecipeIngredientEdit, RecipeIngredientCreate, RecipeInstructionPage, RecipeInstructionEdit, RecipeInstructionCreate, RecipeView, UserPage, UserCreate, UserEdit, BasketPage, BasketDelete} from '../App';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/signup" component={SignupPage} />
                                <LoginRoute exact path="/logout" component={Logout} />
                                <AdminRoute exact path="/measures" component={MeasurePage} />
                                <AdminRoute exact path="/editMeasure/:id" component={MeasureEdit} />
                                <AdminRoute exact path="/createMeasure" component={MeasureCreate} />
                                <AdminRoute exact path="/recipes" component={RecipePage} />
                                <LoginRoute exact path="/viewRecipe/:id" component={RecipeView} />
                                <AdminRoute exact path="/editRecipe/:id" component={RecipeEdit} />
                                <AdminRoute exact path="/createRecipe" component={RecipeCreate} />
                                <AdminRoute exact path="/ingredients" component={IngredientPage} />
                                <AdminRoute exact path="/editIngredient/:id" component={IngredientEdit} />
                                <AdminRoute exact path="/createIngredient" component={IngredientCreate} />
                                <AdminRoute exact path="/recipeIngredients" component={RecipeIngredientPage} />
                                <AdminRoute exact path="/editRecipeIngredient/:id" component={RecipeIngredientEdit} />
                                <AdminRoute exact path="/createRecipeIngredient" component={RecipeIngredientCreate} />
                                <AdminRoute exact path="/recipeInstructions" component={RecipeInstructionPage} />
                                <AdminRoute exact path="/editRecipeInstruction/:id" component={RecipeInstructionEdit} />
                                <AdminRoute exact path="/createRecipeInstruction" component={RecipeInstructionCreate} />
                                <AdminRoute exact path="/users" component={UserPage} />
                                <AdminRoute exact path="/editUser/:id" component={UserEdit} />
                                <AdminRoute exact path="/createUser" component={UserCreate} />
                                <LoginRoute exact path="/baskets" component={BasketPage} />
                                <LoginRoute exact path="/deleteBasket/:id" component={BasketDelete} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export default App; 
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginRoute, AdminRoute } from '../_components';
import { SignupPage, HomePage, LoginPage, Logout, MeasurePage, MeasureDelete, MeasureEdit, MeasureCreate, RecipePage, RecipeDelete, RecipeEdit, RecipeCreate, IngredientPage,
     IngredientDelete, IngredientEdit, IngredientCreate, RecipeIngredientPage, RecipeIngredientDelete, RecipeIngredientEdit, RecipeIngredientCreate, 
     RecipeInstructionPage, RecipeInstructionDelete, RecipeInstructionEdit, RecipeInstructionCreate, RecipeView } from './';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signup" component={SignupPage} />
                                <LoginRoute path="/logout" component={Logout} />
                                <AdminRoute path="/measures" component={MeasurePage} />
                                <AdminRoute path="/deleteMeasure/:id" component={MeasureDelete} />
                                <AdminRoute path="/editMeasure/:id" component={MeasureEdit} />
                                <AdminRoute path="/createMeasure" component={MeasureCreate} />
                                <AdminRoute path="/recipes" component={RecipePage} />
                                <AdminRoute path="/deleteRecipe/:id" component={RecipeDelete} />
                                <LoginRoute path="/viewRecipe/:id" component={RecipeView} />
                                <AdminRoute path="/editRecipe/:id" component={RecipeEdit} />
                                <AdminRoute path="/createRecipe" component={RecipeCreate} />
                                <AdminRoute path="/ingredients" component={IngredientPage} />
                                <AdminRoute path="/deleteIngredient/:id" component={IngredientDelete} />
                                <AdminRoute path="/editIngredient/:id" component={IngredientEdit} />
                                <AdminRoute path="/createIngredient" component={IngredientCreate} />
                                <AdminRoute path="/recipeIngredients" component={RecipeIngredientPage} />
                                <AdminRoute path="/deleteRecipeIngredient/:id" component={RecipeIngredientDelete} />
                                <AdminRoute path="/editRecipeIngredient/:id" component={RecipeIngredientEdit} />
                                <AdminRoute path="/createRecipeIngredient" component={RecipeIngredientCreate} />
                                <AdminRoute path="/recipeInstructions" component={RecipeInstructionPage} />
                                <AdminRoute path="/deleteRecipeInstruction/:id" component={RecipeInstructionDelete} />
                                <AdminRoute path="/editRecipeInstruction/:id" component={RecipeInstructionEdit} />
                                <AdminRoute path="/createRecipeInstruction" component={RecipeInstructionCreate} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export { App }; 
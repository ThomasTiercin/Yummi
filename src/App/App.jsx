import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage, LoginPage, Logout, MeasurePage, MeasureDelete, MeasureEdit, MeasureCreate, RecipePage, RecipeDelete, RecipeEdit, RecipeCreate, IngredientPage,
     IngredientDelete, IngredientEdit, IngredientCreate, RecipeIngredientPage, RecipeIngredientDelete, RecipeIngredientEdit, RecipeIngredientCreate } from './';

class App extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <PrivateRoute path="/logout" component={Logout} />
                                <PrivateRoute path="/measures" component={MeasurePage} />
                                <PrivateRoute path="/deleteMeasure/:id" component={MeasureDelete} />
                                <PrivateRoute path="/editMeasure/:id" component={MeasureEdit} />
                                <PrivateRoute path="/createMeasure" component={MeasureCreate} />
                                <PrivateRoute path="/recipes" component={RecipePage} />
                                <PrivateRoute path="/deleteRecipe/:id" component={RecipeDelete} />
                                <PrivateRoute path="/editRecipe/:id" component={RecipeEdit} />
                                <PrivateRoute path="/createRecipe" component={RecipeCreate} />
                                <PrivateRoute path="/ingredients" component={IngredientPage} />
                                <PrivateRoute path="/deleteIngredient/:id" component={IngredientDelete} />
                                <PrivateRoute path="/editIngredient/:id" component={IngredientEdit} />
                                <PrivateRoute path="/createIngredient" component={IngredientCreate} />
                                <PrivateRoute path="/recipeIngredients" component={RecipeIngredientPage} />
                                <PrivateRoute path="/deleteRecipeIngredient/:id" component={RecipeIngredientDelete} />
                                <PrivateRoute path="/editRecipeIngredient/:id" component={RecipeIngredientEdit} />
                                <PrivateRoute path="/createRecipeIngredient" component={RecipeIngredientCreate} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export { App }; 
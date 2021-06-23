import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage, LoginPage, Logout, MeasurePage, MeasureDelete, MeasureEdit, MeasureCreate, RecipePage, IngredientPage, RecipeIngredientPage } from './';

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
                                <PrivateRoute path="/ingredients" component={IngredientPage} />
                                <PrivateRoute path="/recipeIngredients" component={RecipeIngredientPage} />
                            </div>
                        </Router>
                </div>
            </div>
        );
    }
}

export { App }; 
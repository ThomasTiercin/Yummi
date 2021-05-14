import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage, LoginPage, MeasurePage, RecipePage, IngredientPage, RecipeIngredientPage } from './';

class App extends React.Component {
    render() {
        return (
            
            <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <PrivateRoute path="/logout" component={LoginPage} />
                                <PrivateRoute path="/measures" component={MeasurePage} />
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
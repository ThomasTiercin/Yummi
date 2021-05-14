import React from 'react';

import { recipeIngredientService } from '../_services';

class RecipeIngredientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: "",
            recipeIngredients: []
        };
    }

    componentDidMount(e) {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            username: JSON.parse(localStorage.getItem('username'))
        });
        recipeIngredientService.getAll().then(recipeIngredients => this.setState({ recipeIngredients }));
    }

    render() {
        const { user, recipeIngredients, username } = this.state;
        return (
            
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Recipe Ingredient</h1>
                <ul>
                    {recipeIngredients.map((recipeIngredient, index) =>
                        <li key={recipeIngredient.id}>
                            {recipeIngredient.amount}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export { RecipeIngredientPage }; 
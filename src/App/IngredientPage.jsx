import React from 'react';

import { ingredientService } from '../_services';

class IngredientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: "",
            ingredients: []
        };
    }

    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username'))
        });
        ingredientService.getAll().then(ingredients => this.setState({ ingredients }));
    }

    render() {
        const { ingredients, username } = this.state;
        return (
            
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Ingredient</h1>
                <ul>
                    {ingredients.map((ingredient, index) =>
                        <li key={ingredient.id}>
                            {ingredient.name}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export { IngredientPage }; 
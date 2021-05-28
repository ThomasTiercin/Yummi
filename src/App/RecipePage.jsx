import React from 'react';

import { recipeService } from '../_services';

class RecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: "",
            recipes: []
        };
    }

    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username'))
        });
        recipeService.getAll().then(recipes => this.setState({ recipes }));
    }

    render() {
        const { recipes, username } = this.state;
        return (
            
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Recipes</h1>
                <ul>
                    {recipes.map((recipe, index) =>
                        <li key={recipe.id}>
                            {recipe.name}<br/>
                            {recipe.description}<br/>
                            {recipe.createdDate}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export { RecipePage }; 
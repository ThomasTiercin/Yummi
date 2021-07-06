import React from 'react';
import { recipeIngredientService, recipeService, ingredientService, measureService} from '../../_services';

class RecipeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipeIngredients: [],
            recipe: {}
        };
    }

    componentDidMount() {
        recipeIngredientService.getRecipeIngredientByRecipe(this.props.match.params.id).then(recipeIngredients => this.setState({ recipeIngredients })) 
        recipeService.getRecipeById(this.props.match.params.id).then(recipe => this.setState({ recipe }));
    }

    render() {
        const { id, recipe, recipeIngredients } = this.state;
        return (
            <div className="col-md-12">                
                <div className="row g-5">
                    <div className="col-md-8">
                        <div className="blog-post">
                            <h2 className="blog-post-title">{recipe.name}</h2>
                            <p className="blog-post-meta">{recipe.createdDate}</p>
                            <p>{recipe.description}</p>
                            <hr/>
                            <h3>Instructions</h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="position-sticky">
                            <div className="p-4 mb-3 bg-light rounded">
                                <h4 className="fst-italic">Ingredients</h4>
                                <dl className=" mb-0">
                                    {recipeIngredients.map((recipeIngredient, index) =>
                                        <li key={index}>{recipeIngredient.amount} {recipeIngredient.measure.name} {recipeIngredient.ingredient.name}</li>
                                    )} 
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { RecipeView }; 
import React from 'react';
import { recipeIngredientService, recipeService, ingredientService, measureService} from '../../_services';

class RecipeIngredientCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipeIngredient: {amount:'',recipeId:'',ingredientId:'',measureId:''},
            recipes: [],
            measures: [],
            ingredients: [],
            error: {}
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount(e) {
        recipeService.getAll().then(recipes => this.setState({ recipes }));
        ingredientService.getAll().then(ingredients => this.setState({ ingredients }));
        measureService.getAll().then(measures => this.setState({ measures }));        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.recipeIngredient,
            recipeIngredient: { ...this.state.recipeIngredient, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { recipeIngredient } = this.state;
        this.setState({ submitted: true });
        recipeIngredientService.createRecipeIngredient(recipeIngredient)
        .then(
            a => {
                this.props.history.push("/recipeIngredients");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { recipes, ingredients, measures } = this.state;
        return (
            <div className="col-md-12">
                <h1>Add RecipeIngredient </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="recipeId">Recipe :</label>
                        <select className="form-select" name="recipeId" onChange={this.handleChange}>
                            <option selected>Select a recipe</option>
                            {recipes.map((recipe, index) =>
                                <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                            )}
                        </select>
                        <label htmlFor="ingredientId">Ingredient :</label>
                        <select className="form-select" name="ingredientId"  onChange={this.handleChange}>
                            <option selected>Select an ingredient</option>
                            {ingredients.map((ingredient, index) =>
                                <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                            )}
                        </select>
                        <label htmlFor="measureId">Measure :</label>
                        <select className="form-select" name="measureId" onChange={this.handleChange}>
                            <option selected>Select a measure</option>
                            {measures.map((measure, index) =>
                                <option key={measure.id} value={measure.id}>{measure.name}</option>
                            )}
                        </select>
                        <label htmlFor="name">Amount :</label>
                        <input type="number" className="form-control" name="amount" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { RecipeIngredientCreate }; 
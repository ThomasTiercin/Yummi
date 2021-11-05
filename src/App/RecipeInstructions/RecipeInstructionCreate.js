import React from 'react';
import { recipeInstructionService, recipeService, ingredientService, measureService} from '../../_services';

class RecipeInstructionCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipeInstruction: {value:'',recipeId:''},
            recipes: [],
            error: {}
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    componentDidMount(e) {
        recipeService.getAll().then(recipes => this.setState({ recipes }));     
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.recipeInstruction,
            recipeInstruction: { ...this.state.recipeInstruction, [name]: value },
        });
        console.log(this.state.recipeInstruction)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { recipeInstruction } = this.state;
        this.setState({ submitted: true });
        recipeInstructionService.createRecipeInstruction(recipeInstruction)
        .then(
            a => {
                this.props.history.push("/recipeInstructions");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { recipes } = this.state;
        return (
            <div className="col-md-12">
                <h1>Add RecipeInstruction </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="recipeId">Recipe :</label>
                        <select className="form-select" name="recipeId" onChange={this.handleChange}>
                            <option selected>Select a recipe</option>
                            {recipes.map((recipe, index) =>
                                <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                            )}
                        </select>
                        <label htmlFor="value">Value :</label>
                        <input type="text" className="form-control" name="value" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { RecipeInstructionCreate }; 
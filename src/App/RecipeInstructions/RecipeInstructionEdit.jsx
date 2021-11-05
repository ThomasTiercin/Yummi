import React from 'react';
import { recipeInstructionService, recipeService} from '../../_services';

class RecipeInstructionEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipeInstruction: {amount:'',recipeId:'',ingredientId:'',measureId:''},
            recipes: [],
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        recipeInstructionService.getRecipeInstructionById(this.props.match.params.id).then(recipeInstruction => this.setState({ recipeInstruction })) 
        recipeService.getAll().then(recipes => this.setState({ recipes }));  
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.recipeInstruction,
            recipeInstruction: { ...this.state.recipeInstruction, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, recipeInstruction } = this.state;
        this.setState({ submitted: true });
        recipeInstructionService.updateRecipeInstruction(id, recipeInstruction)
        .then(
            a => {
                this.props.history.push("/recipeInstructions");
            },
            error => this.setState({ error })
        )
    }

    render() {
        const { id, recipes, recipeInstruction } = this.state;
        return (
            <div className="col-md-12">
                <h1>RecipeInstruction {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="recipeId">Recipe :</label>
                        <select className="form-select" name="recipeId" onChange={this.handleChange}>
                            {recipes.map((recipe, index) =>
                                <option key={recipe.id} selected={recipeInstruction.recipeId == recipe.id} value={recipe.id}>{recipe.name}</option>
                            )}
                        </select>
                        <label htmlFor="name">Amount :</label>
                        <input type="text" className="form-control" name="value" defaultValue={recipeInstruction.value} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                
            </div>
        );
    }
}
export { RecipeInstructionEdit }; 
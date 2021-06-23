import React from 'react';
import { Link } from "react-router-dom";
import { recipeService } from '../../_services';

class RecipeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipe: {id:'',name:'',description:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        recipeService.getRecipeById(this.props.match.params.id).then(recipe => this.setState({ recipe }))        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.recipe,
            recipe: { ...this.state.recipe, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, recipe } = this.state;
        this.setState({ submitted: true });
        recipeService.updateRecipe(id, recipe)
        .then(
            a => {
                this.props.history.push("/recipes");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { id, recipe } = this.state;
        return (
            <div className="col-md-12">
                <h1>Recipe {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Recipe name :</label>
                        <input type="text" className="form-control" name="name" defaultValue={recipe.name} onChange={this.handleChange} required="required"/>
                        <input type="text" className="form-control" name="description" defaultValue={recipe.description} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                </form>
                
            </div>
        );
    }
}
export { RecipeEdit }; 
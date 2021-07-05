import React from 'react';
import { Link } from "react-router-dom";
import { recipeService } from '../../_services';

class RecipeCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipe: {name:'', description:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { recipe } = this.state;
        this.setState({ submitted: true });
        recipeService.createRecipe(recipe)
        .then(
            a => {
                this.props.history.push("/recipes");
            },
            error => this.setState({ error })
        )
    }

    render() {
        return (
            <div className="col-md-12">
                <h1>Add Recipe </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Name :</label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} required="required"/>
                        <label htmlFor="description">Description :</label>
                        <input type="text" className="form-control" name="description" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { RecipeCreate }; 
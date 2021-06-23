import React from 'react';
import { Link } from "react-router-dom";
import { ingredientService } from '../../_services';

class IngredientEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            ingredient: {id:'',name:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ingredientService.getIngredientById(this.props.match.params.id).then(ingredient => this.setState({ ingredient }))        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.ingredient,
            ingredient: { ...this.state.ingredient, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, ingredient } = this.state;
        this.setState({ submitted: true });
        ingredientService.updateIngredient(id, ingredient)
        .then(
            a => {
                this.props.history.push("/ingredients");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { id, ingredient } = this.state;
        return (
            <div className="col-md-12">
                <h1>Ingredient {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Ingredient name :</label>
                        <input type="text" className="form-control" name="name" defaultValue={ingredient.name} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                </form>
                
            </div>
        );
    }
}
export { IngredientEdit }; 
import React from 'react';
import { Link } from "react-router-dom";
import { recipeIngredientService } from '../../_services';
class RecipeIngredientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            recipeIngredients: []
        };
    }

    componentDidMount(e) {
        recipeIngredientService.getAll().then(recipeIngredients => this.setState({ recipeIngredients }));
    }

    render() {
        const { recipeIngredients } = this.state;
        let { i } = this.state;
        const content = recipeIngredients.map((recipeIngredient, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{recipeIngredient.recipe.name}</td>
                <td>{recipeIngredient.amount}</td>
                <td>{recipeIngredient.measure.name}</td>  
                <td>{recipeIngredient.ingredient.name}</td>                              
                <td><Link to={'/editRecipeIngredient/'+recipeIngredient.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteRecipeIngredient/'+recipeIngredient.id} style={{color: "#212529"}}><i className="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of RecipeIngredients</h1>
                <div><Link to={'/createRecipeIngredient'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">recipe</th>
                                <th scope="col">Amount</th>
                                <th scope="col">measure</th>                                
                                <th scope="col">ingredient</th>                                
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                    <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                </div>
            </div>
            
        );
    }
}
export { RecipeIngredientPage }; 
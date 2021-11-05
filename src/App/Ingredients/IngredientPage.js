import React from 'react';
import { Link } from "react-router-dom";
import { ingredientService } from '../../_services';
class IngredientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            ingredients: []
        };
    }

    componentDidMount(e) {
        ingredientService.getAll().then(ingredients => this.setState({ ingredients }));
    }

    render() {
        const { ingredients } = this.state;
        let { i } = this.state;
        const content = ingredients.map((ingredient, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{ingredient.name}</td>
                <td><Link to={'/editIngredient/'+ingredient.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteIngredient/'+ingredient.id} style={{color: "#212529"}}><i className="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of Ingredients</h1>
                <div><Link to={'/createIngredient'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
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
export { IngredientPage }; 
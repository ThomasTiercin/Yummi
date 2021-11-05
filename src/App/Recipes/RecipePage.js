import React from 'react';
import { Link } from "react-router-dom";
import { recipeService } from '../../_services';
class RecipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            recipes: []
        };
    }

    componentDidMount(e) {
        recipeService.getAll().then(recipes => this.setState({ recipes }));
    }

    render() {
        const { recipes } = this.state;
        let { i } = this.state;
        const content = recipes.map((recipe, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{recipe.name}</td>
                <td>{recipe.description}</td>
                <td>{new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }).format(new Date(recipe.createdDate))}</td>
                <td><Link to={'/editRecipe/'+recipe.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteRecipe/'+recipe.id} style={{color: "#212529"}}><i className="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of Recipes</h1>
                <div><Link to={'/createRecipe'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Created date</th>
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
export { RecipePage }; 
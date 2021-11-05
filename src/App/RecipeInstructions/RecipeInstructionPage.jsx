import React from 'react';
import { Link } from "react-router-dom";
import { recipeInstructionService } from '../../_services';
class RecipeInstructionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            recipeInstructions: []
        };
    }

    componentDidMount(e) {
        recipeInstructionService.getAll().then(recipeInstructions => this.setState({ recipeInstructions }));
    }

    render() {
        const { recipeInstructions } = this.state;
        let { i } = this.state;
        const content = recipeInstructions.map((recipeInstruction, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{recipeInstruction.value}</td>
                <td>{recipeInstruction.recipe.name}</td>            
                <td><Link to={'/editRecipeInstruction/'+recipeInstruction.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteRecipeInstruction/'+recipeInstruction.id} style={{color: "#212529"}}><i className="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of RecipeInstructions</h1>
                <div><Link to={'/createRecipeInstruction'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">value</th>
                                <th scope="col">recipe</th>
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
export { RecipeInstructionPage }; 
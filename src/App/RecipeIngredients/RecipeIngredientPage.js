import React from 'react';
import { Link } from "react-router-dom";
import { recipeIngredientService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'
class RecipeIngredientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            remove:false,
            message:"",
            succed:false,
            recipeIngredients: []
        };
    }

    componentDidMount(e) {
        recipeIngredientService.getAll().then(recipeIngredients => this.setState({ recipeIngredients }));
    }

    removeLine(id) {
        recipeIngredientService.deleteRecipeIngredient(id)
        .then(()=>{            
            recipeIngredientService.getAll().then(recipeIngredients => this.setState({ recipeIngredients }));
            this.setState({ remove: true, message:"Suppression terminée", succed:true});         
        })
        .catch(e=>{
            this.setState({ remove: true, message:e, succed:false});
        })
    }

    render() {
        const { recipeIngredients, remove, message, succed} = this.state;
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
                <td><a type="button" onClick={()=>{this.removeLine(recipeIngredient.id)}} style={{color: "#212529"}}><i className="fas fa-trash"></i></a></td>
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
                <ToastContainer className="p-3" position='bottom-end' >
                <Toast onClose={() => this.setState({ remove: false })} delay={4000} show={remove} autohide animation bg={succed ? 'success' : "danger"}>
                    <ToastHeader>
                    <strong className="me-auto">Suppression {succed ? 'en succès' : "en échec"}</strong>          
                    <small>now</small>
                    </ToastHeader>
                    <ToastBody className={succed ? '' : "text-white"}>{message}</ToastBody>
                </Toast>
                </ToastContainer>
            </div>
            
        );
    }
}
export { RecipeIngredientPage }; 
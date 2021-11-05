import React from 'react';
import { recipeService, basketService } from '../_services';
import { Link } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            recipes: [],
            role: "",
            add:false,
            recipeAdd:""
        };
        this.addBasket = this.addBasket.bind(this);
        
    }

    componentDidMount() {
        recipeService.getAll().then(recipes => this.setState({ recipes }));
        this.state.role = atob(localStorage.getItem('role'))
    }

    addBasket(recipeId) {
        let userId = localStorage.getItem('id')
        basketService.createBasket({recipeId, userId})
        .then(()=>{
            this.setState({ add: true, recipeAdd:recipeId });
        })
    }

    render() {
        let { recipes, role, add, recipeAdd } = this.state;
        
        return (
            <div className="album py-5">
                <h4 className="display-4 text-center">Welcome on Yummi &#128523;</h4>
                <div className="container">
                    <br/>
                    <h4 className="display-6">All recipes</h4>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {recipes.map((recipe, index) =>
                            <div className="col" key={index}>
                                <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                    {recipe.image &&
                                        <img className="bd-placeholder-img card-img-top" style={{width: '100%',height: '225px',objectFit: 'cover',objectPosition: 'center', borderRadius:'1rem'}} src={recipe.image} role="img" aria-label={recipe.name} preserveAspectRatio="xMidYMid slice" ></img>
                                    }
                                    {!recipe.image &&
                                        <img className="bd-placeholder-img card-img-top" style={{width: '100%',height: '225px',objectFit: 'cover',objectPosition: 'center', borderRadius:'1rem'}} src="https://www.megandcook.fr/wp-content/uploads/2019/02/meganearderighi-megandcook-5-5.jpg" role="img" aria-label={recipe.name} preserveAspectRatio="xMidYMid slice" ></img>
                                    }
                                    <div className="card-body">
                                        <p className="card-text" style={{fontWeight: "bold"}}>{recipe.name}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary"><Link to={'/viewRecipe/'+recipe.id} style={{textDecoration: 'auto', color: 'dimgray'}}>View</Link></button>
                                                {role=='admin'&&
                                                    <button type="button" className="btn btn-sm btn-outline-secondary"><Link to={'/editRecipe/'+recipe.id} style={{textDecoration: 'auto', color: 'dimgray'}}>Edit</Link></button>
                                                }
                                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>{this.addBasket(recipe.id)}}>Add</button>
                                            </div>
                                            <small className="text-muted">{new Intl.DateTimeFormat("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "2-digit"
                                            }).format(new Date(recipe.createdDate))}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <ToastContainer className="p-3" position='bottom-end'>
                <Toast onClose={() => this.setState({ add: false })} delay={4000} show={add} autohide animation >
                    <ToastHeader>
                    {recipes.map((recipe, index) =>
                        recipeAdd==recipe.id &&
                        <strong className="me-auto" key={index}>{recipe.name}</strong>                    
                    )}
                    <small>now</small>
                    </ToastHeader>
                    <ToastBody>You add the recipe on your basket with sucess</ToastBody>
                </Toast>
                </ToastContainer>
            </div>
        );
    }
}

export { HomePage };
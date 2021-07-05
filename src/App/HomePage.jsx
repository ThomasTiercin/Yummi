import React from 'react';
import { recipeService } from '../_services';
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            recipes: []
        };
    }

    componentDidMount() {
        recipeService.getAll().then(recipes => this.setState({ recipes }));
    }

    render() {
        const { recipes } = this.state;
        return (
            <div className="album py-5">
                <h4 className="display-4 text-center">Welcome on Yummi &#128523;</h4>
                <div className="container">
                    <br/>
                    <h4 className="display-4">All recipes</h4>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {recipes.map((recipe, index) =>
                            <div className="col" key={recipe.id}>
                                <div className="card shadow-sm">
                                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" src="https://media-cdn.tripadvisor.com/media/photo-s/15/03/79/e3/otto-s-anatolian-food.jpg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" ></img>

                                    <div className="card-body">
                                        <p className="card-text" style={{fontWeight: "bold"}}>{recipe.name}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary"><Link to={'/viewRecipe/'+recipe.id} style={{textDecoration: 'auto', color: 'dimgray'}}>View</Link></button>
                                                <button type="button" className="btn btn-sm btn-outline-secondary"><Link to={'/editRecipe/'+recipe.id} style={{textDecoration: 'auto', color: 'dimgray'}}>Edit</Link></button>
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
            </div>
        );
    }
}

export { HomePage };
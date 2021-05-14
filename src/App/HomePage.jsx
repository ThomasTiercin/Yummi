import React from 'react';
import { recipeService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            username: "",
            recipes: []
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            username: JSON.parse(localStorage.getItem('username')),
            users: { loading: true }
        });
        recipeService.getAll().then(recipes => this.setState({ recipes }));
    }

    render() {
        const { user, recipes, username } = this.state;
        
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
                                        <p className="card-text">{recipe.name}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
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
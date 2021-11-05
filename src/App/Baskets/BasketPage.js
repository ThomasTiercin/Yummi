import React from 'react';
import { Link } from "react-router-dom";
import { basketService, basketRecipeIngredientService } from '../../_services';
class BasketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            baskets: [],
            basketRecipeIngredients: []
        };
        this.removeLine = this.removeLine.bind(this);
    }

    componentDidMount(e) {
        basketService.getBasketByUser(localStorage.getItem('id')).then(baskets => this.setState({ baskets }));
        basketRecipeIngredientService.getBasketRecipeIngredientByUser(localStorage.getItem('id')).then(basketRecipeIngredients => this.setState({ basketRecipeIngredients }));        
    }

    removeLine(id, visible) {
        basketRecipeIngredientService.deleteBasketRecipeIngredient(id, visible)
        this.setState(recipeIngredientService=>({
            updated:{
                ...recipeIngredientService.updated,
                visible:visible
            }
        }))
    }

    render() {
        const { baskets, basketRecipeIngredients} = this.state;
        const content = baskets.map((basket, index) => 
            (
                <div key={index} className="">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapseOne"+index} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            {basket.recipe.name}
                            <Link className="flex-row-reverse" to={'/deleteBasket/'+basket.id} style={{position: "absolute", right: "4rem",color: "#212529"}}><i className="fas fa-trash"></i></Link>
                        </button>
                    </h2>
                    <div id={"panelsStayOpen-collapseOne"+index} className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <ul className=" list-group-flush px-6">
                                {basketRecipeIngredients.map((basketRecipeIngredient, index) => {
                                    if (basketRecipeIngredient.basketId==basket.id &&  basketRecipeIngredient.basket.recipeId==basket.recipe.id) {                                            
                                        return (
                                            <div key={index}>
                                                {basketRecipeIngredient.visible ==true &&                                                    
                                                    <li  id= {basketRecipeIngredient.id} >{basketRecipeIngredient.recipeIngredient.amount} {basketRecipeIngredient.recipeIngredient.measure.name} {basketRecipeIngredient.recipeIngredient.ingredient.name}
                                                        <a  style={{color: "#212529"}} onClick={()=>{this.removeLine(basketRecipeIngredient.id, false); basketRecipeIngredient.visible=false}}><i className="fas fa-shopping-cart"></i></a>
                                                    </li>
                                                } 
                                                {basketRecipeIngredient.visible ==false &&
                                                    <li id= {'invisible'+basketRecipeIngredient.id} ><del>{basketRecipeIngredient.recipeIngredient.amount} {basketRecipeIngredient.recipeIngredient.measure.name} {basketRecipeIngredient.recipeIngredient.ingredient.name}</del>
                                                        <a  style={{color: "#212529"}} onClick={()=>{this.removeLine(basketRecipeIngredient.id, true); basketRecipeIngredient.visible=true}}><i className="fas fa-check"></i></a>
                                                    </li>
                                                }
                                            </div>                                            
                                        )
                                    } 
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>Basket</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 accordion accordion-flush" id="accordionPanelsStayOpenExample">
                    {content}
                </div>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            
            </div>
            
        );
    }
}
export { BasketPage }; 
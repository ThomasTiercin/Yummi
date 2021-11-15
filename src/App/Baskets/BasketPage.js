import React from 'react';
import { Link } from "react-router-dom";
import { basketService, basketRecipeIngredientService, ingredientService, measureService } from '../../_services';
class BasketPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            userId:'',
            baskets: [],
            ingredients: [],
            measures: [],
            basketRecipeIngredients: [],
            basketRecipeIngredientGroupBy: []
        };
        this.removeLine = this.removeLine.bind(this);
        this.updateIngredient = this.updateIngredient.bind(this);
    }

    componentDidMount(e) {
        this.state.userId = localStorage.getItem('id')
        basketService.getBasketByUser(localStorage.getItem('id')).then(baskets => this.setState({ baskets }));
        basketRecipeIngredientService.getBasketRecipeIngredientByUser(localStorage.getItem('id')).then(basketRecipeIngredients => this.setState({ basketRecipeIngredients }));        
        basketRecipeIngredientService.GetBasketRecipeIngredientGroupBy(localStorage.getItem('id')).then(basketRecipeIngredientGroupBy => this.setState({ basketRecipeIngredientGroupBy })); 
        ingredientService.getAll().then(ingredients => this.setState({ ingredients }));       
        measureService.getAll().then(measures => this.setState({ measures }));       
    }

    removeLine(id, visible) {
        basketRecipeIngredientService.deleteBasketRecipeIngredient(id, visible)
        .then(()=>{            
            basketRecipeIngredientService.getBasketRecipeIngredientByUser(localStorage.getItem('id')).then(basketRecipeIngredients => this.setState({ basketRecipeIngredients }));        
            basketRecipeIngredientService.GetBasketRecipeIngredientGroupBy(localStorage.getItem('id')).then(basketRecipeIngredientGroupBy => this.setState({ basketRecipeIngredientGroupBy }));             
            }            
        )
        this.setState(recipeIngredientService=>({
            updated:{
                ...recipeIngredientService.updated,
                visible:visible
            }
        }))
    }
    updateIngredient(ingredientId, measureId, userId) {
        basketRecipeIngredientService.updateBasketByIngredientMeasure(ingredientId, measureId, userId)
        .then(()=>{            
            basketRecipeIngredientService.getBasketRecipeIngredientByUser(localStorage.getItem('id')).then(basketRecipeIngredients => this.setState({ basketRecipeIngredients }));        
            basketRecipeIngredientService.GetBasketRecipeIngredientGroupBy(localStorage.getItem('id')).then(basketRecipeIngredientGroupBy => this.setState({ basketRecipeIngredientGroupBy }));             
            }            
        )
    }

    render() {
        const { baskets, basketRecipeIngredients,basketRecipeIngredientGroupBy, ingredients, measures, userId} = this.state;
        // ingrédient par recette
        const contentByRecipe = baskets.map((basket, index) => 
            (
                <div key={index} className="col-md-4">
                    <div className="list-group" style={{paddingBottom:'1rem'}}>
                        <label className="list-group-item text-white yummi-color" >
                            {basket.recipe.name}
                            <Link className="flex-row-reverse" to={'/deleteBasket/'+basket.id} style={{position: "absolute", right: "1rem",color: "#FFFF"}}><i className="fas fa-trash"></i></Link>
                        </label>
                        {basketRecipeIngredients.map((basketRecipeIngredient, index) => {
                            if (basketRecipeIngredient.basketId==basket.id &&  basketRecipeIngredient.basket.recipeId==basket.recipe.id) {                                            
                                return (
                                    <div key={index} className="list-group-item" >
                                        {basketRecipeIngredient.visible ==true &&  
                                        <input onClick={()=>{this.removeLine(basketRecipeIngredient.id, false); basketRecipeIngredient.visible=false}} className="form-check-input me-1" type="checkbox" />
                                        }
                                        {basketRecipeIngredient.visible ==false &&
                                            <input onClick={()=>{this.removeLine(basketRecipeIngredient.id, true); basketRecipeIngredient.visible=true}}  className="form-check-input yummi-color me-1" type="checkbox" defaultChecked/>
                                        }
                                        {basketRecipeIngredient.recipeIngredient.amount} {basketRecipeIngredient.recipeIngredient.measure.name} {basketRecipeIngredient.recipeIngredient.ingredient.name}
                                    </div>                                   
                                )
                            } 
                        })}
                    </div>
                </div>
            )
        )
        const contentByIngredient = basketRecipeIngredientGroupBy.map((item, index) => {                                          
            return (
                <div key={index} className="list-group-item" >                    
                    {item.amount}
                    {measures.map((measure) => { 
                        if (measure.id==item.measureId) return ' '+measure.name
                    })} 
                    {ingredients.map((ingredient) => { 
                        if (ingredient.id==item.ingredientId) return ' '+ingredient.name
                    })} 
                    <a type="button" className="flex-row-reverse" onClick={()=>{this.updateIngredient(item.ingredientId,item.measureId,userId)}} style={{position: "absolute", right: "1rem",color: 'rgb(38, 166, 154)'}}><i className="fas fa-trash"></i></a>
                </div> 
            )
        })
        
        return (
            <div className="col-md-12 ">
                <div className="row">
                    <h1 className='col-6'>Panier</h1>
                    <div className='col-6'><button className="btn btn-warning" style={{float: 'right'}} onClick={() => this.props.history.goBack()}>Retour</button></div>
                    <div>
                        <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="ex3-tab-1" data-mdb-toggle="tab" href="#ex3-tabs-1" role="tab" aria-controls="ex3-tabs-1" aria-selected="true" >Par recette</a>
                            </li>
                            <li className="nav-item" role="presentation" >
                                <a className="nav-link" id="ex3-tab-2" data-mdb-toggle="tab" href="#ex3-tabs-2" role="tab" aria-controls="ex3-tabs-2" aria-selected="false" >Par ingrédient</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="ex2-content">
                            <div className="tab-pane fade show active" id="ex3-tabs-1" role="tabpanel" aria-labelledby="ex3-tab-1">
                                <div className="row">
                                    {contentByRecipe}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="ex3-tabs-2" role="tabpanel" aria-labelledby="ex3-tab-2">
                                <div className="list-group" style={{paddingBottom:'1rem'}}>
                                    <label className="list-group-item text-white yummi-color">Liste des ingrédients</label>
                                    {contentByIngredient}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}
export { BasketPage }; 
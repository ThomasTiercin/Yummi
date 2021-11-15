import React from 'react';
import { recipeIngredientService, recipeService, recipeInstructionService} from '../../_services';
import Moment from 'moment';

class RecipeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipeIngredients: [],
            recipeInstructions: [],
            contentEditable: false,
            role: "",
            recipe: {id:'',name:'',description:'', image:'', createdDate:''}
        };
        this.handleChangeRecipe = this.handleChangeRecipe.bind(this);
        this.handleSubmitRecipe = this.handleSubmitRecipe.bind(this);
        this.handleChangeInstruction = this.handleChangeInstruction.bind(this);
        this.handleSubmitInstruction = this.handleSubmitInstruction.bind(this);
    }

    componentDidMount() {
        recipeIngredientService.getRecipeIngredientByRecipe(this.props.match.params.id).then(recipeIngredients => this.setState({ recipeIngredients })) 
        recipeInstructionService.getRecipeInstructionByRecipe(this.props.match.params.id).then(recipeInstructions => this.setState({ recipeInstructions })) 
        recipeService.getRecipeById(this.props.match.params.id).then(recipe => this.setState({ recipe }));
        this.state.role = atob(localStorage.getItem('role'))
    }

    handleChangeRecipe(name, value) {
        this.setState({
            ...this.recipe,
            recipe: { ...this.state.recipe, [name]: value },
        });
    }

    handleSubmitRecipe() {
        const { id, recipe } = this.state;
        recipeService.updateRecipe(id, recipe)
        .then(
            a => {
                this.props.history.push('/viewRecipe/'+id);
            },
            error => this.setState({ error })
        )
    }

    handleChangeInstruction(value, index) {
        let recipeInstructions= this.state.recipeInstructions
        let recipeInstruction = this.state.recipeInstructions[index];
        recipeInstruction.value = value;
        this.state.recipeInstructions[index] = recipeInstruction;
        this.setState({recipeInstructions: recipeInstructions});
    }

    handleSubmitInstruction(index) {
        let recipeInstruction = this.state.recipeInstructions[index];
        recipeInstructionService.updateRecipeInstruction(index, recipeInstruction)
    }

    render() {
        let { recipe, recipeIngredients, recipeInstructions, role, contentEditable } = this.state;
        if (role=='admin') contentEditable = true
        Moment.locale('en');
        return (
            <div className="col-md-12">                
                <div className="row">
                    <div className="col-md-8">
                        <div className="blog-post">
                            <div className="row">
                                <div className="col-6"><h2 className="blog-post-title" contentEditable={contentEditable} suppressContentEditableWarning={true} onMouseOut={(e)=>{this.handleChangeRecipe('name', e.currentTarget.textContent)}} onTouchMove={(e)=>{this.handleChangeRecipe('name', e.currentTarget.textContent)}} onBlur={this.handleSubmitRecipe}>{recipe.name}</h2></div>
                                <div className="col-6"><p style={{float: 'right'}} className="blog-post-meta">{Moment(recipe.createdDate).format('DD/MM/YYYY')}</p></div>
                            </div>
                            <p contentEditable={contentEditable} suppressContentEditableWarning={true} onFocus={(e)=>{this.handleChangeRecipe('description', e.currentTarget.textContent)}} onBlur={this.handleSubmitRecipe}>{recipe.description}</p>
                            <hr/>
                            <h3>Instructions</h3>
                            {recipeInstructions.map((recipeInstruction, index) =>
                                <li contentEditable={contentEditable} suppressContentEditableWarning={true} onTouchMove={(e)=>{this.handleChangeInstruction(e.currentTarget.textContent,index)}} onMouseOut={(e)=>{this.handleChangeInstruction(e.currentTarget.textContent,index)}} onBlur={this.handleSubmitInstruction(index)} key={index}>{recipeInstruction.value}</li>
                            )} 
                        </div>
                    </div>

                    <div className="col-md-4">
                        <img className="bd-placeholder-img card-img-top" style={{width: '100%',height: '225px',objectFit: 'cover',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',objectPosition: 'center'}} src={recipe.image} role="img" aria-label={recipe.name} preserveAspectRatio="xMidYMid slice" ></img>
                        <div className="position-sticky">
                            <div className="p-4 mb-3 bg-light rounded" style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius:'1rem'}}>
                                <h4>Ingredients</h4>
                                <dl className=" mb-0">
                                    {recipeIngredients.map((recipeIngredient, index) =>
                                        <li key={index}>{recipeIngredient.amount} {recipeIngredient.measure.name} {recipeIngredient.ingredient.name}</li>
                                    )} 
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
            </div>
        );
    }
}
export { RecipeView }; 
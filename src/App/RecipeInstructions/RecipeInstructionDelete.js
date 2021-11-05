import React from 'react';
import { recipeInstructionService } from '../../_services';

class RecipeInstructionDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId : this.props.match.params.id
        };
        this.handleDelete = this.handleDelete.bind(this);
        
    }

    handleDelete(id) {        
        recipeInstructionService.deleteRecipeInstruction(id)
        .then(
            user => {
                this.props.history.push("/recipeInstructions");
            },
            error => this.setState({ error, loading: false })
        )
    }
    render() {
        const{currentId} = this.state;
        return (
            <div onLoad={this.handleDelete(currentId)} className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }
}
export { RecipeInstructionDelete }; 
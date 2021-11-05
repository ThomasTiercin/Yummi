import React from 'react';
import { recipeService } from '../../_services';
import firebase from '../../firebase';

class RecipeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            recipe: {id:'',name:'',description:'', image:''},
            error: {},
            image: null,
            progress:0,
            downloadURL: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    componentDidMount() {
        recipeService.getRecipeById(this.props.match.params.id).then(recipe => this.setState({ recipe }))        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.recipe,
            recipe: { ...this.state.recipe, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, recipe } = this.state;
        this.setState({ submitted: true });
        recipeService.updateRecipe(id, recipe)
        .then(
            a => {
                this.props.history.push("/recipes");
            },
            error => this.setState({ error })
        )
    }

    handleUpload(e){
        if(e.target.files[0]){
            this.setState({
                image: e.target.files[0]
            })
            let file = e.target.files[0];
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var uploadTask = storageRef.child('Yummi/recipes/' + file.name).put(file);
        
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>{
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                this.setState({progress})
            },(error) =>{
                throw error
            },() =>{
                uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
                this.setState({
                    downloadURL: url,
                    ...this.recipe,
                    recipe: { ...this.state.recipe, image: url }
                })
                })
            document.getElementById("file").value = null
            }
        ) 
        }
      }

    render() {
        let { id, recipe } = this.state;
        return (
            <div className="col-md-12">
                <h1>Recipe {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div class='row'>
                        <div className="col-md-6">
                            <img
                                className="ref"
                                src={recipe.image || "https://via.placeholder.com/400x300"}
                                alt="Uploaded Images"
                                height="300"
                                width="400"
                                />
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label htmlFor="name">Name :</label>
                                <input type="text" className="form-control" name="name" defaultValue={recipe.name} onChange={this.handleChange} required="required"/>
                                <label htmlFor="description">Description :</label>
                                <input type="text" className="form-control" name="description" defaultValue={recipe.description} onChange={this.handleChange} required="required"/>
                                <label htmlFor="image">Image :</label>
                                <input type="file" accept='image/*' id="file" onChange={this.handleUpload} className="form-control"/>
                                <div className="progress" style={{width: '100%'}}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{width: this.state.progress+'%'}} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                
            </div>
        );
    }
}
export { RecipeEdit }; 
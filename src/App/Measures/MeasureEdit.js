import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../../_services';

class MeasureEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            measure: {id:'',name:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        measureService.getMeasureById(this.props.match.params.id).then(measure => this.setState({ measure }))        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            ...this.measure,
            measure: { ...this.state.measure, [name]: value },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, measure } = this.state;
        this.setState({ submitted: true });
        measureService.updateMeasure(id, measure)
        .then(
            a => {
                this.props.history.push("/measures");
            },
            error => this.setState({ error })
        )
    }

    render() {
        let { id, measure } = this.state;
        return (
            <div className="col-md-12">
                <h1>Measure {id}</h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Measure name :</label>
                        <input type="text" className="form-control" name="name" defaultValue={measure.name} onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                    
                </form>
                <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>                
            </div>
        );
    }
}
export { MeasureEdit }; 
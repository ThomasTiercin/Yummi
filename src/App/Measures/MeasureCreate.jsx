import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../../_services';

class MeasureCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.params.id,
            measure: {name:''},
            error: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { measure } = this.state;
        this.setState({ submitted: true });
        measureService.createMeasure(measure)
        .then(
            a => {
                this.props.history.push("/measures");
            },
            error => this.setState({ error })
        )
    }

    render() {
        return (
            <div className="col-md-12">
                <h1>Add Measure </h1>
                <form  onSubmit={this.handleSubmit} encType="multipart/form-data">
                     <div className='form-group'>
                        <label htmlFor="name">Measure name :</label>
                        <input type="text" className="form-control" name="name" onChange={this.handleChange} required="required"/>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                    <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                </form>
            </div>
        );
    }
}
export { MeasureCreate }; 
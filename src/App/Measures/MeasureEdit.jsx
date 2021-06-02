import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../../_services';

class MeasureEdit extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            id : this.props.match.params.id,
            measure: []
        };
    }

    componentDidMount() {
        measureService.getMeasureById(this.props.match.params.id).then(measure => this.setState({ measure }))
    }

    render() {
        const { id } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Recipes</h1>
                <ul>
                    {/* {measure.map((measure, index) =>
                        <li key={measure.id}>
                            {measure.name}
                        </li>
                    )} */}
                    {id}
                </ul>
            </div>
            
        );
    }
}
export { MeasureEdit }; 
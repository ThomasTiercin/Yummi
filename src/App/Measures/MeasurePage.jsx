import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../../_services';
class MeasurePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            measures: []
        };
    }

    componentDidMount(e) {
        measureService.getAll().then(measures => this.setState({ measures }));
    }

    render() {
        const { measures } = this.state;
        let { i } = this.state;
        const content = measures.map((measure, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{measure.name}</td>
                <td><Link to={'/editMeasure/'+measure.id} style={{color: "#212529"}}><i class="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteMeasure/'+measure.id} style={{color: "#212529"}}><i class="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Measures</h1>
                <div className=".table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                </div>
            </div>
            
        );
    }
}
export { MeasurePage }; 
import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../_services';
class MeasurePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            user: {},
            username: "",
            measures: []
        };
    }

    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username'))
        });
        measureService.getAll().then(measures => this.setState({ measures }));
    }

    render() {
        const { measures, username } = this.state;
        let { i } = this.state;
        const content = measures.map((measure, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{measure.name}</td>
                <td><a style={{color: "#212529"}} href="/"><i class="far fa-edit"></i></a></td>
                <td><Link to={'/deleteMeasure/'+measure.id}><i class="fas fa-trash"></i></Link></td>
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
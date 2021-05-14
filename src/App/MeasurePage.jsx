import React from 'react';

import { measureService } from '../_services';

class MeasurePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: "",
            measures: []
        };
    }

    componentDidMount(e) {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            username: JSON.parse(localStorage.getItem('username'))
        });
        measureService.getAll().then(measures => this.setState({ measures }));
    }

    render() {
        const { user, measures, username } = this.state;
        return (
            
            <div className="col-md-6 col-md-offset-3 justify-content-center">
                <h1>List of Measures</h1>
                <ul>
                    {measures.map((measure, index) =>
                        <li key={measure.id}>
                            {measure.name}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export { MeasurePage }; 
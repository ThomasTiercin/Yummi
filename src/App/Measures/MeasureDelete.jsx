import React from 'react';

import { measureService } from '../../_services';

class MeasureDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId : this.props.match.params.id
        };
        this.handleDelete = this.handleDelete.bind(this);
        
    }

    handleDelete(id) {        
        measureService.deleteMeasure(id)
        .then(
            user => {
                this.props.history.push("/measures");
                this.props.history.go("/measures");
            },
            error => this.setState({ error, loading: false })
        )
    }
    render() {
        const{currentId} = this.state;
        return (
            <div onLoad={this.handleDelete(currentId)} class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        );
    }
}
export { MeasureDelete }; 
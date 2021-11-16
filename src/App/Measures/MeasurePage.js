import React from 'react';
import { Link } from "react-router-dom";
import { measureService } from '../../_services';
import Toast from 'react-bootstrap/Toast';
import ToastHeader from 'react-bootstrap/ToastHeader';
import ToastBody from 'react-bootstrap/ToastBody';
import ToastContainer from 'react-bootstrap/ToastContainer'

class MeasurePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            remove:false,
            message:"",
            succed:false,
            measures: []
        };
    }

    componentDidMount(e) {
        measureService.getAll().then(measures => this.setState({ measures }));
    }

    removeLine(id) {
        measureService.deleteMeasure(id)
        .then(()=>{            
            measureService.getAll().then(measures => this.setState({ measures }));    
            this.setState({ remove: true, message:"Suppression terminée", succed:true});         
        })
        .catch(e=>{
            this.setState({ remove: true, message:e, succed:false});
        })
    }

    render() {
        const { measures, remove, message, succed } = this.state;
        let { i } = this.state;
        const content = measures.map((measure, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{measure.name}</td>
                <td><Link to={'/editMeasure/'+measure.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><a type="button" onClick={()=>{this.removeLine(measure.id)}} style={{color: "#212529"}}><i className="fas fa-trash"></i></a></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of Measures</h1>
                <div><Link to={'/createMeasure'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
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
                    <button className="btn btn-warning" onClick={() => this.props.history.goBack()}>Back</button>
                </div>
                <ToastContainer className="p-3" position='bottom-end'>
                <Toast onClose={() => this.setState({ remove: false })} delay={4000} show={remove} autohide animation bg={succed ? 'success' : "danger"}>
                    <ToastHeader>
                    <strong className="me-auto">Suppression {succed ? 'en succès' : "en échec"}</strong>          
                    <small>now</small>
                    </ToastHeader>
                    <ToastBody className={succed ? '' : "text-white"}>{message}</ToastBody>
                </Toast>
                </ToastContainer>
            </div>
            
        );
    }
}
export { MeasurePage }; 
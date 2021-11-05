import React from 'react';
import { Link } from "react-router-dom";
import { userService } from '../../_services';
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 1,
            users: []
        };
    }

    componentDidMount(e) {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        let { i } = this.state;
        const content = users.map((user, index) => 
            (
            <tr key={index}>
                <th scope="row">{i++}</th>
                <td>{user.userName}</td>          
                <td>{user.role}</td>          
                <td><Link to={'/editUser/'+user.id} style={{color: "#212529"}}><i className="far fa-edit"></i></Link></td>
                <td><Link to={'/deleteUser/'+user.id} style={{color: "#212529"}}><i className="fas fa-trash"></i></Link></td>
            </tr>
            )
        )
        return (
            <div className="col-md-12 ">
                <h1>List of Users</h1>
                <div><Link to={'/createUser'} style={{color: "#212529"}}><i className="fas fa-plus"></i></Link></div>
                <div className="table-responsive">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">role</th>
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
            </div>
            
        );
    }
}
export { UserPage }; 
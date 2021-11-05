import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: ""
        };
    }
    
    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username')),
            role: atob(localStorage.getItem('role'))
        });
    }
    render() {
        const { username, role } = this.state;
        let admin = ""
        if (role=='admin') {
            admin =  
            (
                <span className="dropdown ">
                <a className=" nav-link px-2 text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Administration
                </a>
                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                    {username && <li><a href="/measures" className="nav-link px-2 text-white">Measures</a></li>}
                    {username && <li><a href="/ingredients" className="nav-link px-2 text-white">Ingredients</a></li>}
                    {username && <li><a href="/recipes" className="nav-link px-2 text-white">Recipes</a></li>}
                    {username && <li><a href="/recipeIngredients" className="nav-link px-2 text-white">Recipe Ingredients</a></li>}
                    {username && <li><a href="/recipeInstructions" className="nav-link px-2 text-white">Recipe Instructions</a></li>}
                    {username && <li><a href="/users" className="nav-link px-2 text-white">Users</a></li>}
                </ul>
            </span>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-danger" href="/">YUMMI</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarYummi" aria-controls="navbarYummi" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarYummi">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li><a href="/baskets" className="nav-link px-2 text-white">Cart</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">Planning</a></li>
                        </ul>
                        <div className="d-flex">
                            {admin}
                            {username && <a className="nav-link disabled px-2 text-white">{username} &nbsp;&nbsp;</a>}
                            {username &&
                                <a href="/logout" className="btn btn-outline-danger me-2">Logout</a>
                            }
                            {!username &&  
                                <a href="/login" className="btn btn-outline-light me-2">Login</a>
                            }
                            {!username &&  
                                <a href="/signup" className="btn btn-outline-warning me-2">Sign-up</a>
                            }    
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export { Header }; 
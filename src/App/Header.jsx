import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }
    componentDidMount(e) {
        this.setState({ 
            username: JSON.parse(localStorage.getItem('username'))
        });
    }
    render() {
        const { username } = this.state;
        return (
            
            <header className="p-3 bg-dark text-white">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"></a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/" className="nav-link px-2 text-danger">YUMMI</a></li>
                        {username &&
                            <li><a href="/measures" className="nav-link px-2 text-white">Measures</a></li>
                        }
                        {username &&
                            <li><a href="/ingredients" className="nav-link px-2 text-white">Ingredients</a></li>
                        }
                        {username &&
                            <li><a href="/recipes" className="nav-link px-2 text-white">Recipes</a></li>
                        }
                        {username &&
                            <li><a href="/recipeIngredients" className="nav-link px-2 text-white">Recipe Ingredients</a></li>
                        }
                    </ul>
                    <div className="text-end">
                        {username && <a className=" text-white text-decoration-none text-end">{username} &nbsp;&nbsp;</a>}
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
            </header>
        );
    }
}

export { Header }; 
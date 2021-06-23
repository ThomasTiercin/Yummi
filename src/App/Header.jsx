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
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand text-danger" href="/">YUMMI</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarYummi" aria-controls="navbarYummi" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarYummi">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
                        <div class="d-flex">
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
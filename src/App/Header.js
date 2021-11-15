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
                <span className="nav-item dropdown">
                    <div className="nav-link yummi-color-dark text-white dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">Administration</div>
                    <ul className="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                        {username && <li><a href="/measures" className="dropdown-item yummi-color-dark text-white">Mesures</a></li>}
                        {username && <li><a href="/ingredients" className="dropdown-item yummi-color-dark text-white">Ingredients</a></li>}
                        {username && <li><a href="/recipes" className="dropdown-item yummi-color-dark text-white">Recettes</a></li>}
                        {username && <li><a href="/recipeIngredients" className="dropdown-item yummi-color-dark text-white">Ingredients d'une recette</a></li>}
                        {username && <li><a href="/recipeInstructions" className="dropdown-item yummi-color-dark text-white">Instructions d'une recette</a></li>}
                        {username && <li><a href="/users" className="dropdown-item yummi-color-dark text-white">Utilisateurs</a></li>}
                    </ul>
                </span>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg yummi-color-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="/">YUMMI</a>
                    <button style={{color: 'white'}} className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {username && <li><a href="/baskets" className="nav-link px-2 text-white">Panier</a></li>}                            
                            {/* <li><a href="#" className="nav-link px-2 text-white">Planning</a></li> */}
                        </ul>
                        <div className="d-flex">
                            {admin}
                            {username && <a className="nav-link disabled px-2 text-white">{username} &nbsp;&nbsp;</a>}
                            {username && <a href="/logout" className="btn-sm btn-danger me-2" style={{marginTop: 'auto',marginBottom: 'auto'}}>Déconnexion</a>}
                            {!username &&  <a href="/login" className="btn btn-outline-light me-2">Se connecter</a>}
                            {!username && <a href="/signup" className="btn btn-outline-warning me-2">S'inscrire</a>}    
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header ; 
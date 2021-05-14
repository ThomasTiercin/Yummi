import React from 'react';

class Header extends React.Component {
    render() {
        return (
            
            <div className="container">
                <header class="p-3 bg-dark text-white">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" class="nav-link px-2 text-secondary">Home</a></li>
                            <li><a href="/measures" class="nav-link px-2 text-white">Measures</a></li>
                            <li><a href="/ingredients" class="nav-link px-2 text-white">Ingredients</a></li>
                            <li><a href="/recipes" class="nav-link px-2 text-white">Recipes</a></li>
                            <li><a href="/recipeIngredients" class="nav-link px-2 text-white">Recipe Ingredients</a></li>
                        </ul>

                        <div class="text-end">
                            <a href="/login" class="btn btn-outline-light me-2">Login</a>
                            <a href="/signup" class="btn btn-outline-warning me-2">Sign-up</a>
                            <a href="/logout" class="btn btn-outline-danger me-2">Logout</a>
                        </div>
                    </div>
                </header>
            </div>
        ), document.getElementById('header')
    }
}

export { Header }; 
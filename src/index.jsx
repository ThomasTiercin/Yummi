import React from 'react';
import { render } from 'react-dom';
import { App, Header, Footer } from './App';

render(
    <Header />,
    document.getElementById('header')
);
render (
    <App />,
    document.getElementById('app')
);
render (
    <Footer />,
    document.getElementById('footer')
);
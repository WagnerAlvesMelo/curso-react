import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/pure-min.css'
import './css/side-menu.css'
import App from './App';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import AutorBox from './Autor'
import Home from './Home';
import LivroBox from './Livro';


ReactDOM.render(
    (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/home" component={Home}/>
                <Route path="/autor" component={AutorBox}/>
                <Route path="/livro" component={LivroBox} />
            </Switch>
        </App>
    </Router>
    )
    , document.getElementById('root'));

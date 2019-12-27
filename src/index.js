import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/pure-min.css'
import './css/side-menu.css'
import App from './App';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import AutorBox from './Autor'

const history = createBrowserHistory();

ReactDOM.render(
    (
    <Router>
        <App>
            <Switch>
                <Route path="/autor" component={AutorBox}/>
                <Route path="/livro" />
            </Switch>
        </App>
    </Router>
    )
    , document.getElementById('root'));

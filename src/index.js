import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import { BrowserRouter, Route, Link } from "react-router-dom";



//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(            
<BrowserRouter>
    <Login />             
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();

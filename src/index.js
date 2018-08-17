import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login';
import { BrowserRouter, Route, Link } from "react-router-dom";



if(localStorage.getItem("login")){
    ReactDOM.render(            
        <BrowserRouter>
            <App />             
        </BrowserRouter>
        , document.getElementById('root'));
}
else{
    ReactDOM.render(            
        <BrowserRouter>
            <Login />             
        </BrowserRouter>
        , document.getElementById('root'));
}
registerServiceWorker();

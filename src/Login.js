import React, { Component } from 'react';
import './Login.css';
import invictuslogo from './Invictus-Logo_RGB.svg';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import App from "./App";
import { Redirect } from 'react-router';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            hide: false
        }
    }
    setRedirect() {
        this.setState({
            redirect: true,
            hide: true
        })
    }
    renderRedirect() {
        if (this.state.redirect) {
            return (
                <div>
                    <br/>
                    <Redirect to='/app' />
                </div>
            )
        }
    }
    componentDidMount () {
        this.setState({
            hide: false
        })
    }
    render() {
        return (
            // <BrowserRouter>
                <div className="Login">
                    {/* <RootStack /> */}
                    <header hidden={this.state.hide}>
                        <img src={invictuslogo} className="Login-logo" />
                    </header>
                    <div className="info" hidden={this.state.hide}>
                        <h3>Login</h3>
                        <input type="text" placeholder="Username"></input>
                        <br />
                        <input type="password" placeholder="Password"></input>
                        <br />
                        <br />
                        {this.renderRedirect()}
                        <button onClick={(e) => this.setRedirect()}>SIGN IN </button>
                        <div class="divider" />
                        <button>REGISTER </button>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <Switch>
                        <Route exact path="/app" component={App} />
                    </Switch>
                </div>
            // </BrowserRouter>
        )
    }

}


export default Login;

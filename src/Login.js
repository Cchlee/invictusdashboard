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
            hide: false,
            username: '',
            password: '',
            failure: true
        }
    }

    setRedirect() {
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        }).then(async (response)=>{
            let toke = await response.json();
            console.log(toke)
            if(toke=="failure"){
                console.log("didn't work");
                this.setState({failure:false});
            }
            else{
                localStorage.setItem('login', toke);
                this.setState({
                    redirect: true,
                    failure: true,
                    hide: true
                });
            }
        })
        .catch(error => console.error(`Fetch Error =\n`, error));

    }

    updateUserSearch(event) {
        this.setState({ username: event.target.value })
    }

    updatePassSearch(event) {
        this.setState({ password: event.target.value })
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
                        <input type="text"
                        value={this.state.username} onChange={this.updateUserSearch.bind(this)}
                        placeholder="Username"></input>
                        <br />
                        <input type="password" 
                        value={this.state.password} onChange={this.updatePassSearch.bind(this)}
                        placeholder="Password"></input>
                        <br />
                        <br />
                        <div className="failure" hidden={this.state.failure} >
                        <i>Login Failed, please try again</i>
                        <br />
                        </div>
                        <br />
                        {this.renderRedirect()}
                        <button onClick={(e) => this.setRedirect()}>SIGN IN </button>
                        <div class="divider" />
                        <button>REGISTER </button>
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

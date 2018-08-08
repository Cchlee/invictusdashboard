import React, { Component } from 'react';
import './App.css';
import invictuslogo from './Invictus-Logo_RGB.svg';
import hyperionlogo from './Hyperion-White-Logo.svg';
import c20logo from './Crypto20-Logo-Dark-3.svg';
import Token from "./Token";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import { Redirect } from 'react-router';


let tokens = [{
  id: 1,
  name: "token1",
  ticker: "token1ticker",
  address: "token1address",
  balance: 10
}, {
  id: 2,
  name: "token2",
  ticker: "token2ticker",
  address: "token2address",
  balance: 20
}, {
  id: 3,
  name: "token3",
  ticker: "token3ticker",
  address: "token3address",
  balance: 30
}, {
  id: 4,
  name: "token4",
  ticker: "token4ticker",
  address: "token4address",
  balance: 40
}, {
  id: 5,
  name: "token5",
  ticker: "token5ticker",
  address: "token5address",
  balance: 50
}, {
  id: 6,
  name: "token6",
  ticker: "token6ticker",
  address: "token6address",
  balance: 60
}, {
  id: 7,
  name: "token7",
  ticker: "token7ticker",
  address: "token7address",
  balance: 70
}, {
  id: 8,
  name: "token8",
  ticker: "token8ticker",
  address: "token8address",
  balance: 80
}, {
  id: 9,
  name: "fake9",
  ticker: "token9ticker",
  address: "token9address",
  balance: 90
}, {
  id: 10,
  name: "fake10",
  ticker: "token10ticker",
  address: "token10address",
  balance: 100
}, {
  id: 11,
  name: "code11",
  ticker: "token11ticker",
  address: "token11address",
  balance: 110
}]


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '---',
      ticker: '---',
      address: '---',
      balance: '---',
      search: '',
      hide: true,
      switch: false,
      redirect: false,
      log: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  updateSearch(event) {
    this.setState({ search: event.target.value })
  }
  handleClick(token, e) {
    console.log(token);
    this.setState({
      name: token.name,
      ticker: token.ticker,
      address: token.address,
      balance: token.balance,
      hide: false
    });
  }
  setRedirect() {
    this.setState({
      redirect: true,
      switch: true
    })
  }
  renderRedirect() {
    if (this.state.redirect) {
      return (
        <div>
          <br />
          <Redirect push to={{ pathname: '/login', state: { hide: false } }} />
        </div>
      )
    }
  }

  render() {
    let filteredTokens = tokens.filter(
      (token) => {
        return token.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    );
    return (

      /*---------------------App Header--------------------- */
      <div className="App">
        <header className="App-header">
          <Row>
            <Col span={3}><button className="center" onClick={(e) => this.setState(prevState => ({ log: !prevState.log }))}>SHOW LOGS</button></Col>
            <Col span={6}><img src={invictuslogo} className="App-logo" alt="logo" /></Col>
            {this.renderRedirect()}
            <Col span={3}><button onClick={(e) => this.setRedirect()} className="center">LOGOUT</button></Col>
          </Row>
        </header>

        <div hidden={this.state.log} className="logs">
          <Row>
            <Col span={3}><div className="logs"><h3>Time</h3></div></Col>
            <Col span={9}><div className="logs"><h3>Response</h3></div></Col>
          </Row>
          <Row>
            <Col span={3}><div className="repsonse">14:40, 8/8/2018</div></Col>
            <Col span={9}><div className="repsonse">JSON RESPONSE</div></Col>
          </Row>
        </div>
        <br/>
        {/*---------------------App Content--------------------- */}

        <div className="grid-container">

          {/*-------------Supported Funds-------------*/}
          <div className="one">
            <div className="outer">
              <div className="box">
                Supported Funds
              <br /><br />
                <Row>
                  <Col span={6}><img src={hyperionlogo} className="Hyperion-logo" /></Col>
                  <Col span={6}><img src={c20logo} className="C20-logo" /></Col>
                </Row>
                <br /><br />
              </div>
            </div>
          </div>


          {/*-------------Token Details-------------*/}
          <div className="two" hidden={this.state.hide}>
            <div className="outer" hidden={this.state.hide}>
              View Token Details
              <div className="box" hidden={this.state.hide}>
                <br />
                <div className="lined">Name</div>
                <br />
                {this.state.name}
                <br /><br />
                <div className="lined">Ticker</div>
                <br />
                {this.state.ticker}
                <br /><br />
                <div className="lined">Current Address</div>
                <br />
                {this.state.address}
                <br /><br />
                <div className="lined">Balance</div>
                <br />
                {this.state.balance}
                <br />
                <h3>Actions</h3>
                <Row>
                  <Col span={6}><button>ADD ADDRESSS</button></Col>
                  <Col span={6}><button>UPDATE ADDRESS</button></Col>
                </Row>
                <br /><br />
                <Row>
                  <Col span={6}><button>DELETE ADDRESS</button></Col>
                  <Col span={6}><button>UPDATE BALANCE</button></Col>
                </Row>
                <br /><br />

              </div>
            </div>
          </div>


          {/*-------------All Tokens-------------*/}
          <div className="three">
            <div className="outer">
              All Tokens
              <div className="box">
                <br />
                Search
                <br />
                <div>
                  <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                </div>
                <tbody className="link">
                  {filteredTokens.map((token, i) => <Token token={token} id={i} onClick={this.handleClick} />)}
                </tbody>
              </div>
            </div>
          </div>


          {/*-------------View Tokens-------------*/}
          <div className="four">
            <div className="outer">
              View Address
              <div className="box">
                <br />
                {this.state.address}
              </div>
            </div>
          </div>
        </div>
        <br />
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;

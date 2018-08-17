import React, { Component } from 'react';
import './App.css';
import invictuslogo from './Invictus-Logo_RGB.svg';
import hyperionlogo from './Hyperion-White-Logo.svg';
import c20logo from './Crypto20-Logo-Dark-3.svg';
import Token from "./Token";
import Address from "./Address";
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Login from "./Login";
import { Redirect } from 'react-router';


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
      edit: true,
      hidebalance: true,
      tokenaddress: '',
      tokenbalance: '',
      tokenlists: [],
      noneditable: true,
      NEO: 0,
      XLM: 0,
      BCH: 0,
      EOS: 0,
      ETC: 0,
      ETH: 0,
      VET: 0,
      ZEC: 0,
      XTZ: 0,
      LTC: 0,
      TRX: 0,
      MIOTA: 0,
      ADA: 0,
      BNB: 0,
      USDT: 0,
      XRP: 0,
      XMR: 0,
      DASH: 0,
      XEM: 0,
      BTC: 0,
      hidec20: true,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddressClick = this.handleAddressClick.bind(this);

  }
  updateSearch(event) {this.setState({ search: event.target.value })}

  //ADD ADDRESS
  updateAddressSearch(event) {this.setState({ tokenaddress: event.target.value })}

  //EDIT BALANCES
  updateBalanceSearch(event) {this.setState({ tokenbalance: event.target.value })}
  updateBTC(event){this.setState({BTC:event.target.value})}
  updateETH(event){this.setState({ETH:event.target.value})}
  updateXRP(event){this.setState({XRP:event.target.value})}
  updateBCH(event){this.setState({BCH:event.target.value})}
  updateEOS(event){this.setState({EOS:event.target.value})}
  updateXLM(event){this.setState({XLM:event.target.value})}
  updateLTC(event){this.setState({LTC:event.target.value})}
  updateADA(event){this.setState({ADA:event.target.value})}
  updateUSDT(event){this.setState({USDT:event.target.value})}
  updateETC(event){this.setState({ETC:event.target.value})}
  updateXMR(event){this.setState({XMR:event.target.value})}
  updateTRX(event){this.setState({TRX:event.target.value})}
  updateMIOTA(event){this.setState({MIOTA:event.target.value})}
  updateDASH(event){this.setState({DASH:event.target.value})}
  updateNEO(event){this.setState({NEO:event.target.value})}
  updateBNB(event){this.setState({BNB:event.target.value})}
  updateXEM(event){this.setState({XEM:event.target.value})}
  updateXTZ(event){this.setState({XTZ:event.target.value})}
  updateZEC(event){this.setState({ZEC:event.target.value})}
  updateVET(event){this.setState({VET:event.target.value})}
  
  //SWITCH DATA ON TOKEN CLICK
  handleClick(token, e) {
    console.log(token);
    this.showAddressList()
    this.setState({
      name: token.name,
      ticker: token.ticker,
      address: '',
      balance: '',
      tokenbalance: token.balance,
      tokenlists: token.addresslist,
    });
  }

  //SET BALANCE AND ADDRESS ON BLICK
  handleAddressClick(address, e) {
    this.setState({
      address: address.address,
      balance: address.balance
    })
  }

  //CHANGE VIEWING PAGE
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
  listStuff() {
    this.setState({
      edit: false,
      hidebalance: true
    })
  }
  showEditBalance() {
    this.setState({
      hidebalance: false,
      edit: true
    })
  }
  makeEditable() {
    this.setState({
      noneditable: false
    })
  }

/*******
 * ALL BACKEND CALLS 
 */

  //POST METHOD, ADD ADDRESS
  addAddress() {
    fetch("http://localhost:8000/token", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": this.state.name,
        "address": this.state.tokenaddress,
        "balance": this.state.balance
      })
    })
      .then(response => (response.json()))
      .then(response => console.log(response))
      .catch(error => console.error(`Fetch Error =\n`, error));
    var joined = this.state.tokenlists.concat(this.state.tokenaddress);
    this.setState({ tokenlists: joined })
    this.setState({
      address: this.state.tokenaddress,
      tokenaddress: '',
    })
    this.showAddressList();
  }

  // //POST METHOD, UPDATE BALANCES
  // updateBalance() {
  //   fetch("http://localhost:8000/balance", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "address": this.state.address,
  //       "balance": this.state.tokenbalance
  //     })
  //   })
  //     .then(response => (response.json()))
  //     .then(response => console.log(response))
  //     .catch(error => console.error(`Fetch Error =\n`, error));
  //   this.showAddressList();
  //   this.setState({
  //     balance: this.state.tokenbalance,
  //     tokenbalance: 0
  //   })
  // }

  //POST METHOD, CREATE ADDRESS
  createAddress() {
    fetch("http://localhost:8000/things", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "title": "...",
        "body": "..."
      })
    })
      .then(response => (response.json()))
      .then(response => console.log(response))
      .catch(error => console.error(`Fetch Error =\n`, error));
  }

  //SHOW ALL ADDRESSES IN TOKEN
  showAddressList(tokenname, tokenbalance) {
    console.log(tokenname)
    console.log(tokenbalance)
    this.setState({
      name: tokenname,
      balance: tokenbalance
    })
    fetch("http://localhost:8000/address", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "token": this.state.name,
      })
    }).then(async response => {
      let a = await response.json()
      this.setState({
        tokenlists: a.data,
      })
    })
      .then(this.setState({
        hide: false,
      }))
  }

  //CHANGE ALL BALANCES IN C20
  updateBalances(){
    fetch("http://localhost:8000/c20", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "BALANCES": "c20",
        "NEO": this.state.NEO,
        "XLM": this.state.XLM,
        "BCH": this.state.BCH,
        "EOS": this.state.EOS,
        "ETC": this.state.ETC,
        "ETH": this.state.ETH,
        "VET": this.state.VET,
        "ZEC": this.state.ZEC,
        "XTZ": this.state.XTZ,
        "LTC": this.state.LTC,
        "TRX": this.state.TRX,
        "MIOTA": this.state.MIOTA,
        "ADA": this.state.ADA,
        "BNB": this.state.BNB,
        "USDT": this.state.USDT,
        "XRP": this.state.XRP,
        "XMR": this.state.XMR,
        "DASH": this.state.DASH,
        "XEM": this.state.XEM,
        "BTC": this.state.BTC
      })
    }).then(response => (response.json()))
    .then(response => console.log(response))
    .then(this.setState({
      noneditable: true
    }))
    .catch(error => console.error(`Fetch Error =\n`, error));
  }

  //REVEAL ALL C20 Values
  showc20(){
    fetch("http://localhost:8000/loadc20", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "BALANCES": "c20",
      })
    }).then(async response => {
      let a = await response.json()
      this.setState({
        NEO: a.NEO,
        XLM: a.XLM,
        BCH: a.BCH,
        EOS: a.EOS,
        ETC: a.ETC,
        ETH: a.ETH,
        VET: a.VET,
        ZEC: a.ZEC,
        XTZ: a.XTZ,
        LTC: a.LTC,
        TRX: a.TRX,
        MIOTA: a.MIOTA,
        ADA: a.ADA,
        BNB: a.BNB,
        USDT: a.USDT,
        XRP: a.XRP,
        XMR: a.XMR,
        DASH: a.DASH,
        XEM: a.XEM,
        BTC: a.BTC,
      })
      console.log(a.BTC)
    })
    this.setState({
      hidec20: false
    })
  }

  render() {
    // let filteredTokens = tokens.filter(
    //   (token) => {
    //     return token.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    //   }
    // );
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
        <br />
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
                  <Col span={6}><img src={c20logo} onClick={(e)=>this.showc20()} className="C20-logo" /></Col>
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
                <button onClick={(e) => this.listStuff()}>ADD ADDRESSS</button>
                <br /><br />
                <button onClick={(e) => this.createAddress()}>UPDATE ADDRESS</button>
                <br /><br />
                <button>DELETE ADDRESS</button>
                <br /><br />

              </div>
            </div>
          </div>


          {/*-------------All C20 Tokens-------------*/}
          <div className="three" hidden={this.state.hidec20}>
            <div className="outer">
              All Tokens
              <div className="box">
                {/* <br />
                Search
                <br />
                <div>
                  <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                </div> */}
                {/* <div className="link">
                  {filteredTokens.map((token, i) => <Token token={token} id={i} onClick={this.handleClick} />)}
                </div> */}
                <br /><br />
                <button onClick={(e) => this.makeEditable()}>EDIT VALUES</button>
                <Row>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("BTC", this.state.BTC)}><h3>BTC</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.BTC} onChange={this.updateBTC.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("ETH", this.state.ETH)}><h3>ETH</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.ETH} onChange={this.updateETH.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("XRP", this.state.XRP)}><h3>XRP</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.XRP} onChange={this.updateXRP.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("BCH", this.state.BCH)}><h3>BCH</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.BCH} onChange={this.updateBCH.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                </Row>
                <Row>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("EOS", this.state.EOS)}><h3>EOS</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.EOS} onChange={this.updateEOS.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("XLM", this.state.XLM)}><h3>XLM</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.XLM} onChange={this.updateXLM.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("LTC", this.state.LTC)}><h3>LTC</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.LTC} onChange={this.updateLTC.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("ADA", this.state.ADA)}><h3>ADA</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.ADA} onChange={this.updateADA.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                </Row>
                <Row>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("USDT", this.state.USDT)}><h3>USDT</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.USDT} onChange={this.updateUSDT.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("XMR", this.state.XMR)}><h3>XMR</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.XMR} onChange={this.updateXMR.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("ETC", this.state.ETC)}><h3>ETC</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.ETC} onChange={this.updateETC.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("TRX", this.state.TRX)}><h3>TRX</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.TRX} onChange={this.updateTRX.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                </Row>
                <Row>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("MIOTA", this.state.MIOTA)}><h3>MIOTA</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.MIOTA} onChange={this.updateMIOTA.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("DASH", this.state.DASH)}><h3>DASH</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.DASH} onChange={this.updateDASH.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("NEO", this.state.NEO)}><h3>NEO</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.NEO} onChange={this.updateNEO.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("XEM", this.state.XEM)}><h3>XEM</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.XEM} onChange={this.updateXEM.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                </Row>
                <Row>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("BNB", this.state.BNB)}><h3>BNB</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.BNB} onChange={this.updateBNB.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("XTZ", this.state.XTZ)}><h3>XTZ</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.XTZ} onChange={this.updateXTZ.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("ZEC", this.state.ZEC)}><h3>ZEC</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.ZEC} onChange={this.updateZEC.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                  <Col span={1}><div className="link" onClick={(e)=>this.showAddressList("VET", this.state.VET)}><h3>VET</h3></div></Col>
                  <Col span={2}><div ><h3><input type="number" value={this.state.VET} onChange={this.updateVET.bind(this)} disabled={this.state.noneditable} /></h3></div></Col>
                </Row>
                <button onClick={(e)=>this.updateBalances()}>UPDATE BALANCES</button>
              </div>
            </div>
          </div>

          {/*-------------View Addresses-------------*/}
          <div className="five" hidden={this.state.hide}>
            <div className="outer">
              View Address
              <div className="box">
                <br />
                {/* <button onClick={(e) => this.showAddressList()}>UPDATE</button> */}
                <div className="link">
                  {this.state.tokenlists.map((address, i) =>
                    <Address address={address} id={i} onClick={this.handleAddressClick} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*-------------Add Address-------------*/}
          <div className="six" hidden={this.state.edit}>
            <div className="outer">
              Add Address
              <div className="box">
                  <br/>
                <Row>
                <Col span = {8}><input type="text" value={this.state.tokenaddress} onChange={this.updateAddressSearch.bind(this)} /></Col>
                <Col span = {4}><button onClick={(e) => this.addAddress()}>ADD</button></Col>
                </Row>
              </div>
            </div>
          </div>

          {/*-------------Update Balance-------------*/}
          <div className="six" hidden={this.state.hidebalance}>
            <div className="outer">
              Update Balance
              <div className="box">
                <input type="number" value={this.state.tokenbalance} onChange={this.updateBalanceSearch.bind(this)} />
                <button onClick={(e) => this.updateBalance()}>UPDATE</button>
              </div>
            </div>
          </div>


          {/*-------------View Token Address-------------*/}
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

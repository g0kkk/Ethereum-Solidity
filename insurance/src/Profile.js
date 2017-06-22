import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Web3 from 'web3'


/*var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://:8545/"))
var peopleContractABI =
var peopleContractAddress = ''
var peopleContract = ETHEREUM_CLIENT.eth.contract(<>ContractABI).at(<>Address)*/

var App = React.createClass({
  getInitialState() {
    return {
      invalidData: true,
    }
  },

  componentWillUpdate(nextProps, nextState) {
    nextState.invalidData = !(nextState.email && nextState.password);
  },

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  },

  showAlert(value) {
    alert(value)
  },

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  },

  handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  },


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Claim your Insurance by filling out the following details</h2>
          <h5>Please enter your Vehcile and Policy number</h5>
        </div>
      <form>
        <br>
        </br>
        <div>
          <input value={this.state.email} onChange={this.onEmailChange} placeholder="Vehcile Number*" />
        </div>
        <br>
        </br>
        <div>
          <input value={this.state.password} onChange={this.onPasswordChange} placeholder="Policy Number*" />
        </div>
        <br>
        </br>
        <div>
          <button disabled={this.state.invalidData} onClick={() => this.showAlert('Page still under construction')}>Login</button>
        </div>
        <br>
        </br>
        <p className="App-intro">
          <a href="#" onClick={this.handleClick.bind(this)}>Click here to submit!</a>
        </p>
      </form>
    </div>
    );
  }
});

export default App;

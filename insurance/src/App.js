import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Login from './Login.js';
import Web3 from 'web3'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"))
var PeopleContractABI = [{"constant":true,"inputs":[],"name":"GetAllUserInfo","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"currentUserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_emailID","type":"bytes32"}],"name":"IsUserExists","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_emailID","type":"bytes32"},{"name":"_password","type":"bytes32"}],"name":"CreateUser","outputs":[{"name":"","type":"bytes32"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"user","outputs":[{"name":"Name","type":"bytes32"},{"name":"EmailID","type":"bytes32"},{"name":"Password","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"GetCurrentUserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var PeopleContractAddress = '0xc0bbc5188ab8d8048b582727fa33de22f276dcaf'
var peopleContract = ETHEREUM_CLIENT.eth.contract(PeopleContractABI).at(PeopleContractAddress)
ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.coinbase;


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><marquee><font color="red">Insurance </font><font color="blue">Claiming</font>  Portal</marquee></h2>
        </div>
        <Form />
        <h4>
          <h1>Already a registered user?</h1><br></br> <button onClick={this.handleSearch()} className="button">
          <Login />
        </button>
        </h4>
      </div>
    );
  }
  handleSearch() {
    //var version = web3.version.api;
    //console.log(version);
    }
}

export default App;

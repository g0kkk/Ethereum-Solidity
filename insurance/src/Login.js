import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import Web3 from 'web3'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"))
var PeopleContractABI = [{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_emailID","type":"bytes32"},{"name":"_password","type":"bytes32"}],"name":"CreateUser","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]
var PeopleContractAddress = '0xf4365a7a9de8f49d7dc2b5c57747c50f00c5a168'
var peopleContract = ETHEREUM_CLIENT.eth.contract(PeopleContractABI).at(PeopleContractAddress)

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <h2>Log In</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" onClick={this.handleLogin}>Log In</button>
      </form>
    );
  }
  handleLogin() {
    var contract = Web3.eth.contract(PeopleContractABI).at(PeopleContractAddress)
    var checkUser = contract.CheckUser(this.state.email,this.state.password)
  }
}

export default Login;

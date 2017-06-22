import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import Web3 from 'web3'
import './Insurance.js';
import _ from 'lodash'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"))
var PeopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"name","type":"bytes32"},{"name":"email","type":"bytes32"},{"name":"password","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"_password","type":"bytes32"}],"name":"addPerson","outputs":[{"name":"","type":"bytes"}],"payable":true,"type":"function"}]
var PeopleContractAddress = '0xeaa935e523b86f473f5ed038ddf42525bdb12a78'
var peopleContract = ETHEREUM_CLIENT.eth.contract(PeopleContractABI).at(PeopleContractAddress)
ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.coinbase;
//peopleContract.addPerson("gokul","Krishna", "asdasd")


class Form extends Component {

  constructor (props) {
    super(props);
    this.state = {
      names: [],
      emails: [],
      passwords: [],
      email: '',
      password: '',
      name: '',
      formErrors: {email: '', password: '', name: ''},
      emailValid: false,
      passwordValid: false,
      nameValid: false,
      formValid: false
    }
  }

  componentWillMount(){
    var data = peopleContract.getPeople()
    this.setState({
      names: String(data[0]).split(','),
      emails: String(data[1]).split(','),
      passwords: String(data[2]).split(',')
    })
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
    let nameValid = this.state.nameValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'name':
        nameValid = value.length >= 2;
        fieldValidationErrors.name = nameValid ? '': ' is too short';
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    nameValid: nameValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {

    var TableRows = []

    _.each(this.state.names, (value, index) => {
      TableRows.push(
        <tr>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.names[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.emails[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.passwords[index])}</td>
        </tr>
      )
    })

    return (
      /*<div className="App">
        <div className="App-header">
        </div>
        <div className="App-content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
      </div>*/
      <form className="demoForm">
        <h1>Sign up</h1>
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
        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
          <label htmlFor="name">Name</label>
          <input type="name" required className="form-control" name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" onClick={this.handleLogin}>Sign up</button>
      </form>
    );
  }
  handleLogin= e => {
  peopleContract.addPerson(this.state.name,this.state.email,this.state.password)
  }
}

export default Form;

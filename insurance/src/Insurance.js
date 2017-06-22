import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';
import Web3 from 'web3'


var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545/"))
var PeopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"name","type":"bytes32"},{"name":"email","type":"bytes32"},{"name":"password","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_email","type":"bytes32"},{"name":"_password","type":"bytes32"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"}]
var PeopleContractAddress = '0x2ef3bb42a8f189c99bb041bcf477c10f7040a36a'
var peopleContract = ETHEREUM_CLIENT.eth.contract(PeopleContractABI).at(PeopleContractAddress)
ETHEREUM_CLIENT.eth.defaultAccount = ETHEREUM_CLIENT.eth.coinbase;
//peopleContract.addPerson("gokul","Krishna", "asdasd")


class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userAddress: '',
      VehicleNumber: '',
      PolicyType: '',
      PolicyID: '',
      DurationOfPolicy: '',
      cost: '',
      formErrors: {userAddress: '',VehicleNumber: '', PolicyType: '', PolicyID: '', DurationOfPolicy: '', cost: ''},
      userAddress: false,
      VehicleNumber: false,
      PolicyType: false,
      PolicyID: false,
      DurationOfPolicy: false,
      cost: false,
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
    let userAddressValid = this.state.userAddressValid;
    let VehicleNumberValid = this.state.VehicleNumberValid;
    let PolicyTypeValid = this.state.PolicyTypeValid;
    let PolicyIDValid = this.state.PolicyIDValid;
    let DurationOfPolicyValid = this.state.DurationOfPolicyValid;
    let costValid = this.state.costValid;

    switch(fieldName) {
      case 'userAddress':
        userAddressValid = value.length >= 3;
        fieldValidationErrors.email = userAddressValid ? '' : ' is short';
        break;
      case 'VehicleNumber':
        VehicleNumberValid = value.length = 8;
        fieldValidationErrors.password = VehicleNumberValid ? '': ' should be of 8 in length';
        break;
      case 'PolicyType':
        PolicyTypeValid = value.length = 2;
        fieldValidationErrors.name = PolicyTypeValid ? '': ' should be a multiple of 2';
      case 'PolicyID':
        PolicyIDValid = value.length = 8;
        fieldValidationErrors.name = PolicyIDValid ? '': ' should be of length 8';
      case 'DurationOfPolicy':
        DurationOfPolicyValid = value.length >= 5;
        fieldValidationErrors.name = DurationOfPolicyValid ? '': ' should be greater than 5';
      case 'cost':
      costValid = value.length >= 10000;
        fieldValidationErrors.name = costValid ? '': ' should be greater than 10000';
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    userAddressValid: userAddressValid,
                    VehicleNumberValid: VehicleNumberValid,
                    PolicyTypeValid: PolicyTypeValid,
                    PolicyIDValid: PolicyIDValid,
                    DurationOfPolicyValid: DurationOfPolicyValid,
                    costValid: costValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.userAddressValid && this.state.VehicleNumberValid && this.state.PolicyTypeValid && this.state.PolicyIDValid && this.state.DurationOfPolicyValid && this.state.costValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.userAddress)}`}>
          <label htmlFor="userAddress">User address</label>
          <input type="userAddress" required className="form-control" name="userAddress"
            placeholder="UserAddress"
            value={this.state.userAddress}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.VehicleNumber)}`}>
          <label htmlFor="VehicleNumber">Vehicle number</label>
          <input type="VehicleNumber" className="form-control" name="VehicleNumber"
            placeholder="VehicleNumber"
            value={this.state.VehicleNumber}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.PolicyType)}`}>
          <label htmlFor="name">Policy Type</label>
          <input type="name" required className="form-control" name="name"
            placeholder="PolicyType"
            value={this.state.PolicyType}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.PolicyID)}`}>
          <label htmlFor="name">PolicyID</label>
          <input type="name" required className="form-control" name="name"
            placeholder="PolicyID"
            value={this.state.PolicyID}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.DurationOfPolicy)}`}>
          <label htmlFor="name">Duration Of Policy</label>
          <input type="DurationOfPolicy" required className="form-control" name="DurationOfPolicy"
            placeholder="DurationOfPolicy"
            value={this.state.DurationOfPolicy}
            onChange={this.handleUserInput}  />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.cost)}`}>
          <label htmlFor="cost">Cost</label>
            placeholder="Name"
            <input type="cost" required className="form-control" name="cost"
            value={this.state.cost}
            onChange={this.handleUserInput}  />
        </div>
        <button type="submit" onClick={this.handleLogin}>Submit</button>
      </form>
    );
  }
  handleLogin= e => {
    peopleContract.CreateInsurance(this.state.VehicleNumber, this.state.PolicyType, this.state.PolicyID, this.state.DurationOfPolicy, this.state.cost)
  }
}

export default Form;

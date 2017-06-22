pragma solidity ^0.4.11;

contract People {

  Person[] public people;

  struct Person{
    bytes32 name;
    bytes32 email;
    bytes32 password;
  }

  function addPerson(bytes32 _name, bytes32 _email, bytes32 _password) payable returns (bytes) {
    //string memory _value;
    Person memory newPerson;
    newPerson.name = _name;
    newPerson.email = _email;
    newPerson.password = _password;

    string memory _abc = "Person Added";
    bytes memory s = bytes(_abc);
    people.push(newPerson);
    return s;
    //people.push(newPerson);
    //_value = "Added";
    //bytes memory _bytesData = bytes(_value);
    //return true; //string(_bytesData);
  }

  function getPeople() constant returns(bytes32[], bytes32[], bytes32[] ) {

    uint length = people.length;

    bytes32[] memory names = new bytes32[](length);
    bytes32[] memory emails = new bytes32[](length);
    bytes32[] memory passwords = new bytes32[](length);

    for(uint i=0; i<people.length; i++) {
      Person memory currentPerson;
      currentPerson = people[i];

      names[i] = currentPerson.name;
      emails[i] = currentPerson.email;
      passwords[i] = currentPerson.password;

    }
    return(names, emails, passwords);
  }
}

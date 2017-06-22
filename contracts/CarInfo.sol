pragma solidity ^0.4.11;
import "./ConvertLib.sol";

contract CarInfo{

  address public currentCarInfoAddress;
  Car[] public carInfo;
  struct Car{
    bytes32 registrationNo;
    bytes32 faultyPartInfo;
  }

  function CarInfo(){
    currentCarInfoAddress = msg.sender;
  }

  function getCarInfoAddress() returns (address){
    return currentCarInfoAddress;
  }

  function registerCarPart(bytes32 _registrationNo, bytes32 _faultyPartInfo) returns (bytes32){
    bytes32 messageBytes32;
    if(!IsfaultyPartExists(_registrationNo, _faultyPartInfo)){
        Car memory newCarInfo;
        newCarInfo.registrationNo = _registrationNo;
        newCarInfo.faultyPartInfo = _faultyPartInfo;
        carInfo.push(newCarInfo);
        messageBytes32 = ConvertLib.stringToBytes32("Fault part logged successfully");
    }

    else{
        messageBytes32 = ConvertLib.stringToBytes32("Fault part log already exist.");
    }
    return messageBytes32;
  }

  function IsfaultyPartExists(bytes32 _registrationNo, bytes32 _faultyPartInfo) constant returns (bool){
      uint _length = carInfo.length;
      if(_length>0){
          for(uint item = 0;  item < _length; item++){
              Car memory _carInfo;
              _carInfo = carInfo[item];
              if(_carInfo.registrationNo == _registrationNo &&
                 _carInfo.faultyPartInfo == _faultyPartInfo){
                  return true;
              }
          }
          return false;
      }else{
          return false;
      }
  }
}

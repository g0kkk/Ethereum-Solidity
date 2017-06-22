pragma solidity ^0.4.11;
import "./ConvertLib.sol";

contract Insurance{

    InsuranceInfo[] public InsuranceInfoArray;
    address private _userAddress;

    struct InsuranceInfo{
        address UserAddress;
        bytes32 VehicleNumber;
        bytes32 PolicyType;
        bytes32 PolicyID;
        bytes32 DurationOfPolicy;
        uint256 Cost;
    }

    function Insurance(address userAddress){
        _userAddress = userAddress;
    }

    function CreateInsurance( bytes32 _vehicleNumber, bytes32 _policyType, bytes32 _policyID, bytes32 _durationOfPolicy, uint256 _cost) returns (bytes32){
        bytes32 messageBytes32;
        InsuranceInfo memory newInsuranceInfo;
        newInsuranceInfo.UserAddress = _userAddress;
        newInsuranceInfo.VehicleNumber = _vehicleNumber;
        newInsuranceInfo.PolicyType = _policyType;
        newInsuranceInfo.PolicyID = _policyID;
        newInsuranceInfo.DurationOfPolicy = _durationOfPolicy;
        newInsuranceInfo.Cost = _cost;
        InsuranceInfoArray.push(newInsuranceInfo);
        messageBytes32 = ConvertLib.stringToBytes32("Insurance Created Successfully");
        return messageBytes32;
    }

    function ClaimInsurance(string _vehicleNumber, string _policyNumber) returns (bytes32){
        bytes32 messageBytes32;
        /* Todo */
        messageBytes32 = keccak256("Message String");
        return messageBytes32;
    }
}

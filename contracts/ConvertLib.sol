pragma solidity ^0.4.4;

library ConvertLib{
	function convert(uint amount,uint conversionRate) returns (uint convertedAmount)
	{
		return amount * conversionRate;
	}

	// Convert String message / value to byte32 Value
	function stringToBytes32(string memory source) returns (bytes32 result) {
			assembly {
					result := mload(add(source, 32))
			}
			return result;
	}

	// Convert byte32 Value to String message / value
	function bytes32ToString(bytes32 _bytes32Value) constant returns (string) {
		    bytes memory bytesString = new bytes(32);
		    uint charCount = 0;
		    for (uint item = 0; item < 32; item++) {
		        byte char = byte(bytes32(uint(_bytes32Value) * 2 ** (8 * item)));
		        if (char != 0) {
		            bytesString[charCount] = char;
		            charCount++;
		        }
		    }
		    bytes memory bytesStringTrimmed = new bytes(charCount);
		    for (uint j = 0; j < charCount; j++) {
		        bytesStringTrimmed[j] = bytesString[j];
		    }
		    return string(bytesStringTrimmed);
		}

}

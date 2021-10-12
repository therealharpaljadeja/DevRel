pragma solidity >=0.8.0;
// SPDX-License-Identifier: MIT
contract HelloCeloDevs {

    // Data mapping
    struct DataMap{
        string _name;
    }

    // Set map of addresses to DataMap{} structure
    mapping(address => DataMap) dataMap;

    // Store name within data map
    function setName(string memory _name) public {
        require(isString(_name), "Error: must include data");
        dataMap[tx.origin]._name = _name;
    }

    // Contract call
    function sayHello() public view returns(string memory){
        if(isString(dataMap[tx.origin]._name)){
            return(concatStrings("Hello ",dataMap[tx.origin]._name,"!"));
        }
            return("Hello Celo Devs!");
    }

    // Delete name from dataMap
    function deleteName() public {
        delete dataMap[tx.origin]._name;
    }

    // String validation
    function isString(string memory _string) private pure returns(bool){
        bytes memory stringTest = bytes(_string);
        if (stringTest.length == 0) {
            return false;
        }
        return true;
    }

    // Concatenate strings by appending a string to another with ABI encoding
    function concatStrings(string memory a, string memory b, string memory c) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }
}

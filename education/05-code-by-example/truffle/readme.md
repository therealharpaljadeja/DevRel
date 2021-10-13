
# Learn to use Truffle with the Celo Blockchain!

Within this repository is a working example utilizing the tutorial below. If you get stuck, review the source code to reference your environment and settings.

## Description
In this tutorial you will learn to:

- Configure Truffle Framework sandbox environment
- Modify Truffle Framework to communicate with the Celo blockchain
  - Configured multiple network types.
    - local environment
    - testnet
    - mainnet
  - Define contract compiler preferences for Solidity
- Deploy (or migrate) a contract instance
- Interact with contract instance via Truffle console
  - Call contract function (Read)
  - Send contract function (Write)

This tutorial was tested with the following environment conditions:

- Truffle v5.4.14 (core: 5.4.14)
- Solidity - 0.8.0 (solc-js)
- Node v16.6.1
- Web3.js v1.5.3

Note: You can check your environment by running the following command:

```
truffle version
```

## Requirements
- NodeJS
- Truffle
- @truffle/hdwallet-provider
- Command line environment
- Wallet mnemonic phrase with testnet funds

### Note
Celo utilizes a compatible EVM (Ethereum Virtual Machine). Most utilities from the ethereum eco-system will work with Celo. This includes wallets. Heres a list to get you started:

- https://celo.org/developers/wallet
- [CeloCLI account:new](https://docs.celo.org/command-line-interface/introduction)
- [MetaMask](https://metamask.io/)
- [MEW](https://www.myetherwallet.com/wallet/create/software?type=mnemonic)

To fund your testnet wallet navigate to https://celo.org/developers/faucet


## Tutorial


1. Set up Truffle

```
npm install -g truffle
```

2. Make an empty directory and navigate into it

```
cd DIRECTORY_NAME
```

3. Initialize Truffle

```
truffle init
```

4. Install HDWalletProvider

```
npm install --save @truffle/hdwallet-provider
```

5. Create your contract

In ./contracts create a new contract called HelloCeloDevs.sol with the following code:

```
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
```


6. Deploy smart contracts

In ./migrations, create a deployment script specifically named 2_deploy_contracts.js with the following code:

```
var HelloCeloDevsContract = artifacts.require("HelloCeloDevs");
module.exports = function(deployer) {
    deployer.deploy(HelloCeloDevsContract, "hello");
    // Additional contracts can be deployed here
};
```

7. Configure Celo networks in truffle-config.js, add the following snippet:

```
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC = 'crowd woman give sword trouble story weekend monitor circle cable humor super';

module.exports = {
  networks: {
    private: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    testnet: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://alfajores-forno.celo-testnet.org")
      },
      network_id: 44787,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://forno.celo.org")
      },
      network_id: 42220,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "istanbul"
      }
    }
  }
};
```

__Note:__ Make sure to replace mnemonic with your own.

8. deploy (or migrate) your contract to testnet as follows. By default, Truffle only deploys to the local developer network.

```
truffle deploy --network testnet
```
or
```
truffle deploy --network testnet --reset
```

Why --reset? Adding the reset flag allows you to redeploy contracts which will result in a new contract address

Important: Save contract addresses for future reference. If you lose it, proceed to block explorer to review your wallet transactions for contract creation and its response.

9. Set up Truffle console to testnet network:

```
truffle console --network testnet
```

10. Access your deployed contract instance via:

```
HelloCeloDevs.deployed().then(function(instance){return instance });
```

The results is similar to the way web3 would work for contract instance. Here's an example:

```
let HelloCeloDevs_abi = ABI_HERE
let contractAddress = ADDRESS_HERE
web3.eth.contract(HelloCeloDevs_abi, contractAddress)
```
11. Invoke contract to __call__ the function and say hello!

```
HelloCeloDevs.deployed().then(function(instance){return instance.sayHello()});
```

12. Invoke contract to __send__ the function and set your name

```
HelloCeloDevs.deployed().then(function(instance){return instance.setName("Brandy Camacho")});
```

13. Finally, Invoke contract function and say hello to obtain a response with your name.

```
HelloCeloDevs.deployed().then(function(instance){return instance.sayHello()});
```

#### Your results should look similar to the screenshot below:
![image](https://user-images.githubusercontent.com/2653576/137046171-1d9d9aab-d66e-43a9-95c8-3ebc6fd1d142.png)


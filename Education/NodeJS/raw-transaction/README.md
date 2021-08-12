# Creating a Raw Transaction with Node.js
Crafting a raw transaction using Ethereum base tooling to create, sign, and
broadcast a transaction to the Celo network.

## Requirements
NodeJS v12+

```npm install```

## How to use
- Modify privateKey to reflect the testnet account you control
- Validate/modify txData object to reflect correct account nonce for the transaction
- Adjust parameters for to suit your test needs such as the 'to', 'value' or 'data'

#### Run script

```node raw-transaction-example.js```

## Description
Craft a raw transaction using Ethereum base tooling to create, sign, and broadcast
transaction to the Celo network.

In this example, we are using ethereumjs-tx to configure parameters for the
creation of a raw transaction. Next, we will sign the transaction with
the sending account private key. Once the transaction is signed, its ready
for broadcasting to network. For this example, we will use web3 to broadcast.

Note: web3 can perform transactions. We are not utilizing this to show the
ability to craft and sign a raw transaction which can be broadcasted to
the network utilizing the serialize object.

Dependancies source:
https://github.com/ethereumjs/ethereumjs-common
https://github.com/ethereumjs/ethereumjs-tx
https://github.com/ChainSafe/web3.js

## Local Signing with Web3

As part of the Donut hardfork network upgrade that occurred on May 19th, 2021.
The Celo network now accepts Ethereum-style transactions as well as Celo
transactions.

This means that you can use Ethereum transaction signing tools
(like Metamask, web3.js and ethers.js) to sign Celo transactions.

Remember that Celo is a separate layer 1 blockchain from Ethereum, so do not
send Ethereum assets directly to your Celo account address on Ethereum.

Learn more:

Deterministic wallet words & the importance of network paths
https://github.com/celo-org/DevRel/blob/main/Education/NodeJS/deterministic-wallet-words-with-network-paths.md

Celo has a customized version of web3 object within contractKit. This kit
Allows for additional interactions with base layer contracts. We are not
utilizing this kit as the purpose is to demonstrate the creation of a raw
transaction.

Learn more about ContractKit:
https://docs.celo.org/developer-guide/contractkit/setup


## Gas Price Minimum

Celo uses a gas market based on EIP-1559. The protocol establishes a gas price
minimum that applies to all transactions regardless of which validator processes
them.

The gas price minimum will respond to demand, increasing during periods of
sustained demand, but allowing temporary spikes in gas demand without price
shocks.

The Celo protocol aims to have blocks filled at the target_density, a certain
proportion of the total block gas limit. When blocks are being filled more
than the target, the gas price minimum will be raised until demand subsides.
If blocks are being filled at less than the target rate, the gas price minimum
will decrease until demand rises. The rate of change is determined by a
governable parameter, adjustment_speed.

In the Celo protocol, the gas price minimum for the next block is calculated
based on the current block.

Formula:
gas_price_minimum = gas_price_minimum * (
  1 + ((total_gas_used / block_gas_limit) − target_density)
   * adjustment_speed) + 1

Source: https://docs.celo.org/celo-codebase/protocol/transactions/gas-pricing

## Test account

**privateKey:** 5e7b836918f7402eca73e387c1daa46a6a65d2755ae8cef8b4a9679eacc636e8
**publicKey:** 0247b04fc1af5a80266ae656d2161285be320999a6f0e86c4a0928a74e1a1f5dcb
**address: **0xe96D5b820a1D2b3CfA23ebDE3a4245654778A3FD

**privateKey:** 12b01fe7d10929a13a008e88fb1c87d2f6feb876326b3bd9074582a781f05674
**publicKey:** 03f18698d960408eb0a824c7157b64fc455ea9d85b7fcf3d612915b8c3abce4399
**address: **0x24163C9Af4d5f0B16956db9486A21A5aaF2ec6DD

#### Test accounts can be created with CeloCLI tool
https://github.com/celo-org/celo-monorepo/tree/master/packages/cli

## Networks

We are utilizing the Celo Alfajores test network.
https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup

GUI Blockexplorer to view testnet transactions:
https://alfajores-blockscout.celo-testnet.org


## Debugging

Useful logs to review objects

console.log('Transaction Data:',txData)
console.log('Transaction:', tx)

web3.eth.getBlock("latest").then((result) => {
console.log('Latest block:',result)})

web3.eth.getGasPrice()
  .then((result) => console.log('Web3 Gas Price', result))

web3.eth.estimateGas({
    to: "0xfBBF296f06E455F5b636Cd57371056Df21470c1e",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then((result)=> console.log('Web3 Gas Estimate',result));

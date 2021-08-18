# Creating a raw transaction with fees paid in cUSD using Node.js
Crafting a raw transaction using celo-ethers-wrapper to create, sign, and
broadcast a transaction with fees paid in cUSD to the Celo network.

## Requirements
NodeJS v12+

```npm install```
or
```npm i```

## How to use
- Modify privateKey to reflect the testnet account you control
- Validate/modify txData
- Adjust parameters for to suit your test needs such as the 'to', 'value' or 'data'

#### Run script

```npm start```
or

```node raw-transaction-cusd-fees-example.js```

## Description
Crafting a raw transaction using celo-ethers-wrapper to create, sign, and
broadcast a transaction with fees paid in cUSD to the Celo network.

In this example, we are using celo-ethers-wrapper to configure parameters for the
creation of a raw transaction. Next, we will sign the transaction with
the sending account private key and broadcast transaction to the network.

Dependancies source:
https://github.com/celo-tools/celo-ethers-wrapper
https://github.com/ethers-io/ethers.js/
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

#### Test accounts can be created with CeloCLI tool
```celocli account:new```
https://github.com/celo-org/celo-monorepo/tree/master/packages/cli

## Networks

We are utilizing the Celo Alfajores test network.
https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup

GUI Blockexplorer to view testnet transactions:
https://alfajores-blockscout.celo-testnet.org

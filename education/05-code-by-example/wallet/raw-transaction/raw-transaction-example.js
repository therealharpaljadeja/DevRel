/*
=== Description ===
Crafting a raw transaction using Ethereum base tooling to create, sign, and
broadcast a transaction to the Celo network.
*/


// Ethereumjs dependency configuration
const createRawTransaction = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const buffToHex = require('ethereumjs-util').bufferToHex;
const privToAddress = require('ethereumjs-util').privateToAddress;

//web3 dependency configuration
const Web3 = require('web3');
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');


// Configure Celo network using forCustomChain method from ethereum.js.
const celoTestnet = Common.forCustomChain(
       'mainnet',
       {
         name: 'Celo (Alfajores Testnet)',
         networkId: null,
         chainId: 44787,
         url: 'https://alfajores-forno.celo-testnet.org',
         comment: 'Celo Alfajores Testnet Chain'
       },
       'istanbul',
     )

// Create transaction with parameters
const txData =  {
    nonce: '0x5', //each wallet has a nonce, the nonce represents the transaction count for the wallet.
    gasPrice: web3.utils.toHex('500000000'), //amount of Ether you’re willing to pay for every unit of gas
    gasLimit: web3.utils.toHex('20000000'), //maximum amount of gas you’re willing to spend on transaction.
    to: '0xfBBF296f06E455F5b636Cd57371056Df21470c1e', // Use for transfering value otherwise not needed if deploying a smart contract to the network
    value: web3.utils.toHex(web3.utils.toWei('100000000', 'gwei')), //.1 celo
    data: null // Utilize for deploying smart contracts
  }

// Create transaction object and pass celoTestnet object whenever we create a transaction
tx = new createRawTransaction(txData,{common: celoTestnet });

// Configure private key for signature signing of transaction
const privateKey = new Buffer.from(
  '12b01fe7d10929a13a008e88fb1c87d2f6feb876326b3bd9074582a781f05674',
  'hex',
)

// Sign transaction
tx.sign(privateKey)

// Serialize transaction for broadcast to network
const serializedTx = tx.serialize()

// validate and braodcast transaction to network
if (
  tx.validate() &&
  // Compare sender address to privatekey default address
  buffToHex(tx.getSenderAddress()) === buffToHex(privToAddress(privateKey)
  )
){
  console.log('Transaction has a valid signature')
  console.log('Serialized Tx:\n',serializedTx.toString('hex'));
  console.log('Sender Wallet Address:', buffToHex(privToAddress(privateKey)));

  // Braodcast transaction to network using Web3
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
      if (!err) {
        console.log('Transaction Hash:\n',hash);
        console.log('View Tx with Block Explorer:\n', '\nhttps://alfajores-blockscout.celo-testnet.org/search?q='+hash)
      } else {
        console.log('broadcast to network failed:\n', err);
      }
    })
} else {
  console.log('Invalid signature')
}

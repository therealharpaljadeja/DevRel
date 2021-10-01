/*
=== Description ===
Create a raw transaction using Ethereum based tooling to create, sign, and broadcast a transaction to the Celo network.
*/

 /** ===============================================================
* 
*  STEP 1: ETHEREUM DEPENDENCY CONFIGURATION
*
=============================================================== */  

const createRawTransaction = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const buffToHex = require('ethereumjs-util').bufferToHex;
const privToAddress = require('ethereumjs-util').privateToAddress;
    
/** ===============================================================
* 
*  STEP 2: WEB3 DEPENDENCY CONFIGURATION
*
=============================================================== */ 
    
const Web3 = require('web3');
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
    
/** ===============================================================
* 
*  STEP 3: CELO NETWORK CONFIGURATION
*
=============================================================== */ 
    
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
    
/** ===============================================================
* 
*  STEP 4: CREATE TRANSACTION AND PASS TO TESTNET
*
=============================================================== */ 
    
const txData =  {
    nonce: '0x5', //each wallet has a nonce, the nonce represents the transaction count for the wallet.
    gasPrice: web3.utils.toHex('500000000'), //amount of Ether you’re willing to pay for every unit of gas
    gasLimit: web3.utils.toHex('20000000'), //maximum amount of gas you’re willing to spend on transaction.
    to: '0xfBBF296f06E455F5b636Cd57371056Df21470c1e', // Use for transfering value otherwise not needed if deploying a smart contract to the network
    value: web3.utils.toHex(web3.utils.toWei('100000000', 'gwei')), //.1 celo
    data: null // Utilize for deploying smart contracts
    }

tx = new createRawTransaction(txData,{common: celoTestnet });
    
/** ===============================================================
* 
*  STEP 5: CONFIGURE, SIGN, SERIALIZE, AND VALIDATE TRANSACTION
*
=============================================================== */ 
    
// Configure private key for signature signing of transaction
const privateKey = new Buffer.from(
    '12b01fe7d10929a13a008e88fb1c87d2f6feb876326b3bd9074582a781f05674',
    'hex',
)

// Sign transaction
tx.sign(privateKey)

// Serialize transaction for broadcast to network
const serializedTx = tx.serialize()
    
if (
    tx.validate() &&
    // Compare sender address to privatekey default address
    buffToHex(tx.getSenderAddress()) === buffToHex(privToAddress(privateKey)
    )
){
      // Console log valid signature, serialized transaction, and sender wallet address
    console.log('Transaction has a valid signature')
    console.log('Serialized Tx:\n',serializedTx.toString('hex'));
    console.log('Sender Wallet Address:', buffToHex(privToAddress(privateKey)));

/** ===============================================================
* 
*  STEP 6: BROADCAST TRANSACTION USING WEB3
*
=============================================================== */ 
      
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    // Console log on error
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


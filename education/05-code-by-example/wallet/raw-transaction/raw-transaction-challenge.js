/*
=== Description ===
Create a raw transaction using Ethereum based tooling to create, sign, and broadcast a transaction to the Celo network. 
*/

/** ===============================================================
* 
*  STEP 1: ETHEREUM DEPENDENCY CONFIGURATION
*
=============================================================== */  

const createRawTransaction = // <<< Require Transaction from ethereumjs-tx >>>
const Common = // <<< Require default from ethereumjs-common >>>
const buffToHex = // <<< Require bufferToHex from ethereumjs-util >>>
const privToAddress = // <<< Require privateToAddress from ethereumjs-util >>>

/** ===============================================================
* 
*  STEP 2: WEB3 DEPENDENCY CONFIGURATION
*
=============================================================== */ 

const Web3 = // <<< Require web3 >>>
const web3 = // <<< Connect web3 to the Alfajores testnet >>>

/** ===============================================================
* 
*  STEP 3: CELO NETWORK CONFIGURATION
*
=============================================================== */ 

const celoTestnet = Common.forCustomChain( 
    'mainnet',
    {
        name: // <<< Add Network Name >>>
        networkId: null,
        chainId: // <<< Add Chain ID >>>
        url: // <<< Add RPC URL >>>
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
   nonce: // <<< Set nonce to 0x5 >>>
   gasPrice: // <<< Use web3 utilities to convert 500000000 gwei toHex >>>
   gasLimit: // <<< Use web3 utilities to convert 20000000 gwei toHex >>>
   to: // <<< Add a wallet address to send value to >>>
   value: // <<< Convert the value of 100000000 toWei and convert this value toHex >>>
   data: null // Utilized for deploying smart contracts 
 }
 
tx = // <<< Use createRawTransaction to pass celoTestnet object whenever a transaction is created >>>

/** ===============================================================
* 
*  STEP 5: CONFIGURE, SIGN, SERIALIZE, AND VALIDATE TRANSACTION
*
=============================================================== */ 

const privateKey = new Buffer.from(
    // <<< Add private key here >>>
    'hex',
)
    
// Sign transaction 
// <<< Sign transaction here >>>
    
// Serialize transaction for broadcast to network
// <<< Serialize and broadcast transaction here >>>

if (
    tx.validate() &&
    // Compare sender address to privatekey default address 
    // <<< Compare addresses here >>>
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
  
// << Broadcast transaction here >>
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


  
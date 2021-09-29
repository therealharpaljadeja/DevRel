/*
Crafting a raw transaction using celo-ethers-wrapper to create, sign, and
broadcast a transaction with fees paid in cUSD to the Celo network.

Interested in learning how the celo-ethers-wrapper wraps functions to incluse
Celo specific protocol parameters like gatewayFee, gatewayFeeRecipient, and
feeCurrency?

https://github.com/celo-tools/celo-ethers-wrapper/blob/d38601317eee84d853eb369b9165100bad4bdb54/src/lib/CeloProvider.ts#L4

*/

//web3 dependancy configuration
const Web3 = require('web3');
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
// Connect to the network by creating a CeloProvider, which is based on JsonRpc-Provider:
const celoProvider = require('@celo-tools/celo-ethers-wrapper')

// Connecting to Alfajores testnet
const provider = new celoProvider.CeloProvider('https://alfajores-forno.celo-testnet.org');

// Create a CeloWallet, which is based on Wallet :
const celoWallet = require('@celo-tools/celo-ethers-wrapper')

// Utilize private key to create identity for wallet provider
const wallet = new celoWallet.CeloWallet('5b33f11978ca7e213736f15e2875818b7482b26db54800f9c6419cb601512fa8', provider)

//transaction txData
txData = {
    to: '0xfBBF296f06E455F5b636Cd57371056Df21470c1e',
    value: web3.utils.toHex(web3.utils.toWei('77777777', 'gwei')),
    gasLimit: web3.utils.toHex('20000000'), //maximum amount of gas you’re willing to spend on transaction.
    gatewayFee: 1,
    gatewayFeeRecipient: null, // or '0x0000000000000000000000000000000000000000'
    feeCurrency: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1', //cUSD testnet contract address
  }
// Use the provider or wallet to make calls or send transactions:
async function sendTx() {
  console.log('sending transaction...')
  txResponse = await wallet.sendTransaction(txData)
  const txReceipt = await txResponse.wait()
  console.log('\nView Tx with Block Explorer:\n', '\nhttps://alfajores-blockscout.celo-testnet.org/search?q='+txReceipt.transactionHash+'\n')
}
sendTx()

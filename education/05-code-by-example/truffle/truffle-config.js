/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 *
 *
 * Best practice is to decouple your settings from your codebase to increase security.
 * Use the settings below to decouple wallet works to a file called .secret
 * const fs = require('fs');
 * const mnemonic = fs.readFileSync(".secret").toString().trim();
 */
 
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

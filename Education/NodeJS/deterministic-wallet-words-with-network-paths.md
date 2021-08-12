# Deterministic wallet words & the importance of network paths

## Description
This guide will test the differences between Celo <> Ethereum accounts utilizing deterministic wallet words to understand the importance of network paths with wallet management.

## Why is this useful?
Upon creation of new accounts or restoration with existing accounts utilizing deterministic wallet words, the network derivation paths facilitate the generation of addresses.

Using the correct network derivations paths prevents mishaps with transactions.

A derivation path is a piece of data that tells a Hierarchical Deterministic (HD) wallet how to derive a specific key within a tree of keys.


## Requirements

- Node v12
 - *Optional: *Use Node version manager to set version of node to v12:
 https://github.com/nvm-sh/nvm


    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
	export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
	nvm install v12
    nvm use v12

**Install Celo CLI**

`npm install -g @celo/celocli`


## Process

1. Generate test wallet with deterministic wallet words
2. Utilize Celo CLI to reveal wallet address, private & public keys
3. Configure node path flag with testnet to aquire Celo account details
4. Configure network derivations paths for Eth to aquire Eth account details
5. Compare the account addresses generated from the same set of wallet words

## 1: Generate your test account

Use Celo CLI to create accounts:

`celocli account:new`

Celo CLI will create a new account with wallet words.

Note: You can use other tools such as Metamask to generate your test wallet words. Wallet words are universal!

If you want to skip this process, you can use the wallet words below.

`barrel bubble comic cause submit raccoon table sort nominee fire dismiss swim`

Save wallet words to **account.txt** within the working directory where you will perform the Celo CLI commands.

*__Secutiy risk!__*
Do not use the above wallet words for real value

### 2: Celo CLI
Celo CLI allows connectivity to the network to query and interact with the Celo blockchain. The tool is helpful for several types of tasks such as account creation, account management, and performing transactions.

We will use the Celo CLI tool to test the restoration of accounts using deterministic wallet words on both Celo and Ethereum network paths to compare the two.

Tip: To list Celo CLI commands:

`celocli commands`

Tip: To list Celo CLI function commands:
_Account example_
`celocli account help`

### Network nodes
The account command requires a network node to query. The Celo CLI tool allows network node control utilizing the command flag "--node" to connect to a specific network; in our use case, the testnet.

`--node https://alfajores-forno.celo-testnet.org`

Learn more regarding networks types: https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup


### 3: Creating a Celo native wallet address
To create a Celo native wallet from wallet words, use Celo CLI to restore the wallet and post response with the wallet address, private & public keys.

#### Command

`celocli account:new --mnemonicPath account.txt --node https://alfajores-forno.celo-testnet.org`

#### Response

```json
mnemonic: barrel bubble comic cause submit raccoon table sort nominee fire dismiss swim
accountAddress: 0xfBBF296f06E455F5b636Cd57371056Df21470c1e
privateKey: 2dba937c5a0606134c29cd794f736b60960b56d4539474f55ee4ae8dd3d9006a
publicKey: 037e9446bc622c6d86cfa16ec4915b96b5caa6b1585804413610fb7bc532898561
address: 0xfBBF296f06E455F5b636Cd57371056Df21470c1e
```

__*Take note of the account address:* 0xfBBF296f06E455F5b636Cd57371056Df21470c1e__

### 4: Utilizing Celo CLI to retrieve native Ethereum wallet address
To restore an Ethereum wallet from the above wallet words, use Celo CLI to restore the wallet and post response with the wallet address, private & public keys.
The critical difference between the commands is the ` --derivationPath "eth"` flag.


The --derivationPath flag performs network path switching. Heres a look at the difference between Cel <> Ethereum paths.

- Celo's = m/44/52752/0
- Ethereum = m/44/60/0

Learn more: https://docs.celo.org/developer-guide/integrations/checklist#key-derivation

*When using the network path with wallet words, you modify the key generation type to be performed specifically to the network of choice. *
#### Command

`celocli account:new --mnemonicPath account.txt --derivationPath "eth" --node https://alfajores-forno.celo-testnet.org`


#### Response

```json
mnemonic: barrel bubble comic cause submit raccoon table sort nominee fire dismiss swim
accountAddress: 0xAB83EC888470f7e582679f6f85624a7A50f49E09
privateKey: a877c71c148fa4b857b2f52434bc7e34b7215039ac1ea20f8510ddc6e32fd966
publicKey: 025d7429fdd7defb54a65ee4931567bd24a7eda6a9f7f206935e409d4a638124b0
address: 0xAB83EC888470f7e582679f6f85624a7A50f49E09
```

__Take note of the account address: 0xAB83EC888470f7e582679f6f85624a7A50f49E09_

### 5: Whats the difference?

Using deterministic wallet words to restore account with the network derivation paths impact the generation of private/public keys which control wallet addresses.

In this guide we restored two types of accounts, one for Celo and Ethereum. Earlier we suggested to take note of the address information, lets take a closer look at those:

Celo: 0xfBBF296f06E455F5b636Cd57371056Df21470c1e
Ethereum: 0xAB83EC888470f7e582679f6f85624a7A50f49E09

As you can tell, there is a clear difference between the two accounts. Dig deeper, and you will notice the difference between the private/public keys. As described earlier, this is a direct result of utilizing the network derivation paths specific to each blockchain network that impact the generation of wallet keys.


### Using Celo CLI offline/online

Managing the creation of wallets does not depend on network connectivity. Wallet creation functions can be used offline. If you need to query the blockchain or perform a transaction, you must make sure Celo CLI is configured with internet access.

#### Celo CLI network examples:

- the alfajores testnet:
   celocli config:set --node https://alfajores-forno.celo-testnet.org

- the mainnet
   celocli config:set --node https://forno.celo-testnet.org

#### Query account balance with Celo CLI

celocli account:balance $CELO_ACCOUNT_ADDRESSS

#### Use Celo CLI to Exchange CELO for Stablecoins

celocli exchange:celo --value <VALUE-TO-EXCHANGE> --from $CELO_ACCOUNT_ADDRESS

#### Transfer Stablecoins with Celo CLI

celocli transfer:dollars --from $CELO_ACCOUNT_ADDRESS --to <RECIPIENT-ADDRESS> --value <VALUE-TO-TRANSFER>

#### Additional Resources

- https://docs.celo.org/command-line-interface/introduction
- https://docs.celo.org/celo-owner-guide/cusd

// https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations
var HelloCeloDevsContract = artifacts.require("HelloCeloDevs");
module.exports = function(deployer) {
    deployer.deploy(HelloCeloDevsContract, "hello");
    // Additional contracts can be deployed here
};

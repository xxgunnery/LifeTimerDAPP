const Migrations = artifacts.require("dappTest");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

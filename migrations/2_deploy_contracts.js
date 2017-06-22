var ConvertLib      = artifacts.require("./ConvertLib.sol");
var MetaCoin        = artifacts.require("./MetaCoin.sol");
var UserInfo        = artifacts.require("./People.sol");
var Insurance       = artifacts.require("./Insurance.sol");
var CarInfo         = artifacts.require("./CarInfo.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
/*  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(ConvertLib);*/
  deployer.link(ConvertLib, UserInfo);
  deployer.deploy(UserInfo);
  deployer.link(ConvertLib, Insurance);
  deployer.deploy(Insurance);
  deployer.link(ConvertLib, CarInfo);
  deployer.deploy(CarInfo);
};

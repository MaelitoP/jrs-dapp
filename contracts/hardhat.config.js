require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle4");
require("@nomiclabs/hardhat-etherscan");

const deployer = '8c0d28a69bebe72b609ee864ab296ccb63887d89f12f80741b1189b795352224' // Arii Dev


module.exports = {

  solidity: { 
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  
  networks: {
    
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/EtyrKsf65ASfCsuxQ-AlVAuhTxSRzE1H",
      },
      accounts:{
        count: 90,
      },
      
    },

    rinkeby: {
      url : 'https://eth-rinkeby.alchemyapi.io/v2/LdzTkU5oPjZCy7KjMdCLEXeSnV07CyHi',
      chainId: 4,
      gas: "auto",
      gasPrice: 10440000000,
      gasMultiplier: 1.5,
      accounts: [deployer],
    },

  },

  etherscan: {
    apiKey: "JCRIGCD4PCB3TMIVISMAPCU7RQHWSCAFZC"
  }
};

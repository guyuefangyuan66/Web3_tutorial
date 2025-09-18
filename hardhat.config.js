require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
require("./tasks")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const SEPOLIA_KRY = process.env.SEPOLIA_KRY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  mocha: {
    timeout: 300000 // 300 seconds max for running tests
  },
  networks: {
    sepolia: {
      url: SEPOLIA_KRY, // replace with your Alchemy API key
      accounts: [PRIVATE_KEY,PRIVATE_KEY1], // replace with your private key
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey:{
      sepolia: ETHERSCAN_API_KEY
    }                     // replace with your Etherscan API key
  },
  namedAccounts: {
    firstAccount: {
      default: 0, // here this will by default take the first account as deployer
    },
    secondAccount: {
      default: 1
    },
  gasReporter: {
    enabled: true // set to true to enable gas reporting
  }
  }
};
require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();
require("./tasks")

const SEPOLIA_KRY = process.env.SEPOLIA_KRY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
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
  }
};
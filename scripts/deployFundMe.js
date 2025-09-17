// import ethers.js library
const { ethers } = require("hardhat");
// create an async function to deploy the contract
async function main() {
  // get the contract factory
  const FundMe = await ethers.getContractFactory("FundMe");
  // deploy the contract
  const fundMe = await FundMe.deploy(10);// lock time in seconds
    await fundMe.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${fundMe.target}`);
    // verify the contract
    if (hre.network.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        console.log("waitting for 5 block confirmations");
        await fundMe.deploymentTransaction().wait(5)
        await verifyFundMe(fundMe.target, [10]);
    } else {
        console.log("local network detected, skipping contract verification");
    }


       // init 2 accounts
    const [firstAccount, secondAccount] = await ethers.getSigners()
    
    // fund contract with first account
    const fundTx = await fundMe.fund({value: ethers.parseEther("0.5")})
    await fundTx.wait()

    console.log(`2 accounts are ${firstAccount.address} and ${secondAccount.address}`)
    
    // check balance of contract
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
    console.log(`Balance of the contract is ${balanceOfContract}`)

    // fund contract with second account
    const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: ethers.parseEther("0")})
    await fundTxWithSecondAccount.wait()

    // check balance of contract
    const balanceOfContractAfterSecondFund = await ethers.provider.getBalance(fundMe.target)
    console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`)

    // check mapping 
    const firstAccountbalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
    const secondAccountbalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
    console.log(`Balance of first account ${firstAccount.address} is ${firstAccountbalanceInFundMe}`)
    console.log(`Balance of second account ${secondAccount.address} is ${secondAccountbalanceInFundMe}`)
}

main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})  

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
      });
    console.log("Contract verified successfully");  
}

require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");

const prov = 'https://polygon-mainnet.g.alchemy.com/v2/Slrcna-oSM3StINI5bVfDK3OTAc7_Cda' // Rinkeby


const accounts = require('./accounts.json')
const jrsva = require('./smartcontracts/LENNY.json')


const second_key = "8e6d2ac5a7fb33fd7bf6e4d58b4989e98c3162ba1d2e5cb90ff4b4765482562e"

async function mintNFT () {
    const provider = new ethers.providers.JsonRpcProvider(prov);
    const contract = new ethers.Contract(jrsva.address, jrsva.abi, provider)
    const second = new ethers.Wallet(second_key, provider)

    await contract.connect(second).burn(1, {gasPrice: 4000000000000});

    console.log('Minted')



}


mintNFT().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
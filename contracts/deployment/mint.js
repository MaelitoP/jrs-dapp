require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");

const prov = 'https://eth-rinkeby.alchemyapi.io/v2/LdzTkU5oPjZCy7KjMdCLEXeSnV07CyHi' // Rinkeby


const accounts = require('./accounts.json')
const jrsva = require('./smartcontracts/JRSVA.json')

// Fake
const deployer = '78d431126988ed07bd9ab95d539e2ec8d01da4860949c895a52f4f20e9c34c600'
const second_key = "8e6d2ac5a7fb33fd7bf6e4d58b4989e98c3162ba1d2e5cb90ff4b4765482562d"

async function mintNFT () {
    const provider = new ethers.providers.JsonRpcProvider(prov);
    const contract = new ethers.Contract(jrsva.address, jrsva.abi, provider)

    console.log('Minted')
    
    for (let i = 0; i < Object.keys(accounts).length; i++){
      
      const current_private = Object.values(accounts)[i]['private']
      const user = new ethers.Wallet(current_private, provider);


      console.log('minting')
      await contract.connect(user).mint({value: "180000000000000000"});
    
    }


}


mintNFT().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

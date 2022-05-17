require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");
const hre = require("hardhat");
var fs = require('fs');

async function deployContracts () {
    
    console.log('Start deployment')

    // Token For ERC721A
    const nftA = await ethers.getContractFactory("JRSVA");

    const nftASC = await nftA.deploy();
    await nftASC.deployed();

    const nftA_abi = require('../artifacts/contracts/JRSVA.sol/JRSVA.json').abi

    const nftA_info = {
        'address': nftASC.address,
        'abi': nftA_abi,
        'parameters': {}
    }

    const repoZero = './deployment/smartcontracts/JRSVA.json'
    

    console.log(`Testing Token deployment on Rinkeby Successful : ${nftASC.address}`)
    

    fs.writeFileSync(repoZero, JSON.stringify(nftA_info), function(err) {
        if (err) throw err;
        console.log('error');
    });

    console.log('All deployment Done')
};



deployContracts().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
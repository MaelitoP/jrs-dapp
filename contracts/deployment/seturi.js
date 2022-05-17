require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");

const deployer = '8c0d28a69bebe72b609ee864ab296ccb63887d89f12f80741b1189b795352224' // Arii Dev
const prov = 'https://eth-rinkeby.alchemyapi.io/v2/LdzTkU5oPjZCy7KjMdCLEXeSnV07CyHi' // Rinkeby


const cids = require('./cid_info.json')
const jrsva = require('./smartcontracts/JRSVA.json')


async function setURI () {
    const provider = new ethers.providers.JsonRpcProvider(prov);
    const owner = new ethers.Wallet(deployer, provider);
    const contract = new ethers.Contract(jrsva.address, jrsva.abi, provider)

    const all_ids = []
    const all_uris = []

    for (let i = 0; i < Object.keys(cids).length; i++){

      const id_name = Object.keys(cids)[i].replace(/\D+/g, '')

      if(id_name.length != 0){
        all_ids.push(parseInt(id_name))
        all_uris.push(Object.values(cids)[i])
      }
    }

    if(all_ids.length === 88){
      await contract.connect(owner).setMultipleTokenURI(all_ids, all_uris);
    }

}


setURI().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
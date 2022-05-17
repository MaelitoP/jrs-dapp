require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");

const prov = 'https://eth-rinkeby.alchemyapi.io/v2/LdzTkU5oPjZCy7KjMdCLEXeSnV07CyHi' // Rinkeby
const deployer = '8c0d28a69bebe72b609ee864ab296ccb63887d89f12f80741b1189b795352224' // Arii Dev
const jrsva = require('./smartcontracts/JRSVA.json')

const contract_uri = 'https://bafybeihbuhceanb6bsklmohw4fzaw4f66burj4mqkg4ajm6ejq7xdplqhq.ipfs.dweb.link/JRSVmeta.json'
const reciever_add = '0x1c240E08fcBC4a397C3F5c195A8460d508977786'
const royalties_bips = 250

async function setupContract () {

    const provider = new ethers.providers.JsonRpcProvider(prov);
    const owner = new ethers.Wallet(deployer, provider)

    const nftsc = new ethers.Contract(jrsva.address, jrsva.abi, provider);

    // set metadata URI for Opensea Royalties
    await nftsc.connect(owner).setContractURI(contract_uri);

    // set royalties
    await nftsc.connect(owner).setRoyaltyInfo(reciever_add, royalties_bips);

}


setupContract().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
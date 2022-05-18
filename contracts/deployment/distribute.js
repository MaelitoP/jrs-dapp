require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("hardhat");

const prov = 'https://eth-rinkeby.alchemyapi.io/v2/EtyrKsf65ASfCsuxQ-AlVAuhTxSRzE1H' // Rinkeby
const provider = new ethers.providers.JsonRpcProvider(prov);


const accounts = require('./accounts.json')

const deployer = '8c0d28a69bebe72b609ee864ab296ccb63887d89f12f80741b1189b795352228' // Fake


async function distribute () {

    
    for (let i = 0; i < Object.keys(accounts).length; i++){

        const current_private = Object.values(accounts)[i]['private']
        let wallet = new ethers.Wallet(deployer, provider)

        let amountInEther = '0.2'

        if (deployer != current_private){


            // Create a transaction object
            let tx = {
                to: Object.values(accounts)[i]['public'],
                // Convert currency unit from ether to wei
                value: ethers.utils.parseEther(amountInEther)
            }


            await wallet.sendTransaction(tx)


        }
    }


};



distribute().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
})

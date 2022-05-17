require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");

const jrsva = require('./smartcontracts/JRSVA.json')


async function verifyContracts () {

    await hre.run("verify:verify", {
      address: jrsva.address,
      constructorArguments: []
  })


}

verifyContracts().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
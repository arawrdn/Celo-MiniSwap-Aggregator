const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const cUSD = "0x...."; // Replace with testnet cUSD address
  const cEUR = "0x...."; // Replace with testnet cEUR address
  const MiniSwap = await hre.ethers.getContractFactory("MiniSwap");
  const swap = await MiniSwap.deploy(cUSD, cEUR);
  await swap.deployed();
  console.log("MiniSwap deployed to:", swap.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "BaseSepolia": {
      url: `https://base-sepolia.g.alchemy.com/v2/${vars.get("ALCHEMY_PRIVATE_KEY")}`,
      accounts: [vars.get("PRIVATE_KEY")]
    },
    "ETHPlus": {
      url: "https://ethereumplus.pwrlabs.io/",
      chainId: 10023,
      accounts: [vars.get("PRIVATE_KEY")],
      gas: 5000000, // Optional: Customize gas settings if needed
      gasPrice: 20000000000, // Optional: Customize gas price if needed
      timeout: 20000 // Optional: Customize timeout settings if needed
    },
    "BTCPlus": {
      url: "https://bitcoinplus.pwrlabs.io/",
      chainId: 21000001,
      accounts: [vars.get("PRIVATE_KEY")],
      gas: 5000000, // Optional: Customize gas settings if needed
      gasPrice: 20000000000, // Optional: Customize gas price if needed
      timeout: 20000 // Optional: Customize timeout settings if needed
    }
  }
};

export default config;

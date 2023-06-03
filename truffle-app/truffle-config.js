const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    loc_instagramganache_instagramganache: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    inf_instagram_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\omerr\\OneDrive\\Documents\\wallet.env', 'utf-8'), "https://goerli.infura.io/v3/bdaf8060ec084d9f8bbf96a2e3f2ec6c")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.19"
    }
  }
};

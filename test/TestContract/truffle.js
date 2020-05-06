module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    private: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      from: "0x8ff976c3b2b93ce540af21d0ffdfe642622c7cd0",
      gas:4700000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/grbmkofBksADdPvKVgtY")
      },
      network_id: 4,
      gas: 6000000,
      gasPrice: 1000000000
    }
  }
};

let Kontra = {};
Kontra.importContract =  (name) => { return require(`./build/contracts/${name}.json`); };
Kontra.getContract = async (name, provider) => {
        let contractData = Kontra.importContract(name);
        let contractFactory = require('truffle-contract');
        let Contract = contractFactory(contractData);
        Contract.setProvider(provider);
        //console.log(Contract.toJSON());
        try {
          var networkId = await Contract.detectNetwork();
        } catch (e) {
          if (e.message === "Invalid JSON RPC response: \"\"") {
            throw new Error("Network not accessible");
          } else {
            throw(e);
          }

        }
        // console.log("networkId: " + networkId || Contract.network_id);
        let isDeployed = await Contract.isDeployed();
        // console.log("deployed: " + isDeployed);
        let address = Contract.network.address;
        // console.log("address: " + address);

        //check for the code being deployed (will fail if we e.g. restarted Truffle w/o migrating)
        let code = await Contract.web3.eth.getCode(address);
        if (code == 0) {
          throw(new Error("Please redeploy the contract"));
        }

        let contractInstance = await Contract.at(address);
        return contractInstance;
    };

module.exports = Kontra;

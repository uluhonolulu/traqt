const Web3 = require('web3');
const Promise = require("bluebird");

let Traqt = {};
Traqt.importContract =  (name) => { return require(`../../build/contracts/${name}.json`); };
Traqt.getContract = async (name, provider) => {
        let contractData = Traqt.importContract(name);
        let contractFactory = require('truffle-contract');
        let Contract = contractFactory(contractData);
        Contract.setProvider(provider);
        //console.log(Contract.toJSON());
        // networkId;
        try {
          var networkId = await Contract.detectNetwork();
        } catch (e) {
          if (e.message === "Invalid JSON RPC response: \"\"") {
            throw new Error("Network not accessible");
          } else {
            throw(e);
          }

        }
        networkId = networkId || Contract.network_id;
        // console.log("networkId: " + networkId);
        // console.log(Contract.toJSON());
        let isDeployed = await Contract.isDeployed();
        if (!isDeployed) {
          let message = Contract.contractName + " has not been deployed to the network with ID = " + networkId;
          throw new Error(message);
        }
        // console.log("deployed: " + isDeployed);
        let address = Contract.network.address;
        // console.log("address: " + address);

        //check for the code being deployed (will fail if we e.g. restarted Truffle w/o migrating)
        let code = await Contract.web3.eth.getCode(address, () => {
          // console.log(arguments);
          //TODO: promisify
        });
        if (code == 0) {
          throw(new Error("Please redeploy the contract"));
        }

        let contractInstance = await Contract.at(address);
        contractInstance.Contract = Contract;

        Contract.getCoinbase = async () => {
          return new Promise((resolve, reject) => {
            Contract.web3.eth.getCoinbase((err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            })
          });
        }          
        return contractInstance;
    };

Traqt.executeFromCommandline = async(name, provider) => {
  let contract = await Traqt.getContract(name, provider);
  let methodName = process.argv[2];
  let params = process.argv.slice(3);

  try {
    // console.log(methodName, params);
    const Web3 = require('web3');
    let web3 = new Web3(provider);
    params.push({from: web3.eth.accounts[0]})
    var result = await contract[methodName].apply(contract, params);
    if (isBigNumber(result)) {
      result = result.toString();
    }
    console.log(result);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  function isBigNumber(val){
    return !!val.c;
  }

}

Traqt.getWeb3 = provider => {
  let web3 = new Web3(provider);
  let eth = web3.eth;
  Promise.promisifyAll(eth);
  return web3;
}

module.exports = Traqt;

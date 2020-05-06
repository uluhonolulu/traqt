const Web3 = require('web3');

let Traqt = {};
Traqt.importContract =  (name) => { return require(`../../build/contracts/${name}.json`); };
Traqt.getContract = async (name, provider) => {
		let contractData = Traqt.importContract(name);
		const Contract = require("@truffle/contract")(contractData);
		Contract.setProvider(provider);
		let instance = await Contract.deployed();
        return instance;
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

module.exports = Traqt;

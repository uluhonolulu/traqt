//Подключаем dev-dependencies
let chai = require('chai');
const should = chai.should();

const Traqt = require('../index');
const Web3 = require('web3');
let provider = new Web3.providers.HttpProvider("http://localhost:8545/");
let web3 = new Web3(provider);

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//   // application specific logging, throwing an error, or other logic here
// });

describe('The contract object', () => {
    before(() => {
        //setup a mock import
        Traqt.importContract = (name) => { return require(`./TestContract/build/contracts/${name}.json`); }
    });

    it('has all methods and properties', async () => {
      var contract = await Traqt.getContract('Migrations', provider);
      contract.should.not.be.undefined;
      contract.setCompleted.should.not.be.undefined;
      contract.testView.should.not.be.undefined;
    });

    it('has the contract\'s address', async () => {
        var contract = await Traqt.getContract('Migrations', provider);
        contract.address.should.not.be.undefined;
        // console.log(contract.address);
    });

    it('can execute a view method', async () => {
      var contract = await Traqt.getContract('Migrations', provider);
      var result = await contract.testView(1);
      result.toNumber().should.equal(1);
    });

    it('can get public properties', async () => {
      var contract = await Traqt.getContract('Migrations', provider);
	  let owner = await contract.owner();
	  let coinbase = await web3.eth.getCoinbase();
      owner.toLowerCase().should.equal(coinbase);
      // console.log(owner);
    });

    it('can execute transactions', async () => {
      var contract = await Traqt.getContract('Migrations', provider);
      let owner = await web3.eth.getCoinbase();
      var newValue = 123;
      await contract.setCompleted(newValue, {from: owner});
      var modified = await contract.last_completed_migration();
      modified.toNumber().should.equal(newValue);
    })
});

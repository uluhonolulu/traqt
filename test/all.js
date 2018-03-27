//Подключаем dev-dependencies
let chai = require('chai');
const should = chai.should();

const Kontra = require('../index');
const Web3 = require('web3');
let provider = new Web3.providers.HttpProvider("http://localhost:9545/");
let web3 = new Web3(provider);

describe('The contract object', () => {
    before(() => {
        //setup a mock import
        Kontra.importContract = (name) => { return require(`./TestContract/build/contracts/${name}.json`); }
    });

    it('has all methods and properties', async () => {
        var contract = await Kontra.getContract('Migrations', provider);
        contract.should.not.be.undefined;
        contract.setCompleted.should.not.be.undefined;
        contract.testView.should.not.be.undefined;
    });

    it('has the contract\'s address', async () => {
        var contract = await Kontra.getContract('Migrations', provider);
        contract.address.should.not.be.undefined;
        // console.log(contract.address);
    });

    it('can execute a view method', async () => {
      var contract = await Kontra.getContract('Migrations', provider);
      var result = await contract.testView(1);
      result.toNumber().should.equal(1);
    });

    it('can get public properties', async () => {
      var contract = await Kontra.getContract('Migrations', provider);
      let owner = await contract.owner();
      owner.should.equal(web3.eth.accounts[0]);
      // console.log(owner);
    })
});

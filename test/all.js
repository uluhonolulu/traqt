//Подключаем dev-dependencies
let chai = require('chai');
const should = chai.should();

const Kontra = require('../index');

describe('The contract object', () => {
    before(() => {
        //setup a mock import
        Kontra.importContract = (name) => { return require(`./TestContract/build/contracts/${name}.json`); }
    });

    it('has all methods and properties', () => {
        var contract = Kontra.getContract('Migrations', 0);
        contract.should.not.be.undefined;
        contract.setCompleted.should.not.be.undefined;
        contract.testView.should.not.be.undefined;
    });

    it('has the contract\'s address', () => {
        var contractData = Kontra.importContract('Migrations');
        var contract = Kontra.getContract('Migrations', 0);
        
    });
});
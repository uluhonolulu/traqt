let Kontra = {};
Kontra.importContract =  (name) => { return require(`./build/contracts/${name}.json`); };
Kontra.getContract = (name, provider) => {
        //var contract = {};
        let contractData = Kontra.importContract(name);
        let contractFactory = require('truffle-contract');
        let Contract = contractFactory(contractData);
        Contract.setProvider(provider);
        let address = '0x';//TODO...;
        let contractInstance = Contract.at(address);
        return contractInstance;
    };

module.exports = Kontra;

//in Migrations.json:
// "networks": {
//     "4": {
//       "events": {},
//       "links": {},
//       "address": "0x2e78e0e724cbfa6ec7ba03802023b8dfeb0b00bd"
//     },
//     "4447": {
//       "events": {},
//       "links": {},
//       "address": "0x8cdaf0cd259887258bc13a92c0a6da92698644c0"
//     }
//   }
// "abi": [
//     {
//       "constant": false,
//       "inputs": [
//         {
//           "name": "new_address",
//           "type": "address"
//         }
//       ],
//       "name": "upgrade",
//       "outputs": [],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "constant": true,
//       "inputs": [],
//       "name": "last_completed_migration",
//       "outputs": [
//         {
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//     }

//truffle.js:
// networks: {
//     development: {
//       host: "127.0.0.1",
//       port: 9545,
//       network_id: "*", // Match any network id
//       gas: 47123880,
//       gasPrice: 1000
//     },
//     rinkeby: {
//       provider: function() {
//         return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/grbmkofBksADdPvKVgtY")
//       },
//       network_id: 4,
//       gasPrice: 1000000000
//     },

//or

// live: {
//     host: "localhost",
//     port: 8545,
//     network_id: 1,
//     from: "0xa419263605acf191f4423a7cd38d133b04beab1c",
//     //gas: 2000000,
//     gasPrice: 2000000000
//   },
//   rinkeby: {
//     network_id: 4,
//     host: 'eth-test.pp',
//     port: 8545,
//     gas: 4000000,
//     gasPrice: 100000000000,
//     from: "0x852c1e19114b1ff775c59a61b345cc839f3307fd"
//   },

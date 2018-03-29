//USAGE:
//Get a public var: node .\sample_commandline.js owner
//Exec a view function:  node .\sample_commandline.js testView 123
//Exec a transaction: node .\sample_commandline.js setCompleted 123

const Web3 = require('web3');
let provider = new Web3.providers.HttpProvider("http://localhost:9545/");
const Traqt = require('../../index');

//the following statement is not needed if you use traqt as a module installed via npm
//we only use it here because we need to resolve the path to the Migrations.json differently
const path = require('path');
Traqt.importContract =  (name) => {
  let contractPath = path.resolve(process.cwd(), `./build/contracts/${name}.json`); //so that we're able to call it from the TestContract directory
  return require(contractPath);
};

Traqt.executeFromCommandline('Migrations', provider);

# traqt

**traqt** is a Node.js helper module for calling your smart contract's methods. The code should be placed in your Truffle folder.

There are two scenarios for using traqt.
1. Calling certain contract's methods as part of a Node.js script.
2. Creating a script for calling arbitrary methods using the command line.

## Using in a script
1. Write a smart contract and deploy it using Truffle (`truffle migrate`)
2. Run `npm install --save traqt`
3. Add a .js file and write the following code:
```js
const Traqt = require('traqt');
const Web3 = require('web3');
let provider = new Web3.providers.HttpProvider("http://localhost:9545/");
let web3 = new Web3(provider);

(async ()=> {
  const { ico, token } = require("./common.js");
  let caller = isToken? token : ico;
  try {
    let contract = await Traqt.getContract('Migrations', provider); //assuming we call methods of the Migrations contract
    console.log(contract.address);  //the address of the published contract
    let owner = await contract.owner(); //this is how we read public properties
    console.log(owner);
    let result = await contract.setCompleted(123, {from: owner});   //this is how we execute transactions
    console.log(result);
  } catch (e) {
    console.error(e);
  }

})();
```

## Command line tool
3. Add a file named `exec.js` with the following code:
```js
const Web3 = require('web3');
let provider = new Web3.providers.HttpProvider("http://localhost:9545/");
Traqt.executeFromCommandline('Migrations', provider);
```
4. Execute any methods of Migrations.sol from the command line:
`node exec owner`
`node exec setCompleted 123`
etc etc

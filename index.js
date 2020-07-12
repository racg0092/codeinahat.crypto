const codehat = require('./dist');


const salt = new codehat.Salt();



const newSalt = salt.generate(100);

console.log(newSalt.str);
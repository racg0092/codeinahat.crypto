const codehat = require('./dist')

const salt = new codehat.Salt();


let newSalt = salt.generate();

let encryption = codehat.Crypto.keySequenceEncrypt(newSalt.arr, false);
let decryption = codehat.Crypto.keySequenceDecrypt(encryption.keyRing, encryption.sequence);

console.log('one time value', encryption.onetimeValues);

console.log('valor al azar', newSalt.str);
console.log('encrypcion', encryption);
console.log(decryption);
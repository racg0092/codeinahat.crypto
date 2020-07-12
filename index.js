const codehat = require('./dist')

const salt = new codehat.Salt();


let newSalt = salt.generate();

let encryption = codehat.Crypto.keySequenceEncrypt(newSalt.arr);
let decryption = codehat.Crypto.keySequenceDecrypt(encryption.keyRing, encryption.sequence);

console.log(newSalt.str);
console.log(encryption);
console.log(decryption);

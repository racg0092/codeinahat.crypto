const codehat = require('./dist')

const salt = new codehat.Salt();


let newSalt = salt.generate();
let phrase = 'the lion &%* king walking down the jungle';

let encryption = codehat.Crypto.keySequenceEncrypt(phrase, false);
let decryption = codehat.Crypto.keySequenceDecrypt(encryption.keyRing, encryption.sequence);
console.log('one time value', encryption.onetimeValues);

console.log('valor al azar:', phrase);
console.log('encrypcion', encryption.keyRing);
console.log('sequence', encryption.sequence);
console.log(decryption);

let yo = new codehat.KeyAndSequence();
let yes = new codehat.KeyAndSequenceResult();

codehat.Crypto.deleteKeyDir();
codehat.Crypto.deleteKeySequenceFileStorage()
codehat.Utilities.characterNumber(5);


const codehat = require('./dist')

const salt = new codehat.Salt();
const connection = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

let newSalt = salt.generate();
//let phrase = 'the lion &%* king walking down the jungle';



    let encryption =  codehat.Crypto.keySequenceEncrypt(newSalt, false);
    let decryption =  codehat.Crypto.keySequenceDecrypt(encryption.keyRing, encryption.sequence);
    console.log('valor al azar:', newSalt);
    console.log('encrypcion', encryption.keyRing);
    console.log('sequence', encryption.sequence);
    //console.log('', encryption.)
    console.log(decryption);

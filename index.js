const codehat = require('./dist')

const salt = new codehat.Salt();
const connection = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

let newSalt = salt.generate();
//let phrase = 'the lion &%* king walking down the jungle';


(async () => {
    let encryption =  await codehat.Crypto.asyncKeySequenceEncrypt(newSalt, false, {method: 'database', connectionString: connection});
    let decryption = await codehat.Crypto.asyncSequenceDecrypt(encryption.keyRing, encryption.sequence, undefined, {method: 'database', connectionString: connection});
    console.log('valor al azar:', newSalt);
    console.log('encrypcion', encryption.keyRing);
    console.log('sequence', encryption.sequence);
    //console.log('', encryption.)
    console.log(decryption);
})();

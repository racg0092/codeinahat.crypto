const codehat = require('./dist')

const salt = new codehat.Salt();
const connection = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';

let newSalt = salt.generate();
let phrase = 'the lion &%* king walking down the jungle';


(async () => {
    let encryption =  await codehat.Crypto.asyncKeySequenceEncrypt(phrase, false, {method: 'database', connectionString: connection, database: 'randomp', collection: 'keys'});
    let decryption = await codehat.Crypto.asyncSequenceDecrypt(encryption.keyRing, encryption.sequence, undefined, {method: 'database', connectionString: connection, database: 'randomp', collection: 'keys'});
    console.log('one time value', encryption.onetimeValues);
    console.log('valor al azar:', phrase);
    console.log('encrypcion', encryption.keyRing);
    console.log('sequence', encryption.sequence);
    //console.log('', encryption.)
    console.log(decryption);
})();

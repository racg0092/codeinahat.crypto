# Codeinahat Crypto

## Installation
This in [Node.js](https://nodejs.org) module available through the [npm registry](https://npmjs.com).
Installation is done using the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally)

```sh
    $ npm install @codeinahat/crypto
```

## API

```js
    const codehat = require('@codeinahat/crypto')
```

## Classes

There are currently six accesible classes in this module [Utilities](###utilities) [Salt](###salt), [Crypto](###crypto), `KeyAndSequence`, and `KeyAndSequenceResult`.
You should not have to interact at all with `KeyAndSequence` and `KeyAndSequenceResult` they are provider in case that you need some flexibility that the module does not already offer.
If you use `KeyAndSequence`, and `KeyAndSequenceResult` make sure you are `familiar` with code.

### Salt

Salt only has one `method` that you need to concern yourself with; `generate`. This method will return a `string` of random characters.
```js
    // call the API
    const codehat = require('@codeinahat/crypto');

    // instanciate the class
    const salt = new codehat.Salt();

    // generate random string of characters
    const newSalt = salt.generate();

    // prints out the string of random characters
    console.log(newSalt);
```

You can modify the `length` of the string of characters. By passing the first parameter to the `generate` method. The default value is 10
if you don't pass anything.
```js
    // istanciate the class
    const salt = new codehat.Salt();

    // call the generate method but this time pass the keyLength parameter
    const newSalt = salt.generate(50);
    
    // now the newSalt will be 50 characters long or more
    // this happend because some of the randome numbers could be two digits
    console.log(newSalt);
```

You can modify the `diversity` of the random value. The `diversity` is the range of numbers as to which the algorithm looks
for to select the random value. 
```js
    // istanciate the class
    const codehat = require('@codeinahat/crypto')
    const salt = new codehat.Salt();

    /**
     *  call the generate method but this time pass the range parameter
     *  we will set the keyLength to null which will give you a string of 
     *  charaters of at least 10 characters
     * */
    const newSalt = salt.generate(null, {beg: 0, beg: 100});
    
    /** 
     * instead of looking between 0 and 26 which is the default value it will
     * look between 0 and 100 therfore adding more diversity to each character value
     * */
```
`note:` The bigger the keyLength is and the bigger the range is adds complexity to your salt  value.

## Crypto

Crypto has six `static methods`. `keySequenceEncrypt`, `asyncKeySequenceEncrypt`, `keySequenceDecrypt`, `asyncKeySequenceDecrypt`, `deleteKeyDir`, and `deleteKeySequenceFileStorage`. 

`keySequenceEncrypt` takes an array of `(characters and/or numbers)` or a `string of characters` and returns a `KeyAndSequenceResult`. 
Which gives you access to three values. `keyRing (number array)` which is the encrypted data, `sequence` which the sequence that the algorithm 
follows to decrypt the array of characters and numbers, and `onetimeValues` which gives you the variables of the mathemathical equation that encrypts
 the `data` in the form of a number array. The `onetimeValues` can be `undefined` or `null` if your using encryption variables `stored in memory`.

`keySequenceEncrypt` with `onetimepad`. `onetimepad` is by default true; This mode returns the `onetimeValues` that the algorithm uses to encrypt
the data, without those values your data won't be able to be decrypted and will be `lost permanently`.
```js
    /**
     * instanciate a salt object we are going to use 
     * the keySequenceEncrypt to encrypt the salt result
     * */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();
    
    // generate a salt
    const newSalt = salt.generate();

    // encrypt the result
    const encrypted = codehat.Crypto.keSequenceEncrypt(newSalt);

    // returns the KeyAndSequenceResult object
    // encrypted values
    console.log(encrypted.keyRing);

    // encription sequence
    console.log(encrypted.sequence);

    // one time values
    console.log(encrypted.onetimeValues)
```

`keySequenceEncrypt`, however this time we will use encryption variables `stored in memory`. This is use when you keep the `encryption variables` stored in a json file.
The `module` would attempt to create a `directory` in your root directory called `keys` and save a file in there with the `encryption variables`. Your `not` require to 
create this file manually and it is `NOT` recomended that you do or mess with this file unless you ar absolutly sure that you know what your doing. This `file` is used
to encrypt and decrypt all you data. Once in `production` if you use this methot to `encrypt` your data and the file gets `corrupted` or `deleted` you will not be able
to `decrypt` the `user data` already `encrypted`.
```js
    /**
     * instanciate a salt object we ar going to use
     * the keySequenceEncrypt ti encrypt the salt result
     *  */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();

    // generate salt
    const newSalt = salt.generate();

    /**
     * encrypt the result only this time we will set the onetimepad
     * to false
     * */
    const encrypted = codehat.Crypto.keySequenceEncrypt(newSalt, false);

    /**
     * The program will attempt to create a folder called keys in your root
     * directory if it does not exist. Then it will attempt to create a file
     * with the encryption variables if it does not alrady exist.
     * */
    
    // returns the KeyAndSequenceResult object
    // only this this time onetimeValues is null or undefined
    console.log(encrypted.keyRing)
    // => outputs number array

    console.log(encrypted.sequence)
    // => outputs string array

    console.log(encrypted.onetimValues)
    // => null or undefined
``` 
`note:` The first time you call this function it will creat the `directory` and `file`. Afterwards all the other attempts to encrypt using variables `storage in memory`
will simply read from this file.

`asyncKeySequenceEncrypt` this method does everything that  `keySequenceEncrypt` can do but is an `asynchronous` function. We talked how it was possible to save the `encryption variables`
to a file. `Codeinahat` also supports saving the `encryption variables` to a  [MongoDB](https://www.mongodb.com) database. If you set the  `ontimepad` which is the second paramater that
`keySequenceEncrypt` and `asyncKeySequenceEncrypt` take to false by the default it will save the `encryption variales to a file`; However `both` this function also take a third parameter
`storageMethod`. If you want to save a the `encryptions variables` to a file we recomend you simple use `keySequenceEncrypt` and leave the third parameter `storage method` undefined. However,\
if you want to sav the `encryption variables` to [MongoDB](https://www.mongodb.com) database use `asyncKeySequenceEncrypt` and pass the `storage method` specifying the values.
```js
    // call the api
    const codehat = require('@codeinahar/crypto');
    
    // value to encrypt;
    const phrase = 'Jumping up and down comes the dinasour';
    // database connection string
    const connection = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';
    // encrypting and saving the encryption variables to a database
    (async ()=>{
        // encrypts, saves the encryption variables to a database,
        // uses default database name and default collection name.
        // database: encryption
        // collection: keys
        const encryption1 = await codehat.Crypto.asyncKeySequenceEncrypt(phrase, false, {
            method: 'database', 
            connectionString: connection
        })

        // encrypts, saves the encryption variables to a database
        // only this time you specify database and/or collection name
         const encryption2 = await codehat.Crypto.asyncKeySequenceEncrypt(phrase, false, {
            method: 'database', 
            connectionString: connection,
            database: 'mydb',
            collection: 'mycollection'
        });
    })();
```
 
`keySequenceDecrypt` takes an `array of numbers (keyRing)` and `an array of characters (sequence)`. It will take `an array of numbers (onetimeValues)` if you did not use
the variables `stored in memory`. `You are responsibel to stored and maintain the one time values`. It returns a decrypted string of characters.

`keySequenceDecrypt` with `onetimeValues`.
```js
    /**
     * instanciate a salt object we are going to use
     * the keySequenceEncrypt to encrypt the salt arr result
     * */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();

    // generate a salt
    const newSalt = salt.generate();

    // encrypt the result (onetimepad mode) 
    const encrypted = codehat.Crypto.keySequenceEncrypt(newSalt);

    // decrypt the result (onetimepad mode)
    const decrypted = codehat.Crypto.keySequenceDecrypt(encrypted.keyRing, encryption.sequence, encryption.onetimeValues);

    // returns a decrypted string of characters
    console.log(decrypted)
```

`keySequenceDecrypt` with variables `stored in memory`.
```js
    /**
     * instanciate a salt object we are going to use
     * the keySequenceEncrypt to encrypt the salt arr result
     * */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();

    // generate a salt
    const newSalt = salt.generate();

    // encrypt the result (variables stored in memory mode) 
    const encrypted = codehat.Crypto.keySequenceEncrypt(newSalt, false);

    // decrypt the result (variables stored in memory mode)
    const decrypted = codehat.Crypto.keySequenceDecrypt(encrypted.keyRing, encryption.sequence);

    // returns a decrypted string of characters
    console.log(decrypted)
```
`note:` With variables stored in memory the `module` takes on the responsability of storing and mantaining this variables.
Is up to the user which version to use.

`asyncKeySequenceDecrypt` is twin to `keySequenceDecrypt` with the exception that it is an `asynchronous` method. This method must be use
when decrypting using `equation variables` stored in a [MongoDB](https://www.mongodb.com) database, althouhg it can also be used when 
`equation variables` are stored in a file or for `onetimepad` values it's real purpose is to run when in need of `database` storage since
`file storaged` and `onetimepad` can be decrypted with `keySequenceDecrypt`.
```js
    // class the api
    const codehat = require('@codeinahat/crypto');

    // lets say the encrypted value is stored in a cookie
    const encryption = req.cookies['user-tag'];
     // value to decrypt;
    const phrase = 'Jumping up and down comes the dinasour';
    // database connection string
    const connection = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false';
    // decrypting 
    (async ()=>{
        // uses default database name and default collection name.
        // database: encryption
        // collection: keys
        const decryption1 = await codehat.Crypto.asyncSequenceDecryp(encryption.keyRing, encryption.sequence, undefined, {
            method: 'database', 
            connectionString: connection
        })

        // this time you specify database and/or collection name
         const decryption2 = await codehat.Crypto.asyncSequenceDecryp(encryption.keyRing, encryption.sequence, undefined, {
            method: 'database', 
            connectionString: connection,
            database: 'mydb',
            collection: 'mycollection'
        });
    })();
```  

`deleteKeySequenceFileStorage` this will delete the `file` where the variables are stored.
```js
    // call the api 
    const codehat = require('@codeinahat/crypto');

    // deletes files
    codehat.Crypto.deleteKeySequenceFileStorage();
    // returns => a true or false
```

`deleteKeyDir` this will delete the `directory` where the `key files` are saves.
`note:` You must delete all `files` before deleting the `directory`.
```js
    // call the api 
    const codehat = require('@codeinahat/crypto');

    // deletes files
    codehat.Crypto.deleteKeyDir();
    // returns => a true or false
```

## Utilities

Utilities is a simple class that has one `static` method. `characterNumber` it takes a number as argument and it returns the character value of that number or the number itself. This decition is
made at random.
```js
    // call the API
    const codehat = require('@codeinahat/crypto');

    // call the method
    const result = codehat.Utilities.characterNumber(5);

    console.log(result);
    // => prints the number 5 or f
```


# MORE COMING SOON :-)

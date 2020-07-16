# Codeinahat Crypto

## Installation
This in [Node.js](https://nodejs.org) module available through the [npm registry](https://npmjs.com).
Installation is done using the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally)

```sh
    $ npm install @codeinahat/core
```

## API

```js
    const codehat = require('@codeinahat/crypto')
```

## Classes

There are currently three accesible classes in this module [Salt](###salt), [Crypto](###crypto), and [Utilities](###utilities).

### Salt

Salt only has one `method` that you need to concern yourself with; `generate`. This method will return a `string` of randome characters.

```js
    // call the API
    const codehat = require('@codeinahat/crypto');

    // instanciate the class
    const salt = new codehat.Salt();

    // generate random string and array of character
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
     *  we will set the keyLength to null which will give you a charater
     *  of string of at least 10 characters
     * */
    const newSalt = salt.generate(null, {beg: 0, beg: 100});
    
    /** 
     * instead of looking between 0 and 26 which is the default value it will
     * look between 0 and 100
     * */
```

`note:` The bigger the keyLength is and the bigger the range is adds complexity to your salt  value.

## Crypto

Crypto only has two `static methods`. `keySequenceEncrypt` and `keySequenceDecrypt`. 

`keySequenceEncrypt` takes an array of characters and numbers or a string of characters and returns a `KeyAndSequenceResult`. 
Which gives you access to three values. `keyRing` which is the encrypted array of numbers and characters passed to the `keySequenceEncrypt`, 
`sequence` which the sequence that the algorithm follows to decrypt the array of characters and numbers, and `onetimeValues` 
which gives you the variables of the mathemathical equation that encrypts the `data` in the form of a number array. The `onetimeValues` can be
`undefined` or `null` if your using encryption variables stored in memory.

```js
    /**
     * instanciate a salt object we are going to use 
     * the keySequenceEncrypt to encrypt the salt arr result
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

`keySequenceDecrypt` takes an `array of numbers (keyRing)` and `an array of characters (sequence)`.
It returns a decrypted string of characters.

```js
    /**
     * instanciate a salt object we are going to use
     * the keySequenceEncrypt to encrypt the salt arr result
     * */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();

    // generate a salt
    const newSalt = salt.generate();

    // encrypt the result
    const encrypted = codehat.Crypto.keySequenceEncrypt(newSalt.arr);

    // decrypt the result
    const decrypted = codehat.Crypto.keySequenceDecrypt(encrypted.keyRing, encryption.sequence);

    // returns a decrypted string of characters
    console.log(decrypted)
```


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

Salt only has one `method` that you need to concern yourself with; `generate`. This method will return a `SaltResult` which is a class
with two properties `src` which is a random generated string of characters and `arr` which is a random generated `Array` of values.

```js
    // call the API
    const codehat = require('@codeinahat/crypto');

    // instanciate the class
    const salt = new codehat.Salt();

    // generate random string and array of character
    const newSalt = salt.generate();

    // string value
    newSalt.src

    // array value
    newSalt.arr
```

You can modify the `length` of the string of characters. By passing the first parameter to the `generate` method. The default value is 10
if you don't pass anything.

```js
    // istanciate the class
    const salt = new codehat.Salt();

    // call the generate method but this time pass the keyLength parameter
    const newSalt = salt.generate(50);
    
    // now the newSalt.src will be 50 characters long or more
    // this happend because some of the randome numbers could be two digits
    newSalt.src

    // the array result will be exactly 50 values long.
    newSalt.arr
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

`keySequenceEncrypt` takes an array of characters and numbers and returns a `KeyAndSequenceResult`. 
Which gives you access to two values. `keyRing` which is the encrypted array of character and numbers 
passed to the `keySequenceEncrypt` and `sequence` which the sequence that the algorithm follow to decrypt 
the array of characters and numbers.

```js
    /**
     * instanciate a salt object we are going to use to encrypt
     * the salt result
     * */
    const codehat = require('@codeinahat/crypto');
    const salt = new codehat.Salt();
    
    // generate a salt
    const newSalt = salt.generate();

    // encrypt the result
    const encrypted = codehat.Crypto.keSequenceEncrypt(newSalt.arr);

    // returns the KeyAndSequenceResult object
    // encrypted values
    encrypted.keyRing;

    // ecnription sequence
    encrypted.sequence
```


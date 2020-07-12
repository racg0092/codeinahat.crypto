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

There are currently two accesible classes in this module [Salt](###Salt) and [Crypto](###Crypto).

### Salt

Salt only has one `method` that you need to concern yourself with; `generate`. This method will return a `SaltResult` which is a class
with two properties `src` which is a random generated string of characters and `arr` which is a random generated `Array` of values.

```js
    // call the API
    const codehat = require('@codeinahat.crypto');

    // instanciate the class
    const salt = new codehat.Salt();

    // generate random string and array of character
    const newSalt = salt.generate();

    // string value
    newSalt.src

    // array value
    newSalt.arr
```
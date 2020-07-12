import { SaltResult } from './models/salt.result';
import { Utilities } from '../core';
export class Salt {
    /**
     * The SaltResult returns to values. @src and @arr
     * @src is the sting value of the salt result.
     * @arr is the array value of the salt result.
     */
    salt: SaltResult;
    /**
     * keyLength is the what determines how long the key is going to be.
     * The default value is 10.
     * @src in case of src it could be longer since some of the random values
     * could be double digit number.
     * @arr the length of the array will be determine by the keyLength value.
     */
    keyLength: number = 10;
    /**
     * range determines the diversite of the values.
     * Between 0 and 26 is the default values.
     * This means that it will look for any number at random
     * between 0 adn 26
     */
    range = {beg: 0, end: 26};
    /**
     * Constructor of Salt class.
     */
    constructor() {
        this.salt = new SaltResult();
    }

    /**
     * Returns a string of random character or an array of random values
     * @param keyLength the length of the array or string (defaults to 10)
     * @param range diversity of characters (defaults to {beg: 0 , end: 26})
     */
    generate(keyLength: number, range: {beg: number, end:number}) {
        this.keyLength = keyLength;
        this.range = range;
        this.validation();  
        let counter = 0;
        let keyRing = [];
        while(counter < this.keyLength){
            const random = this.range.beg === 0 ?
                Math.floor(Math.random() * this.range.end) :
                Math.floor((Math.random() * this.range.beg) * this.range.end);
            keyRing.push(Utilities.characterNumber(random));
            counter++
        }
        this.salt.arr = keyRing;
        this.salt.str = keyRing.toString();
        while(this.salt.str.indexOf(',') !== -1) {
            this.salt.str = this.salt.str.replace(',','');
        }
        return this.salt
    }

    /**
     * This method is meant for internall use only.
     */
    private validation(): void {
        this.keyLength = this.keyLength === undefined || this.keyLength === null ?
            10 : this.keyLength;
        this.range = this.range === undefined || this.keyLength === null ?
            {beg: 0, end: 26} : this.range;
    }
}
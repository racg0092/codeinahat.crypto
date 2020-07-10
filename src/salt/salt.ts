import { Range } from './models/range.model';
import { SaltResult } from './models/salt.result';
import { Utilities } from '../core';
export class Salt {
    salt: SaltResult;
    keyLength: number = 10;
    range: Range = {beg: 0, end: 26};
    isarray: boolean = true;
    /**
     * Constructor of Salt class.
     */
    constructor() {
        this.salt = new SaltResult();
    }

    /**
     * Returns a string of random character or an array of random values
     * @param keyLength the length of the array or string
     * @param range diversity of characters
     */
    generate(keyLength: number, range: Range) {
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

    private validation(): void {
        this.keyLength = this.keyLength === undefined || this.keyLength === null ?
            10 : this.keyLength;
        this.range = this.range === undefined || this.keyLength === null ?
            {beg: 0, end: 26} : this.range;
        this.isarray = this.isarray === undefined || this.isarray === null ?
            true : false;
    }
}
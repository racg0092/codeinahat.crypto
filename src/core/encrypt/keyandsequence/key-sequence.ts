import { isBrowser, isNode } from 'browser-or-node';
import  * as fs from 'fs';

export class KeyAndSequence {
    equationValues: number[] = [];
    path = `${__dirname}\\..\\..\\..\\..\\..\\..\\keys`;
    storageName = 'codehat-crypto-keySequenceValues';
    onetimepad = true;
    constructor(ontimepad?: boolean) {
        if (ontimepad !== undefined) this.onetimepad = ontimepad;
        if (!this.onetimepad) {
            if (isBrowser) this.browserProtocol(); 
            if (isNode) this.nodeProtocol();
        }
    }


    newEquationValues(): void {
        let count = 0;
        while (count < 3) {
            this.equationValues.push(Math.floor((Math.random() * 30) + 1));
            count++;
        }
    } 

    //TODO (needs browser testing)
    browserProtocol(): void {
        console.log('is browser');
        if(window.localStorage.getItem(this.storageName) === undefined) {
            this.newEquationValues();
            window.localStorage.setItem(this.storageName, JSON.stringify(this.equationValues));
        } else {
            this.equationValues = JSON.parse(window.localStorage.getItem(this.storageName));
        }
    }
    /**
     * Encrypst Values in an array and returns key and sequence.
     * @param keyRing an array on any type
     */
    encrypt(keyRing: any[] | string): KeyAndSequenceResult {
        let newkeyRing = [];
        let sequence = [];
        if (this.onetimepad) this.newEquationValues();
        for(let key of keyRing) {
            let value;
            if(key === ' ') {
                value = key;
                sequence.push('c');
            }
            else if (isNaN(key)) {
                value = key.charCodeAt(0);
                sequence.push('c')
            }
            else {
                value = key;
                sequence.push('n')
            }
            value = parseInt(value);
            newkeyRing.push(this.equation(value, 'encrypt'));
        }
        const result: KeyAndSequenceResult = {
            keyRing: newkeyRing,
            sequence,
            onetimeValues: this.onetimepad ? this.equationValues : undefined
        };
        return result;
    }

    decrypt(keyRing: any[], sequence: string[], onetimepadValues?: number[]): string {
        let newKeyRing: string;
        this.equationValues = onetimepadValues !== undefined ? onetimepadValues : this.equationValues;
        for(let x = 0; x < keyRing.length; x++) {
            let value;
            let key = keyRing[x];
            if (key === ' ')
                value = key;
            else if(sequence[x] === 'c') {
                value = this.equation(key, 'decrypt');
                value = String.fromCharCode(value);
            }
            else {
                value = key;
                value = this.equation(key, 'decrypt');
                value = value.toString();
            }
            newKeyRing = newKeyRing === undefined ? value : newKeyRing + value;
        }
        return newKeyRing;
    }

    equation(value: number, direction: string): number {
        if (direction === 'encrypt') 
            return ((value + this.equationValues[0]) - this.equationValues[1]) * this.equationValues[2];
        return ((value / this.equationValues[2]) + this.equationValues[1]) - this.equationValues[0];
    }

    nodeProtocol(): void {
        if(this.checkKeysDir()) {
            this.checkKeysFile();
        }
    }
    checkKeysFile(): void {
        try{
            const fileBUffer = fs.readFileSync(`${this.path}\\${this.storageName}.json`);
            this.equationValues = JSON.parse(fileBUffer.toLocaleString());
        }
        catch (e) {
            if(e.message.indexOf('no such file or directory') !== -1) {
                this.newEquationValues();
                let data = JSON.stringify(this.equationValues);
                let buffer = Buffer.from(data, 'utf-8');
                try {
                    fs.writeFileSync(`${this.path}\\${this.storageName}.json`, buffer);
                } 
                catch(e) {
                    console.group('codeinahat-message');
                    console.error('Error while attemting to save encryption function variables');
                    console.info('This encryption can not be decrypted by the system itself');
                    console.groupEnd();
                }
            }
        }
    }
    checkKeysDir(): boolean {
        try{
            const dir = fs.readdirSync(`${this.path}`);
            return true;
        }
        catch(e){
            if(e.message.indexOf('no such file or directory') !== -1) {
                try{
                    fs.mkdirSync(`${this.path}`)
                    return true;
                }
                catch(e){
                    console.group('codeinahat-message');
                    console.error('Error while attemting to create key directory');
                    console.error(e.message);
                    console.groupEnd();
                    return false;
                }
            }
            return false;
        }
    }
    deleteFile(): boolean {
        try
        {
            const dir = fs.readdirSync(this.path);
            if(dir.length > 0) 
            {
                for(let item of dir) {
                    if (item === `${this.storageName}.json`){
                        fs.unlinkSync(`${this.path}\\${this.storageName}.json`);
                        break;
                    }
                }
            }
            return true;
        }
        catch(e) {
            console.log(e.message);
            return false;
        }
    }
    deleteDir(): boolean {
        try {
            fs.rmdirSync(this.path);
            return true;
        }
        catch(e) {
            console.log(e.message);
            return false;
        }
    }
}


export class KeyAndSequenceResult {
    keyRing: any[];
    sequence: string[];
    onetimeValues?: number[];
}

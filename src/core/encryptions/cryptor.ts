import { KeyAndSequence, KeyAndSequenceResult, StorageMethod } from './keyandsequence/key-sequence';
export class Crypto {
    static keySequence: KeyAndSequence;
    constructor() {}

    static keySequenceEncrypt(keyRing: any[], ontimepad?: boolean, storageMethod?: StorageMethod): KeyAndSequenceResult {
        this.keySequence = ontimepad !== undefined ? 
            new KeyAndSequence(ontimepad, storageMethod) : 
            new KeyAndSequence();
        return this.keySequence.encrypt(keyRing);
    }
    static async asyncKeySequenceEncrypt(keyRing: any[], ontimepad?: boolean, storageMethod?: StorageMethod): Promise<KeyAndSequenceResult> {
        this.keySequence = ontimepad !== undefined ? 
            new KeyAndSequence(ontimepad, storageMethod) : 
            new KeyAndSequence();
        if (storageMethod.method === 'database') {
            const result = await this.keySequence.databaseProtocol();
            if(result) {
                return this.keySequence.encrypt(keyRing);
            }
            return null;
        } else {
            return  this.keySequence.encrypt(keyRing);
        }
    }
    static keySequenceDecrypt(keyRing: any[], sequence: string[], onetimepadValues?: number[], storageMethod?: StorageMethod): string {
        this.keySequence = onetimepadValues === undefined ? 
            new KeyAndSequence(false, storageMethod) :
            new KeyAndSequence();
        this.keySequence.equationValues = onetimepadValues !== undefined ? 
            onetimepadValues :
            this.keySequence.equationValues;
        return this.keySequence.decrypt(keyRing, sequence, onetimepadValues);
    }
    static async asyncKeySequenceDecrypt(keyRing: any[], sequence: string[], onetimepadValues?: number[], storageMethod?: StorageMethod): Promise<string> {
        this.keySequence = onetimepadValues === undefined ? 
            new KeyAndSequence(false, storageMethod) :
            new KeyAndSequence();
        this.keySequence.equationValues = onetimepadValues !== undefined ? 
            onetimepadValues :
            this.keySequence.equationValues;
        if(storageMethod.method === 'database') {
            const result = await this.keySequence.databaseProtocol();
            if(result) {
                return this.keySequence.decrypt(keyRing, sequence);
            }
        } else {
            return this.keySequence.decrypt(keyRing, sequence, onetimepadValues);
        }
        return 'error!!';
    }
    static deleteKeySequenceFileStorage(): boolean {
        this.keySequence = new KeyAndSequence();
        return this.keySequence.deleteFile();
    }
    static deleteKeyDir(): boolean {
        this.keySequence = new KeyAndSequence();
        return this.keySequence.deleteDir();
    }
}

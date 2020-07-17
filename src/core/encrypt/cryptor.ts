import { KeyAndSequence, KeyAndSequenceResult } from './keyandsequence/key-sequence';
import { threadId } from 'worker_threads';
export class Crypto {
    static keySequence: KeyAndSequence;
    constructor() {}

    static keySequenceEncrypt(keyRing: any[], ontimepad?: boolean): KeyAndSequenceResult {
        this.keySequence = ontimepad !== undefined ? 
            new KeyAndSequence(ontimepad) : 
            new KeyAndSequence();
        return this.keySequence.encrypt(keyRing);
    }
    static keySequenceDecrypt(keyRing: any[], sequence: string[], onetimepadValues?: number[]): string {
        this.keySequence = onetimepadValues === undefined ? 
            new KeyAndSequence(false) :
            new KeyAndSequence();
        this.keySequence.equationValues = onetimepadValues !== undefined ? 
            onetimepadValues :
            this.keySequence.equationValues;
        return this.keySequence.decrypt(keyRing, sequence, onetimepadValues);
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

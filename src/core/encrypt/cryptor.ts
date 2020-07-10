import { KeyAndSequence, KeyAndSequenceResult } from './keyandsequence/key-sequence';
export class Crypto {
    constructor() {}

    static keySequenceEncrypt(keyRing: any[]): KeyAndSequenceResult {
        return KeyAndSequence.encrypt(keyRing);
    }
    static keySequenceDecrypt(keyRing: any[], sequence: string[]): string {
        return KeyAndSequence.decrypt(keyRing, sequence);
    }
}

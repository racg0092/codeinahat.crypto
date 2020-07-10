export class KeyAndSequence {

    constructor(
        public equationValues: number[] = [20,5,2]
    ) {}
    /**
     * Encrypst Values in an array and returns key and sequence.
     * @param keyRing an array on any type
     */
    static encrypt(keyRing: any[]): KeyAndSequenceResult {
        let newkeyRing = [];
        let sequence = [];
        for(let key of keyRing) {
            let value;
            if (isNaN(key)) {
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
            sequence
        };
        return result;
    }

    static decrypt(keyRing: any[], sequence: string[]): string {
        let newKeyRing: string;
        for(let x = 0; x < keyRing.length; x++) {
            let value;
            let key = keyRing[x];
            if(sequence[x] === 'c') {
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

    static equation(value: number, direction: string): number {
        if (direction === 'encrypt') 
            return ((value + 20) - 5) * 2;
        return ((value / 2) + 5) - 20;
    }
}


export class KeyAndSequenceResult {
    keyRing: any[];
    sequence: string[];
}

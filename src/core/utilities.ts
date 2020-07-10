export class Utilities {



    static characterNumber(number: number): string | number {
        if(Math.floor(Math.random() * 2))
            return String.fromCharCode(97 + number);
        return number;
    }
}
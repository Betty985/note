namespace Validation1 {
    export  interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    let lettersRegexp = /^[A-Za-z]+$/;
    let numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
    // Some samples to try
    var strings1 = ["Hello", "98052", "101"];

    // Validators to use
    // let validators: { [s: string]: StringValidator; } = {};
    // validators["ZIP code"] = new ZipCodeValidator();
    // validators["Letters only"] = new LettersOnlyValidator();
    let validators1: { [s: string]: Validation1.StringValidator; } = {};
    validators["ZIP code"] = new Validation1.ZipCodeValidator();
    validators["Letters only"] = new Validation1.LettersOnlyValidator();
    // Show whether each string passed each validator
    for (let s of strings) {
        for (let name in validators) {
            let isMatch = validators[name].isAcceptable(s);
            console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
        }
    }

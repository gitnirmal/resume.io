import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable()
export class DateValidators {
    static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const date1 = c.get(dateField1).value;
            const date2 = c.get(dateField2).value;
            if ((date1 !== null && date2 !== null) && (date1.jsdate !== null && date2.jsdate !== null) && date1.jsdate > date2.jsdate) {
                return validatorField;
            }
            return null;
        };
    }

    static dateGreaterThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const date1 = c.get(dateField1).value;
            const date2 = c.get(dateField2).value;
            if ((date1 !== null && date2 !== null) && (date1.jsdate !== null && date2.jsdate !== null) && date2.jsdate > date1.jsdate) {
                return validatorField;
            }
            return null;
        };
    }

}
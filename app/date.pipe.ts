import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'DisplayDate'
})

export class DisplayDatePipe extends DatePipe implements PipeTransform {
    transform(value: any) {
        if (typeof value !== 'undefined' && value !== null && typeof value.jsdate !== 'undefined' && value.jsdate !== null) {
            return super.transform(value.jsdate, 'mediumDate');
        } else {
            return value;
        }
    }
}
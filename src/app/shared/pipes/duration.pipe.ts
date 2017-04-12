import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
    constructor() { }

    transform(content: number): string {
        if (typeof content === 'undefined') {
            return '-';
        }

        const hours = Math.floor(content / 60);
        const minutes = content % 60;
        if (hours === 0) {
            return `${minutes} min`;
        } else if (minutes === 0) {
            return `${hours} h`;
        } else {
            return `${hours} h ${minutes} min`;
        }
    }
}

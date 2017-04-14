import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {

    transform(duration: number): string {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        if (hours === 0) {
            return `${minutes} min`;
        } else if (minutes === 0) {
            return `${hours} h`;
        } else {
            return `${hours} h ${minutes} min`;
        }
    }
}

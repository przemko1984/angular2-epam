import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '../../business-entities';

@Pipe({name: 'filterByName'})
export class FilterByNamePipe implements PipeTransform {

    transform(array: ICourse[], field: string): ICourse[] {
        if (!array) {
            return;
        }

        return array.filter(({name}) => name.toLowerCase().includes(field));
    }
}

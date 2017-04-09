import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filterByName'})
export class FilterByNamePipe implements PipeTransform {
    constructor() { }

    transform(array: any[], field: any): any[] {
        if (!array) {
            return;
        }

        return array.filter((item) => {
            return !!item.name.match(new RegExp(`^.*${field}.*\$`, 'i'));
        });
    }
}

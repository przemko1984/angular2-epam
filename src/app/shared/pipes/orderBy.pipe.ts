import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
    constructor() { }

    transform(array: any[], field: any): any[] {
        if (!array) {
            return;
        }

        array.sort((a: any, b: any) => {
            if (a[field] < b[field] ) {
                return -1;
            } else if (a[field] > b[field] ) {
                return 1;
            } else {
                return 0;
            }
        });

        return array;
    }
}
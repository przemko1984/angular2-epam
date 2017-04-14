import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {

    transform(array: any[], field: any): any[] {
        if (!array) {
            return;
        }

        array.sort((a: any, b: any) => a[field] - b[field]);
        return array;
    }
}

import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from './../../business-entities/course.interface';

@Pipe({name: 'outdatedCourseFilter'})
export class OutdatedCourseFilterPipe implements PipeTransform {
    constructor() { }

    transform(array: ICourse[]): ICourse[] {
        if (!array) {
            return;
        }

        const currentDate: Date = new Date();
        const dayInMilisecond = 24 * 60 * 60 * 1000;
        const lastDay = new Date(currentDate.getTime() - 14 * dayInMilisecond);

        return array.filter((item: ICourse) => {
            return item.date >= lastDay;
        });
    }
}

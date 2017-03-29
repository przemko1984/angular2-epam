import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICourse } from '../../business-entities/';

const DELAY = 500;

@Injectable()
export class CourseService {

    private courseList: ICourse[] = [{
            id: 'uuid1',
            name: 'Course 1',
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 'uuid2',
            name: 'Course 2',
            duration: 15,
            createDate: new Date('2016-12-10'),
            description: 'Lorem ipsum dolor sit amet 2, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. .'
        }, {
            id: 'uuid3',
            name: 'Course 3',
            duration: 20,
            createDate: new Date('2017-01-10'),
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }];

    constructor() { }

    getList(): Observable<ICourse[]> {
        return Observable.of<ICourse[]>(this.courseList.slice()).delay(DELAY);
    }

    create(): Observable<ICourse> {
        let no: number = this.courseList.length;
        let newCourse: ICourse = {
            id: `uuid${no++}`,
            name: `Course ${no++}`,
            duration: 10,
            createDate: new Date('2016-08-10'),
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        };

        this.courseList.push(newCourse);

        return Observable.of<ICourse>(newCourse).delay(DELAY);
    }

    getById(id: string): Observable<ICourse> {
        return Observable.of<ICourse>(this.courseList.find((item: ICourse) => item.id === id)).delay(DELAY);
    }

    update(id: string): Observable<ICourse> {
        let course: ICourse = this.courseList.find((item: ICourse) => item.id === id);
        let updateCourse: any = {name: `${course.name} [edited]`};

        if (course) {
            const updated = Object.assign({}, course, updateCourse);
            this.courseList.splice(this.courseList.findIndex((item) => item.id === id), 1, updated);

            return Observable.of<ICourse>(updated).delay(DELAY);
        }
        return Observable.of<ICourse>(null);
    }

    remove(id: string): Observable<boolean> {
        this.courseList.splice(this.courseList.findIndex((item) => item.id === id), 1);
        return Observable.of(true).delay(DELAY);
    }

}

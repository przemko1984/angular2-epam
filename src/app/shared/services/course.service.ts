import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICourse } from '../../business-entities/';
import { FilterByNamePipe } from '../pipes';

const DELAY = 1500;

@Injectable()
export class CourseService {

    private courseList: ICourse[] = [{
            id: 'uuid1',
            name: 'Course 1',
            duration: 10,
            createDate: new Date('2017-08-10'),
            topRated: false,
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 'uuid2',
            name: 'Course 2',
            duration: 60,
            createDate: new Date('2016-12-10'),
            topRated: true,
            description: 'Lorem ipsum dolor sit amet 2, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. .'
        }, {
            id: 'uuid3',
            name: 'Course 3',
            duration: 20,
            createDate: new Date('2017-04-01'),
            topRated: true,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 'uuid4',
            name: 'Course 4',
            duration: 200,
            createDate: new Date('2017-03-30'),
            topRated: false,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 'uuid5',
            name: 'Course 5',
            duration: 80,
            createDate: new Date('2017-04-11'),
            topRated: false,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }];

    private courseList$: Observable<ICourse[]>;
    private courseListSubject: Subject<ICourse[]> = new Subject<ICourse[]>();

    constructor(private _filterByName: FilterByNamePipe) {
        this.courseList$ = this.courseListSubject
            .asObservable()
            .map(this.mapData);
    }

    getList(): Observable<ICourse[]> {
        return this.courseList$.delay(DELAY);
    }

    loadList() {
        this.courseListSubject.next(this.courseList.slice());
    }

    create(): Observable<ICourse> {
        let no: number = this.courseList.length;
        let newCourse: ICourse = {
            id: `uuid${no++}`,
            name: `Course ${no++}`,
            duration: 10,
            createDate: new Date(),
            topRated: false,
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        };

        this.courseList.push(newCourse);
        this.courseListSubject.next(this.courseList.slice());

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

            this.courseListSubject.next(this.courseList.slice());
            return Observable.of<ICourse>(updated).delay(DELAY);
        }
        return Observable.of<ICourse>(null);
    }

    remove(id: string): Observable<boolean> {
        this.courseList.splice(this.courseList.findIndex((item) => item.id === id), 1);
        this.courseListSubject.next(this.courseList.slice());
        return Observable.of(true).delay(DELAY);
    }

    search(name) {
        this.courseListSubject.next(this._filterByName.transform(this.courseList.slice(), name));
    }

    private mapData(res: ICourse[]) {
        console.log('mapping', res);
        // res.map((item) => {
        //     return Object.assign(item, {name: `-${item.name}-`});
        // });
        return res;
    }

}

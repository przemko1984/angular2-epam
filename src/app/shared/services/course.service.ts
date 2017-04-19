import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ICourse, INewCourse } from '../../business-entities/';
import { FilterByNamePipe } from '../pipes';
import { AuthorizedHttp } from './authorized-http.service';

const DELAY = 500;

@Injectable()
export class CourseService {

    limit: number = 5;
    private serviceUrl: string = 'http://localhost:3004/courses';
    private courseList: ICourse[] = [{
            id: 1,
            name: 'Course 1',
            length: 10,
            date: new Date('2017-08-10'),
            isTopRated: false,
            description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
                ' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 2,
            name: 'Course 2',
            length: 60,
            date: new Date('2016-12-10'),
            isTopRated: true,
            description: 'Lorem ipsum dolor sit amet 2, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. .'
        }, {
            id: 3,
            name: 'Course 3',
            length: 20,
            date: new Date('2017-04-01'),
            isTopRated: true,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 4,
            name: 'Course 4',
            length: 200,
            date: new Date('2017-03-30'),
            isTopRated: false,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }, {
            id: 5,
            name: 'Course 5',
            length: 80,
            date: new Date('2017-04-11'),
            isTopRated: false,
            description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
                'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
                'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
        }];

    private courseList$: Observable<ICourse[]>;
    private courseListSubject: Subject<ICourse[]> = new Subject<ICourse[]>();

    constructor(private http: Http, private _filterByName: FilterByNamePipe) {
        this.courseList$ = this.courseListSubject
            .asObservable();
    }

    getList(): Observable<ICourse[]> {
        return this.courseList$.delay(DELAY);
    }

    loadList(start: string = '0') {
        // this.courseListSubject.next(this.courseList.slice());
        let requestOptions = new RequestOptions();
        let params = new URLSearchParams();
        params.set('start', start);
        params.set('count', this.limit.toString());
        requestOptions.search = params;

        this.http.get(this.serviceUrl, requestOptions)
            .map(this.mapData)
            .map(this.mapToCourses)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            })
            .subscribe((courses: ICourse[]) => {
                console.log(courses);
                this.courseListSubject.next(courses);
            });
    }

    create(newCourse: INewCourse): Observable<ICourse> {
        let timestamp: number = new Date().getTime();
        let course: ICourse = Object.assign(newCourse, {
            id: timestamp,
            isTopRated: false,
            date: new Date(newCourse.date)
        });

        this.courseList.push(course);
        this.courseListSubject.next(this.courseList.slice());

        return Observable.of<ICourse>(course).delay(DELAY);
    }

    getById(id: number): Observable<ICourse> {
        return this.http.get(`${this.serviceUrl}/${id}`)
            .map(this.mapData)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            })
            .map(this.mapToCourse);
    }

    update(id: number): Observable<ICourse> {
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

    remove(id: number): Observable<boolean> {
        this.courseList.splice(this.courseList.findIndex((item) => item.id === id), 1);
        this.courseListSubject.next(this.courseList.slice());
        return Observable.of(true).delay(DELAY);
    }

    search(name) {
        this.courseListSubject.next(this._filterByName.transform(this.courseList.slice(), name));
    }

    private mapData(res: Response) {
        return res.json();
    }

    private mapToCourses(res: ICourse[]) {
        return res.map((course: ICourse) => {
            return Object.assign(course, {date: new Date(course.date)});
        });
    }

    private mapToCourse(course: ICourse) {
        return Object.assign(course, {date: new Date(course.date)});
    }

}

import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

import { ICourse, INewCourse } from '../../business-entities/';
import { FilterByNamePipe } from '../pipes';
import { AuthorizedHttp } from './authorized-http.service';
import {
    COURSES_LOADED,
    INIT_COURSES,
    ICoursesReducer
} from '../../reducers';

const DELAY = 500;

@Injectable()
export class CourseService implements OnDestroy {

    limit: number = 5;
    noMoreResults$: Observable<boolean>;
    private serviceUrl: string = 'http://localhost:3004/courses';

    private courseList$: Observable<ICourse[]>;
    // private courseListSubject: Subject<ICourse[]> = new Subject<ICourse[]>();
    private sub: Subscription;

    constructor(
        private http: AuthorizedHttp,
        private _filterByName: FilterByNamePipe,
        private store: Store<any>
    ) {
        // this.courseList$ = this.courseListSubject
        //     .asObservable();
        const store$ = this.store.select<ICoursesReducer>('courses');
        this.courseList$ = store$.map((data) => data['list']);
        this.noMoreResults$ = store$.map((data) => data['noMoreResults']);
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    getList(): Observable<ICourse[]> {
        return this.courseList$.delay(DELAY);
    }

    loadList(start: number = 0, search: string = '', limit: number = this.limit) {
        let requestOptions = new RequestOptions();
        let params = new URLSearchParams();
        params.set('start', start.toString());
        params.set('count', limit.toString());
        if (search) {
            params.set('query', search);
        }
        requestOptions.search = params;

        this.sub = this.http.get(this.serviceUrl, requestOptions)
            .map(this.mapData)
            .map(this.mapToCourses)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            })
            .subscribe((courses: ICourse[]) => {
                console.log('loaded courses:', courses);
                this.store.dispatch({
                    type: COURSES_LOADED,
                    payload: {
                        list: courses
                    }
                });
                // this.courseListSubject.next(courses);
            });
    }

    search(search: string = '') {
        this.store.dispatch({ type: INIT_COURSES});
        this.loadList(0, search);
    }

    create(newCourse: INewCourse): Observable<ICourse> {
        let timestamp: number = new Date().getTime();
        let course: ICourse = Object.assign(newCourse, {
            id: timestamp,
            isTopRated: false,
            date: new Date(newCourse.date).toString()
        });

        return this.http.post(this.serviceUrl, course)
            .map(this.mapData)
            // .map((res) => res)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            });
    }

    getById(id: number): Observable<ICourse> {
        return this.http.get(`${this.serviceUrl}/${id}`)
            .map(this.mapData)
            .map(this.mapToCourse)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            });
    }

    update(id: number, course: ICourse): Observable<ICourse> {

        return this.http.put(`${this.serviceUrl}/${id}`, course)
            .map(this.mapData)
            // .map((res) => res)
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            });
    }

    remove(id: number): Observable<boolean> {
        return this.http.delete(`${this.serviceUrl}/${id}`)
            .map(this.mapData)
            .map((res) => {
                this.store.dispatch({ type: RESET_COURSES});

                return true;
            })
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            });
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

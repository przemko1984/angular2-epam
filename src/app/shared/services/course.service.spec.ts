import {
    async,
    getTestBed,
    TestBed
} from '@angular/core/testing';

// core testing imports
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { Store } from '@ngrx/store';

// http imports
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { AuthorizedHttp } from './authorized-http.service';
import { CourseService } from './course.service';
import { FilterByNamePipe } from '../pipes';
import { ICourse, INewCourse } from '../../business-entities/';
import { MockStore } from '../../test-helpers';

describe('Course Service:', () => {
    let backend;
    let courseService;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                FilterByNamePipe,
                CourseService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (xhrBackend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(xhrBackend, defaultOptions);
                    }
                },
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: AuthorizedHttp,
                    useFactory: (xhrBackend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new AuthorizedHttp(xhrBackend, defaultOptions);
                    }
                },
                {
                    provide: Store,
                    // useClass: MockStore
					useValue: new MockStore({})
                }
            ]
        });

        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        courseService = testbed.get(CourseService);
    }));

    it('should return course on getById()', () => {
        const testCourse = {
            id: 1,
            name: 'name',
            description: 'description',
            isTopRated: false,
            date: '2017-09-28T04:39:24+00:00',
            authors: [{
                id: 1370,
                firstName: 'Polly',
                lastName: 'Sosa'
            }],
            length: 157
        };

        setupConnections(backend, {
            body: testCourse,
            status: 200
        });

        courseService.getById(1).subscribe((course: ICourse) => {
            expect(course.id).toBe(1);
            expect(course.name).toBe('name');
            expect(course.description).toBe('description');
            expect(course.isTopRated).toBeFalsy();
            expect(course.authors.length).toBe(1);
            expect(course.authors[0].id).toBe(1370);
            expect(course.length).toBe(157);
        });
    });

    function setupConnections(mockedBackend: MockBackend, options: any) {
        mockedBackend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);
        });
    }
});

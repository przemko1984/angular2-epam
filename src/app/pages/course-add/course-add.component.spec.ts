import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';

import { CourseAddPageModule } from './course-add.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseService, LoaderService, AuthorService, BreadcrumbService } from './../../shared/services';

import { CourseAddPageComponent } from './course-add.component';
import { MockStore, MockAuthorService } from '../../test-helpers';
import { courseReducer } from '../../reducers';

describe('CourseAddPageComponent component: ', () => {
    let comp: CourseAddPageComponent;
    let fixture: ComponentFixture<CourseAddPageComponent>;
    let courseServiceStub;
    let loaderServiceStub;
    let breadcrumbServiceStub;
    let authorService;
    let _store;
    let testCourse = {
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

    // beforeEach(() => {
    //     courseServiceStub = {

    //     };

    //     loaderServiceStub = {

    //     };

    //     // authorServiceStub = {
    //     //     loadList: () => {},
    //     //     getList: () => {}
    //     // };

    //     breadcrumbServiceStub = {

    //     };

    //     fixture = TestBed.configureTestingModule({
    //         imports: [
    //             CourseAddPageModule,
    //             SharedModule.forRoot()
    //         ],
    //         providers: [
    //             {provide: Router, useClass: RouterModule},
    //             {provide: ActivatedRoute, useValue: {params: Observable.of({})}},
    //             {provide: CourseService, useValue: courseServiceStub },
    //             {provide: LoaderService, useValue: loaderServiceStub },
    //             {provide: AuthorService, useClass: MockAuthorService },
    //             {provide: BreadcrumbService, useValue: breadcrumbServiceStub },
    //             {
    //                 provide: Store,
    //                 // useClass: MockStore
    //              useValue: new MockStore({course: {
    //                  id: 1,
    //                  name: 'name',
    //                  description: 'description',
    //                  isTopRated: false,
    //                  date: '2017-09-28T04:39:24+00:00',
    //                  authors: [{
    //                      id: 1370,
    //                      firstName: 'Polly',
    //                      lastName: 'Sosa'
    //                  }],
    //                  length: 157
    //              }})
    //             }

    //         ]
    //     }).createComponent(CourseAddPageComponent);

    //     comp = fixture.componentInstance;
    // });

    beforeEach(() => {
        courseServiceStub = {

        };

        loaderServiceStub = {

        };

        // authorServiceStub = {
        //     loadList: () => {},
        //     getList: () => {}
        // };

        breadcrumbServiceStub = {

        };

        TestBed.configureTestingModule({
            imports: [
                CourseAddPageModule,
                SharedModule.forRoot()
                // StoreModule.provideStore(courseReducer)
            ],
            providers: [
                {provide: Router, useClass: RouterModule},
                {provide: ActivatedRoute, useValue: {params: Observable.of({})}},
                {provide: CourseService, useValue: courseServiceStub },
                {provide: LoaderService, useValue: loaderServiceStub },
                {provide: AuthorService, useClass: MockAuthorService },
                {provide: BreadcrumbService, useValue: breadcrumbServiceStub },
                {
                    provide: Store,
                    // useClass: MockStore
                    useValue: new MockStore({course: {course: null}})
                }

            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CourseAddPageComponent);

        comp = fixture.componentInstance;
        // get the injected instances
        _store = fixture.debugElement.injector.get(Store);
    });

    it('should create component', () => expect(comp).toBeDefined() );

    describe('on init', () => {
        it('should run \'AuthorService.loadList()\'', () => {
            // _store.next({tags: testCourse});
            authorService = fixture.debugElement.injector.get(AuthorService);

            spyOn(authorService, 'loadList');
            fixture.detectChanges();
            expect(authorService.loadList).toHaveBeenCalled();
        });

        // it('should run \'AuthorService.getList()\'', () => {
        //     authorService = fixture.debugElement.injector.get(AuthorService);

        //     spyOn(authorService, 'getList');
        //     fixture.detectChanges();
        //     expect(authorService.getList).toHaveBeenCalled();
        // });
    });

});

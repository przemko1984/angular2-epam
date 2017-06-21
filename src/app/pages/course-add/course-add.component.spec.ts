import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';

import { CourseAddPageModule } from './course-add.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseService, LoaderService, AuthorService, BreadcrumbService } from './../../shared/services';

import { CourseAddPageComponent } from './course-add.component';
import { MockStore, MockAuthorService } from '../../test-helpers';
import { courseReducer, INIT_COURSE } from '../../reducers';

describe('CourseAddPageComponent component: ', () => {
    let comp: CourseAddPageComponent;
    let fixture: ComponentFixture<CourseAddPageComponent>;
    let courseServiceStub;
    let loaderServiceStub;
    let breadcrumbServiceStub;
    let authorService;
    let store;

    beforeEach(() => {
        courseServiceStub = {

        };

        loaderServiceStub = {

        };

        breadcrumbServiceStub = {

        };

        TestBed.configureTestingModule({
            imports: [
				CourseAddPageModule
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
        // fixture.detectChanges();
        comp = fixture.componentInstance;

        // get the injected instances
        store = fixture.debugElement.injector.get(Store);
        authorService = fixture.debugElement.injector.get(AuthorService);
    });

    it('should create component', () => expect(comp).toBeDefined() );

    // it('should create form with class \'course-add\' in component', () => {
    //     const deElems = fixture.debugElement.query(By.css('form'));
    //     // el =  de.nativeElement;
    //     fixture.detectChanges();
    //     expect(deElems).not.toBeNull();
    // });

    describe('on init', () => {
        it('should run \'AuthorService.loadList()\'', () => {
            spyOn(authorService, 'loadList');
            fixture.detectChanges();
            expect(authorService.loadList).toHaveBeenCalled();
        });

        it('should run \'AuthorService.getList()\'', () => {
            spyOn(authorService, 'getList').and.callFake(() => Observable.of({}));
            fixture.detectChanges();
            expect(authorService.getList).toHaveBeenCalled();
        });

        it('should run \'Store.dispatch()\'', () => {
            spyOn(store, 'dispatch');
            fixture.detectChanges();
            expect(store.dispatch).toHaveBeenCalledWith({type: INIT_COURSE});
        });
    });

});

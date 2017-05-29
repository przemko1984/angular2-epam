import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CourseAddPageModule } from './course-add.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseService, LoaderService, AuthorService, BreadcrumbService } from './../../shared/services';

import { CourseAddPageComponent } from './course-add.component';
import { MockStore, MockAuthorService } from '../../test-helpers';

describe('CourseAddPageComponent component: ', () => {
    let comp: CourseAddPageComponent;
    let fixture: ComponentFixture<CourseAddPageComponent>;
    let courseServiceStub;
    let loaderServiceStub;
    let breadcrumbServiceStub;
	let authorService;

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

        fixture = TestBed.configureTestingModule({
            imports: [
                CourseAddPageModule,
                SharedModule.forRoot()
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
                    useClass: MockStore
                }

            ]
        }).createComponent(CourseAddPageComponent);

        comp = fixture.componentInstance;
    });

    it('should create component', () => expect(comp).toBeDefined() );

    describe('on init', () => {
        it('should run \'AuthorService.loadList()\'', () => {
			authorService = fixture.debugElement.injector.get(AuthorService);

            spyOn(authorService, 'loadList');
            fixture.detectChanges();
            expect(authorService.loadList).toHaveBeenCalled();
        });

		// it('should run \'AuthorService.getList()\'', () => {
		// 	authorService = fixture.debugElement.injector.get(AuthorService);

        //     spyOn(authorService, 'getList');
        //     fixture.detectChanges();
        //     expect(authorService.getList).toHaveBeenCalled();
        // });
    });

});

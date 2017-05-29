import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CourseAddPageModule } from './course-add.module';
import { SharedModule } from './../../shared/shared.module';
import { CourseService, LoaderService, AuthorService, BreadcrumbService } from './../../shared/services';

import { CourseAddPageComponent } from './course-add.component';
import { MockStore } from '../../test-helpers';

describe('CourseAddPageComponent component: ', () => {
    let comp: CourseAddPageComponent;
    let fixture: ComponentFixture<CourseAddPageComponent>;
    let courseServiceStub;
    let loaderServiceStub;
    let authorServiceStub;
    let breadcrumbServiceStub;

    beforeEach(() => {
        courseServiceStub = {

        };

        loaderServiceStub = {

        };

        authorServiceStub = {

        };

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
                {provide: AuthorService, useValue: authorServiceStub },
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
});

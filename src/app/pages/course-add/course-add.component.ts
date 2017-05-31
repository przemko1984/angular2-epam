import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { uniqBy }  from 'lodash';
// ngrx example
import { Store } from '@ngrx/store';

import {
	INIT_COURSE,
	COURSE_LOADED,
	COURSE_SAVED,
	COURSE_SAVE_FAILURE,
	COURSE_LOAD_FAILURE,
	IAppStore
} from '../../reducers';
import { BasePage } from '../base.page.component';
import { ICourse, IAuthor } from './../../business-entities';
import { CourseService, LoaderService, AuthorService, BreadcrumbService } from './../../shared/services';

@Component({
	selector: 'course-add-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./course-add.component.scss')],
	template: require('./course-add.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseAddPageComponent extends BasePage {

	formModel: any;
	authors: IAuthor[] ;
	private courseId: string;
	private course: ICourse;

	constructor(
		private ref: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute,
		private courseService: CourseService,
		private loaderService: LoaderService,
		private authorService: AuthorService,
		private breadcrumbService: BreadcrumbService,
		private store: Store<IAppStore>
	) {
		super();
	}

	onInit() {
		this.authors = [];
		this.loadDefaultAuthors();
		this.subscribeCourseId();
		this.store.dispatch({type: INIT_COURSE});

		this.store.select((store) => store.course.course)
		.subscribe((course) => {
			this.formModel = course;
		});
	}

	onDestroy() {

	}

	saveCourse(courseForm: NgForm) {
		this.loaderService.show();
		if (this.courseId) {
			this.updateCourse(courseForm);
		} else {
			this.addCourse(courseForm);
		}
	}

	private updateCourse(courseForm: NgForm) {
		const sub = this.courseService.update(+this.courseId, courseForm.value)
			.subscribe(
				(resp) => {
					console.log('course edited', resp);
					this.store.dispatch({
						type: COURSE_SAVED,
						payload: {
							course: resp
						}
					});
					this.loaderService.hide();
					this.router.navigate(['']);
				},
				(error) => {
					console.error('error', error);
					this.store.dispatch({ type: COURSE_SAVE_FAILURE });
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

	private addCourse(courseForm: NgForm) {
		const sub = this.courseService.create(courseForm.value)
			.subscribe(
				(resp) => {
					console.log('course added', resp);
					this.store.dispatch({
						type: COURSE_SAVED,
						payload: {
							course: resp
						}
					});
					this.loaderService.hide();
					this.router.navigate(['']);
				},
				(error) => {
					console.error('error', error);
					this.store.dispatch({ type: COURSE_SAVE_FAILURE });
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

	// private initEmptyCourseForm() {
	// 	this.formModel = {
	// 		name: '',
	// 		description: '',
	// 		date: '',
	// 		length: null,
	// 		authors: []
	// 	};
	// }

	private loadDefaultAuthors() {
		this.authorService.loadList();
		const sub = this.authorService.getList()
			.subscribe((dafaultAuthors) => {
				this.authors = uniqBy(this.authors.concat(dafaultAuthors), 'id');
				this.ref.markForCheck();
			});

		this.registerSubscription(sub);
	}

	private subscribeCourseId() {
		const sub = this.route.params.subscribe((params) => {
			this.courseId = params['id'];
			if (this.courseId) {
				// console.log('<<<<<<<<<<<< edit >>>>>>>>>>>>');
				this.subscribeCourse();
			// } else {
				// this.store.dispatch({ type: INIT_COURSE});
				// console.log('<<<<<<<<<<<< add >>>>>>>>>>>>>');
				// this.initEmptyCourseForm();

			}
		});
		this.registerSubscription(sub);
	}

	private subscribeCourse() {
		this.loaderService.show();
		const sub = this.courseService.getById(+this.courseId)
			.subscribe(
				(resp) => {
					// this.formModel = resp;
					this.store.dispatch({
						type: COURSE_LOADED,
						payload: {
							course: resp
						}
					});
					this.authors = uniqBy(this.authors.concat(resp.authors), 'id');
					this.loaderService.hide();
					this.ref.markForCheck();
					// set dynamic breadcrumb for this route
					this.breadcrumbService.changeBreadcrumb(this.route.snapshot, resp.name);
				},
				(error) => {
					console.error('error', error);
					this.store.dispatch({ type: COURSE_LOAD_FAILURE });
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

}

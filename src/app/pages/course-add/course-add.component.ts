import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import _  from 'lodash';

import { BasePage } from '../base.page.component';
import { ICourse, IAuthor } from './../../business-entities';
import { CourseService, LoaderService, AuthorService } from './../../shared/services';

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
		private authorService: AuthorService
	) {
		super();
	}

	onInit() {
		this.authors = [];
		this.loadDefaultAuthors();
		this.subscribeCourseId();
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
					this.loaderService.hide();
					this.router.navigate(['']);
				},
				(error) => {
					console.error('error', error);
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
					this.loaderService.hide();
					this.router.navigate(['']);
				},
				(error) => {
					console.error('error', error);
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

	private initEmptyCourseForm() {
		this.formModel = {
			name: '',
			description: '',
			date: '',
			length: null,
			authors: []
		};
	}

	private loadDefaultAuthors() {
		this.authorService.loadList();
		let sub = this.authorService.getList()
			.subscribe((dafaultAuthors) => {
				this.authors = _.uniqBy(this.authors.concat(dafaultAuthors), 'id');
				this.ref.markForCheck();
			});

		this.registerSubscription(sub);
	}

	private subscribeCourseId() {
		let sub = this.route.params.subscribe((params) => {
			this.courseId = params['id'];
			if (this.courseId) {
				// console.log('<<<<<<<<<<<< edit >>>>>>>>>>>>');
				this.subscribeCourse();
			} else {
				// console.log('<<<<<<<<<<<< add >>>>>>>>>>>>>');
				this.initEmptyCourseForm();

			}
		});
		this.registerSubscription(sub);
	}

	private subscribeCourse() {
		this.loaderService.show();
		let sub = this.courseService.getById(+this.courseId)
			.subscribe(
				(resp) => {
					this.formModel = resp;
					this.authors = _.uniqBy(this.authors.concat(resp.authors), 'id');
					this.loaderService.hide();
					this.ref.markForCheck();
					this.route.data
						.subscribe((data: {breadcrumb: string}) => {

							data.breadcrumb = resp.name;
							console.log('data', data);
							this.ref.markForCheck();
						});
				},
				(error) => {
					console.error('error', error);
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

}

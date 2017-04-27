import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { BasePage } from '../base.page.component';
import { ICourse } from './../../business-entities';
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
	authors: string[];
	private courseId: string;
	private course: ICourse;

	constructor(
		private ref: ChangeDetectorRef,
		private router: Router,
		private courseService: CourseService,
		private loaderService: LoaderService,
		private authorService: AuthorService
	) {
		super();
	}

	onInit() {
		this.formModel = {
			name: '',
			description: '',
			date: '',
			length: null,
			authors: []
		};

		this.authorService.loadList();
		let sub = this.authorService.getList()
			.subscribe((authors) => {
				this.authors = authors;
				this.ref.markForCheck();
			});

		this.registerSubscription(sub);
	}

	onDestroy() {

	}

	public createCourse(courseForm: NgForm) {
		console.log('add', courseForm.value);
		// this.loaderService.show();
		// const sub = this.courseService.create(courseForm.value)
		// 	.subscribe(
		// 		(resp) => {
		// 			console.log('course added', resp);
		// 			this.loaderService.hide();
		// 			this.router.navigate(['']);
		// 		},
		// 		(error) => {
		// 			console.error('error', error);
		// 			this.loaderService.hide();
		// 		}
		// 	);
		// this.registerSubscription(sub);
	}

}

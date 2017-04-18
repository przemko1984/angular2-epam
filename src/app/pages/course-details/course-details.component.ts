import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BasePage } from '../base.page.component';
import { ICourse } from './../../business-entities';
import { CourseService, LoaderService } from './../../shared/services';

@Component({
	selector: 'course-details-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-details.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsPageComponent extends BasePage {

	private courseId: string;
	private course: ICourse;

	constructor(
		private ref: ChangeDetectorRef,
		private route: ActivatedRoute,
		private courseService: CourseService,
		private loaderService: LoaderService
	) {
		super();
	}

	onInit() {
		this.subscribeCourseId();
	}

	onDestroy() {

	}

	private subscribeCourseId() {
		let sub = this.route.params.subscribe((params) => {
			this.courseId = params['id'];
			this.subscribeCourse();
		});
		this.registerSubscription(sub);
	}

	private subscribeCourse() {
		this.loaderService.show();
		let sub = this.courseService.getById(this.courseId)
			.subscribe(
				(resp) => {
					this.course = resp;
					console.log('course loaded', this.course);
					this.loaderService.hide();
					this.ref.markForCheck();
				},
				(error) => {
					console.error('error', error);
					this.loaderService.hide();
				}
			);
		this.registerSubscription(sub);
	}

}

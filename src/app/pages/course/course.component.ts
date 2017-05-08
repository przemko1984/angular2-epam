import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BasePage } from '../base.page.component';

@Component({
	selector: 'course-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePageComponent extends BasePage {

	constructor(
	) {
		super();
	}

	onInit() {

	}

	onDestroy() {

	}



}

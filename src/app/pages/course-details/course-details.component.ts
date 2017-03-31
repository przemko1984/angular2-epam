import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'course-details-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-details.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {
	constructor() {

	}

	public ngOnInit() {

	}

	public ngOnDestroy() {

	}
}

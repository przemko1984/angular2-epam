import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'course-list-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-list.template.html')
})
export class CourseListPageComponent implements OnInit, OnDestroy {
	constructor() {

	}

	public ngOnInit() {

	}

	public ngOnDestroy() {

	}
}

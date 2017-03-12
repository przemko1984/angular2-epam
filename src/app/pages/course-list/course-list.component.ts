import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { ICourse } from './../../business-entities';

@Component({
	selector: 'course-list-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-list.template.html')
})
export class CourseListPageComponent implements OnInit, OnDestroy {
	private courses: ICourse[] = [{
		id: 'uuid1',
		name: 'Course 1',
		duration: 2,
		createData: new Date(),
		description: 'Test ...'
	}, {
		id: 'uuid2',
		name: 'Course 2',
		duration: 2,
		createData: new Date(),
		description: 'Test ...'
	}, {
		id: 'uuid3',
		name: 'Course 3',
		duration: 2,
		createData: new Date(),
		description: 'Test ...'
	}];

	constructor() {

	}

	public ngOnInit() {

	}

	public ngOnDestroy() {

	}

	public deleteCourse(id: string) {
		console.log('Delete course id:', id);
	}
}

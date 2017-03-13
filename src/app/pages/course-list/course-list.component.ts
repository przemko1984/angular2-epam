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
		duration: 10,
		createDate: new Date('2016-08-10'),
		description: 'Lorem ipsum dolor sit amet 1, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
			'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla.' +
			' Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
	}, {
		id: 'uuid2',
		name: 'Course 2',
		duration: 15,
		createDate: new Date('2016-12-10'),
		description: 'Lorem ipsum dolor sit amet 2, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
			'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
			'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. .'
	}, {
		id: 'uuid3',
		name: 'Course 3',
		duration: 20,
		createDate: new Date('2017-01-10'),
		description: 'Lorem ipsum dolor sit amet 3, consectetur adipiscing elit. Sed id lacus ut elit mollis facilisis sed sit amet justo. ' +
			'Curabitur dapibus dictum odio, eu eleifend massa ultricies ac. Aenean aliquam est sit amet ante bibendum, eu egestas massa fringilla. ' +
			'Suspendisse sit amet orci eget velit egestas pellentesque at quis lectus. '
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

import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';

import { ICourse } from './../../../business-entities';

@Component({
	selector: 'course-item',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./course-item.template.html')
})
export class CourseItemComponent {
	@Input('course')
	private course: ICourse;

	@Output()
	private deleteCourse: EventEmitter<string>;

	constructor() {
		this.deleteCourse = new EventEmitter<string>();
	}

	public delete($event) {
		this.deleteCourse.emit(this.course.id);
	}

}

import { Component, ViewEncapsulation, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

import { ICourse } from './../../../business-entities';

@Component({
	selector: 'course-item',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./course-item.component.scss')],
	template: require('./course-item.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
	@Input('course')
	private course: ICourse;

	@Output()
	private deleteCourse: EventEmitter<number>;

	constructor() {
		this.deleteCourse = new EventEmitter<number>();
	}

	public delete($event) {
		this.deleteCourse.emit(this.course.id);
	}

}

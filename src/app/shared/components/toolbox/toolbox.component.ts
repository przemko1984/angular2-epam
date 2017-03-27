import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CourseService } from './../../services';

@Component({
	selector: 'toolbox',
	templateUrl: 'toolbox.component.html',
	styles: [require('./toolbox.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {
	private search: string = '';

	constructor(private courseService: CourseService) {

	}

	public find() {
		console.log(`searching: "${this.search}"`);
	}

	public addCourse() {
		console.log('add course');
		this.courseService.create();
	}

}

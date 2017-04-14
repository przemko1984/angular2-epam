import { Component, ViewEncapsulation, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CourseService, LoaderService } from './../../services';

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

	@Output()
	private addCourse: EventEmitter<any>;

	@Output()
	private searchCourse: EventEmitter<any>;

	constructor(public ref: ChangeDetectorRef, private courseService: CourseService, private loaderService: LoaderService) {
		this.addCourse = new EventEmitter<any>();
		this.searchCourse = new EventEmitter<any>();
	}

	public find() {
		console.log(`searching: "${this.search}"`);
		this.searchCourse.emit(this.search);
	}

	public add() {
		this.addCourse.emit();
	}

}

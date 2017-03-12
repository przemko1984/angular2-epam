import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'toolbox',
	templateUrl: 'toolbox.component.html',
	styles: [require('./toolbox.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class ToolboxComponent {
	private search: string;

	constructor() {

	}

	public find() {
		console.log(this.search);
	}

	public addCourse() {
		console.log('add course');
	}

}

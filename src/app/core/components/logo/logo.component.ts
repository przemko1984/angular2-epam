import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'logo',
	templateUrl: 'logo.component.html',
	styles: [require('./logo.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LogoComponent {
	constructor() {

	}
}

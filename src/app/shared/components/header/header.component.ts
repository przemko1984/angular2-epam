import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService }  from './../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	constructor(public authService: AuthService) {

	}

	logout($event) {
		if ($event) {
			$event.preventDefault();
		}
		this.authService.logout();
	}
}

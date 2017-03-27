import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AuthService }  from './../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
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

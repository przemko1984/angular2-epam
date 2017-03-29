import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService }  from './../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
	public _userInfo: string;

	userInfo: Observable<string>;
	isAuthenticated: Observable<boolean>;

	constructor(public authService: AuthService) {
		this.isAuthenticated = this.authService.isAuthenticated$;
		this.userInfo = this.authService.userInfo$;
	}

	ngOnInit() {

	}

	logout($event) {
		if ($event) {
			$event.preventDefault();
		}
		this.authService.logout().subscribe(
			(resp) => {
				console.log('mark logout');
            },
            (error) => {
                console.error('error', error);
            }
		);
	}
}

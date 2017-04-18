import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService }  from './../../services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
	public _userInfo: string;

	userInfo: Observable<string>;
	isAuthenticated: Observable<boolean>;

	private sub: Subscription;

	constructor(public authService: AuthService) {
		this.isAuthenticated = this.authService.isAuthenticated$;
		this.userInfo = this.authService.userInfo$;
	}

	ngOnInit() {

	}

	ngOnDestroy() {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	logout($event) {
		if ($event) {
			$event.preventDefault();
		}
		this.sub = this.authService.logout().subscribe(
			(resp) => {
				console.log('mark logout');
            },
            (error) => {
                console.error('error', error);
            }
		);
	}
}

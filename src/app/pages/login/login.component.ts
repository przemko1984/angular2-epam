import { Component, Input, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, LoaderService }  from './../../shared/services';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./login.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
	user: string;
	pass: string;

	isAuthenticated: Observable<boolean>;
	userInfo: Observable<string>;

	constructor(private ref: ChangeDetectorRef, private authService: AuthService, private loaderService: LoaderService) {
		this.isAuthenticated = this.authService.isAuthenticated$;
		this.userInfo = this.authService.userInfo$;
	}

	public ngOnInit() {
		console.log('loginPage ngOnInit');
	}

	public ngOnDestroy() {

	}

	login() {
		if (!this.user || !this.pass) {
			return;
		}
		this.loaderService.show();
		this.authService.login({user: this.user, pass: this.pass})
			.subscribe(
				(resp) => {
					this.reset();
				},
				(error) => {
					console.log('error ', error);
				},
				() => {
					this.loaderService.hide();
					this.ref.markForCheck();
				}
			);
	}

	logout() {
		this.authService.logout()
			.subscribe(
				(resp) => {
					this.reset();
				},
				(error) => {
					console.log('error ', error);
				}
			);
	}

	private reset() {
		this.user = null;
		this.pass = null;
	}
}

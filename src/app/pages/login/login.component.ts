import { Component, Input, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
	isAuthenticated: boolean;

	constructor(private ref: ChangeDetectorRef, private authService: AuthService, private loaderService: LoaderService) {

	}

	public ngOnInit() {
		console.log('loginPage ngOnInit');
		this.authService.userInfo.subscribe(
			(resp) => {
				this.user = resp;
				this.isAuthenticated = !!resp;
			},
			(error) => {
				console.log('error ', error);
				this.isAuthenticated = false;
			}
		);
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
					this.isAuthenticated = resp;
				},
				(error) => {
					console.log('error ', error);
					this.isAuthenticated = false;
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
					this.isAuthenticated = !resp;
					this.user = null;
					this.pass = null;
				},
				(error) => {
					console.log('error ', error);
					this.isAuthenticated = false;
				}
			);
	}

}

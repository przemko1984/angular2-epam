import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BasePage } from '../base.page.component';
import { AuthService, LoaderService }  from './../../shared/services';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./login.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent extends BasePage {
	user: string;
	pass: string;

	isAuthenticated: Observable<boolean>;
	userInfo: Observable<string>;

	constructor(private ref: ChangeDetectorRef, private authService: AuthService, private loaderService: LoaderService) {
		super();
		this.isAuthenticated = this.authService.isAuthenticated$;
		this.userInfo = this.authService.userInfo$;
	}

	onInit() {
		console.log('loginPage ngOnInit');
	}

	onDestroy() {
	}

	login() {
		if (!this.user || !this.pass) {
			return;
		}
		this.loaderService.show();
		let sub = this.authService.login({user: this.user, pass: this.pass})
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
		this.registerSubscription(sub);
	}

	logout() {
		let sub = this.authService.logout()
			.subscribe(
				(resp) => {
					this.reset();
				},
				(error) => {
					console.log('error ', error);
				}
			);
		this.registerSubscription(sub);
	}

	private reset() {
		this.user = null;
		this.pass = null;
	}
}

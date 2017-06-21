import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { BasePage } from '../base.page.component';
import { AuthService, LoaderService } from './../../shared/services';
import { IUser } from './../../business-entities';

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
	errorMsg: string;

	isAuthenticated: Observable<boolean>;
	userInfo: IUser;

	// ngrx example
	counter: Observable<number>;

	constructor(
		private ref: ChangeDetectorRef,
		private authService: AuthService,
		private loaderService: LoaderService,
		private router: Router
	) {
		super();
		this.isAuthenticated = this.authService.isAuthenticated$;
	}

	onInit() {
		console.log('loginPage ngOnInit');
		this.authService.userInfo$.subscribe((user: IUser) => {
			this.userInfo = user;
		});
	}

	onDestroy() {
	}

	login() {
		this.errorMsg = '';
		if (!this.user || !this.pass) {
			return;
		}
		this.loaderService.show();
		let sub = this.authService.login({user: this.user, pass: this.pass}).subscribe(
			(resp) => {
				this.getUserInfo();
			},
			(error) => {
				// console.log('error ', error);
				this.errorMsg = 'Wrong user or password';
				this.loaderService.hide();
				this.ref.markForCheck();
			}
		);
		this.registerSubscription(sub);
	}

	getUserInfo() {
		let sub = this.authService.userInfo()
			.subscribe(
				(resp) => {
					this.reset();
					this.router.navigate(['']);
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

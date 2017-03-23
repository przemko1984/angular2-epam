import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AuthService }  from './../../shared/services';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./login.template.html')
})
export class LoginPageComponent implements OnInit, OnDestroy {
	public user: string;
	public pass: string;

	constructor(private authService: AuthService) {

	}

	public ngOnInit() {

	}

	public ngOnDestroy() {

	}

	login() {
		if (!this.user || !this.pass) {
			return;
		}
		this.authService.login({user: this.user, pass: this.pass});
		this.user = null;
		this.pass = null;
	}
}

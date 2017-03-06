import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	template: require('./login.template.html')
})
export class LoginPageComponent implements OnInit, OnDestroy {
	constructor() {

	}

	public ngOnInit() {

	}

	public ngOnDestroy() {

	}
}

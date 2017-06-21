import { Injectable } from '@angular/core';
import {
	Router,
	CanActivate
} from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	private isAuthenticated: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	constructor(private authService: AuthService, private router: Router) {
	}

	canActivate() {
		this.authService.isAuthenticated$.subscribe(
			(isLogged) => {
				if (isLogged) {
					this.isAuthenticated.next(true);
				} else {
					this.falseAction();
				}
			},
			() => this.falseAction
		);

		return this.isAuthenticated;
	}

	private falseAction() {
		this.router.navigate(['/login']);
		this.isAuthenticated.next(false);
	}
}

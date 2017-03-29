import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
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
export class HeaderComponent implements OnInit, OnChanges {
	public _userInfo: string;

	@Input('userInfo')
	public userInfo: Observable<string>;

	constructor(public authService: AuthService, private ref: ChangeDetectorRef, private router: Router) {

	}

	ngOnInit() {

	}

	ngOnChanges() {
		this.userInfo.subscribe(
			(resp: string) => {
				this._userInfo = resp;
            },
            (error) => {
                console.error('error', error);
            }
		);
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
            },
			() => {
				this.router.navigate(['/']);
			}
		);
	}
}

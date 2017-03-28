import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
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

	constructor(public authService: AuthService, private ref: ChangeDetectorRef) {

	}

	ngOnInit() {

	}

	ngOnChanges() {
		this.userInfo.subscribe(
			(resp: string) => {
				this._userInfo = resp;
			// this.ref.markForCheck();
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
				// this._userInfo = resp;
				// this.ref.markForCheck();
            },
            (error) => {
                console.error('error', error);
            },
			() => {
				this.ref.markForCheck();
			}
		);
	}
}

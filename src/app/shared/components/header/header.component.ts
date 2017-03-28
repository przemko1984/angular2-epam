import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
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
	public userInfo: string;

	constructor(public authService: AuthService, private changeDetector: ChangeDetectorRef) {

	}

	ngOnInit() {
		// this.authService.getUserInfo().subscribe(
			setInterval( () => {
				this.changeDetector.markForCheck();
			}, 3000)

	}

	public ngOnChanges() {
		console.log('>>>>>>>>>>>>>>>>>>>>>: ngOnDestroy');
		this.authService.getUserInfo().subscribe(
			(resp: string) => {

                console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>> authService', resp);
				this.userInfo = resp;
				// this.changeDetector.markForCheck();
            },
            (error) => {
                console.error('error', error);
            },
			() => {
				// this.changeDetector.markForCheck();
			}
		);
	}

	logout($event) {
		if ($event) {
			$event.preventDefault();
		}
		this.authService.logout();
	}
}

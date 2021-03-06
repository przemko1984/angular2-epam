/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	NgZone,
	ChangeDetectorRef
} from '@angular/core';

import { LoaderService, AuthService } from './shared/services';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	template: require('./app.template.html'),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	// private start: Date;

	constructor(private ngZone: NgZone, private ref: ChangeDetectorRef) {
		// ref.detach();
		// setInterval(() => {
		// 	this.ref.detectChanges();
		// }, 500);
	}

	public ngOnInit() {
		console.log('AppComponent init');
		// Tracking: start (unstable) and end (stable) states
		// this.ngZone.onUnstable.subscribe(() => {
		// 	this.start = new Date();
		// 	console.log('onUnstable', this.start.getTime());
		// });

		// this.ngZone.onStable.subscribe(() => {
		// 	const d = new Date();
		// 	console.log('onStable', d.getTime());
		// 	if (this.start) {
		// 		console.log('onUnstable - onStable ', d.getTime() - this.start.getTime());
		// 	}
		// });
	}

}

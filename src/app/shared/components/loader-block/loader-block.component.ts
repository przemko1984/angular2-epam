import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from './../../services';

@Component({
	selector: 'loader-block',
	templateUrl: 'loader-block.component.html',
	styles: [require('./loader-block.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnChanges {
	public show: boolean = false;

	@Input()
	public showLoader: Observable<boolean>;

	private loaderTimeout: any;

	constructor(private ref: ChangeDetectorRef) {
		// this.showLoader = this.loaderService.showLoader;
	}

	ngOnChanges() {
		console.log('LoaderBlockComponent onChanges');
		this.showLoader.subscribe(
            (resp) => {
				// this.show = resp;
				// console.log('test ', resp);
				if (resp) {
					clearTimeout(this.loaderTimeout);
					// console.log('show ', resp);
					this.show = resp;
				} else {
					this.loaderTimeout = setTimeout(() => {
						// console.log('hide soon', resp);
						this.show = resp;
						this.ref.markForCheck();
					}, 250);
				}
            },
            (error) => {
                console.error('error', error);
            }
        );
	}
}

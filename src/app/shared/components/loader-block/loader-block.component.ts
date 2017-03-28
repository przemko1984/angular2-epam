import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';
import { LoaderService } from './../../services';

@Component({
	selector: 'loader-block',
	templateUrl: 'loader-block.component.html',
	styles: [require('./loader-block.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class loaderBlockComponent implements OnChanges {
	// public show: boolean = false;

	@Input('show')
	private show: boolean;

	constructor(private loaderService: LoaderService) {

	}

	ngOnChanges() {
		this.loaderService.showLoader.subscribe(
            (resp) => {
                this.show = resp;
            },
            (error) => {
                console.error('error', error);
            }
        );
	}
}

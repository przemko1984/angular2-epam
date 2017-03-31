import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
export class LoaderBlockComponent {
	showLoader: Observable<boolean>;

	constructor(private loaderService: LoaderService) {
		this.showLoader = this.loaderService.showLoader$;
	}
}

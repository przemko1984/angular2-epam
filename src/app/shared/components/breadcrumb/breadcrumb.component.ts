import {
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';

import { IBreadcrumb, BreadcrumbService } from './../../services';

@Component({
	selector: 'breadcrumb',
	templateUrl: 'breadcrumb.component.html',
	styles: [require('./breadcrumb.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

	breadcrumbs: IBreadcrumb[];
	private sub: Subscription;

    constructor(
		private ref: ChangeDetectorRef,
		private breadcrumbService: BreadcrumbService
  	) {
      	this.breadcrumbs = [];
  	}

  	ngOnInit() {
		this.sub = this.breadcrumbService.breadcrumb$
		.subscribe((crumbs: IBreadcrumb[]) => {
			this.breadcrumbs = crumbs;

			this.ref.markForCheck();
		});
  	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}

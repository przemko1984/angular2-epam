import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import 'rxjs/add/operator/filter';
import _  from 'lodash';

import { IBreadcrumb, BreadcrumbService } from './../../services';

@Component({
	selector: 'breadcrumb',
	templateUrl: 'breadcrumb.component.html',
	styles: [require('./breadcrumb.component.scss')],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

	breadcrumbs: IBreadcrumb[];

    constructor(
		private ref: ChangeDetectorRef,
		private breadcrumbService: BreadcrumbService
  	) {
      	this.breadcrumbs = [];
  	}

  	ngOnInit() {
		this.breadcrumbService.breadcrumb$
		.subscribe((crumbs: IBreadcrumb[]) => {
			this.breadcrumbs = crumbs;

			this.ref.markForCheck();
		});
  	}

}

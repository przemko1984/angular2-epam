import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';
import _  from 'lodash';

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

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
		private activatedRoute: ActivatedRoute,
		private router: Router
  	) {
      	this.breadcrumbs = [];
  	}

  	ngOnInit() {
		const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

		// subscribe to the NavigationEnd event
		this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event) => {

			// set breadcrumbs
			let root: ActivatedRoute = this.activatedRoute.root;
			this.breadcrumbs = _.uniqBy(this.getBreadcrumbs(root), 'url');
			this.ref.markForCheck();
		});
  	}

	private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    	const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
		// get the child routes
		const children: ActivatedRoute[] = route.children;

		// return if there are no more children
		if (children.length === 0) {
			return breadcrumbs;
		}

		// iterate over each children
		for (let child of children) {
			// verify primary route
			if (child.outlet !== PRIMARY_OUTLET) {
				continue;
			}

			// verify the custom data property "breadcrumb" is specified on the route
			if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
				return this.getBreadcrumbs(child, url, breadcrumbs);
			}

			// get the route's URL segment
			let routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

			// append route URL to URL
			if (routeURL) {
				url += `/${routeURL}`;
			}

			// add breadcrumb
			let breadcrumb: IBreadcrumb = {
				label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
				params: child.snapshot.params,
				url: url
			};
			breadcrumbs.push(breadcrumb);

			// recursive
			return this.getBreadcrumbs(child, url, breadcrumbs);
		}

		// we should never get here, but just in case
		return breadcrumbs;

	}

}

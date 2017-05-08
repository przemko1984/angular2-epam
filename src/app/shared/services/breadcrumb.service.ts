import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    ActivatedRouteSnapshot,
    RoutesRecognized,
    NavigationEnd,
    Params,
    PRIMARY_OUTLET
} from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

export interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Injectable()
export class BreadcrumbService {

    breadcrumb$: Observable<IBreadcrumb[]>;
    private breadcrumbs: IBreadcrumb[];
    private breadcrumbSubject: ReplaySubject<IBreadcrumb[]> = new ReplaySubject<IBreadcrumb[]>();

    constructor(private router: Router) {
        this.breadcrumb$ = this.breadcrumbSubject.asObservable();
        this.router.events.subscribe((routeEvent: RoutesRecognized) => {
            if (!(routeEvent instanceof RoutesRecognized)) {
                return;
            }

            let route = routeEvent.state.root;
            let url = '';

            this.breadcrumbs = [];

            while (route.children.length) {
                route = route.firstChild;
                if (!route.routeConfig.path) {
                    continue;
                }

                url += `/${this.createUrl(route)}`;

                if (!route.data['breadcrumb']) {
                    continue;
                }

                this.breadcrumbs.push(this.createBreadcrumb(route, url));
            }

            this.breadcrumbSubject.next(this.breadcrumbs);
        });
    }

    public changeBreadcrumb(route: ActivatedRouteSnapshot, name: string) {
        const rootUrl = this.createRootUrl(route);
        const breadcrumb = this.breadcrumbs.find((bc) => bc.url === rootUrl);

        breadcrumb.label = name;

        this.breadcrumbSubject.next(this.breadcrumbs);
    }

    private createBreadcrumb(route: ActivatedRouteSnapshot, url: string): IBreadcrumb {
        return {
            label: route.data['breadcrumb'],
            params: route.params,
            url: url
        };
    }

    private createUrl(route: ActivatedRouteSnapshot) {
        return route.url.map((s) => s.toString()).join('/');
    }

    private createRootUrl(route: ActivatedRouteSnapshot) {
        let url = '';
        let next = route.root;

        while (next.firstChild !== route) {
            next = next.firstChild;
            if (!next.routeConfig.path) {
                continue;
            }

            url += `/${this.createUrl(next)}`;
        }

        url += `/${this.createUrl(route)}`;

        return url;
    }

}

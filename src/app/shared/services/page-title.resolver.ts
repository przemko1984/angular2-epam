import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class PageTitleResolver implements Resolve<any> {
  constructor() {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('resolve', route.data);
    return Observable.of({ res: 'I am data'});
  }
}

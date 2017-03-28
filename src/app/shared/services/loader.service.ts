import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderService {
    public showLoader: Observable<boolean>;

    constructor() {
        this.showLoader = Observable.of<boolean>(false);
     }

    hide() {
        // console.log('LoaderService hide');
        this.showLoader = Observable.of<boolean>(false);
    }

    show() {
        // console.log('LoaderService show');
        this.showLoader = Observable.of<boolean>(true);
    }

}

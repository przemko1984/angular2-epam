import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoaderService {
    public showLoader: Observable<boolean>;
    constructor() {
        this.showLoader = Observable.of<boolean>(false);
     }

    hide() {
        this.showLoader = Observable.of<boolean>(false);
    }

    show() {
        this.showLoader = Observable.of<boolean>(true);
    }

}

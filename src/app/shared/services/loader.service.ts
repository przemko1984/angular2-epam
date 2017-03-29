import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    showLoader$: Observable<boolean>;
    private showLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.showLoader$ = this.showLoaderSubject.asObservable();
    }

    hide() {
        // console.log('LoaderService hide');
        this.showLoaderSubject.next(false);
    }

    show() {
        // console.log('LoaderService show');
        this.showLoaderSubject.next(true);
    }

}

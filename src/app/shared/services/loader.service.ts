import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class LoaderService {
    showLoader$: Observable<boolean>;
    private showLoaderSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>();

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

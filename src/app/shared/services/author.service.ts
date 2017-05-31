import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IAuthor } from '../../business-entities/';
import { FilterByNamePipe } from '../pipes';
import { AuthorizedHttp } from './authorized-http.service';

const DELAY = 500;

@Injectable()
export class AuthorService {

    private serviceUrl: string = 'http://localhost:3004/authors';

    private authorList$: Observable<IAuthor[]>;
    private authorListSubject: ReplaySubject<IAuthor[]> = new ReplaySubject<IAuthor[]>(1);
    private sub: Subscription;

    constructor(private http: AuthorizedHttp, private _filterByName: FilterByNamePipe) {
        this.authorList$ = this.authorListSubject
            .asObservable();
    }

    getList(): Observable<IAuthor[]> {
        return this.authorList$.delay(DELAY);
    }

    loadList() {
        this.sub = this.http.get(this.serviceUrl)
            .map(this.mapData)
            .first()
            .catch((error) => {
                console.error('error', error);
                return Observable.throw(error);
            })
            .subscribe((authors: IAuthor[]) => {
                this.authorListSubject.next(authors);
            });
    }

    private mapData(res: Response) {
        return res.json();
    }

}

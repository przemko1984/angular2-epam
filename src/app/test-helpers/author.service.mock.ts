import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IAuthor } from '../business-entities/';
import { FilterByNamePipe } from '../shared/pipes';
import { AuthorizedHttp, AuthorService } from '../shared/services';

@Injectable()
export class MockAuthorService extends AuthorService  {

    private mockedAuthors: IAuthor[] = [{
            id: 1370,
            firstName: 'Polly',
            lastName: 'Sosa'
        },
        {
            id: 8413,
            firstName: 'Greta',
            lastName: 'Richardson'
    }];

    constructor() {
        super(null, null);
    }

    // constructor(private http: AuthorizedHttp, private _filterByName: FilterByNamePipe) {
    //     super(http, _filterByName);
    // }

    getList(): Observable<IAuthor[]> {
        return this.authorList$;
    }

    loadList() {
        Observable.of(this.mockedAuthors)
        .subscribe((authors: IAuthor[]) => {
            this.authorListSubject.next(authors);
        });
    }
}

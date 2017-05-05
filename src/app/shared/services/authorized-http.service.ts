import { Injectable } from '@angular/core';
import { Http, RequestOptions, ConnectionBackend, Headers } from '@angular/http';

@Injectable()
export class AuthorizedHttp extends Http {

    private defaultOptions: RequestOptions;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions ) {
        super(backend, defaultOptions);
        this.defaultOptions = defaultOptions;
    }

    setAuthorization(token: string) {
        let headers = new Headers();
        headers.set('Authorization', token);
        this.defaultOptions.headers = headers;
    }

}

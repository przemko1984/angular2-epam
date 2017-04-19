import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ICredential, IToken, IUser } from '../../business-entities';

const DELAY = 500;

@Injectable()
export class AuthService {

    userInfo$: Observable<IUser>;
    isAuthenticated$: Observable<boolean>;
    authToken: string;

    private authServiceUrl: string = 'http://localhost:3004/auth';
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private user: ReplaySubject<IUser> = new ReplaySubject<IUser>();

    constructor(private http: Http) {
        this.userInfo$ = this.user.asObservable();
        this.isAuthenticated$ = this.isAuthenticated.asObservable();
    }

    login(userCredential: ICredential): Observable<boolean> {
        console.log(`login user:${userCredential.user} with password: ${userCredential.pass}`);
        const loginUrl = `${this.authServiceUrl}/login`;

        return this.http
            .post(loginUrl, {login: userCredential.user, password: userCredential.pass})
            // .delay(DELAY)
            .map(this.mapData)
            .map((res: IToken) => {
                console.log('response', res);
                if (res.token) {
                    this.authToken = res.token;
                    const clonedUser = Object.assign({}, userCredential);
                    // this.user.next(clonedUser.user);
                    this.isAuthenticated.next(true);
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.error('Auth error', error);
                return Observable.throw(error);
            });

        // return Observable.of<boolean>(true).delay(DELAY);
    }

    userInfo(): Observable<IUser> {
        const userInfoUrl = `${this.authServiceUrl}/userInfo`;
        let headers = new Headers();
        headers.set('Authorization', this.authToken);
        let requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http
            .post(userInfoUrl, {}, requestOptions)
            // .delay(DELAY)
            .map(this.mapData)
            .map((user: IUser) => {
                console.log('user', user);
                this.user.next(user);
                return user;
            })
            .catch((error) => {
                console.error('Auth error', error);
                return Observable.throw(error);
            });

        // return Observable.of<boolean>(true).delay(DELAY);
    }

    logout(): Observable<boolean> {
        this.authToken = null;
        this.user.next(null);
        this.isAuthenticated.next(false);

        return Observable.of<boolean>(true);
    }

    private mapData(res: Response) {
        return res.json();
    }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';

import {
    authReducer,
    LOGIN_IN_PROGRESS,
    LOGIN_USER,
    LOGOUT_RECEIVED,
    USER_AUTHENTICATED,
    LOGIN_FAILURE
} from '../../reducers';
import { ICredential, IToken, IUser, IAuth } from '../../business-entities';
import { AuthorizedHttp } from './authorized-http.service';

const DELAY = 500;

@Injectable()
export class AuthService {

    userInfo$: Observable<IUser>;
    isAuthenticated$: Observable<boolean>;
    token$: Observable<string>;
    authToken: string;

    private authServiceUrl: string = 'http://localhost:3004/auth';
    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private user: ReplaySubject<IUser> = new ReplaySubject<IUser>();

    constructor(
        private http: Http,
        private authorizedHttp: AuthorizedHttp,
		private store: Store<any>
    ) {
        // this.userInfo$ = this.user.asObservable();
        // this.isAuthenticated$ = this.isAuthenticated.asObservable();

        const store$ = this.store.select<IAuth>('auth');
        this.userInfo$ = store$.map(data => data['current']);
        this.isAuthenticated$ = store$.map(data => !!data['token']);
    }

    login(userCredential: ICredential): Observable<boolean> {
        console.log(`login user:${userCredential.user} with password: ${userCredential.pass}`);
        const loginUrl = `${this.authServiceUrl}/login`;
        this.store.dispatch({type: LOGIN_IN_PROGRESS});
        return this.http
            .post(loginUrl, {login: userCredential.user, password: userCredential.pass})
            .map(this.mapData)
            .map((res: IToken) => {
                console.log('response', res);
                if (res.token) {
                    // TODO:
                    // add external method for assing `authToken`
                    this.authToken = res.token;
                    this.store.dispatch({type: LOGIN_USER});
                    this.authorizedHttp.setAuthorization(res.token);
                    this.isAuthenticated.next(true);
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.error('Auth error', error);
                this.store.dispatch({type: LOGIN_FAILURE, payload: {error}});
                return Observable.throw(error);
            });

    }

    userInfo(): Observable<IUser> {
        const userInfoUrl = `${this.authServiceUrl}/userInfo`;
        const headers = new Headers();
        headers.set('Authorization', this.authToken);
        const requestOptions = new RequestOptions();
        requestOptions.headers = headers;

        return this.http
            .post(userInfoUrl, {}, requestOptions)
            .map(this.mapData)
            .map((user: IUser) => {
                console.log('user', user);
                this.store.dispatch({type: USER_AUTHENTICATED, payload: {token :user.fakeToken, user: user}});
                this.user.next(user);
                return user;
            })
            .catch((error) => {
                console.error('Auth error', error);
                return Observable.throw(error);
            });

    }

    logout(): Observable<boolean> {
        this.authToken = null;
        this.user.next(null);
        this.isAuthenticated.next(false);
        this.authorizedHttp.setAuthorization(null);
        this.store.dispatch({type: LOGOUT_RECEIVED});

        return Observable.of<boolean>(true);
    }

    private mapData(res: Response) {
        return res.json();
    }
}

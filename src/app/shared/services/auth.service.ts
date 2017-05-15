import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';

import {
    authReducer,
    LOGIN_IN_PROGRESS,
    LOGOUT_USER,
    USER_AUTHENTICATED,
    USER_INFO,
    LOGIN_FAILURE
} from '../../reducers';
import { ICredential, IToken, IUser, IAuth } from '../../business-entities';
import { AuthorizedHttp } from './authorized-http.service';

const DELAY = 500;

@Injectable()
export class AuthService {

    userInfo$: Observable<IUser>;
    isAuthenticated$: Observable<boolean>;

    private authServiceUrl: string = 'http://localhost:3004/auth';

    constructor(
        private http: Http,
        private authorizedHttp: AuthorizedHttp,
        private store: Store<any>
    ) {
        const store$ = this.store.select<IAuth>('auth');
        this.userInfo$ = store$.map((data) => data['current']);
        this.isAuthenticated$ = store$.map((data) => !!data['token']);
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
                    this.store.dispatch({
                        type: USER_AUTHENTICATED,
                        payload: {
                            token: res.token
                        }
                    });
                    this.authorizedHttp.setAuthorization(res.token);
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

        return this.authorizedHttp
            .post(userInfoUrl, {})
            .map(this.mapData)
            .map((user: IUser) => {
                console.log('user', user);
                this.store.dispatch({
                    type: USER_INFO,
                    payload: {
                        user: user
                    }
                });
                return user;
            })
            .catch((error) => {
                console.error('Auth error', error);
                return Observable.throw(error);
            });

    }

    logout(): Observable<boolean> {
        this.authorizedHttp.setAuthorization(null);
        this.store.dispatch({type: LOGOUT_USER});
        return Observable.of<boolean>(true);
    }

    private mapData(res: Response) {
        return res.json();
    }
}

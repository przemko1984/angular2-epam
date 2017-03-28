import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICredential } from '../../business-entities';

const DELAY = 500;

@Injectable()
export class AuthService {

    userInfo: Observable<string> = Observable.of<string>(null);
    private _isAuthenticated: boolean = false;
    private _user: string;

    constructor() { }

    login(userCredential: ICredential): Observable<boolean> {
        console.log(`login user:${userCredential.user} with password: ${userCredential.pass}`);
        const clonedUser = Object.assign({}, userCredential);
        // this._user = userCredential.user;
        // this._isAuthenticated = true;

        this.userInfo = Observable.of<string>(clonedUser.user);
        return Observable.of<boolean>(true).delay(DELAY);
    }

    logout(): Observable<boolean> {
        // this._isAuthenticated = false;
        // this._user = null;
        this.userInfo = Observable.of<string>('');

        return Observable.of<boolean>(true);
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    // getUserInfo(): string {
    //     return this._user;
    // }

    // getUserInfo(): Observable<string> {
    //     return Observable.of<string>(this._user);
    // }
}

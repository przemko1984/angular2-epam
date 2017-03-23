import { Injectable } from '@angular/core';

import { ICredential } from '../../business-entities';

@Injectable()
export class AuthService {

    private _isAuthenticated: boolean = false;
    private _user: string;

    constructor() { }

    login(userCredential: ICredential) {
        console.log(`login user:${userCredential.user} with password: ${userCredential.pass}`);
        this._user = userCredential.user;
        this._isAuthenticated = true;
    }

    logout() {
        this._isAuthenticated = false;
        this._user = null;
    }

    isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    getUserInfo(): string {
        return this._user;
    }

}

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    private _isAuthenticated: boolean = false;
    private _user: string;

    constructor() { }

    login(user: string) {
        this._user = user;
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

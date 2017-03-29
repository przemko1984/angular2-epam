import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { ICredential } from '../../business-entities';

const DELAY = 500;

@Injectable()
export class AuthService {

    userInfo$: Observable<string>;
    isAuthenticated$: Observable<boolean>;

    private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private user: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
        this.userInfo$ = this.user.asObservable();
        this.isAuthenticated$ = this.isAuthenticated.asObservable();
    }

    login(userCredential: ICredential): Observable<boolean> {
        console.log(`login user:${userCredential.user} with password: ${userCredential.pass}`);
        const clonedUser = Object.assign({}, userCredential);

        this.user.next(clonedUser.user);
        this.isAuthenticated.next(true);
        return Observable.of<boolean>(true).delay(DELAY);
    }

    logout(): Observable<boolean> {
        this.user.next(null);
        this.isAuthenticated.next(false);

        return Observable.of<boolean>(true);
    }
}

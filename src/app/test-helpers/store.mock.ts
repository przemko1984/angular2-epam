import { Action, ActionReducer, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { ObservableMock } from './observable.mock';


const reducerMock: ObservableMock = new ObservableMock();
const dispatcherMock: ObservableMock = new ObservableMock();
const stateMock: Observable<any> = new Observable<any>();

export class MockStore<T> extends Store<T> {

    private _fakeData: Object = {};
    private fakeDataSubject: BehaviorSubject<Object> = new BehaviorSubject(this._fakeData);

    select = <T, R>(mapFn: any, ...paths: string[]): Observable<R> => {
        return map.call(this.fakeDataSubject, mapFn);
    };

    constructor() {
        super(dispatcherMock, reducerMock, stateMock);
    }

    nextMock(mock: Object, ...keys: string[]) {
        let curMockLevel = this._fakeData = {};
        keys.forEach((key, idx) => {
            curMockLevel = curMockLevel[key] = idx === keys.length - 1 ? mock : {};
        });
        this.fakeDataSubject.next(this._fakeData);
    }

    get fakeData() {
        return this._fakeData;
    }

}

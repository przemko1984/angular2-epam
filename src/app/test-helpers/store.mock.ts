// import { Action, ActionReducer, Store } from '@ngrx/store';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import { map } from 'rxjs/operator/map';
// import { ObservableMock } from './observable.mock';

// const reducerMock: ObservableMock = new ObservableMock();
// const dispatcherMock: ObservableMock = new ObservableMock();
// const stateMock: Observable<any> = new Observable<any>();

// export class MockStore<T> extends Store<T> {

//     private _fakeData: Object = {};
//     private fakeDataSubject: BehaviorSubject<Object> = new BehaviorSubject(this._fakeData);

//     constructor() {
//         super(dispatcherMock, reducerMock, stateMock);
//     }

//     select = <T, R>(mapFn: any, ...paths: string[]): Observable<R> => {
//         return map.call(this.fakeDataSubject, mapFn);
//     }

//     nextMock(mock: Object, ...keys: string[]) {
//         let curMockLevel = this._fakeData = {};
//         keys.forEach((key, idx) => {
//             curMockLevel = curMockLevel[key] = idx === keys.length - 1 ? mock : {};
//         });
//         this.fakeDataSubject.next(this._fakeData);
//     }

//     get fakeData() {
//         return this._fakeData;
//     }

// }

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operator/map';

export class MockStore<T> extends BehaviorSubject<T> {

  constructor(private _initialState: T) {
    super(_initialState);
  }

  dispatch = (action: Action): void => {
  }

  select = <T, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> => {
    return map.call(this, pathOrMapFn);
  }

}

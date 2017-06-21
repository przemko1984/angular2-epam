import { Observer } from 'rxjs/Observer';

export class ObservableMock implements Observer<any> {
    closed?: boolean = false; // inherited from Observer
    nextVal: any = ''; // variable I made up

    constructor() {
    }

    next = (value: any): void => {
        this.nextVal = value;
    }

    error = (err: any): void => {
        console.error(err);
    }

    complete = (): void => {
        this.closed = true;
    }
}

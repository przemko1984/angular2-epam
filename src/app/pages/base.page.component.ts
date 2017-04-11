import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class BasePage implements OnInit, OnDestroy {
    private _subscriptions: Subscription[];

    constructor() {
        this._subscriptions = [];
    }

    abstract onInit();
    abstract onDestroy();

    protected registerSubscription(subscription: Subscription) {
        this._subscriptions.push(subscription);
    }

    ngOnInit() {
        this.onInit();
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub) => sub.unsubscribe());
        this.onDestroy();
    }
}

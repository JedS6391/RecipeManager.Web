import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as selectors from './cart-store.selectors';
import * as actions from './cart-store.actions';
import { Cart } from '../api/models/read/cart.interface';
import { CartItemUpdate } from '../api/models/write/update-cart-items';

@Injectable()
export class CartFacade {
    constructor(private store: Store<any>) {}

    public fetchCart() {
        this.store.dispatch(new actions.GetCurrentCart());
    }

    public getCart(): Observable<Cart> {
        return this.store.pipe(
            select(selectors.cartState),
            map(s => s.cart)
        );
    }

    public isLoading(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.cartState),
            map(s => s.isLoading)
        );
    }

    public updateCurrentCartItems(cartItemUpdates: CartItemUpdate[]) {
        this.store.dispatch(new actions.UpdateCurrentCartItems(cartItemUpdates));
    }
}

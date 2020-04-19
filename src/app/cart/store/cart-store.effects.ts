import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { CartApiService } from '../api/cart-api.service';
import * as actions from './cart-store.actions';

@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private cartApiService: CartApiService
    ) {}

    @Effect()
    public getCurrentCart$ = this.actions$.pipe(
        ofType<actions.GetCurrentCart>(actions.GetCurrentCart.TYPE),
        switchMap(() => {
            return this.cartApiService.getCurrentCart().pipe(
                map(cart => new actions.GetCurrentCartSuccess(cart)),
                catchError(error => of(new actions.GetCurrentCartFailure(error)))
            );
        })
    );

    @Effect()
    public addIngredientsToCurrentCart$ = this.actions$.pipe(
        ofType<actions.UpdateCurrentCartItems>(actions.UpdateCurrentCartItems.TYPE),
        switchMap(action => {
            return this.cartApiService.updateCartItems(action.cartItemUpdates).pipe(
                map(cart => new actions.UpdateCurrentCartItemsSuccess(cart)),
                catchError(error => of(new actions.UpdateCurrentCartItemsFailure(error)))
            );
        })
    );
}

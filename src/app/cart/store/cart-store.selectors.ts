import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, CART_STATE_STORE_KEY } from './cart-state';

const getCartState = createFeatureSelector<CartState>(CART_STATE_STORE_KEY);

export const cartState = createSelector(
    getCartState,
    state => state
);

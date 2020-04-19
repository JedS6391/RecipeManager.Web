import { Action } from '@ngrx/store';

import { CartState } from './cart-state';
import * as actions from './cart-store.actions';
import { ActionHandlerMap, executeReducer } from '../../shared/reducer-helpers';

export const CART_INITIAL_STATE: CartState = {
    isLoading: false,
    cart: null
};

// TODO: Failure handlers
const handlerMap: ActionHandlerMap<CartState> = {
    [actions.GetCurrentCart.TYPE]: getCurrentCartHandler,
    [actions.GetCurrentCartSuccess.TYPE]: getCurrentCartSuccessHandler,
    [actions.UpdateCurrentCartItems.TYPE]: updateCurrentCartItemsHandler,
    [actions.UpdateCurrentCartItemsSuccess.TYPE]: updateCurrentCartItemsSuccessHandler
};

export function cartReducer(state: CartState = CART_INITIAL_STATE, action: Action): CartState {
    return executeReducer(state, action, handlerMap);
}

function getCurrentCartHandler(state: CartState): CartState {
    return {
        isLoading: true,
        cart: state.cart
    };
}

function getCurrentCartSuccessHandler(state: CartState, action: actions.GetCurrentCartSuccess): CartState {
    return {
        isLoading: false,
        cart: action.cart
    };
}

function updateCurrentCartItemsHandler(state: CartState): CartState {
    return {
        isLoading: true,
        cart: state.cart
    };
}

function updateCurrentCartItemsSuccessHandler(state: CartState, action: actions.UpdateCurrentCartItemsSuccess): CartState {
    return {
        isLoading: false,
        cart: action.cart
    };
}

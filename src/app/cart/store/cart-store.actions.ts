import { Action } from '@ngrx/store';
import { Cart } from '../api/models/read/cart.interface';
import { CartItemUpdate } from '../api/models/write/update-cart-items';

const CART_STORE_ACTIONS_PREFIX = 'CART';

export class GetCurrentCart implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} GET CURRENT CART`;
    public readonly type = GetCurrentCart.TYPE;
}

export class GetCurrentCartSuccess implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} GET CURRENT CART SUCCESS`;
    public readonly type = GetCurrentCartSuccess.TYPE;

    constructor(public cart: Cart) {}
}

export class GetCurrentCartFailure implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} GET CURRENT CART FAILURE`;
    public readonly type = GetCurrentCartFailure.TYPE;

    constructor(public error: Error) {}
}

export class UpdateCurrentCartItems implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} UPDATE CURRENT CART ITEMS`;
    public readonly type = UpdateCurrentCartItems.TYPE;

    constructor(public cartItemUpdates: CartItemUpdate[]) {}
}

export class UpdateCurrentCartItemsSuccess implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} UPDATE CURRENT CART ITEMS SUCCESS`;
    public readonly type = UpdateCurrentCartItemsSuccess.TYPE;

    constructor(public cart: Cart) {}
}

export class UpdateCurrentCartItemsFailure implements Action {
    public static readonly TYPE = `${CART_STORE_ACTIONS_PREFIX} UPDATE CURRENT CART ITEMS FAILURE`;
    public readonly type = UpdateCurrentCartItemsFailure.TYPE;

    constructor(public error: Error) {}
}

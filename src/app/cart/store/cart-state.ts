import { Cart } from '../api/models/read/cart.interface';

export const CART_STATE_STORE_KEY = 'cart';

export interface CartState {
    isLoading: boolean;
    cart: Cart;
}

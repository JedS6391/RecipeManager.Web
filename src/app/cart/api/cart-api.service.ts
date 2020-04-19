import { Injectable, InjectionToken, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';

import { BaseApiService } from '../../shared/base-api.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Cart } from './models/read/cart.interface';
import { CART_URLS } from './cart.urls';
import { CartItemUpdate } from './models/write/update-cart-items';

export const CART_BASE_URL_TOKEN = new InjectionToken<string>('CartApiBaseUrl');

@Injectable()
export class CartApiService extends BaseApiService {

    constructor(
        @Inject(CART_BASE_URL_TOKEN) baseUrl: string,
        http: HttpClient,
        authenticationService: AuthenticationService
    ) {
        super(baseUrl, http, authenticationService);
    }

    public getCurrentCart(): Observable<Cart> {
        const url = `${this.baseUrl}${CART_URLS.getCurrentCart}`;

        return this.http.get<Cart>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateCartItems(cartItemUpdates: CartItemUpdate[]): Observable<Cart> {
        const url = `${this.baseUrl}${CART_URLS.updateCurrentCartItems}`;

        return this.http.put<Cart>(url, cartItemUpdates, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }
}

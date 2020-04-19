import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CART_STATE_STORE_KEY } from './cart-state';
import { cartReducer } from './cart-store.reducer';
import { CartFacade } from './cart-store.facade';
import { CartEffects } from './cart-store.effects';

@NgModule({
    imports: [
        StoreModule.forFeature(CART_STATE_STORE_KEY, cartReducer),
        EffectsModule.forFeature([CartEffects])
    ],
    providers: [CartFacade]
})
export class CartStoreModule {}

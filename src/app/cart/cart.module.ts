import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { CartComponent } from './cart.component';
import { CartStoreModule } from './store/cart-store.module';
import { AddRecipeToCartComponent } from './add-recipe-to-cart/add-recipe-to-cart.component';
import { CartApiModule } from './api/cart-api.module';
import { CartService } from './service/cart.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CartApiModule,
        CartStoreModule,
        MatDialogModule
    ],
    declarations: [CartComponent, AddRecipeToCartComponent],
    entryComponents: [AddRecipeToCartComponent],
    exports: [CartComponent],
    providers: [CartService]
})
export class CartModule {}

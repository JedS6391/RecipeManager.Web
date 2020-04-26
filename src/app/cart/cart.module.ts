import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { CartComponent } from './cart.component';
import { CartStoreModule } from './store/cart-store.module';
import { AddRecipeToCartComponent } from './add-recipe-to-cart/add-recipe-to-cart.component';
import { CartApiModule } from './api/cart-api.module';
import { CartService } from './service/cart.service';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartExportService } from './service/cart-exporter.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CartApiModule,
        CartStoreModule,
        MatDialogModule,
        MatButtonModule,
        MatMenuModule,
        SpinnerModule
    ],
    declarations: [CartComponent, AddRecipeToCartComponent, CartItemComponent],
    entryComponents: [AddRecipeToCartComponent],
    exports: [CartComponent],
    providers: [CartService, CartExportService]
})
export class CartModule {}

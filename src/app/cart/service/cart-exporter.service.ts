import { Injectable } from '@angular/core';
import { CartFacade } from '../store/cart-store.facade';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../api/models/read/cart.interface';
import { CartItemGrouping } from '../cart-item/models/grouping-mode';
import { CartService } from './cart.service';
import { Recipe, IngredientCategory } from 'src/app/recipes/api/models/read/recipe.interface';

class CartExportDataSourceProvider {
    dataSource: Observable<Map<string, CartItem[]>>;
    lookup: Map<string, Recipe> | Map<string, IngredientCategory>;
}

@Injectable()
export class CartExportService {
    private isInitialised: boolean;

    private currentCart: Cart;
    private recipesLookup: Map<string, Recipe>;
    private ingredientCategoriesLookup: Map<string, IngredientCategory>;

    constructor(private cartService: CartService) {}

    public initialise() {
        if (!this.isInitialised) {
            this.cartService.initialise();

            this.cartService.cart$.subscribe(cart => this.currentCart = cart);
            this.cartService.recipesLookup$.subscribe(recipesLookup => this.recipesLookup = recipesLookup);
            this.cartService.ingredientCategoriesLookup$.subscribe(ingredientCategoriesLookup =>
                this.ingredientCategoriesLookup = ingredientCategoriesLookup
            );

            this.isInitialised = true;
        }
    }

    public exportCurrentCart(groupingMode: CartItemGrouping) {
        this.ensureInitialised();

        const exportedCart = this.generateCartExport(groupingMode);

        const blob = new Blob([exportedCart], { type: 'text' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    private generateCartExport(groupingMode: CartItemGrouping): string {
        const cartExport = [`Cart export - ${this.currentCart.createdAt}\n`];
        const cartDataSourceProvider = this.getCartExportDataSource(groupingMode);

        cartDataSourceProvider.dataSource.subscribe(cartDataSource => {
            Array.from(cartDataSource, ([groupingIdentifier, cartItems]) => {
                const grouping = cartDataSourceProvider.lookup.get(groupingIdentifier);

                cartExport.push(`\n${grouping.name}:\n`);

                cartItems.forEach(cartItem => {
                    cartExport.push(`    - ${cartItem.ingredient.name} (${cartItem.ingredient.amount})\n`);
                });
            });
        });

        return cartExport.join('');
    }

    private getCartExportDataSource(groupingMode: CartItemGrouping): CartExportDataSourceProvider {
        if (groupingMode === 'recipe') {
            return {
                dataSource: this.cartService.cartItemsByRecipe$,
                lookup: this.recipesLookup
            };
        }

        if (groupingMode === 'ingredientCategory') {
            return {
                dataSource: this.cartService.cartItemsByIngredientCategory$,
                lookup: this.ingredientCategoriesLookup
            };
        }
    }

    private ensureInitialised(): void {
        if (!this.isInitialised) {
            throw Error('Cart exporter has not been initialised before usage.');
        }
    }
}

import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { CartItem, Cart } from '../api/models/read/cart.interface';
import { filter, map } from 'rxjs/operators';

import { RecipesListFacade } from '../../recipes/store/recipes-store.facade';
import { CartFacade } from '../store/cart-store.facade';
import { Recipe } from '../../recipes/api/models/read/recipe.interface';
import { CartItemUpdate } from '../api/models/write/update-cart-items';


@Injectable()
export class CartService {
    public cartItemsByRecipe$: Observable<Map<string, CartItem[]>>;
    public recipesInCartLookup$: Observable<Map<string, Recipe>>;

    private cart$: Observable<Cart>;
    private recipes$: Observable<Recipe[]>;

    private isInitialised = false;
    private cartItemsByRecipe: Map<string, CartItem[]>;

    constructor(
        private recipesListFacade: RecipesListFacade,
        private cartFacade: CartFacade
    ) {
        this.cart$ = this.cartFacade.getCart();
        this.recipes$ = this.recipesListFacade.getAllRecipes();

        this.cartItemsByRecipe$ = this.cart$.pipe(
          filter(cart => cart !== null),
          map(this.buildCartItemsByRecipeLookup)
        );

        this.recipesInCartLookup$ = combineLatest([this.recipes$, this.cartItemsByRecipe$]).pipe(
            filter(([recipes, cartItemsByRecipe]) => recipes !== null && recipes.length > 0 && cartItemsByRecipe.size > 0),
            map(([recipes, cartItemsByRecipe]) => this.buildRecipesInCartLookup(recipes, cartItemsByRecipe))
        );

        this.cartItemsByRecipe$.subscribe(cartItemsByRecipe => this.cartItemsByRecipe = cartItemsByRecipe);
    }

    public initialise() {
        if (!this.isInitialised) {
            this.cartFacade.fetchCart();
            this.recipesListFacade.fetchAllRecipes();

            this.isInitialised = true;
        }
    }

    public getSelectedCartItemsForRecipe(recipeId: string): Observable<CartItem[]> {
        this.ensureInitialised();

        return this.cartItemsByRecipe$.pipe(
            map(cartItemsByRecipe => cartItemsByRecipe.get(recipeId))
        );
    }

    public updateCartItemsForRecipe(recipeId: string, cartItemUpdates: CartItemUpdate[]) {
        this.ensureInitialised();

        const existingCartItemUpdates = Array.from(this.cartItemsByRecipe.entries())
            .filter(([recipe, _]) => recipe !== recipeId)
            .map(([recipe, cartItems]) => {
                return cartItems.map(cartItem => ({
                    ingredientId: cartItem.ingredient.id
                }));
            });

        const cartItemUpdatesToApply: CartItemUpdate[] = cartItemUpdates.concat(...existingCartItemUpdates);

        this.cartFacade.updateCurrentCartItems(cartItemUpdatesToApply);
    }

    public clearCart() {
        this.ensureInitialised();

        this.cartFacade.updateCurrentCartItems([]);
    }

    private buildCartItemsByRecipeLookup(cart: Cart): Map<string, CartItem[]> {
        const cartItemsByRecipe = new Map<string, CartItem[]>();

        cart.items.forEach(cartItem => {
          const recipeId = cartItem.ingredient.recipeId;

          if (cartItemsByRecipe.has(recipeId)) {
            cartItemsByRecipe.get(recipeId).push(cartItem);
          } else {
            cartItemsByRecipe.set(recipeId, [cartItem]);
          }
        });

        return cartItemsByRecipe;
    }

    private buildRecipesInCartLookup(recipes: Recipe[], cartItemsByRecipe: Map<string, CartItem[]>): Map<string, Recipe> {
        return new Map(recipes
            .filter(recipe => cartItemsByRecipe.has(recipe.id))
            .map(recipe => [recipe.id, recipe]));
    }

    private ensureInitialised(): void {
        if (!this.isInitialised) {
            throw Error('Cart has not been initialised before usage.');
        }
    }
}

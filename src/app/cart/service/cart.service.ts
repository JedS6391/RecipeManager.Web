import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { CartItem, Cart } from '../api/models/read/cart.interface';
import { filter, map } from 'rxjs/operators';

import { RecipesListFacade, RecipesEditFacade } from '../../recipes/store/recipes-store.facade';
import { CartFacade } from '../store/cart-store.facade';
import { Recipe, IngredientCategory } from '../../recipes/api/models/read/recipe.interface';
import { CartItemUpdate } from '../api/models/write/update-cart-items';


@Injectable()
export class CartService {
    public cartItemsByRecipe$: Observable<Map<string, CartItem[]>>;
    public cartItemsByIngredientCategory$: Observable<Map<string, CartItem[]>>;
    public recipesLookup$: Observable<Map<string, Recipe>>;
    public ingredientCategoriesLookup$: Observable<Map<string, IngredientCategory>>;
    public cartShowing$ = new BehaviorSubject<boolean>(false);
    public cart$: Observable<Cart>;

    private recipes$: Observable<Recipe[]>;
    private ingredientCategories$: Observable<IngredientCategory[]>;

    private isInitialised = false;
    private cartItemsByRecipe: Map<string, CartItem[]>;

    constructor(
        private recipesListFacade: RecipesListFacade,
        private recipesEditFacade: RecipesEditFacade,
        private cartFacade: CartFacade
    ) {
        this.cart$ = this.cartFacade.getCart();
        this.recipes$ = this.recipesListFacade.getAllRecipes();
        this.ingredientCategories$ = this.recipesEditFacade.getIngredientCategories();

        this.cartItemsByRecipe$ = this.cart$.pipe(
          filter(cart => cart !== null),
          map(this.buildCartItemsByRecipeLookup)
        );

        this.cartItemsByIngredientCategory$ = this.cart$.pipe(
            filter(cart => cart !== null),
            map(this.buildCartItemsByIngredientCategoryLookup)
        );

        this.recipesLookup$ = this.recipes$.pipe(
            filter(recipes => recipes !== null && recipes.length > 0),
            map(this.buildRecipesLookup)
        );

        this.ingredientCategoriesLookup$ = this.ingredientCategories$.pipe(
            filter(ingredientCategories => ingredientCategories !== null && ingredientCategories.length > 0),
            map(this.buildIngredientCategoriesLookup)
        );

        this.cartItemsByRecipe$.subscribe(cartItemsByRecipe => this.cartItemsByRecipe = cartItemsByRecipe);
    }

    public initialise() {
        if (!this.isInitialised) {
            this.cartFacade.fetchCart();
            this.recipesListFacade.fetchAllRecipes();
            this.recipesEditFacade.fetchIngredientCategories();

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
            .map(([_, cartItems]) => {
                return cartItems.map(cartItem => ({
                    ingredientId: cartItem.ingredient.id
                }));
            });

        const cartItemUpdatesToApply: CartItemUpdate[] = cartItemUpdates.concat(...existingCartItemUpdates);

        this.cartFacade.updateCurrentCartItems(cartItemUpdatesToApply);
    }

    public updateCartItems(cartItemUpdates: CartItemUpdate[]) {
        this.ensureInitialised();

        this.cartFacade.updateCurrentCartItems(cartItemUpdates);
    }

    public clearCart() {
        this.ensureInitialised();

        this.cartFacade.updateCurrentCartItems([]);
    }

    public refreshCart() {
        this.cartFacade.fetchCart();
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

    private buildCartItemsByIngredientCategoryLookup(cart: Cart): Map<string, CartItem[]> {
        const cartItemsByIngredientCategory = new Map<string, CartItem[]>();

        cart.items.forEach(cartItem => {
            const ingredientCategoryId = cartItem.ingredient.category.id;

            if (cartItemsByIngredientCategory.has(ingredientCategoryId)) {
                cartItemsByIngredientCategory.get(ingredientCategoryId).push(cartItem);
            } else {
                cartItemsByIngredientCategory.set(ingredientCategoryId, [cartItem]);
            }
        });

        return cartItemsByIngredientCategory;
    }

    private buildRecipesLookup(recipes: Recipe[]): Map<string, Recipe> {
        return new Map(recipes.map(recipe => [recipe.id, recipe]));
    }

    private buildIngredientCategoriesLookup(ingredientCategories: IngredientCategory[]): Map<string, IngredientCategory> {
        return new Map(ingredientCategories.map(ingredientCategory => [ingredientCategory.id, ingredientCategory]));
    }

    private ensureInitialised(): void {
        if (!this.isInitialised) {
            throw Error('Cart has not been initialised before usage.');
        }
    }
}

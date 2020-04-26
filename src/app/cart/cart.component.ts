import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from './api/models/read/cart.interface';
import { Recipe, IngredientCategory } from '../recipes/api/models/read/recipe.interface';
import { CartService } from './service/cart.service';
import { CartFacade } from './store/cart-store.facade';
import { CartItemGrouping } from './cart-item/models/grouping-mode';
import {
  CartDisplayItem,
  RecipeGroupedCartDisplayItem,
  IngredientCategoryGroupedCartDisplayItem
} from './cart-item/models/cart-display-item.interface';
import { CartExportService } from './service/cart-exporter.service';

interface CartDisplayItemBuilderParameters {
  cartItemsByRecipe: Map<string, CartItem[]>;
  cartItemsByIngredientCategory: Map<string, CartItem[]>;
  recipesLookup: Map<string, Recipe>;
  ingredientCategoriesLookup: Map<string, IngredientCategory>;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public groupingMode: CartItemGrouping = 'recipe';

  public showCart$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public cartDisplayItems$: Observable<CartDisplayItem[]>;

  private cartShowing = false;

  private cartDisplayItemBuilders = {
    recipe: this.buildCartDisplayItemsByRecipe,
    ingredientCategory: this.buildCartDisplayItemsByIngredientCategory
  };

  constructor(
    private cartService: CartService,
    private cartExportService: CartExportService,
    private cartFacade: CartFacade
  ) { }

  ngOnInit() {
    this.cartService.initialise();
    this.cartExportService.initialise();

    this.showCart$ = this.cartService.cartShowing$;
    this.isLoading$ = this.cartFacade.isLoading();

    // Ensure that if other sources toggle the cart then we show it.
    this.showCart$.subscribe(showCart => this.cartShowing = showCart);

    this.loadCartDisplayItems();
  }

  public toggleCart(): void {
    this.cartShowing = !this.cartShowing;

    // Update other sources of the cart toggle change.
    this.cartService.cartShowing$.next(this.cartShowing);
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public changeCartItemGroupingMode(groupingMode: CartItemGrouping) {
    this.groupingMode = groupingMode;

    this.loadCartDisplayItems();
  }

  public exportCart() {
    this.cartExportService.exportCurrentCart(this.groupingMode);
  }

  private loadCartDisplayItems() {
    this.cartDisplayItems$ = combineLatest([
      this.cartService.cartItemsByRecipe$,
      this.cartService.cartItemsByIngredientCategory$,
      this.cartService.recipesLookup$,
      this.cartService.ingredientCategoriesLookup$
    ]).pipe(
      map(([
        cartItemsByRecipe,
        cartItemsByIgnredientCategory,
        recipesLookup,
        ingredientCategoriesLookup
      ]) => this.buildCartDisplayItems(cartItemsByRecipe, cartItemsByIgnredientCategory, recipesLookup, ingredientCategoriesLookup))
    );
  }

  private buildCartDisplayItems(
    cartItemsByRecipe: Map<string, CartItem[]>,
    cartItemsByIngredientCategory: Map<string, CartItem[]>,
    recipesLookup: Map<string, Recipe>,
    ingredientCategoriesLookup: Map<string, IngredientCategory>
  ): CartDisplayItem[] {
    const parameters = {
      cartItemsByRecipe,
      cartItemsByIngredientCategory,
      recipesLookup,
      ingredientCategoriesLookup
    } as CartDisplayItemBuilderParameters;

    return this.cartDisplayItemBuilders[this.groupingMode](parameters);
  }

  private buildCartDisplayItemsByRecipe(parameters: CartDisplayItemBuilderParameters): CartDisplayItem[] {
    const cartItemsByRecipe = parameters.cartItemsByRecipe;
    const recipesLookup = parameters.recipesLookup;

    return Array.from(cartItemsByRecipe, ([recipeId, cartItems]) => {
      const recipe = recipesLookup.get(recipeId);

      if (recipe !== undefined) {
        return {
          recipe: {
            id: recipe.id,
            name: recipe.name
          },
          ingredients: cartItems.map(cartItem => {
            return {
              id: cartItem.ingredient.id,
              name: cartItem.ingredient.name,
              amount: cartItem.ingredient.amount,
              category: {
                id: cartItem.ingredient.category.id,
                name: cartItem.ingredient.category.name
              }
            };
          })
        } as RecipeGroupedCartDisplayItem;
      }
    });
  }

  private buildCartDisplayItemsByIngredientCategory(parameters: CartDisplayItemBuilderParameters): CartDisplayItem[] {
    const cartItemsByIngredientCategory = parameters.cartItemsByIngredientCategory;
    const ingredientCategoriesLookup = parameters.ingredientCategoriesLookup;

    return Array.from(cartItemsByIngredientCategory, ([ingredientCategoryId, cartItems]) => {
      const ingredientCategory = ingredientCategoriesLookup.get(ingredientCategoryId);

      if (ingredientCategory !== undefined) {
          return {
            category: {
              id: ingredientCategory.id,
              name: ingredientCategory.name
            },
            ingredients: cartItems.map(cartItem => {
              return {
                id: cartItem.ingredient.id,
                name: cartItem.ingredient.name,
                amount: cartItem.ingredient.amount
              };
            })
          } as IngredientCategoryGroupedCartDisplayItem;
      }
    });
  }
}

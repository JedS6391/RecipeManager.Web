import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from './api/models/read/cart.interface';
import { Recipe, IngredientCategory } from '../recipes/api/models/read/recipe.interface';
import { CartService } from './service/cart.service';

interface RecipeGroupedCartDisplayItem {
  recipe: {
    id: string;
    name: string;
  };
  ingredients: {
    id: string;
    name: string;
    amount: string;
    category: {
      id: string;
      name: string;
    };
  }[];
}

interface IngredientCategoryGroupedCartDisplayItem {
  category: {
    id: string;
    name: string;
  };
  ingredients: {
    id: string;
    name: string;
    amount: string;
  }[];
}

type CartDisplayItem = RecipeGroupedCartDisplayItem | IngredientCategoryGroupedCartDisplayItem;

type CartItemGrouping = 'recipe' | 'ingredientCategory';

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
  public showCart = false;
  public groupingMode: CartItemGrouping = 'recipe';

  public cartDisplayItems$: Observable<CartDisplayItem[]>;

  private cartDisplayItemBuilders = {
    recipe: this.buildCartDisplayItemsByRecipe,
    ingredientCategory: this.buildCartDisplayItemsByIngredientCategory
  };

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.initialise();

    this.loadCartDisplayItems();
  }

  public toggleCart(): void {
    this.showCart = !this.showCart;
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public changeCartItemGroupingMode(groupingMode: CartItemGrouping) {
    this.groupingMode = groupingMode;

    this.loadCartDisplayItems();
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

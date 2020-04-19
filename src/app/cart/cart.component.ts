import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Cart, CartItem } from './api/models/read/cart.interface';
import { Recipe } from '../recipes/api/models/read/recipe.interface';
import { CartService } from './service/cart.service';

interface CartDisplayItem {
  recipe: {
    id: string;
    name: string;
  };
  ingredients: {
    id: string;
    name: string;
    amount: string
  }[];
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public showCart = false;

  public cartDisplayItems$: Observable<CartDisplayItem[]>;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.initialise();

    this.cartDisplayItems$ = combineLatest([this.cartService.cartItemsByRecipe$, this.cartService.recipesInCartLookup$]).pipe(
      map(([cartItemsByRecipe, recipesInCartLookup]) => this.buildCartDisplayItems(cartItemsByRecipe, recipesInCartLookup))
    );
  }

  public toggleCart(): void {
    this.showCart = !this.showCart;
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  private buildCartDisplayItems(cartItemsByRecipe: Map<string, CartItem[]>, recipesInCartLookup: Map<string, Recipe>): CartDisplayItem[] {

    return Array.from(cartItemsByRecipe, ([recipeId, cartItems]) => {
      const recipe = recipesInCartLookup.get(recipeId);

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
              amount: cartItem.ingredient.amount
            };
          })
        } as CartDisplayItem;
      }
    });
  }
}

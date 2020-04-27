import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  CartDisplayItem,
  RecipeGroupedCartDisplayItem,
  IngredientCategoryGroupedCartDisplayItem
} from './models/cart-display-item.interface';
import { CartItemGrouping } from './models/grouping-mode';
import { CartService } from '../service/cart.service';
import { MessagingService } from 'src/app/shared/messaging.service';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/api/models/read/recipe.interface';
import { takeUntil, filter } from 'rxjs/operators';
import {
  AddRecipeToCartComponentData,
  AddRecipeToCartComponent,
  AddRecipeToCartComponentResult
} from '../add-recipe-to-cart/add-recipe-to-cart.component';
import { CartItem } from '../api/models/read/cart.interface';
import { CartItemUpdate } from '../api/models/write/update-cart-items';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input()
  public displayItem: CartDisplayItem;

  @Input()
  public groupingMode: CartItemGrouping;

  public collapsed = false;

  private destroyed$ = new Subject();
  private recipesLookup: Map<string, Recipe>;
  private cartItemsByRecipe: Map<string, CartItem[]>;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private messagingService: MessagingService
    ) { }

  ngOnInit() {
    this.cartService.recipesLookup$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(recipesLookup => this.recipesLookup = recipesLookup);

    this.cartService.cartItemsByRecipe$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(cartItemsByRecipe => this.cartItemsByRecipe = cartItemsByRecipe);
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public get cartItemTitle(): string {
    if (this.groupingMode === 'recipe') {
      return (this.displayItem as RecipeGroupedCartDisplayItem).recipe.name;
    }

    if (this.groupingMode === 'ingredientCategory') {
      return (this.displayItem as IngredientCategoryGroupedCartDisplayItem).category.name;
    }
  }

  public toggleCollapsedState() {
    this.collapsed = !this.collapsed;
  }

  public editCartItem(displayItem: CartDisplayItem) {
    const recipeIds = new Set<string>();

    // Only a single recipe to edit cart items for.
    if (this.groupingMode === 'recipe') {
      recipeIds.add((displayItem as RecipeGroupedCartDisplayItem).recipe.id);
    }

    // May be multiple recipes to edit cart items for.
    if (this.groupingMode === 'ingredientCategory') {
      (displayItem as IngredientCategoryGroupedCartDisplayItem).ingredients.map(ingredient => ingredient.recipeId).forEach(recipeId =>
        recipeIds.add(recipeId)
      );
    }

    recipeIds.forEach(recipeId => {
      const recipe = this.recipesLookup.get(recipeId);

      const addToRecipeCartData: AddRecipeToCartComponentData = {
        recipe
      };

      const dialogReference = this.dialog.open(AddRecipeToCartComponent, {
        height: '400px',
        width: '600px',
        data: addToRecipeCartData
      });

      dialogReference.afterClosed().pipe(
        filter((result: AddRecipeToCartComponentResult) => !result.isCancelled)
      ).subscribe((result: AddRecipeToCartComponentResult) => {
        this.cartService.updateCartItemsForRecipe(
          result.recipeId,
          result.selectedIngredients.map(ingredient => ({
            ingredientId: ingredient.id
          }))
        );

        this.messagingService.showMessage(`Cart items for ${result.recipeName} updated!`, {
          duration: 2000
        });
      });
    });
  }

  public removeCartItem(displayItem: CartDisplayItem) {
    // Only a single recipe to remove from the cart.
    if (this.groupingMode === 'recipe') {
      this.cartService.updateCartItemsForRecipe((displayItem as RecipeGroupedCartDisplayItem).recipe.id, []);
    }

    // Need to remove all ingredients for this category from all recipes currently in the cart.
    // Simplest way to do this is to get the current cart items and exlude any that match the
    // category to be removed.
    if (this.groupingMode === 'ingredientCategory') {
      const category = (displayItem as IngredientCategoryGroupedCartDisplayItem).category;

      const cartItemUpdatesPerRecipe = Array.from(this.cartItemsByRecipe, ([_, cartItems]) => {
        return cartItems
          .filter(cartItem => cartItem.ingredient.category.id !== category.id)
          .map(cartItem => ({
            ingredientId: cartItem.ingredient.id
          }) as CartItemUpdate);
      });

      const cartItemUpdates: CartItemUpdate[] = [].concat(...cartItemUpdatesPerRecipe);

      this.cartService.updateCartItems(cartItemUpdates);
    }
  }
}

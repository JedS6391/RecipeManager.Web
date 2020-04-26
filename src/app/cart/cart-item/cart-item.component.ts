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

  private destroyed$ = new Subject();
  private recipesLookup: Map<string, Recipe>;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private messagingService: MessagingService
    ) { }

  ngOnInit() {
    this.cartService.recipesLookup$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(recipesLookup => this.recipesLookup = recipesLookup);
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

  public editCartItem(recipeId: string) {
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
  }

  public removeCartItem(recipeId: string) {
    this.cartService.updateCartItemsForRecipe(recipeId, []);
  }
}

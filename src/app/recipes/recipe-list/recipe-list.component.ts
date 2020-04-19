import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesListFacade } from '../store/recipes-store.facade';
import { CartFacade } from 'src/app/cart/store/cart-store.facade';
import {
  AddRecipeToCartComponent,
  AddRecipeToCartComponentData,
  AddRecipeToCartComponentResult
} from '../../cart/add-recipe-to-cart/add-recipe-to-cart.component';
import { CartService } from 'src/app/cart/service/cart.service';
import { CartItem } from 'src/app/cart/api/models/read/cart.interface';
import { CartItemUpdate } from 'src/app/cart/api/models/write/update-cart-items';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public recipes$: Observable<Recipe[]>;

    constructor(
      private recipesListFacade: RecipesListFacade,
      private dialog: MatDialog,
      private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.recipesListFacade.fetchAllRecipes();

        this.isLoading$ = this.recipesListFacade.isLoading();
        this.recipes$ = this.recipesListFacade.getAllRecipes();
    }

    public addRecipeToCart(recipe: Recipe) {
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
      });
    }
}

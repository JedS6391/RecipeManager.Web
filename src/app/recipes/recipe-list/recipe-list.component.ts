import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { filter, take, map, debounceTime } from 'rxjs/operators';

import { Recipe, RecipeGroup } from '../api/models/read/recipe.interface';
import { RecipesListFacade } from '../store/recipes-store.facade';
import {
  AddRecipeToCartComponent,
  AddRecipeToCartComponentData,
  AddRecipeToCartComponentResult
} from '../../cart/add-recipe-to-cart/add-recipe-to-cart.component';
import { CartService } from 'src/app/cart/service/cart.service';
import { MessagingService } from 'src/app/shared/messaging.service';
import {
  DeleteRecipeDialogComponentData,
  DeleteRecipeDialogComponent,
  DeleteRecipeDialogComponentResult
} from './delete-recipe-dialog/delete-recipe-dialog.component';

type RecipeListViewMode = 'name' | 'recipeGroup';

const DEFAULT_RECIPE_GROUP: RecipeGroup = {
  id: 'default-recipe-group',
  name: ''
};

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public recipes$: Observable<Recipe[]>;
    public recipesByGroup$: Observable<Map<RecipeGroup, Recipe[]>>;

    public filtersCollapsed = true;
    public viewMode: RecipeListViewMode = 'name';

    private allRecipes$: Observable<Recipe[]>;
    private searchTerm$ = new BehaviorSubject<string>('');
    private selectedRecipeGroups$ = new BehaviorSubject<RecipeGroup[]>([]);

    constructor(
      private recipesListFacade: RecipesListFacade,
      private dialog: MatDialog,
      private cartService: CartService,
      private messagingService: MessagingService,
    ) { }

    ngOnInit(): void {
        this.recipesListFacade.fetchAllRecipes();

        this.isLoading$ = this.recipesListFacade.isLoading();
        this.allRecipes$ = this.recipesListFacade.getAllRecipes();

        // Recipe list can be filtered by the search term
        this.recipes$ = combineLatest(
          this.allRecipes$,
          this.searchTerm$.pipe(
            debounceTime(500)
          ),
          this.selectedRecipeGroups$.pipe(
            debounceTime(500)
          )
        ).pipe(
          map(([allRecipes, searchTerm, selectedRecipeGroups]) => {
            const selectedRecipeGroupIds = new Set<string>(selectedRecipeGroups.map(recipeGroup => recipeGroup.id));

            return allRecipes.filter(recipe =>
              recipe.name.toLowerCase().includes(searchTerm) &&
              (selectedRecipeGroups.length === 0 || recipe.groups.some(recipeGroup => selectedRecipeGroupIds.has(recipeGroup.id)))
            );
          })
        );

        this.recipesByGroup$ = this.recipes$.pipe(
          map(recipes => {
            const recipesByGroup = new Map<RecipeGroup, Recipe[]>();

            // Add a placeholder group for any recipes that have no groups.
            recipesByGroup.set(DEFAULT_RECIPE_GROUP, []);

            recipes.forEach(recipe => {
              // Because a recipe may have multiple groups, it may be present multiple times.
              if (recipe.groups.length === 0) {
                recipesByGroup.get(DEFAULT_RECIPE_GROUP).push(recipe);
              } else {
                recipe.groups.forEach(group => {
                  if (recipesByGroup.has(group)) {
                    recipesByGroup.get(group).push(recipe);
                  } else {
                    recipesByGroup.set(group, [recipe]);
                  }
                });
              }
            });

            return recipesByGroup;
          })
        );

        this.recipesByGroup$.subscribe();
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

        // Show the cart
        this.cartService.cartShowing$.next(true);

        this.messagingService.showMessage(`${result.recipeName} added to cart!`, {
          duration: 2000
        });
      });
    }

    public deleteRecipe(recipe: Recipe) {
      const deleteRecipeData: DeleteRecipeDialogComponentData = {
        recipe
      };

      const dialogReference = this.dialog.open(DeleteRecipeDialogComponent, {
        height: '250px',
        width: '600px',
        data: deleteRecipeData
      });

      dialogReference.afterClosed().pipe(
        filter((result: DeleteRecipeDialogComponentResult) => !result.isCancelled)
      ).subscribe(() => {
        this.recipesListFacade.deleteRecipe(recipe.id);

        // Refresh once the delete is done.
        this.isLoading$.pipe(
          filter(isLoading => !isLoading),
          take(1)
        ).subscribe(() => {
          this.recipesListFacade.fetchAllRecipes();
          this.cartService.refreshCart();
          this.messagingService.showMessage('Recipe successfully deleted!', {
            duration: 2000
          });
        });
      });
    }

    public changeRecipeListViewMode(viewMode: RecipeListViewMode) {
      this.viewMode = viewMode;
    }

    public onSearchTermChange(searchTerm: string) {
      this.searchTerm$.next(searchTerm);
    }

    public onSelectedRecipeGroupsChange(selectedRecipeGroups: RecipeGroup[]) {
      this.selectedRecipeGroups$.next(selectedRecipeGroups);
    }

    public toggleFilters() {
      this.filtersCollapsed = !this.filtersCollapsed;
    }
}

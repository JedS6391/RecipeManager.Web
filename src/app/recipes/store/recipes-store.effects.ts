import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { RecipeApiService } from '../api/recipe-api.service';
import * as actions from './recipes-store.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private recipeApiService: RecipeApiService
    ) {}

    @Effect()
    public getAllRecipes$ = this.actions$.pipe(
        ofType<actions.GetAllRecipes>(actions.GetAllRecipes.TYPE),
        switchMap(() => {
            return this.recipeApiService.getRecipes().pipe(
                map(recipes => new actions.GetAllRecipesSuccess(recipes)),
                catchError(error => of(new actions.GetAllRecipesFailure(error)))
            );
        })
    );

    @Effect()
    public getRecipe$ = this.actions$.pipe(
        ofType<actions.GetRecipe>(actions.GetRecipe.TYPE),
        switchMap(action => {
            return this.recipeApiService.getRecipe(action.recipeId).pipe(
                map(recipe => new actions.GetRecipeSuccess(recipe)),
                catchError(error => of(new actions.GetRecipeFailure(error)))
            );
        })
    );

    @Effect()
    public createRecipe$ = this.actions$.pipe(
        ofType<actions.CreateRecipeAction>(actions.CreateRecipeAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.createRecipe(action.recipe).pipe(
                map(recipe => new actions.CreateRecipeSuccess(recipe)),
                catchError(error => of(new actions.CreateRecipeFailure(error)))
            );
        })
    );

    @Effect()
    public updateRecipe$ = this.actions$.pipe(
        ofType<actions.UpdateRecipeAction>(actions.UpdateRecipeAction.TYPE),
        switchMap(action => {
            // Update recipe
            return this.recipeApiService.updateRecipe(action.recipe).pipe(
                mergeMap(() => [
                    new actions.UpdateRecipeIngredientsAction(
                        action.recipe,
                        action.ingredients,
                        r => new actions.UpdateRecipeSuccess(r),
                        e => new actions.UpdateRecipeFailure(e)
                    )
                ]),
                catchError(error => of(new actions.UpdateRecipeFailure(error)))
            );
        })
    );

    @Effect()
    public updateRecipeIngredients$ = this.actions$.pipe(
        ofType<actions.UpdateRecipeIngredientsAction>(actions.UpdateRecipeIngredientsAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.updateRecipeIngredients(
                action.recipe.recipeId,
                action.ingredients
            ).pipe(
                map(recipe => new actions.UpdateRecipeSuccess(recipe)),
                catchError(error => of(new actions.UpdateRecipeFailure(error)))
            );
        })
    );
}



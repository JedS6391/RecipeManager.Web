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
    public getIngredientCategories$ = this.actions$.pipe(
        ofType<actions.GetIngredientCategories>(actions.GetIngredientCategories.TYPE),
        switchMap(() => {
            return this.recipeApiService.getIngredientCategories().pipe(
                map(ingredientCategories => new actions.GetIngredientCategoriesSuccess(ingredientCategories)),
                catchError(error => of(new actions.GetIngredientCategoriesFailure(error)))
            );
        })
    );

    @Effect()
    public getRecipeGroups$ = this.actions$.pipe(
        ofType<actions.GetRecipeGroups>(actions.GetRecipeGroups.TYPE),
        switchMap(() => {
            return this.recipeApiService.getRecipeGroups().pipe(
                map(recipeGroups => new actions.GetRecipeGroupsSuccess(recipeGroups)),
                catchError(error => of(new actions.GetRecipeGroupsFailure(error)))
            );
        })
    );

    @Effect()
    public getRecipeImportJob$ = this.actions$.pipe(
        ofType<actions.GetRecipeImportJobAction>(actions.GetRecipeImportJobAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.getRecipeImportJob(action.jobId).pipe(
                map(job => new actions.GetRecipeImportJobSuccess(job)),
                catchError(error => of(new actions.GetRecipeImportJobFailure(error)))
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
    public importRecipe$ = this.actions$.pipe(
        ofType<actions.ImportRecipeAction>(actions.ImportRecipeAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.importRecipe(action.recipe).pipe(
                map(job => new actions.ImportRecipeSuccess(job)),
                catchError(error => of(new actions.ImportRecipeFailure(error)))
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
                    ),
                    new actions.UpdateRecipeGroupsAction(
                        action.recipe,
                        action.recipeGroups,
                        r => new actions.UpdateRecipeSuccess(r),
                        e => new actions.UpdateRecipeSuccess(e)
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

    @Effect()
    public updateRecipeGroups$ = this.actions$.pipe(
        ofType<actions.UpdateRecipeGroupsAction>(actions.UpdateRecipeGroupsAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.updateRecipeGroups(
                action.recipe.recipeId,
                action.recipeGroups
            ).pipe(
                map(recipe => new actions.UpdateRecipeSuccess(recipe)),
                catchError(error => of(new actions.UpdateRecipeFailure(error)))
            );
        })
    );

    @Effect()
    public deleteRecipe$ = this.actions$.pipe(
        ofType<actions.DeleteRecipeAction>(actions.DeleteRecipeAction.TYPE),
        switchMap(action => {
            return this.recipeApiService.deleteRecipe(action.recipeId).pipe(
                map(() => new actions.DeleteRecipeSuccess()),
                catchError(error => of(new actions.DeleteRecipeFailure(error)))
            );
        })
    );
}



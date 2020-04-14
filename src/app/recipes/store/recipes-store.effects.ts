import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { RecipeApiService } from '../api/recipe-api.service';
import * as actions from './recipes-store.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
}

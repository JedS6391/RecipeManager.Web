import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as selectors from './recipes-store.selectors';
import * as actions from './recipes-store.actions';
import { Observable } from 'rxjs';
import { Recipe } from '../api/models/read/recipe.interface';

@Injectable()
export class RecipesFacade {
    constructor(private store: Store<any>) {}

    public fetchAllRecipes() {
        this.store.dispatch(new actions.GetAllRecipes());
    }

    public getAllRecipes(): Observable<Recipe[]> {
        return this.store.pipe(select(selectors.getAllRecipes));
    }

    public isRecipeListLoading(): Observable<boolean> {
        return this.store.pipe(select(selectors.isRecipeListLoading));
    }
}

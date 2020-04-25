import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as selectors from './recipes-store.selectors';
import * as actions from './recipes-store.actions';
import { Observable } from 'rxjs';
import { Recipe, IngredientCategory } from '../api/models/read/recipe.interface';
import { map } from 'rxjs/operators';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { CreateRecipe } from '../api/models/write/create-recipe.interface';

@Injectable()
export class RecipesListFacade {
    constructor(private store: Store<any>) {}

    public fetchAllRecipes() {
        this.store.dispatch(new actions.GetAllRecipes());
    }

    public getAllRecipes(): Observable<Recipe[]> {
        return this.store.pipe(
            select(selectors.recipeListState),
            map(s => s.recipes)
        );
    }

    public isLoading(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeListState),
            map(s => s.isLoading)
        );
    }
}

@Injectable()
export class RecipesCreateFacade {
    constructor(private store: Store<any>) {}

    public createRecipe(recipe: CreateRecipe) {
        this.store.dispatch(new actions.CreateRecipeAction(recipe));
    }

    public getRecipe(): Observable<Recipe> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.recipe)
        );
    }

    public isSaving(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.isSaving)
        );
    }
}

@Injectable()
export class RecipesEditFacade {
    constructor(private store: Store<any>) {}

    public fetchRecipe(recipeId: string) {
        this.store.dispatch(new actions.GetRecipe(recipeId));
    }

    public fetchIngredientCategories() {
        this.store.dispatch(new actions.GetIngredientCategories());
    }

    public getRecipe(): Observable<Recipe> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.recipe)
        );
    }

    public getIngredientCategories(): Observable<IngredientCategory[]> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.ingredientCategories)
        );
    }

    public updateRecipe(recipe: UpdateRecipe, ingredients: CreateIngredient[]) {
        this.store.dispatch(new actions.UpdateRecipeAction(recipe, ingredients));
    }

    public isSaving(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.isSaving)
        );
    }

    public isSaveSuccessful(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.saveSuccessful)
        );
    }
}

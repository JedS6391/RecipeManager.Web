import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as selectors from './recipes-store.selectors';
import * as actions from './recipes-store.actions';
import { Observable } from 'rxjs';
import { Recipe, IngredientCategory, RecipeGroup } from '../api/models/read/recipe.interface';
import { map } from 'rxjs/operators';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { CreateRecipe } from '../api/models/write/create-recipe.interface';
import { UpdateRecipeGroups } from '../api/models/write/update-recipe-groups.interface';
import { ImportRecipe } from '../api/models/write/import-recipe.interface';
import { RecipeImportJob } from '../api/models/read/recipe-import-job.interface';

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

    public deleteRecipe(recipeId: string) {
        this.store.dispatch(new actions.DeleteRecipeAction(recipeId));
    }
}

@Injectable()
export class RecipesCreateFacade {
    constructor(private store: Store<any>) {}

    public createRecipe(recipe: CreateRecipe) {
        this.store.dispatch(new actions.CreateRecipeAction(recipe));
    }

    public importRecipe(recipe: ImportRecipe) {
        this.store.dispatch(new actions.ImportRecipeAction(recipe));
    }

    public fetchRecipeImportJob(jobId: string) {
        this.store.dispatch(new actions.GetRecipeImportJobAction(jobId));
    }

    public getRecipe(): Observable<Recipe> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.recipe)
        );
    }

    public getRecipeImportJob(): Observable<RecipeImportJob> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.importJob)
        );
    }

    public isSaving(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.isSaving)
        );
    }

    public isLoading(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeCreateState),
            map(s => s.isLoading)
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

    public fetchRecipeGroups() {
        this.store.dispatch(new actions.GetRecipeGroups());
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

    public getRecipeGroups(): Observable<RecipeGroup[]> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.recipeGroups)
        );
    }

    public updateRecipe(recipe: UpdateRecipe, ingredients: CreateIngredient[], recipeGroups: UpdateRecipeGroups) {
        this.store.dispatch(new actions.UpdateRecipeAction(recipe, ingredients, recipeGroups));
    }

    public isSaving(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.isSaving)
        );
    }

    public isLoading(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.isLoading)
        );
    }

    public isSaveSuccessful(): Observable<boolean> {
        return this.store.pipe(
            select(selectors.recipeEditState),
            map(s => s.saveSuccessful)
        );
    }

    public deleteRecipe(recipeId: string) {
        this.store.dispatch(new actions.DeleteRecipeAction(recipeId));
    }
}

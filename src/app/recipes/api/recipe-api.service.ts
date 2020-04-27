import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';

import { Recipe, IngredientCategory, RecipeGroup } from './models/read/recipe.interface';
import { RECIPE_URLS } from './recipe.urls';
import { CreateRecipe } from './models/write/create-recipe.interface';
import { CreateIngredient } from './models/write/create-ingredient.interface';
import { UpdateRecipe } from './models/write/update-recipe.interface';
import { BaseApiService } from '../../shared/base-api.service';
import { TokenStoreService } from 'src/app/authentication/token-store.service';
import { UpdateRecipeGroups } from './models/write/update-recipe-groups.interface';

export const RECIPES_BASE_URL_TOKEN = new InjectionToken<string>('RecipeApiBaseUrl');

@Injectable()
export class RecipeApiService extends BaseApiService {
    constructor(
        @Inject(RECIPES_BASE_URL_TOKEN) baseUrl: string,
        http: HttpClient,
        tokenStoreService: TokenStoreService
    ) {
        super(baseUrl, http, tokenStoreService);
    }

    public getRecipes(): Observable<Recipe[]> {
        const url = `${this.baseUrl}${RECIPE_URLS.get.allRecipes}`;

        return this.http.get<Recipe[]>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getRecipe(recipeId: string): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.get.recipeById(recipeId)}`;

        return this.http.get<Recipe>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getIngredientCategories(): Observable<IngredientCategory[]> {
        const url = `${this.baseUrl}${RECIPE_URLS.get.ingredientCategories}`;

        return this.http.get<IngredientCategory[]>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getRecipeGroups(): Observable<RecipeGroup[]> {
        const url = `${this.baseUrl}${RECIPE_URLS.get.recipeGroups}`;

        return this.http.get<RecipeGroup[]>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public createRecipe(recipe: CreateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.create.recipe}`;

        return this.http.post<CreateRecipe>(url, recipe, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipe(recipe: UpdateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.update.recipe(recipe.recipeId)}`;

        return this.http.put<UpdateRecipe>(url, recipe, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipeIngredients(recipeId: string, ingredients: CreateIngredient[]): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.update.recipeIngredients(recipeId)}`;

        return this.http.put<CreateIngredient[]>(url, ingredients, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipeGroups(recipeId: string, recipeGroups: UpdateRecipeGroups): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.update.recipeGroups(recipeId)}`;

        return this.http.put<UpdateRecipeGroups>(url, recipeGroups, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public deleteRecipe(recipeId: string): Observable<void> {
        const url = `${this.baseUrl}${RECIPE_URLS.delete.recipe(recipeId)}`;

        return this.http.delete(url, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }
}

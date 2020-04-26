import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishLast, refCount } from 'rxjs/operators';

import { Recipe, IngredientCategory } from './models/read/recipe.interface';
import { RECIPE_URLS } from './recipe.urls';
import { CreateRecipe } from './models/write/create-recipe.interface';
import { CreateIngredient } from './models/write/create-ingredient.interface';
import { UpdateRecipe } from './models/write/update-recipe.interface';
import { BaseApiService } from '../../shared/base-api.service';
import { TokenStoreService } from 'src/app/authentication/token-store.service';

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
        const url = `${this.baseUrl}${RECIPE_URLS.getAllRecipes}`;

        return this.http.get<Recipe[]>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getRecipe(recipeId: string): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.getRecipeById(recipeId)}`;

        return this.http.get<Recipe>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getIngredientCategories(): Observable<IngredientCategory[]> {
        const url = `${this.baseUrl}${RECIPE_URLS.getIngredientCategories}`;

        return this.http.get<IngredientCategory[]>(url, { headers: this.getHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public createRecipe(recipe: CreateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.createRecipe}`;

        return this.http.post<CreateRecipe>(url, recipe, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipe(recipe: UpdateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.updateRecipe(recipe.recipeId)}`;

        return this.http.put<UpdateRecipe>(url, recipe, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipeIngredients(recipeId: string, ingredients: CreateIngredient[]): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.updateRecipeIngredients(recipeId)}`;

        return this.http.put<CreateIngredient[]>(url, ingredients, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public deleteRecipe(recipeId: string): Observable<void> {
        const url = `${this.baseUrl}${RECIPE_URLS.deleteRecipe(recipeId)}`;

        return this.http.delete(url, {headers: this.getHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }
}

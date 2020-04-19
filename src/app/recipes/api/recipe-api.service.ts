import { Injectable, Inject, OnDestroy, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Recipe } from './models/read/recipe.interface';
import { Observable, Subject } from 'rxjs';
import { RECIPE_URLS } from './recipe.urls';
import { publishLast, refCount, takeUntil } from 'rxjs/operators';
import { CreateRecipe } from './models/write/create-recipe.interface';
import { CreateIngredient } from './models/write/create-ingredient.interface';
import { UpdateRecipe } from './models/write/update-recipe.interface';
import { BaseApiService } from '../../shared/base-api.service';

export const RECIPES_BASE_URL_TOKEN = new InjectionToken<string>('RecipeApiBaseUrl');

@Injectable()
export class RecipeApiService extends BaseApiService {
    constructor(
        @Inject(RECIPES_BASE_URL_TOKEN) baseUrl: string,
        http: HttpClient,
        authenticationService: AuthenticationService
    ) {
        super(baseUrl, http, authenticationService);
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
}

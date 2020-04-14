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

export const RECIPES_BASE_URL_TOKEN = new InjectionToken<string>('RecipeApiBaseUrl');

@Injectable()
export class RecipeApiService implements OnDestroy {
    private token: string;
    private destroyed$ = new Subject();

    constructor(
        @Inject(RECIPES_BASE_URL_TOKEN) private baseUrl: string,
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.token$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(token => this.token = token);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    public getRecipes(): Observable<Recipe[]> {
        const url = `${this.baseUrl}${RECIPE_URLS.recipes}`;

        return this.http.get<Recipe[]>(url, { headers: this.buildHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public getRecipe(recipeId: string): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.recipes}/${recipeId}`;

        return this.http.get<Recipe>(url, { headers: this.buildHeaders() }).pipe(
            publishLast(),
            refCount()
        );
    }

    public createRecipe(recipe: CreateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.recipes}`;

        return this.http.post<CreateRecipe>(url, recipe, {headers: this.buildHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipe(recipe: UpdateRecipe): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.recipes}/${recipe.recipeId}`;

        return this.http.put<UpdateRecipe>(url, recipe, {headers: this.buildHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    public updateRecipeIngredients(recipeId: string, ingredients: CreateIngredient[]): Observable<Recipe> {
        const url = `${this.baseUrl}${RECIPE_URLS.recipes}/${recipeId}/ingredients`;

        return this.http.put<CreateIngredient[]>(url, ingredients, {headers: this.buildHeaders()}).pipe(
            publishLast(),
            refCount()
        );
    }

    private buildHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.token}`
        });
    }
}

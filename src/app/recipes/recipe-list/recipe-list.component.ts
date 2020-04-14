import { Component, OnInit } from '@angular/core';
import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesFacade } from '../store/recipes-store.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public recipes$: Observable<Recipe[]>;

    constructor(public recipesFacade: RecipesFacade) { }

    ngOnInit(): void {
        this.recipesFacade.fetchAllRecipes();

        this.isLoading$ = this.recipesFacade.isRecipeListLoading();
        this.recipes$ = this.recipesFacade.getAllRecipes();
    }
}

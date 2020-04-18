import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesListFacade } from '../store/recipes-store.facade';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public recipes$: Observable<Recipe[]>;

    constructor(public recipesListFacade: RecipesListFacade) { }

    ngOnInit(): void {
        this.recipesListFacade.fetchAllRecipes();

        this.isLoading$ = this.recipesListFacade.isLoading();
        this.recipes$ = this.recipesListFacade.getAllRecipes();
    }
}

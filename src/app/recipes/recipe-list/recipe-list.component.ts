import { Component, OnInit } from '@angular/core';
import { RecipeApiService } from '../api/recipe-api.service';
import { Recipe } from '../api/models/read/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    public recipes: Recipe[];

    constructor(public recipeApiService: RecipeApiService) { }

    ngOnInit(): void {
        this.recipeApiService.getRecipes().subscribe(recipes => this.recipes = recipes);
    }
}

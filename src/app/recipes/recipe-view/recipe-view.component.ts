import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../store/recipes-store.facade';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  public recipeId: string;
  public recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade
  ) { }

  public ngOnInit(): void {
    // Load the recipe being viewed
    this.route.params.subscribe(params => {
      this.recipesEditFacade.fetchRecipe(params.id);
    });

    this.recipe$ = this.recipesEditFacade.getRecipe();

    this.recipe$.subscribe(recipe => this.recipeId = recipe.id);
  }
}

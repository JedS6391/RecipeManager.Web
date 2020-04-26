import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../store/recipes-store.facade';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  public recipeId: string;
  public recipe$: Observable<Recipe>;
  public isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade
  ) { }

  public ngOnInit(): void {
    // Load the recipe being viewed
    this.route.params.subscribe(params => {
      this.recipesEditFacade.fetchRecipe(params.id);
    });

    this.recipe$ = this.recipesEditFacade.getRecipe();
    this.isLoading$ = this.recipesEditFacade.isLoading();

    this.recipe$.subscribe(recipe => this.recipeId = recipe.id);
  }

  public deleteRecipe(recipeId: string) {
    this.recipesEditFacade.deleteRecipe(recipeId);

    // Redirect once the delete is done.
    this.isLoading$.pipe(
      filter(isLoading => !isLoading),
      take(1)
    ).subscribe(() => {
      this.router.navigate(['recipes']);
    });
  }
}

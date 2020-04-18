import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, from, timer } from 'rxjs';

import { Recipe } from '../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../store/recipes-store.facade';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public form: FormGroup;
  public showSaveSuccessfulMessage = false;

  public isSaving$: Observable<boolean>;
  public saveSuccessful$: Observable<boolean>;
  public recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      recipeId: '',
      ingredients: this.fb.array([
        this.fb.group({
          name: '',
          amount: ''
        })
      ])
    });

    // Load the recipe being viewed
    this.route.params.subscribe(params => {
      this.recipesEditFacade.fetchRecipe(params.id);
    });

    this.recipe$ = this.recipesEditFacade.getRecipe();
    this.isSaving$ = this.recipesEditFacade.isSaving();
    this.saveSuccessful$ = this.recipesEditFacade.isSaveSuccessful();

    // Update form each time the recipe changes
    this.recipe$.subscribe(recipe => {
      this.form.patchValue({
        name: recipe.name,
        recipeId: recipe.id
      });

      this.form.setControl('ingredients', this.fb.array(
        recipe.ingredients.map(ingredient => this.fb.group({
          name: ingredient.name,
          amount: ingredient.amount
        })
      )));
    });

    // Show save successful dialog for 2 seconds after each successful save
    this.saveSuccessful$.pipe(
      filter(val => val)
    ).subscribe(() => {
      this.showSaveSuccessfulMessage = true;
      timer(2000).subscribe(() => this.showSaveSuccessfulMessage = false);
    });
  }

  public submitForm(): void {
    const updatedRecipe = {
      recipeId: this.form.value.recipeId,
      name: this.form.value.name
    };

    const updatedIngredients = (this.form.get('ingredients') as FormArray).value.map(ingredient => {
      return {
        name: ingredient.name,
        amount: ingredient.amount
      };
    });

    this.recipesEditFacade.updateRecipe(updatedRecipe, updatedIngredients);
  }
}

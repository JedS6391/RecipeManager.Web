import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';

import { Recipe, } from '../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../store/recipes-store.facade';
import { filter } from 'rxjs/operators';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { MessagingService } from 'src/app/shared/messaging.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public form: FormGroup;

  public isSaving$: Observable<boolean>;
  public saveSuccessful$: Observable<boolean>;
  public recipe$: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      recipeId: '',
      ingredients: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          ingredientId: '',
          amount: ['', Validators.required],
          category: ['', Validators.required]
        })
      ])
    });

    // Load the recipe being viewed
    this.route.params.subscribe(params => {
      this.recipesEditFacade.fetchRecipe(params.id);

      // Refresh the ingredient categories after each recipe change to ensure we get the latest.
      this.recipesEditFacade.fetchIngredientCategories();
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

      const ingredientsControl = this.fb.array([]);

      recipe.ingredients.forEach(ingredient => {
        ingredientsControl.push(this.fb.group({
          name: [ingredient.name, Validators.required],
          ingredientId: ingredient.id,
          amount: [ingredient.amount, Validators.required],
          category: [ingredient.category.name, Validators.required]
        }));
      });

      this.form.setControl('ingredients', ingredientsControl);
    });

    // Show save successful dialog for 2 seconds after each successful save
    this.saveSuccessful$.pipe(
      filter(val => val)
    ).subscribe(() => {
      // Refresh ingredient categories, as new ones may have been added.
      this.recipesEditFacade.fetchIngredientCategories();

      this.messagingService.showMessage('Successfully saved recipe!', {
        duration: 2000
      });
    });
  }

  public submitForm(): void {
    if (!this.form.valid) {
      this.messagingService.showMessage('Please enter the required details.', {
        duration: 2000
      });

      return;
    }

    const updatedRecipe = {
      recipeId: this.form.value.recipeId,
      name: this.form.value.name
    } as UpdateRecipe;

    const updatedIngredients = (this.form.get('ingredients') as FormArray).value.map(ingredient => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        category: ingredient.category
      } as CreateIngredient;
    });

    this.recipesEditFacade.updateRecipe(updatedRecipe, updatedIngredients);
  }
}

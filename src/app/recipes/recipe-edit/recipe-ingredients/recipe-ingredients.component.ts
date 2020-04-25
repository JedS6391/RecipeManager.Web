import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe, IngredientCategory } from '../../api/models/read/recipe.interface';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RecipesEditFacade } from '../../store/recipes-store.facade';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeIngredientsComponent implements OnInit {
  @Input()
  public recipe: Recipe;

  @Input()
  public form: FormGroup;

  public ingredientCategories$: Observable<IngredientCategory[]>;

  constructor(
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade
  ) { }

  ngOnInit() {
    this.ingredientCategories$ = this.recipesEditFacade.getIngredientCategories();
  }

  public addIngredient(): void {
    const ingredients = this.form.get('ingredients') as FormArray;

    ingredients.push(this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required],
        category: ['', Validators.required]
    }));
  }

  public deleteIngredient(ingredientIndex: number): void {
    const ingredients = this.form.get('ingredients') as FormArray;

    ingredients.removeAt(ingredientIndex);
  }

  public addTag(tag: string) {
    /* https://github.com/ng-select/ng-select/issues/809 */
    return tag;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RecipeApiService } from '../api/recipe-api.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../api/models/read/recipe.interface';
import { Observable, forkJoin, from, timer } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public form: FormGroup;
  public recipe$: Observable<Recipe>;
  public saveSuccessful = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeApiService: RecipeApiService
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

    this.route.params.subscribe(params => {
      this.recipe$ = this.recipeApiService.getRecipe(params.id);
    });

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
  }

  public submitForm(): void {
    console.log(this.form.value);

    // Update recipe
    const updateRecipe$ = this.recipeApiService.updateRecipe({
      recipeId: this.form.value.recipeId,
      name: this.form.value.name
    });

    // Update ingredients
    const ingredients = this.form.get('ingredients') as FormArray;

    const updateRecipeIngredients$ = this.recipeApiService.updateRecipeIngredients(
      this.form.value.recipeId,
      ingredients.value.map(ingredient => {
        return {
          name: ingredient.name,
          amount: ingredient.amount
        };
      })
    );

    forkJoin([updateRecipe$, updateRecipeIngredients$]).subscribe(recipes => {
      this.recipe$ = from(recipes);
      this.saveSuccessful = true;

      timer(2000).subscribe(() => this.saveSuccessful = false);
    });
  }
}

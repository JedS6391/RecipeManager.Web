import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../api/models/read/recipe.interface';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss']
})
export class RecipeIngredientsComponent implements OnInit {
  @Input()
  public recipe: Recipe;

  @Input()
  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  public addIngredient(): void {
    const ingredients = this.form.get('ingredients') as FormArray;

    ingredients.push(this.fb.group({
        name: '',
        amount: ''
    }));
  }

  public deleteIngredient(ingredientIndex: number): void {
    const ingredients = this.form.get('ingredients') as FormArray;

    ingredients.removeAt(ingredientIndex);
  }
}

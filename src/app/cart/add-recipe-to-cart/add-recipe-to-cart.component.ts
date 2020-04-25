import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/recipes/api/models/read/recipe.interface';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { Subject } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';

export interface AddRecipeToCartComponentData {
  recipe: Recipe;
}

export interface AddRecipeToCartComponentResult {
  isCancelled: boolean;
  recipeId: string;
  recipeName: string;
  selectedIngredients: { id: string; name: string; }[];
}

@Component({
  selector: 'app-add-recipe-to-cart',
  templateUrl: './add-recipe-to-cart.component.html',
  styleUrls: ['./add-recipe-to-cart.component.scss']
})
export class AddRecipeToCartComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroyed$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddRecipeToCartComponentData,
    private cartService: CartService,
    private dialogRef: MatDialogRef<AddRecipeToCartComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: this.data.recipe.id,
      name: this.data.recipe.name,
      ingredients: this.fb.array(this.data.recipe.ingredients.map(ingredient => {
        return this.fb.group({
          id: ingredient.id,
          name: ingredient.name,
          // By default, all ingredients are selected
          selected: true
        });
      }))
    });

    this.cartService.getSelectedCartItemsForRecipe(this.data.recipe.id).pipe(
        takeUntil(this.destroyed$),
        // Make sure to filter out in case no ingredients from this recipe have been added as cart items before.
        filter(cartItems => cartItems !== null && cartItems !== undefined)
    ).subscribe(cartItems => {
      const cartItemsIngredientLookup = new Set(cartItems.map(cartItem => cartItem.ingredient.id));

      const ingredients = this.data.recipe.ingredients.map(ingredient => {
        return this.fb.group({
          id: ingredient.id,
          name: ingredient.name,
          selected: cartItemsIngredientLookup.has(ingredient.id)
        });
      });

      this.form.setControl('ingredients', this.fb.array(ingredients));
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  public get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public selectAll() {
    const ingredients = this.form.get('ingredients') as FormArray;

    ingredients.controls.map(ingredientControl => {
      ingredientControl.patchValue({
        selected: true
      });
    });
  }

  public addToCart() {
    const ingredients = this.form.get('ingredients') as FormArray;

    this.dialogRef.close({
      isCancelled: false,
      recipeId: this.form.value.id,
      recipeName: this.form.value.name,
      selectedIngredients: ingredients.value
        .filter(ingredient => ingredient.selected)
        .map(ingredient => {
          return {
            id: ingredient.id,
            name: ingredient.name
          };
        })
    } as AddRecipeToCartComponentResult);
  }

  public cancel() {
    this.dialogRef.close({
      isCancelled: true,
      recipeId: null,
      selectedIngredients: []
    } as AddRecipeToCartComponentResult);
  }
}

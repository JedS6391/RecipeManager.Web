import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe, } from '../api/models/read/recipe.interface';
import { RecipesEditFacade } from '../store/recipes-store.facade';
import { filter } from 'rxjs/operators';
import { UpdateRecipe } from '../api/models/write/update-recipe.interface';
import { CreateIngredient } from '../api/models/write/create-ingredient.interface';
import { MessagingService } from 'src/app/shared/messaging.service';
import { UpdateRecipeGroups, CreateRecipeGroup, AssociateRecipeGroup } from '../api/models/write/update-recipe-groups.interface';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public form: FormGroup;

  public isSaving$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public saveSuccessful$: Observable<boolean>;
  public recipe$: Observable<Recipe>;

  private recipeId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipesEditFacade: RecipesEditFacade,
    private messagingService: MessagingService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      recipeId: '',
      name: ['', Validators.required],
      ingredients: this.fb.array([
        this.fb.group({
          ingredientId: '',
          name: ['', Validators.required],
          amount: ['', Validators.required],
          category: ['', Validators.required]
        })
      ]),
      groups: this.fb.array([
        this.fb.group({
          groupId: '',
          name: ['', Validators.required]
        })
      ])
    });

    // Load the recipe being viewed
    this.route.params.subscribe(params => {
      this.recipeId = params.id;
      this.recipesEditFacade.fetchRecipe(params.id);

      // Refresh the ingredient categories/recipe groups after each recipe change to ensure we get the latest.
      this.recipesEditFacade.fetchIngredientCategories();
      this.recipesEditFacade.fetchRecipeGroups();
    });

    this.recipe$ = this.recipesEditFacade.getRecipe();
    this.isSaving$ = this.recipesEditFacade.isSaving();
    this.isLoading$ = this.recipesEditFacade.isLoading();
    this.saveSuccessful$ = this.recipesEditFacade.isSaveSuccessful();

    // Update form each time the recipe changes
    this.recipe$.subscribe(recipe => this.buildForm(recipe));

    // Show save successful dialog for 2 seconds after each successful save
    this.saveSuccessful$.pipe(
      filter(val => val)
    ).subscribe(() => {
      // Refresh ingredient categories/recipe groups, as new ones may have been added.
      this.recipesEditFacade.fetchIngredientCategories();
      this.recipesEditFacade.fetchRecipeGroups();
      this.recipesEditFacade.fetchRecipe(this.recipeId);

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

    const ingredientControls = this.form.get('ingredients') as FormArray;

    const updatedIngredients = ingredientControls.value.map(ingredient => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        category: ingredient.category
      } as CreateIngredient;
    });

    const recipeGroupControls = this.form.get('groups') as FormArray;

    const updatedRecipeGroups = {
      recipeGroupsToCreate: recipeGroupControls.value.filter(recipeGroup => recipeGroup.groupId === '').map(recipeGroup => {
        return {
          name: recipeGroup.name
        } as CreateRecipeGroup;
      }),
      recipeGroupsToAssociate: recipeGroupControls.value.filter(recipeGroup => recipeGroup.groupId !== '').map(recipeGroup => {
        return {
          recipeGroupId: recipeGroup.groupId
        } as AssociateRecipeGroup;
      })
    } as UpdateRecipeGroups;

    this.recipesEditFacade.updateRecipe(updatedRecipe, updatedIngredients, updatedRecipeGroups);
  }

  private buildForm(recipe: Recipe) {
    this.form.patchValue({
      recipeId: recipe.id,
      name: recipe.name
    });

    const ingredientsControl = this.fb.array([]);

    recipe.ingredients.forEach(ingredient => {
      ingredientsControl.push(this.fb.group({
        ingredientId: ingredient.id,
        name: [ingredient.name, Validators.required],
        amount: [ingredient.amount, Validators.required],
        category: [ingredient.category.name, Validators.required]
      }));
    });

    this.form.setControl('ingredients', ingredientsControl);

    const groupsControl = this.fb.array([]);

    recipe.groups.forEach(group => {
      groupsControl.push(this.fb.group({
        groupId: group.id,
        name: group.name
      }));
    });

    this.form.setControl('groups', groupsControl);
  }
}

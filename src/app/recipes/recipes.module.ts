import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeApiModule } from './api/recipe-api.module';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ProfileModule } from '../profile/profile.module';
import { RecipeIngredientsComponent } from './recipe-edit/recipe-ingredients/recipe-ingredients.component';
import { RecipesStoreModule } from './store/recipes-store.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';



@NgModule({
  declarations: [RecipeListComponent, RecipeCreateComponent, RecipeEditComponent, RecipeIngredientsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SpinnerModule,
    ProfileModule,
    RecipeApiModule,
    RecipesStoreModule
  ]
})
export class RecipesModule { }
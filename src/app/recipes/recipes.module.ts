import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeApiModule } from './api/recipe-api.module';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ProfileModule } from '../profile/profile.module';
import { RecipeIngredientsComponent } from './recipe-edit/recipe-ingredients/recipe-ingredients.component';
import { RecipesStoreModule } from './store/recipes-store.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    RecipeIngredientsComponent,
    RecipeViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SpinnerModule,
    ProfileModule,
    CartModule,
    RecipeApiModule,
    RecipesStoreModule,
    NgSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class RecipesModule { }

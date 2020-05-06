import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
import { RecipeGroupsComponent } from './recipe-edit/recipe-groups/recipe-groups.component';
import { RecipeListFiltersComponent } from './recipe-list/recipe-list-filters/recipe-list-filters.component';
import { DeleteRecipeDialogComponent } from './recipe-list/delete-recipe-dialog/delete-recipe-dialog.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    RecipeIngredientsComponent,
    RecipeViewComponent,
    RecipeGroupsComponent,
    RecipeListFiltersComponent,
    DeleteRecipeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    ProfileModule,
    CartModule,
    RecipeApiModule,
    RecipesStoreModule,
    NgSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatMenuModule
  ],
  entryComponents: [DeleteRecipeDialogComponent]
})
export class RecipesModule { }

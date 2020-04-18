import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RECIPES_STATE_STORE_KEY } from './recipes-state';
import { recipesReducer } from './recipes-store.reducers';
import { RecipesEffects } from './recipes-store.effects';
import { RecipesListFacade, RecipesCreateFacade, RecipesEditFacade } from './recipes-store.facade';

@NgModule({
    imports: [
        StoreModule.forFeature(RECIPES_STATE_STORE_KEY, recipesReducer),
        EffectsModule.forFeature([RecipesEffects])
    ],
    providers: [RecipesListFacade, RecipesCreateFacade, RecipesEditFacade]
})
export class RecipesStoreModule {}

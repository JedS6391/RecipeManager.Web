import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState, RECIPES_STATE_STORE_KEY } from './recipes-state';

const getRecipesState = createFeatureSelector<RecipeState>(RECIPES_STATE_STORE_KEY);

export const recipeListState = createSelector(
    getRecipesState,
    state => state.list
);

export const recipeCreateState = createSelector(
    getRecipesState,
    state => state.create
);

export const recipeEditState = createSelector(
    getRecipesState,
    state => state.edit
);

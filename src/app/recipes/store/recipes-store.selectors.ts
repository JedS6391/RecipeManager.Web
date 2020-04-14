import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState, RECIPES_STATE_STORE_KEY } from './recipes-state';

const getRecipesState = createFeatureSelector<RecipeState>(RECIPES_STATE_STORE_KEY);

export const isRecipeListLoading = createSelector(
    getRecipesState,
    state => state.list.isLoading
);

export const getAllRecipes = createSelector(
    getRecipesState,
    state => state.list.recipes
);

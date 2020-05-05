import { Recipe, IngredientCategory, RecipeGroup } from '../api/models/read/recipe.interface';

export const RECIPES_STATE_STORE_KEY = 'recipes';

export interface RecipeState {
    list: {
        isLoading: boolean;
        recipes: Recipe[];
    };
    create: {
        isLoading: boolean;
        isSaving: boolean;
        recipe: Recipe;
    };
    edit: {
        isLoading: boolean;
        isSaving: boolean;
        saveSuccessful: boolean;
        recipe: Recipe;
        ingredientCategories: IngredientCategory[];
        recipeGroups: RecipeGroup[];
    };
    error?: Error;
}

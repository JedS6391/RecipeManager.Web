import { Recipe } from '../api/models/read/recipe.interface';

export const RECIPES_STATE_STORE_KEY = 'recipes';

export interface RecipeState {
    list: {
        isLoading: boolean;
        recipes: Recipe[];
    };
    create: {
        isLoading: boolean;
    };
    edit: {
        isLoading: boolean;
        recipe: Recipe;
    };
}

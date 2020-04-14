import { CreateRecipe } from './create-recipe.interface';

export interface UpdateRecipe extends CreateRecipe {
    recipeId: string;
}

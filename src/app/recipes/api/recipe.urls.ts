const BASE_RECIPES_PATH = '/api/me/recipes';

export const RECIPE_URLS = {
    get: {
        allRecipes: BASE_RECIPES_PATH,
        recipeById: (recipeId: string) => `${BASE_RECIPES_PATH}/${recipeId}`,
        ingredientCategories: `${BASE_RECIPES_PATH}/ingredients/categories`,
        recipeGroups: `${BASE_RECIPES_PATH}/groups`,
        recipeImportJob: (jobId: string) => `${BASE_RECIPES_PATH}/import/${jobId}`
    },
    create: {
        recipe: BASE_RECIPES_PATH,
        importRecipe: `${BASE_RECIPES_PATH}/import`
    },
    update: {
        recipe: (recipeId: string) => `${BASE_RECIPES_PATH}/${recipeId}`,
        recipeIngredients: (recipeId: string) => `${BASE_RECIPES_PATH}/${recipeId}/ingredients`,
        recipeGroups: (recipeId: string) => `${BASE_RECIPES_PATH}/${recipeId}/groups`
    },
    delete: {
        recipe: (recipeId: string) => `${BASE_RECIPES_PATH}/${recipeId}`,
    }
};

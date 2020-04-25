export const RECIPE_URLS = {
    getAllRecipes: '/api/me/recipes',
    getRecipeById: (recipeId: string) => `/api/me/recipes/${recipeId}`,
    createRecipe: '/api/me/recipes',
    updateRecipe: (recipeId: string) => `/api/me/recipes/${recipeId}`,
    updateRecipeIngredients: (recipeId: string) => `/api/me/recipes/${recipeId}/ingredients`,
    getIngredientCategories: '/api/me/recipes/ingredients/categories'
};
